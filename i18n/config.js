export const locales = ['ar', 'fr', 'en', 'es'];
export const defaultLocale = 'ar';

export const localeMeta = {
  ar: { label: 'العربية', short: 'ع', dir: 'rtl', ogLocale: 'ar_SA' },
  fr: { label: 'Français', short: 'FR', dir: 'ltr', ogLocale: 'fr_FR' },
  en: { label: 'English', short: 'EN', dir: 'ltr', ogLocale: 'en_US' },
  es: { label: 'Español', short: 'ES', dir: 'ltr', ogLocale: 'es_ES' },
};

export const isLocale = (value) => locales.includes(value);
