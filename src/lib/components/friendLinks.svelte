<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { friendLinks, type FriendLinkConfig } from './friendLinks';
	import { hasTranslation } from '#lib/i18n/index.js';

	let {
		friendLinkName
	}: {
		friendLinkName: keyof typeof import('./friendLinks').friendLinks;
	} = $props();

	// svelte-ignore state_referenced_locally
	const config = friendLinks[friendLinkName] as FriendLinkConfig;
	const hasBgImage = !!config.bgImage;
	const hasBgColor = !!config.bgColor;
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	class="friend-link relative inline-flex gap-2 px-2 py-1 no-underline text-inherit overflow-hidden"
	class:items-start={hasTranslation('friendly_links.' + friendLinkName + '.description')}
	class:items-center={!hasTranslation('friendly_links.' + friendLinkName + '.description')}
	href={config.url}
	target="_blank"
	rel="noopener noreferrer"
	style={config.bgImage
		? '--bg-image: url(' + config.bgImage + ')'
		: config.bgColor
			? '--bg-color: ' + config.bgColor
			: ''}
	class:has-bg-image={hasBgImage}
	class:has-bg-color={hasBgColor}
>
	<!-- eslint-enable svelte/no-navigation-without-resolve -->
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
</a>

<style>
	.friend-link.has-bg-image {
		background-image: var(--bg-image);
		background-size: cover;
		background-position: center;
	}

	.friend-link.has-bg-color {
		background-color: var(--bg-color);
	}

	.friend-link::before,
	.friend-link::before {
		content: '';
		position: absolute;
		inset: 0;
		background-color: color-mix(in oklch, var(--color-base-200) 75%, transparent);
		pointer-events: none;
		z-index: 0;
	}

	.friend-link :global(img),
	.friend-link :global(svg) {
		width: 1.2rem;
		height: 1.2rem;
		flex-shrink: 0;
		position: relative;
		z-index: 1;
	}
</style>
