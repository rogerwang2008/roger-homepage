<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { resolve } from '$app/paths';
	import Icon from '@iconify/svelte';
	import { getLanguageName, locales } from '$lib/i18n';
	import { currentLocale } from '$lib/i18n/localStore';

	function selectLanguage(lang: string) {
		currentLocale.set(lang);
	}
</script>

<div class="navbar">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl" href={resolve('/')}>{$_('profile.name')}</a>
	</div>
	<div class="flex-none gap-2">
		<button
			class="btn btn-ghost"
			popoverTarget="language-menu"
			style="anchor-name: --language-button"
		>
			<Icon icon="mdi:translate" width="20" height="20" />
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
						onclick={() => selectLanguage(lang)}
					>
						{getLanguageName(lang)}
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>