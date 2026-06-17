import { browser } from '$app/environment';
// @ts-expect-error svelte-cookie 没有类型标注
import { getCookie, setCookie } from 'svelte-cookie';

export function readCookie(name: string): string | null {
	if (!browser) return null;
	const value = getCookie(name);
	return value || null;
}

export function writeCookie(name: string, value: string, expiryDays: number = 365) {
	if (browser) {
		setCookie(name, value, expiryDays, true);
	}
}