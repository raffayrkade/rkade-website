import React, { useState } from 'react';
import { AlertCircle, ArrowUpRight, Check } from 'lucide-react';
import { WHATSAPP_LINK } from '@/components/common/CTAButtons';

const FORM_ENDPOINT = 'https://formspree.io/f/mzdnppbe';

const initialValues = { name: '', email: '', company: '', message: '' };

// Real validation, not just a `required` attribute. Errors key off the field
// name so they can be shown inline, next to the field that failed.
function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Tell us your name.';

  if (!values.email.trim()) {
    errors.email = 'Add an email so we can reply.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "That doesn't look like a full email address.";
  }

  if (!values.message.trim()) {
    errors.message = 'Tell us what you want to automate.';
  } else if (values.message.trim().length < 10) {
    errors.message = 'A little more detail helps. A sentence is enough.';
  }

  return errors;
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-xs text-gold">
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-none" />
      {message}
    </p>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    if (touched[name]) setErrors(validate(nextValues));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot. A real form field named `_gotcha`, positioned off-screen. A
    // person never sees it or fills it in; a bot filling every field does.
    // Formspree also reads this name itself and quietly drops anything that
    // fills it, so this is two layers for one field.
    if (e.target.elements._gotcha.value) {
      setStatus('sent');
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      });
      if (res.ok) {
        setStatus('sent');
        setValues(initialValues);
        setTouched({});
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="rounded border border-gold/30 bg-cream/5 p-7">
        <div className="flex h-10 w-10 items-center justify-center rounded border border-gold/40 bg-gold/10">
          <Check className="h-5 w-5 text-gold" />
        </div>
        <h3 className="mt-5 font-display text-card text-cream">Message sent.</h3>
        <p className="mt-2 text-sm text-muted-on-ink">
          It's in our inbox. For anything urgent, WhatsApp is the fastest way to reach us.
        </p>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-5 inline-flex items-center gap-2 py-2 text-button uppercase text-gold"
        >
          Chat on WhatsApp
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    );
  }

  return (
    <form className="relative space-y-7" onSubmit={handleSubmit} noValidate>
      {/* Honeypot. Off-screen, unlabelled to assistive tech, never focusable by tab.
          `aria-hidden` sits on both the wrapper and the input itself. The
          wrapper alone is sufficient, since hiding a container hides its whole
          subtree, but two audit passes in a row read the input in isolation,
          found no attribute on it, and reported the field as announced to
          screen readers. Repeating it costs nothing and ends the false
          positive. */}
      <div className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden" aria-hidden="true">
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          defaultValue=""
        />
      </div>

      <div>
        <label htmlFor="name" className="mb-2 block text-label uppercase text-muted-on-ink">
          Name <span className="text-muted-on-ink">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(touched.name && errors.name)}
          aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
          className="w-full border-0 border-b border-cream/25 bg-transparent pb-3 text-base text-cream outline-none transition-colors placeholder:text-muted-on-ink/70 focus:border-gold"
          placeholder="Your name"
        />
        {touched.name && <FieldError id="name-error" message={errors.name} />}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-label uppercase text-muted-on-ink">
          Email <span className="text-muted-on-ink">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(touched.email && errors.email)}
          aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
          className="w-full border-0 border-b border-cream/25 bg-transparent pb-3 text-base text-cream outline-none transition-colors placeholder:text-muted-on-ink/70 focus:border-gold"
          placeholder="Your email"
        />
        {touched.email && <FieldError id="email-error" message={errors.email} />}
      </div>

      <div>
        <label htmlFor="company" className="mb-2 block text-label uppercase text-muted-on-ink">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={handleChange}
          className="w-full border-0 border-b border-cream/25 bg-transparent pb-3 text-base text-cream outline-none transition-colors placeholder:text-muted-on-ink/70 focus:border-gold"
          placeholder="Your company"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-label uppercase text-muted-on-ink">
          What do you want to automate? <span className="text-muted-on-ink">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(touched.message && errors.message)}
          aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
          className="w-full resize-none border-0 border-b border-cream/25 bg-transparent pb-3 text-base text-cream outline-none transition-colors placeholder:text-muted-on-ink/70 focus:border-gold"
          placeholder="Tell us where the manual work is piling up."
        />
        {touched.message && <FieldError id="message-error" message={errors.message} />}
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-3 rounded border border-gold/40 bg-ink-deep/40 p-4">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-none text-gold" />
          <p className="text-sm text-muted-on-ink">
            Something went wrong sending that. WhatsApp is the fastest way to reach us instead,{' '}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline underline-offset-4 hover:text-cream"
            >
              chat with us there
            </a>
            .
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded bg-gold px-6 text-button uppercase text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
}
