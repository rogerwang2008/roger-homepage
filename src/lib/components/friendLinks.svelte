<script lang="ts">
	import { _ } from 'svelte-i18n';
	import ConfirmLink from './ConfirmLink.svelte';
	import { friendLinks, type FriendLinkConfig } from './friendLinks';
	import { hasTranslation } from '#lib/i18n/index.js';

	let {
		friendLinkName
	}: {
		friendLinkName: keyof typeof friendLinks;
	} = $props();

	// svelte-ignore state_referenced_locally
	const config = friendLinks[friendLinkName] as FriendLinkConfig;

	// svelte-ignore state_referenced_locally
	const linkClass = [
		'relative inline-flex gap-2 px-2 py-1 no-underline text-inherit overflow-hidden',
		hasTranslation('friendly_links.' + friendLinkName + '.description')
			? 'items-start'
			: 'items-center'
	].join(' ');

	const linkStyle = config.bgImage
		? '--bg-image: url(' + config.bgImage + ')'
		: config.bgColor
			? '--bg-color: ' + config.bgColor
			: '';
</script>

{#snippet linkInner()}
	<span class="bg"></span>
	{#if config.icon}
		<img
			src={config.icon}
			alt={$_(`friendly_links.${friendLinkName}.title`)}
			width="16"
			height="16"
			class="my-1"
		/>
	{/if}
	<span class="text-content relative z-1 flex flex-col">
		<span class="title whitespace-nowrap">{$_(`friendly_links.${friendLinkName}.title`)}</span>
		{#if hasTranslation('friendly_links.' + friendLinkName + '.description')}
			<span class="description text-sm opacity-60">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html $_(`friendly_links.${friendLinkName}.description`)}
			</span>
		{/if}
	</span>
{/snippet}

{#if config.confirm}
	<!-- eslint-disable svelte/no-navigation-without-resolve -->
	<ConfirmLink href={config.url} class={linkClass} style={linkStyle} dialog={config.confirm}>
		{@render linkInner()}
	</ConfirmLink>
	<!-- eslint-enable svelte/no-navigation-without-resolve -->
{:else}
	<!-- eslint-disable svelte/no-navigation-without-resolve -->
	<a
		href={config.url}
		class={linkClass}
		style={linkStyle}
		target="_blank"
		rel="noopener noreferrer"
	>
		{@render linkInner()}
	</a>
	<!-- eslint-enable svelte/no-navigation-without-resolve -->
{/if}

<style>
	.bg {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		background-image: var(--bg-image);
		background-size: cover;
		background-position: center;
		background-color: var(--bg-color);
	}

	.bg::after {
		content: '';
		position: absolute;
		inset: 0;
		background-color: color-mix(in oklch, var(--color-base-200) 75%, transparent);
	}

	img {
		width: 1.2rem;
		height: 1.2rem;
		flex-shrink: 0;
		position: relative;
		z-index: 1;
	}
</style>
