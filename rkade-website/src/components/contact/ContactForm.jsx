import React, { useState } from 'react';
import { CONTACT_EMAIL } from '@/components/common/CTAButtons';

const FORM_ENDPOINT = 'https://formspree.io/f/mzdnppbe';

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
      <div className="rounded border border-gold/30 bg-gold/10 p-7">
        <h3 className="font-display text-card text-ink">Message sent.</h3>
        <p className="mt-2 text-sm text-muted">
          We'll get back to you shortly. Talk soon.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-7" onSubmit={handleSubmit}>
      <div className="relative">
        <label htmlFor="name" className="mb-2 block text-label uppercase text-muted">
          Name <span className="text-muted">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={values.name}
          onChange={handleChange}
          className="w-full border-0 border-b border-line-strong bg-transparent pb-3 text-base text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-gold"
          placeholder="Your name"
        />
      </div>
      <div className="relative">
        <label htmlFor="email" className="mb-2 block text-label uppercase text-muted">
          Email <span className="text-muted">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={values.email}
          onChange={handleChange}
          className="w-full border-0 border-b border-line-strong bg-transparent pb-3 text-base text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-gold"
          placeholder="Your email"
        />
      </div>
      <div className="relative">
        <label htmlFor="company" className="mb-2 block text-label uppercase text-muted">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={values.company}
          onChange={handleChange}
          className="w-full border-0 border-b border-line-strong bg-transparent pb-3 text-base text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-gold"
          placeholder="Your company"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-label uppercase text-muted">
          What do you want to automate? <span className="text-muted">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={values.message}
          onChange={handleChange}
          className="w-full resize-none border-0 border-b border-line-strong bg-transparent pb-3 text-base text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-gold"
          placeholder="Tell us where the manual work is piling up."
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-400">
          Something went wrong sending that. Try again, or email us directly at {CONTACT_EMAIL}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded bg-gold px-6 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
}
