import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, ArrowUpRight, Check } from 'lucide-react';
import { BDR_APPLY_ENDPOINT, WHATSAPP_LINK } from '@/components/common/CTAButtons';
import { LIMITS, ACTIVITIES, EXAMPLE_WHATSAPP, EXAMPLE_LINKEDIN } from './limits';
import { preparePhoto } from './photo';

// Field names are the contract's, exactly. See limits.js.
const initialValues = {
  full_name: '',
  email: '',
  whatsapp_number: '',
  city: '',
  country: '',
  current_activity: '',
  current_activity_where: '',
  linkedin_url: '',
  languages: '',
  why_join: '',
};

const FIELD_ORDER = [
  'full_name',
  'email',
  'whatsapp_number',
  'city',
  'country',
  'current_activity',
  'current_activity_where',
  'linkedin_url',
  'languages',
  'why_join',
  'headshot',
];

const ACTIVITY_LABELS = { studying: 'Studying', working: 'Working', other: 'Something else' };

const EMAIL_RE = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/;

function isLinkedIn(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    return url.protocol === 'https:' && (host === 'linkedin.com' || host.endsWith('.linkedin.com'));
  } catch {
    return false;
  }
}

// Mirrors the CRM's rules and answers in plain English. The server checks
// every one of these again, so this is for the person's benefit, not security.
function validate(values) {
  const errors = {};
  const L = LIMITS;
  const name = values.full_name.trim();
  if (!name) errors.full_name = 'Tell us your full name.';
  else if (name.length < L.full_name.min) errors.full_name = 'Your name needs at least two letters.';

  const email = values.email.trim();
  if (!email) errors.email = 'Add your email so we can reply.';
  else if (email.length > L.email.max || !EMAIL_RE.test(email)) {
    errors.email = 'Emails need to look like name@example.com.';
  }

  const phone = values.whatsapp_number.replace(/[\s\-()]/g, '');
  if (!phone) errors.whatsapp_number = 'Add the WhatsApp number we can reach you on.';
  else if (!new RegExp(`^\\+?\\d{${L.whatsapp_number.minDigits},${L.whatsapp_number.maxDigits}}$`).test(phone)) {
    errors.whatsapp_number = `WhatsApp numbers need the country code first, like ${EXAMPLE_WHATSAPP}.`;
  }

  if (!values.city.trim()) errors.city = 'Tell us which city you live in.';
  if (!values.country.trim()) errors.country = 'Tell us which country you live in.';

  if (!ACTIVITIES.includes(values.current_activity)) {
    errors.current_activity = 'Pick the one that fits best right now.';
  }

  const linkedin = values.linkedin_url.trim();
  if (linkedin && (linkedin.length > L.linkedin_url.max || !isLinkedIn(linkedin))) {
    errors.linkedin_url = `LinkedIn links need to look like ${EXAMPLE_LINKEDIN}. You can also leave this empty.`;
  }

  if (!values.languages.trim()) errors.languages = 'List the languages you can speak with a client.';

  const why = values.why_join.trim();
  if (!why) errors.why_join = 'Tell us why you want to join.';
  else if (why.length < L.why_join.min) errors.why_join = 'A little more please. A sentence or two is enough.';

  return errors;
}

const PHOTO_MESSAGES = {
  type: 'That file is not a photo we can read. Choose a JPEG, PNG or WebP image, or skip the photo.',
  big: 'That file is too large to open here. Choose a smaller photo, or skip the photo.',
  shrink: 'We could not make that photo small enough. You can send your application without a photo.',
};

const inputClass =
  'w-full min-h-[44px] border-0 border-b border-cream/25 bg-transparent pb-3 pt-2 text-base text-cream outline-none transition-colors placeholder:text-muted-on-ink/70 focus:border-gold focus-visible:shadow-[0_1px_0_0] focus-visible:shadow-gold';
const labelClass = 'mb-2 block text-label uppercase text-muted-on-ink';

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-xs text-gold">
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-none" aria-hidden="true" />
      {message}
    </p>
  );
}

