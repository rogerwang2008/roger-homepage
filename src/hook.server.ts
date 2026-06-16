import type { Handle } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';

import { getClosestLocale } from '$lib/i18n';

// noinspection JSUnusedGlobalSymbols
export const handle: Handle = async ({ event, resolve }) => {
	const lang = event.request.headers.get('accept-language')?.split(',')[0];
	if (lang) {
		locale.set(getClosestLocale(lang));
	}
	return resolve(event);
};
