import ar from './ar';
import fr from './fr';
import en from './en';

const dictionaries = { ar, fr, en };

export const getDict = (locale) => dictionaries[locale] ?? dictionaries.ar;