function TextField({ name, label, required, hint, values, errors, onChange, onBlur, type = 'text', autoComplete, placeholder, maxLength, inputMode }) {
  const error = errors[name];
  const describedBy = [error ? `${name}-error` : null, hint ? `${name}-hint` : null].filter(Boolean).join(' ') || undefined;
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}{' '}
        {required ? <span aria-hidden="true">*</span> : <span className="normal-case tracking-normal">(optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        maxLength={maxLength}
        required={required}
        value={values[name]}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={inputClass}
        placeholder={placeholder}
      />
      {hint && (
        <p id={`${name}-hint`} className="mt-2 text-xs text-muted-on-ink">
          {hint}
        </p>
      )}
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}

export default function ApplyForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState(null); // { blob, url, name }
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoError, setPhotoError] = useState('');
  const [serverErrors, setServerErrors] = useState({});
  const [notice, setNotice] = useState(''); // 429 message
  const sendingRef = useRef(false);
  const formRef = useRef(null);
  const sentRef = useRef(null);

  // Free the preview's object URL when it changes or the form goes away.
  useEffect(() => {
    return () => {
      if (photo?.url) URL.revokeObjectURL(photo.url);
    };
  }, [photo]);

  useEffect(() => {
    if (status === 'sent') sentRef.current?.focus();
  }, [status]);

  const shownErrors = { ...serverErrors };
  Object.keys(errors).forEach((k) => {
    if (touched[k]) shownErrors[k] = errors[k];
  });
  if (photoError) shownErrors.headshot = photoError;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (serverErrors[name]) setServerErrors((s) => ({ ...s, [name]: undefined }));
    setErrors(validate(next));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoError('');
    setServerErrors((s) => ({ ...s, headshot: undefined }));
  };

  const handlePhoto = async (e) => {
    const input = e.target;
    const file = input.files?.[0];
    setPhotoError('');
    setServerErrors((s) => ({ ...s, headshot: undefined }));
    if (!file) return;
    setPhotoBusy(true);
    const result = await preparePhoto(file);
    setPhotoBusy(false);
    input.value = '';
    if (!result.ok) {
      setPhoto(null);
      setPhotoError(PHOTO_MESSAGES[result.reason]);
      return;
    }
    setPhoto({ blob: result.blob, url: URL.createObjectURL(result.blob), name: file.name });
  };

  const focusFirstError = (errs) => {
    const first = FIELD_ORDER.find((k) => errs[k]);
    if (!first) return;
    // Radios have no element with the field's id, so find by name.
    const el =
      formRef.current?.querySelector(`#${first}`) ||
      formRef.current?.querySelector(`[name="${first}"]`);
    el?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sendingRef.current || photoBusy) return;

    // Honeypot. A person never sees this field. A bot that fills it gets the
    // success panel and nothing is sent. The server does the same on its side.
    if (e.target.elements._gotcha.value) {
      setStatus('sent');
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched(Object.fromEntries(Object.keys(initialValues).map((k) => [k, true])));
    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors);
      return;
    }

    sendingRef.current = true;
    setStatus('sending');
    setNotice('');
    setServerErrors({});

    // Built by hand so an empty optional field is never sent at all.
    const body = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      const v = value.trim();
      if (v) body.append(key, v);
    });
    if (photo?.blob) body.append('headshot', photo.blob, 'headshot.jpg');

    try {
      // No headers, no cookies. The browser sets the multipart boundary.
      const res = await fetch(BDR_APPLY_ENDPOINT, { method: 'POST', body, credentials: 'omit' });
      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (res.ok) {
        setStatus('sent');
        setValues(initialValues);
        setTouched({});
        setErrors({});
        setPhoto(null);
      } else if ((res.status === 400 || res.status === 413 || res.status === 415) && data?.errors) {
        const known = {};
        let unknown = false;
        Object.entries(data.errors).forEach(([k, msg]) => {
          if (FIELD_ORDER.includes(k)) known[k] = String(msg);
          else unknown = true;
        });
        setServerErrors(known);
        if (unknown || Object.keys(known).length === 0) setStatus('error');
        else {
          setStatus('idle');
          // Wait a tick so the messages exist before focus moves to them.
          setTimeout(() => focusFirstError(known), 0);
        }
      } else if (res.status === 429) {
        setNotice(
          typeof data?.error === 'string' && data.error
            ? data.error
            : 'We have had a lot of applications from your connection just now. Please try again a little later.',
        );
        setStatus('idle');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      sendingRef.current = false;
    }
  };

  if (status === 'sent') {
    return (
      <div
        ref={sentRef}
        tabIndex={-1}
        role="status"
        className="rounded border border-gold/30 bg-cream/5 p-7 outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-gold"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded border border-gold/40 bg-gold/10">
          <Check className="h-5 w-5 text-gold" aria-hidden="true" />
        </div>
        <h3 className="mt-5 font-display text-card text-cream">Thank you. Your application is in.</h3>
        <p className="mt-2 text-sm text-muted-on-ink">
          The RKade team reads every application, and we reply to each one personally. Keep an eye
          on your WhatsApp and your email.
        </p>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <form
      ref={formRef}
      className="relative space-y-7"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Business Development Representative application"
    >
      {/* Honeypot. Off-screen, hidden from assistive tech, skipped by tab. */}
      <div className="absolute left-[-100vw] top-0 h-px w-px overflow-hidden" aria-hidden="true">
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" defaultValue="" />
      </div>

      <p className="text-xs text-muted-on-ink">
        <span aria-hidden="true">*</span> means we need it.
      </p>

      <TextField name="full_name" label="Full name" required autoComplete="name" maxLength={LIMITS.full_name.max} placeholder="Your full name" values={values} errors={shownErrors} onChange={handleChange} onBlur={handleBlur} />
      <TextField name="email" label="Email" required type="email" autoComplete="email" maxLength={LIMITS.email.max} placeholder="Your email" values={values} errors={shownErrors} onChange={handleChange} onBlur={handleBlur} />
      <TextField name="whatsapp_number" label="WhatsApp number" required type="tel" inputMode="tel" autoComplete="tel" maxLength={LIMITS.whatsapp_number.maxInput} placeholder={EXAMPLE_WHATSAPP} hint="Start with the country code." values={values} errors={shownErrors} onChange={handleChange} onBlur={handleBlur} />

      <div className="grid gap-7 sm:grid-cols-2">
        <TextField name="city" label="City" required autoComplete="address-level2" maxLength={LIMITS.city.max} placeholder="Where you live" values={values} errors={shownErrors} onChange={handleChange} onBlur={handleBlur} />
        <TextField name="country" label="Country" required autoComplete="country-name" maxLength={LIMITS.country.max} placeholder="Where you live" values={values} errors={shownErrors} onChange={handleChange} onBlur={handleBlur} />
      </div>

      <fieldset aria-describedby={shownErrors.current_activity ? 'current_activity-error' : undefined}>
        <legend className={labelClass}>
          What do you do now? <span aria-hidden="true">*</span>
        </legend>
        <div className="flex flex-col gap-3 sm:flex-row">
          {ACTIVITIES.map((a) => (
            <label key={a} className="relative flex-1">
              <input
                type="radio"
                name="current_activity"
                value={a}
                checked={values.current_activity === a}
                onChange={handleChange}
                onBlur={handleBlur}
                className="peer sr-only"
              />
              <span className="flex min-h-[48px] cursor-pointer items-center justify-center rounded border border-cream/25 px-4 text-sm text-cream transition-colors peer-checked:border-gold peer-checked:bg-gold/10 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold">
                {ACTIVITY_LABELS[a]}
              </span>
            </label>
          ))}
        </div>
        <FieldError id="current_activity-error" message={shownErrors.current_activity} />
      </fieldset>

      <TextField name="current_activity_where" label="Where" maxLength={LIMITS.current_activity_where.max} placeholder="Your university, your company, or what you do" values={values} errors={shownErrors} onChange={handleChange} onBlur={handleBlur} />
      <TextField name="linkedin_url" label="LinkedIn link" type="url" inputMode="url" maxLength={LIMITS.linkedin_url.max} placeholder={EXAMPLE_LINKEDIN} values={values} errors={shownErrors} onChange={handleChange} onBlur={handleBlur} />
      <TextField name="languages" label="Languages you speak" required maxLength={LIMITS.languages.max} placeholder="For example English, Arabic, Hindi" values={values} errors={shownErrors} onChange={handleChange} onBlur={handleBlur} />

      <div>
        <label htmlFor="why_join" className={labelClass}>
          Why do you want to join? <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="why_join"
          name="why_join"
          rows={5}
          maxLength={LIMITS.why_join.max}
          required
          value={values.why_join}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(shownErrors.why_join)}
          aria-describedby={[shownErrors.why_join ? 'why_join-error' : null, 'why_join-count'].filter(Boolean).join(' ')}
          className={`${inputClass} resize-none`}
          placeholder="Tell us a little about you and what draws you to this."
        />
        <p id="why_join-count" className="mt-2 text-xs text-muted-on-ink">
          {values.why_join.length} of {LIMITS.why_join.max} characters
        </p>
        <FieldError id="why_join-error" message={shownErrors.why_join} />
      </div>

      <div>
        <label htmlFor="headshot" className={labelClass}>
          Photo <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <p id="headshot-hint" className="mb-3 text-xs text-muted-on-ink">
          A clear photo of your face helps us put a name to you. We shrink it on your device before
          it is sent.
        </p>
        {photo ? (
          <div className="flex items-center gap-4">
            <img src={photo.url} alt="" className="h-20 w-20 rounded border border-cream/25 object-cover" />
            <div className="min-w-0">
              <p className="truncate text-sm text-cream">{photo.name}</p>
              <button
                type="button"
                onClick={removePhoto}
                className="mt-1 inline-flex min-h-[44px] items-center text-button uppercase text-gold underline underline-offset-4 hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                Remove photo
              </button>
            </div>
          </div>
        ) : (
          <input
            id="headshot"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handlePhoto}
            disabled={photoBusy}
            aria-invalid={Boolean(shownErrors.headshot)}
            aria-describedby={['headshot-hint', shownErrors.headshot ? 'headshot-error' : null].filter(Boolean).join(' ')}
            className="block min-h-[44px] w-full text-sm text-muted-on-ink file:mr-4 file:min-h-[44px] file:cursor-pointer file:rounded file:border file:border-cream/25 file:bg-transparent file:px-4 file:text-button file:uppercase file:text-cream hover:file:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          />
        )}
        {photoBusy && (
          <p role="status" className="mt-2 text-xs text-muted-on-ink">
            Getting your photo ready...
          </p>
        )}
        <FieldError id="headshot-error" message={shownErrors.headshot} />
      </div>

      {notice && (
        <div role="alert" className="flex items-start gap-3 rounded border border-gold/40 bg-ink-deep/40 p-4">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-none text-gold" aria-hidden="true" />
          <p className="text-sm text-muted-on-ink">{notice}</p>
        </div>
      )}

      {status === 'error' && (
        <div role="alert" className="flex items-start gap-3 rounded border border-gold/40 bg-ink-deep/40 p-4">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-none text-gold" aria-hidden="true" />
          <p className="text-sm text-muted-on-ink">
            Your application did not go through, and nothing you typed is lost. WhatsApp is the
            fastest way to reach us instead,{' '}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 py-1 text-gold underline underline-offset-4 hover:text-cream"
            >
              chat with us there
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            . You can also press the button again to try once more.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={sending || photoBusy}
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded bg-gold px-6 text-button uppercase text-ink transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream disabled:opacity-60 sm:w-auto"
      >
        {sending ? 'Sending...' : 'Send my application'}
      </button>
    </form>
  );
}
