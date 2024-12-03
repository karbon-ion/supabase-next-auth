import { locale } from './models/models';

const dictionaries = {
    en: () => import('../../messages/en.json').then((module) => module.default),
    fr: () => import('../../messages/fr.json').then((module) => module.default), // Assuming you meant to use 'nl' here
  };
  
  export const getDictionary = async (locale: locale) => {
    if (!dictionaries[locale]) {
      throw new Error(`Locale ${locale} not supported`);
    }
    return dictionaries[locale]();
  };