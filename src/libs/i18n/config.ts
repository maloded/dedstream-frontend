export const COOKIE_NAME = 'language';
export const languages = ['ua', 'en'];
export const defaultLanguage: Language = 'en';

export type Language = (typeof languages)[number];
