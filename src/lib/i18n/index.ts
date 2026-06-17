import { init, register } from 'svelte-i18n';
import { get } from 'svelte/store';
import { storedLocale } from './localStore';
import { defaultLocale, getClosestLocale, getLanguageName, locales } from './localesConfig.ts';

// Re-export for convenience
export { defaultLocale, getClosestLocale, getLanguageName, locales };

locales.forEach((locale) => register(locale, () => import(`./locales/${locale}.json`)));

init({
	fallbackLocale: defaultLocale,
	initialLocale: get(storedLocale)
});