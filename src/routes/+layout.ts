import { waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';
import '#lib/i18n/index.js'; // Import to initialize. Important :)
import '#lib/i18n/localStore.js'; // Import to initialize locale store

export const load: LayoutLoad = async () => {
	await waitLocale();
};
