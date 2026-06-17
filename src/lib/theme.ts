import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { readCookie, writeCookie } from './utils';

const COOKIE_NAME = 'theme';

export const storedTheme = writable<string>(readCookie(COOKIE_NAME) || '');

storedTheme.subscribe((theme) => {
	writeCookie(COOKIE_NAME, theme);
	if (browser) {
		document.body.setAttribute('data-theme', theme);
	}
});