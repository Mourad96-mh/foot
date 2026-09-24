// Registration form schema: same sections and fields as the client's paper form.
// Labels live in the dictionaries (registration.fields / registration.options).
//   type:     text | email | tel | number | date | textarea | radio | checkbox | select | age
//   required: validated on "Next"
//   showIf:   [field, value] — only shown (and required) when that answer matches
//   wide:     spans the whole row

const yesNo = ['yes', 'no'];

export const steps = [
  {
    id: 'child',
    fields: [
      { name: 'fullName', type: 'text', required: true, wide: true, autoComplete: 'off' },
      { name: 'nickname', type: 'text' },
      { name: 'birthPlace', type: 'text' },
      { name: 'birthDate', type: 'date', required: true },
      { name: 'age', type: 'age' },
      { name: 'gender', type: 'radio', options: ['male', 'female'], required: true },
      { name: 'nationality', type: 'text', required: true },
      { name: 'idNumber', type: 'text', required: true },
      { name: 'residence', type: 'text' },
      { name: 'school', type: 'text' },
      { name: 'grade', type: 'text' },
      { name: 'languages', type: 'checkbox', options: ['arabic', 'english', 'spanish'] },
      { name: 'otherLanguage', type: 'text' },
    ],
  },
  {
    id: 'sport',
    fields: [
      { name: 'position', type: 'select', options: ['goalkeeper', 'defender', 'midfielder', 'forward', 'unknown'], required: true },
      { name: 'foot', type: 'radio', options: ['right', 'left', 'both'], required: true },
      { name: 'yearsPlaying', type: 'number', required: true, min: 0, max: 18 },
      { name: 'currentClub', type: 'text' },
      { name: 'previousClub', type: 'text' },
      { name: 'height', type: 'number', min: 80, max: 220 },
      { name: 'weight', type: 'number', min: 15, max: 150 },
      { name: 'tournaments', type: 'radio', options: yesNo, required: true },
      { name: 'tournamentsDetails', type: 'textarea', showIf: ['tournaments', 'yes'], required: true, wide: true },
    ],
  },
  {
    id: 'health',
    fields: [
      { name: 'condition', type: 'radio', options: yesNo, required: true, wide: true },
      { name: 'conditionDetails', type: 'textarea', showIf: ['condition', 'yes'], required: true, wide: true },
      { name: 'medication', type: 'radio', options: yesNo, required: true, wide: true },
      { name: 'medicationDetails', type: 'textarea', showIf: ['medication', 'yes'], required: true, wide: true },
      { name: 'allergy', type: 'radio', options: yesNo, required: true, wide: true },
      { name: 'allergyDetails', type: 'textarea', showIf: ['allergy', 'yes'], required: true, wide: true },
      { name: 'injuries', type: 'radio', options: yesNo, required: true, wide: true },
      { name: 'injuriesDetails', type: 'textarea', showIf: ['injuries', 'yes'], required: true, wide: true },
    ],
  },
  {
    id: 'guardian',
    fields: [
      { name: 'guardianName', type: 'text', required: true, autoComplete: 'name' },
      { name: 'relation', type: 'text', required: true },
      { name: 'phone1', type: 'tel', required: true, autoComplete: 'tel' },
      { name: 'phone2', type: 'tel' },
      { name: 'email', type: 'email', required: true, autoComplete: 'email' },
      { name: 'city', type: 'text', required: true, autoComplete: 'address-level2' },
      { name: 'address', type: 'textarea', wide: true, autoComplete: 'street-address' },
    ],
  },
  {
    id: 'emergency',
    fields: [
      { name: 'emergencyName', type: 'text', required: true },
      { name: 'emergencyRelation', type: 'text' },
      { name: 'emergencyPhone', type: 'tel', required: true },
      { name: 'emergencyAddress', type: 'text' },
    ],
  },
  {
    id: 'review',
    fields: [
      { name: 'consent', type: 'consent', required: true, wide: true },
      { name: 'signature', type: 'text', required: true, wide: true },
    ],
  },
];

export const isVisible = (field, values) => !field.showIf || values[field.showIf[0]] === field.showIf[1];

// Age in whole years at `now`, or null.
export function ageFrom(birthDate, now = new Date()) {
  if (!birthDate) return null;
  const b = new Date(`${birthDate}T00:00:00`);
  if (Number.isNaN(b.getTime())) return null;
  let age = now.getFullYear() - b.getFullYear();
  const m = now.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age -= 1;
  return age >= 0 && age < 120 ? age : null;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s().-]{7,20}$/;

// Returns an error key (see registration.errors) or null.
export function validateField(field, values) {
  if (!isVisible(field, values)) return null;
  const v = values[field.name];
  const empty = v == null || (Array.isArray(v) ? v.length === 0 : String(v).trim() === '') || v === false;
  if (field.type === 'consent') return v === true ? null : 'consent';
  if (empty) return field.required ? 'required' : null;
  if (field.type === 'email' && !EMAIL.test(String(v).trim())) return 'email';
  if (field.type === 'tel' && !PHONE.test(String(v).trim())) return 'phone';
  if (field.type === 'number') {
    const n = Number(v);
    if (Number.isNaN(n) || (field.min != null && n < field.min) || (field.max != null && n > field.max)) return 'number';
  }
  return null;
}

export function validateStep(stepIndex, values) {
  const errors = {};
  for (const field of steps[stepIndex].fields) {
    const err = validateField(field, values);
    if (err) errors[field.name] = err;
  }
  return errors;
}

// Human-readable value for the review screen and the outgoing message.
export function displayValue(field, values, t) {
  const v = values[field.name];
  if (field.type === 'age') {
    const a = ageFrom(values.birthDate);
    return a == null ? '' : String(a);
  }
  if (v == null || v === '') return '';
  if (Array.isArray(v)) return v.map((o) => t.options[o] ?? o).join(', ');
  if (field.type === 'radio' || field.type === 'select') return t.options[v] ?? v;
  if (field.type === 'consent') return v ? '✓' : '';
  return String(v).trim();
}

// Plain-text message sent by WhatsApp / e-mail, in the page language.
export function buildMessage(values, t, dateLabel) {
  const lines = [`*${t.message.title}*`, `${t.review.date}: ${dateLabel}`];
  for (const step of steps) {
    const rows = step.fields
      .filter((f) => f.type !== 'consent' && isVisible(f, values))
      .map((f) => [t.fields[f.name], displayValue(f, values, t)])
      .filter(([, value]) => value !== '');
    if (!rows.length) continue;
    lines.push('', `*${t.sections[step.id]}*`);
    for (const [label, value] of rows) lines.push(`- ${label}: ${value}`);
  }
  if (values.consent) lines.push('', `✓ ${t.fields.consent}`);
  return lines.join('\n');
}
