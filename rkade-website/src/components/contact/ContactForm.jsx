import React, { useState } from 'react';

// IMPORTANT: replace this with your real Formspree endpoint.
// 1. Go to formspree.io, sign up free, create a new form.
// 2. Set the form's destination email to hello@rkade.co
// 3. Copy the endpoint URL Formspree gives you (looks like
//    https://formspree.io/f/xxxxxxx) and paste it below.
const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [values, setValues] = useState({ name: '', email: '', company: '', message: '' });

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      });
      if (res.ok) {
        setStatus('sent');
        setValues({ name: '', email: '', company: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="rounded-xl border border-cobalt/30 bg-cobalt/5 p-7">
        <h3 className="font-heading text-lg font-semibold text-white">Message sent.</h3>
        <p className="mt-2 text-sm text-cool-gray">
          We'll get back to you shortly. Talk soon.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-7" onSubmit={handleSubmit}>
      <div className="relative">
        <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-cool-gray">
          Name <span className="text-cobalt">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={values.name}
          onChange={handleChange}
          className="w-full border-0 border-b border-white/15 bg-transparent pb-3 text-base text-white outline-none transition-colors placeholder:text-white/25 focus:border-cobalt"
          placeholder="Your name"
        />
      </div>
      <div className="relative">
        <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-cool-gray">
          Email <span className="text-cobalt">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={values.email}
          onChange={handleChange}
          className="w-full border-0 border-b border-white/15 bg-transparent pb-3 text-base text-white outline-none transition-colors placeholder:text-white/25 focus:border-cobalt"
          placeholder="Your email"
        />
      </div>
      <div className="relative">
        <label htmlFor="company" className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-cool-gray">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={values.company}
          onChange={handleChange}
          className="w-full border-0 border-b border-white/15 bg-transparent pb-3 text-base text-white outline-none transition-colors placeholder:text-white/25 focus:border-cobalt"
          placeholder="Your company"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-cool-gray">
          What do you want to automate? <span className="text-cobalt">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={values.message}
          onChange={handleChange}
          className="w-full resize-none border-0 border-b border-white/15 bg-transparent pb-3 text-base text-white outline-none transition-colors placeholder:text-white/25 focus:border-cobalt"
          placeholder="Tell us where the manual work is piling up."
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-400">
          Something went wrong sending that — try again, or email us directly at hello@rkade.co.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-cobalt px-6 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
}
