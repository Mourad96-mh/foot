'use client';

import { useState } from 'react';
import { whatsappLink } from '@/lib/site';
import { WhatsAppIcon } from './Icon';
import styles from './ContactForm.module.css';

// Quick message: opens WhatsApp with the message pre-filled. Nothing is stored.
export default function ContactForm({ t, required }) {
  const [v, setV] = useState({ name: '', phone: '', subject: t.subjects[0], message: '' });
  const [err, setErr] = useState({});
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!v.name.trim()) errs.name = true;
    if (!v.message.trim()) errs.message = true;
    setErr(errs);
    if (Object.keys(errs).length) {
      e.currentTarget.querySelector(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    const lines = [t.greeting, '', `${t.subject}: ${v.subject}`, `${t.name}: ${v.name}`];
    if (v.phone.trim()) lines.push(`${t.phone}: ${v.phone.trim()}`);
    lines.push('', v.message.trim());
    const text = lines.join('\n');
    window.open(whatsappLink(text), '_blank', 'noopener');
  };

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <h2>{t.title}</h2>
      <div className={styles.row}>
        <label className={styles.field}>
          <span>{t.name} *</span>
          <input name="name" value={v.name} onChange={set('name')} autoComplete="name" aria-invalid={err.name || undefined} />
          {err.name ? <small role="alert">{required}</small> : null}
        </label>
        <label className={styles.field}>
          <span>{t.phone}</span>
          <input name="phone" type="tel" dir="ltr" value={v.phone} onChange={set('phone')} autoComplete="tel" />
        </label>
      </div>
      <label className={styles.field}>
        <span>{t.subject}</span>
        <select name="subject" value={v.subject} onChange={set('subject')}>
          {t.subjects.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label className={styles.field}>
        <span>{t.message} *</span>
        <textarea name="message" rows={5} value={v.message} onChange={set('message')} aria-invalid={err.message || undefined} />
        {err.message ? <small role="alert">{required}</small> : null}
      </label>
      <button type="submit" className="btn btn--whatsapp">
        <WhatsAppIcon size={20} /> {t.send}
      </button>
      <p className={styles.note}>{t.note}</p>
    </form>
  );
}
