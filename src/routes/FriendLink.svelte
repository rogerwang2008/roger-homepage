<script lang="ts">
	import type { Component } from 'svelte';

	let {
		bgImage,
		Icon,
		title,
		url
	}: {
		Icon: Component<{ width?: string; height?: string }> | string;
		title: string;
		url: string;
		bgImage?: string;
	} = $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	class="friend-link relative inline-flex items-center gap-1.5 px-2 py-1 no-underline text-inherit overflow-hidden"
	href={url}
	target="_blank"
	rel="noopener noreferrer"
	style={bgImage ? '--bg-image: url(' + bgImage + ')' : ''}
	class:has-bg={bgImage}
>
	<!-- eslint-enable svelte/no-navigation-without-resolve -->
	{#if typeof Icon === 'string'}
		<img src={Icon} alt={title} width="16" height="16" />
	{:else}
		<Icon width="16" height="16" />
	{/if}
	<span class="title relative z-1 whitespace-nowrap">{title}</span>
</a>

<style>
	.friend-link.has-bg {
		background-image: var(--bg-image);
		background-size: cover;
		background-position: center;
	}

	.friend-link.has-bg::before {
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
