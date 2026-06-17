import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';
import { locale } from 'svelte-i18n';
import { readCookie, writeCookie } from '$lib/utils';
import { defaultLocale, getClosestLocale } from './localesConfig.ts';

const COOKIE_NAME = 'locale';

const initialValue =
	readCookie(COOKIE_NAME) || (browser ? getClosestLocale(window.navigator.language) : get(locale) || defaultLocale);

export const storedLocale = writable<string>(initialValue);

storedLocale.subscribe((lang) => {
	writeCookie(COOKIE_NAME, lang);
	locale.set(lang);
});