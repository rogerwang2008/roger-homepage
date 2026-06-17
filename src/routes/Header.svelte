<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { type Persisted, persisted } from 'svelte-persisted-store';
	import { resolve } from '$app/paths';
	import Icon from '@iconify/svelte';
	import { getLanguageName, locales } from '$lib/i18n';
	import { storedLocale } from '$lib/i18n/localStore';
	import { onMount } from 'svelte';

	const storedTheme: Persisted<'light' | 'dark' | ''> = persisted('theme', '');
	const switchTheme = () => {
		if ($storedTheme === 'light') {
			$storedTheme = 'dark';
		} else if ($storedTheme === 'dark') {
			$storedTheme = '';
		} else {
			$storedTheme = 'light';
		}
	};

	onMount(() => {
		storedTheme.subscribe((theme) => {
			document.body.setAttribute('data-theme', theme);
		});
	});
</script>

<div class="navbar sticky top-0 z-1000 bg-base-100">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl" href={resolve('/')}>{$_('profile.name')}</a>
	</div>
	<div class="flex-none gap-2">
		<button
			class="btn btn-ghost"
			popoverTarget="language-menu"
			style="anchor-name: --language-button"
		>
			<Icon icon="material-symbols:translate" width="24" height="24" />
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
			<Icon
				icon="material-symbols:{$storedTheme ? `${$storedTheme}-mode` : 'light-mode-auto'}"
				width="24"
				height="24"
			/>
			<span aria-hidden="true" style="display:none">
				<Icon icon="material-symbols:light-mode" width="24" height="24" />
				<Icon icon="material-symbols:dark-mode" width="24" height="24" />
				<Icon icon="material-symbols:light-mode-auto" width="24" height="24" />
			</span>
		</button>
	</div>
</div>