import ar from './ar';
import fr from './fr';
import en from './en';
import es from './es';

const dictionaries = { ar, fr, en, es };

export const getDict = (locale) => dictionaries[locale] ?? dictionaries.ar;
