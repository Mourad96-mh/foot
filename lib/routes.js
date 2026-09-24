// Page slugs are shared by every locale; the labels come from the dictionaries.
export const pages = ['', 'about', 'presentation', 'programme', 'registration', 'gallery', 'contact', 'legal'];

export const navKeys = ['about', 'presentation', 'programme', 'gallery', 'contact'];

export const href = (locale, page = '') => `/${locale}/${page ? `${page}/` : ''}`;
