#!/usr/bin/env node
// A stand-in for the CRM's public applicant endpoint, so the apply page can be
// tried with no CRM running. Not imported by anything in src/.
//
//   node scripts/mock-bdr-endpoint.mjs        (listens on port 3000)
//
// Behaves per rkade-crm/docs/plan/phase-10.md, "The public applicant endpoint:
// exact contract". Force any answer with a query string on the endpoint, for
// example ?mock=429 (200, 400, 403, 413, 415, 429, 500). Without it the mock
// validates the fields like the real thing.

import { createServer } from 'node:http';

const PORT = Number(process.env.PORT || 3000);
const PATH = '/api/public/applicants';
const ALLOWED = ['https://rkade.co', 'https://www.rkade.co', 'http://localhost:5173'];
const MAX_BODY = 1024 * 1024;
const MAX_PHOTO = 524288;

const json = (res, status, body, extra = {}) => {
  res.writeHead(status, { 'Content-Type': 'application/json', ...extra });
  res.end(JSON.stringify(body));
};

function parseMultipart(buf, boundary) {
  const fields = {};
  const files = {};
  const parts = buf.toString('latin1').split(`--${boundary}`).slice(1, -1);
  for (const part of parts) {
    const cut = part.indexOf('\r\n\r\n');
    if (cut < 0) continue;
    const head = part.slice(0, cut);
    let body = part.slice(cut + 4);
    if (body.endsWith('\r\n')) body = body.slice(0, -2);
    const name = /name="([^"]+)"/.exec(head)?.[1];
    if (!name) continue;
    if (/filename="/.test(head)) files[name] = Buffer.from(body, 'latin1');
    else fields[name] = Buffer.from(body, 'latin1').toString('utf8');
  }
  return { fields, files };
}

function validate(f) {
  const e = {};
  const t = (k) => (f[k] ?? '').trim();
  if (t('full_name').length < 2 || t('full_name').length > 120) e.full_name = 'Tell us your full name.';
  if (!/^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(t('email')) || t('email').length > 254) e.email = 'Emails need to look like name@example.com.';
  if (!/^\+?\d{7,15}$/.test(t('whatsapp_number').replace(/[\s\-()]/g, ''))) e.whatsapp_number = 'WhatsApp numbers need the country code first.';
  if (!t('city') || t('city').length > 80) e.city = 'Tell us which city you live in.';
  if (!t('country') || t('country').length > 80) e.country = 'Tell us which country you live in.';
  if (!['studying', 'working', 'other'].includes(f.current_activity)) e.current_activity = 'Pick the one that fits best right now.';
  if (t('current_activity_where').length > 120) e.current_activity_where = 'Keep this under a short line.';
  if (t('linkedin_url')) {
    try {
      const u = new URL(t('linkedin_url'));
      const ok = u.protocol === 'https:' && (u.hostname === 'linkedin.com' || u.hostname.endsWith('.linkedin.com'));
      if (!ok || t('linkedin_url').length > 300) e.linkedin_url = 'LinkedIn links need to start with https:// and be on linkedin.com.';
    } catch {
      e.linkedin_url = 'LinkedIn links need to start with https:// and be on linkedin.com.';
    }
  }
  if (!t('languages') || t('languages').length > 200) e.languages = 'List the languages you speak.';
  if (t('why_join').length < 10 || t('why_join').length > 1000) e.why_join = 'Tell us a little more about why you want to join.';
  return e;
}

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const origin = req.headers.origin;
  const cors = {};
  if (origin && ALLOWED.includes(origin)) {
    cors['Access-Control-Allow-Origin'] = origin;
    cors.Vary = 'Origin';
  }
  if (url.pathname !== PATH) return json(res, 404, { ok: false, error: 'Not found.' });

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      ...cors,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    });
    return res.end();
  }
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'Use POST.' }, cors);
  if (origin && !ALLOWED.includes(origin)) {
    return json(res, 403, { ok: false, error: 'This page is not allowed to send applications.' });
  }

  const chunks = [];
  let size = 0;
  let over = false;
  req.on('data', (c) => {
    size += c.length;
    if (size > MAX_BODY) over = true;
    else chunks.push(c);
  });
  req.on('end', () => {
    // The form posts to a fixed address, so MOCK=429 in the environment forces
    // an answer for every request, the same as the query string does.
    const mock = url.searchParams.get('mock') || process.env.MOCK;
    const photoErr = (m) => ({ ok: false, errors: { headshot: m } });
    const tooBig = 'That photo is too large. Choose a smaller one, or skip it.';
    const notPhoto = 'That file is not a JPEG, PNG or WebP photo.';
    if (mock === '200') return json(res, 200, { ok: true }, cors);
    if (mock === '400') {
      return json(res, 400, { ok: false, errors: { email: 'That email does not look right.', why_join: 'Tell us a little more about why you want to join.' } }, cors);
    }
    if (mock === '403') return json(res, 403, { ok: false, error: 'This page is not allowed to send applications.' }, cors);
    if (mock === '413' || over) return json(res, 413, photoErr(tooBig), cors);
    if (mock === '415') return json(res, 415, photoErr(notPhoto), cors);
    if (mock === '429') {
      return json(res, 429, { ok: false, error: 'We have had several applications from your connection. Please try again in a little while.' }, { ...cors, 'Retry-After': '600' });
    }
    if (mock === '500') return json(res, 500, { ok: false, error: 'Something went wrong on our side.' }, cors);

    const type = req.headers['content-type'] || '';
    const boundary = /boundary=(.+)$/.exec(type)?.[1];
    if (!type.startsWith('multipart/form-data') || !boundary) {
      return json(res, 400, { ok: false, errors: { full_name: 'The form did not arrive in the expected shape.' } }, cors);
    }

    const { fields, files } = parseMultipart(Buffer.concat(chunks), boundary);
    if (fields._gotcha) return json(res, 200, { ok: true }, cors);
    const errors = validate(fields);
    if (Object.keys(errors).length) return json(res, 400, { ok: false, errors }, cors);
    const photo = files.headshot;
    if (photo) {
      if (photo.length > MAX_PHOTO) return json(res, 413, photoErr(tooBig), cors);
      const isJpeg = photo[0] === 0xff && photo[1] === 0xd8 && photo[2] === 0xff;
      const isPng = photo[0] === 0x89 && photo[1] === 0x50;
      const isWebp = photo.subarray(0, 4).toString('latin1') === 'RIFF' && photo.subarray(8, 12).toString('latin1') === 'WEBP';
      if (!isJpeg && !isPng && !isWebp) return json(res, 415, photoErr(notPhoto), cors);
    }
    console.log(`  mock: stored application from ${fields.email}${photo ? ` with a ${photo.length} byte photo` : ''}`);
    return json(res, 200, { ok: true }, cors);
  });
});

server.listen(PORT, () => {
  console.log(`\n  Mock BDR endpoint on http://localhost:${PORT}${PATH}`);
  console.log('  Add ?mock=429 (or 200, 400, 403, 413, 415, 500) to force an answer.\n');
});
