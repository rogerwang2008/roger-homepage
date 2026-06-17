import type { Handle } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';

import { getClosestLocale } from '$lib/i18n';

// noinspection JSUnusedGlobalSymbols
export const handle: Handle = async ({ event, resolve }) => {
	const cookieLang = event.cookies.get('locale');
	const headerLang = event.request.headers.get('accept-language')?.split(',')[0];
	const theme = event.cookies.get('theme') || '';

	const lang = cookieLang || headerLang;
	if (lang) {
		locale.set(getClosestLocale(lang));
	}

	return resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('<body', `<body data-theme="${theme}"`);
		}
	});
};