import { browser } from '$app/environment';
import { get } from 'svelte/store';
import { locale } from 'svelte-i18n';
import { type Persisted, persisted } from 'svelte-persisted-store';
import { defaultLocale, getClosestLocale } from './localesConfig.ts';

export const storedLocale: Persisted<string> = persisted(
	'locale',
	browser ? getClosestLocale(window.navigator.language) : get(locale) || defaultLocale
);

storedLocale.subscribe((lang) => {
	console.log('CURRLOCALE', lang);
	locale.set(lang);
});