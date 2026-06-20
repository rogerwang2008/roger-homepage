<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { resolve } from '$app/paths';
	import TranslateIcon from '@iconify-svelte/material-symbols/translate';
	import LightModeIcon from '@iconify-svelte/material-symbols/light-mode';
	import DarkModeIcon from '@iconify-svelte/material-symbols/dark-mode';
	import LightModeAutoIcon from '@iconify-svelte/material-symbols/light-mode-auto';
	import { getLanguageName, locales } from '$lib/i18n';
	import { storedLocale } from '$lib/i18n/localStore';
	import { storedTheme } from '$lib/theme';

	const switchTheme = () => {
		if ($storedTheme === 'wcj-light') {
			$storedTheme = 'wcj-dark';
		} else if ($storedTheme === 'wcj-dark') {
			$storedTheme = '';
		} else {
			$storedTheme = 'wcj-light';
		}
	};
</script>

<div class="navbar sticky top-0 z-1000 bg-base-200">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl" href={resolve('/')}>{$_('profile.name')}</a>
	</div>
	<div class="flex-none gap-2">
		<button
			class="btn btn-ghost"
			popoverTarget="language-menu"
			style="anchor-name: --language-button"
		>
			<TranslateIcon width="24" height="24" />
		</button>
		<ul
			id="language-menu"
			class="dropdown menu z-1 w-40 bg-base-200 rounded-box shadow-sm"
			popover
			style="position-anchor: --language-button"
		>
			{#each locales as lang (lang)}
				<li>
					<button
						class="flex"
						class:font-bold={$locale === lang}
						onclick={() => storedLocale.set(lang)}
					>
						{getLanguageName(lang)}
					</button>
				</li>
			{/each}
		</ul>
		<button class="btn btn-ghost" onclick={switchTheme}>
			{#if $storedTheme === 'wcj-light'}
				<LightModeIcon width="24" height="24" />
			{:else if $storedTheme === 'wcj-dark'}
				<DarkModeIcon width="24" height="24" />
			{:else}
				<LightModeAutoIcon width="24" height="24" />
			{/if}
		</button>
	</div>
</div>
