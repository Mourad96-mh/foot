'use client';

import { useEffect, useRef, useState } from 'react';
import { site, whatsappLink, mailtoLink } from '@/lib/site';
import Icon, { WhatsAppIcon } from '../Icon';
import { steps, isVisible, ageFrom, validateStep, displayValue, buildMessage } from './schema';
import styles from './RegistrationForm.module.css';

const DRAFT_KEY = 'gepu-registration-draft';

const readDraft = () => {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeDraft = (data) => {
  try {
    if (data) sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    else sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    /* storage unavailable (private mode): the form still works */
  }
};

export default function RegistrationForm({ t, locale }) {
  const [values, setValues] = useState({ languages: [] });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [sent, setSent] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const firstRender = useRef(true);

  // Restore a draft after a reload.
  useEffect(() => {
    const draft = readDraft();
    if (draft?.values) {
      setValues(draft.values);
      setStep(Math.min(draft.step ?? 0, steps.length - 1));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded && !sent) writeDraft({ values, step });
  }, [values, step, loaded, sent]);

  // Move focus to the step title when the step changes (not on first load).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [step, sent]);

  const set = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest);
  };

  const toggle = (name, option) => {
    const list = values[name] || [];
    set(name, list.includes(option) ? list.filter((o) => o !== option) : [...list, option]);
  };

  const check = () => {
    const errs = validateStep(step, values);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      setShowSummary(true);
      requestAnimationFrame(() => formRef.current?.querySelector(`[name="${first}"]`)?.focus());
      return false;
    }
    setShowSummary(false);
    return true;
  };

  const next = (e) => {
    e.preventDefault();
    if (check()) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => {
    setErrors({});
    setShowSummary(false);
    setStep((s) => Math.max(s - 1, 0));
  };

  const dateLabel = new Date().toLocaleDateString(locale === 'ar' ? 'ar-SA-u-nu-latn-ca-gregory' : locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const finish = () => {
    setSent(true);
    writeDraft(null);
  };

  const sendWhatsApp = () => {
    if (!check()) return;
    window.open(whatsappLink(buildMessage(values, t, dateLabel)), '_blank', 'noopener');
    finish();
  };

  const sendEmail = () => {
    if (!check()) return;
    const subject = `${t.message.subject} — ${values.fullName || ''}`.trim();
    window.location.href = mailtoLink(site.registrationEmail, subject, buildMessage(values, t, dateLabel));
    finish();
  };

  const restart = () => {
    writeDraft(null);
    setValues({ languages: [] });
    setErrors({});
    setSent(false);
    setStep(0);
  };

  const current = steps[step];
  const isReview = current.id === 'review';
  const age = ageFrom(values.birthDate);

  if (sent) {
    return (
      <div className={styles.shell}>
        <div className={styles.success} role="status">
          <span className={styles.successIcon}><Icon name="check" size={40} /></span>
          <h2 ref={headingRef} tabIndex={-1}>{t.success.title}</h2>
          <p>{t.success.text}</p>
          <p className={styles.photoNote}><Icon name="camera" size={22} /> {t.success.photo}</p>
          <p className={styles.welcome}>{t.success.welcome}</p>
          <div className={styles.actions}>
            <button type="button" className="btn btn--outline" onClick={restart}>{t.buttons.restart}</button>
          </div>
        </div>
      </div>
    );
  }

  const renderField = (field) => {
    if (!isVisible(field, values)) return null;
    const id = `f-${field.name}`;
    const err = errors[field.name];
    const errId = err ? `${id}-err` : undefined;
    const label = t.fields[field.name];
    const optional = !field.required && field.type !== 'age' ? <span className={styles.optional}> ({t.hints.optional})</span> : null;
    const cls = `${styles.field} ${field.wide || field.type === 'textarea' ? styles.wide : ''} ${err ? styles.invalid : ''}`;
    const common = {
      id,
      name: field.name,
      'aria-invalid': err ? true : undefined,
      'aria-describedby': errId,
      'aria-required': field.required || undefined,
    };
    const error = err ? <p id={errId} className={styles.error}>{t.errors[err]}</p> : null;

    if (field.type === 'radio' || field.type === 'checkbox') {
      const selected = values[field.name];
      return (
        <fieldset key={field.name} className={cls} aria-describedby={errId}>
          <legend className={styles.label}>{label}{optional}</legend>
          <div className={styles.choices}>
            {field.options.map((o, i) => {
              const checked = field.type === 'radio' ? selected === o : (selected || []).includes(o);
              return (
                <label key={o} className={`${styles.choice} ${checked ? styles.choiceOn : ''}`}>
                  <input
                    type={field.type}
                    name={field.name}
                    value={o}
                    checked={checked}
                    aria-invalid={err && i === 0 ? true : undefined}
                    onChange={() => (field.type === 'radio' ? set(field.name, o) : toggle(field.name, o))}
                  />
                  <span>{t.options[o]}</span>
                </label>
              );
            })}
          </div>
          {error}
        </fieldset>
      );
    }

    if (field.type === 'consent') {
      return (
        <div key={field.name} className={`${cls} ${styles.consent}`}>
          <label className={styles.consentLabel}>
            <input type="checkbox" {...common} checked={values.consent === true} onChange={(e) => set('consent', e.target.checked)} />
            <span>{label}</span>
          </label>
          {error}
        </div>
      );
    }

    if (field.type === 'age') {
      const out = age != null && (age < 8 || age > 18);
      return (
        <div key={field.name} className={cls}>
          <span className={styles.label} id={id}>{label}</span>
          <output className={styles.age} aria-labelledby={id}>{age ?? '—'}</output>
          <p className={out ? styles.warn : styles.hint}>{out ? t.hints.ageOut : t.hints.age}</p>
        </div>
      );
    }

    const value = values[field.name] ?? '';
    const onChange = (e) => set(field.name, e.target.value);

    let control;
    if (field.type === 'textarea') {
      control = <textarea {...common} rows={3} value={value} onChange={onChange} autoComplete={field.autoComplete} />;
    } else if (field.type === 'select') {
      control = (
        <select {...common} value={value} onChange={onChange}>
          <option value="">{t.options.choose}</option>
          {field.options.map((o) => <option key={o} value={o}>{t.options[o]}</option>)}
        </select>
      );
    } else {
      control = (
        <input
          {...common}
          type={field.type}
          value={value}
          onChange={onChange}
          autoComplete={field.autoComplete}
          inputMode={field.type === 'number' ? 'numeric' : undefined}
          min={field.min}
          max={field.type === 'date' ? new Date().toISOString().slice(0, 10) : field.max}
          dir={field.type === 'tel' || field.type === 'email' ? 'ltr' : undefined}
          placeholder={field.type === 'tel' ? '+966…' : undefined}
        />
      );
    }

    return (
      <div key={field.name} className={cls}>
        <label htmlFor={id} className={styles.label}>{label}{optional}</label>
        {control}
        {field.type === 'tel' && !err ? <p className={styles.hint}>{t.hints.phone}</p> : null}
        {error}
      </div>
    );
  };

  return (
    <div className={styles.shell}>
      {/* Progress */}
      <ol className={`${styles.progress} no-print`} aria-label={t.stepOf.replace('{n}', step + 1).replace('{total}', steps.length)}>
        {t.steps.map((name, i) => (
          <li key={name} className={i < step ? styles.done : i === step ? styles.now : ''} aria-current={i === step ? 'step' : undefined}>
            <span className={styles.dot}>{i < step ? <Icon name="check" size={16} /> : i + 1}</span>
            <span className={styles.stepName}>{name}</span>
          </li>
        ))}
      </ol>

      <form ref={formRef} className={styles.form} onSubmit={next} noValidate>
        <div className={styles.stepHead}>
          <p className={styles.stepOf}>{t.stepOf.replace('{n}', step + 1).replace('{total}', steps.length)}</p>
          <h2 ref={headingRef} tabIndex={-1} className={styles.stepTitle}>{t.sections[current.id]}</h2>
        </div>

        {showSummary && Object.keys(errors).length > 0 ? (
          <p className={styles.errorSummary} role="alert">{t.errors.fixStep}</p>
        ) : null}

        {isReview ? (
          <div className={styles.review} id="print-area">
            <div className={styles.printHead}>
              <img src="/img/crest-sm.webp" alt="" width="70" height="78" />
              <div>
                <strong>{t.message.title}</strong>
                <span>{t.review.date}: {dateLabel}</span>
              </div>
            </div>
            <p className="no-print">{t.review.intro}</p>
            {steps.slice(0, -1).map((s, i) => (
              <section key={s.id} className={styles.reviewBlock}>
                <div className={styles.reviewHead}>
                  <h3>{t.sections[s.id]}</h3>
                  <button type="button" className={`${styles.editBtn} no-print`} onClick={() => setStep(i)}>
                    {t.buttons.edit}
                  </button>
                </div>
                <dl>
                  {s.fields.filter((f) => isVisible(f, values)).map((f) => (
                    <div key={f.name}>
                      <dt>{t.fields[f.name]}</dt>
                      <dd>{displayValue(f, values, t) || t.review.empty}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
            <div className={styles.fields}>{current.fields.map(renderField)}</div>
          </div>
        ) : (
          <div className={styles.fields}>{current.fields.map(renderField)}</div>
        )}

        <div className={`${styles.nav} no-print`}>
          {step > 0 ? (
            <button type="button" className="btn btn--outline" onClick={back}>
              <Icon name="arrow" size={18} className={styles.backIcon} /> {t.buttons.back}
            </button>
          ) : <span />}

          {isReview ? (
            <div className={styles.sendGroup}>
              <button type="button" className="btn btn--whatsapp" onClick={sendWhatsApp}>
                <WhatsAppIcon size={20} /> {t.buttons.whatsapp}
              </button>
              <button type="button" className="btn btn--navy" onClick={sendEmail}>
                <Icon name="mail" size={20} /> {t.buttons.email}
              </button>
              <button type="button" className="btn btn--outline" onClick={() => window.print()}>
                <Icon name="print" size={20} /> {t.buttons.print}
              </button>
            </div>
          ) : (
            <button type="submit" className="btn btn--gold">
              {t.buttons.next} <Icon name="arrow" size={18} className="flip-rtl" />
            </button>
          )}
        </div>

        <p className={`${styles.privacy} no-print`}>
          <Icon name="lock" size={18} /> <span>{t.privacy} {t.draft}</span>
        </p>
      </form>
    </div>
  );
}
