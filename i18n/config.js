export const locales = ['ar', 'fr', 'en'];
export const defaultLocale = 'ar';

export const localeMeta = {
  ar: { label: 'العربية', short: 'ع', dir: 'rtl', ogLocale: 'ar_SA' },
  fr: { label: 'Français', short: 'FR', dir: 'ltr', ogLocale: 'fr_FR' },
  en: { label: 'English', short: 'EN', dir: 'ltr', ogLocale: 'en_US' },
};

export const isLocale = (value) => locales.includes(value);
