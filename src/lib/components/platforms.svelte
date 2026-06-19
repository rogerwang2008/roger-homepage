<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Icon from '@iconify/svelte';
	import { platformIcons } from './platforms';

	let {
		platform,
		url,
		size = 36,
		tooltip
	}: {
		platform: keyof typeof platformIcons;
		url: string;
		size?: number;
		tooltip?: string;
	} = $props();

	// svelte-ignore state_referenced_locally
	const icon = platformIcons[platform];
	const isAsset = 'iconAsset' in icon;
	const isComponent = 'iconComponent' in icon;
	// svelte-ignore state_referenced_locally
	const resolvedTooltip = tooltip ?? $_('platforms.' + platform);
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	class="tooltip inline-flex"
	data-tip={resolvedTooltip}
	href={url}
	target="_blank"
	rel="noopener noreferrer"
	aria-label={resolvedTooltip}
>
	<!-- eslint-enable svelte/no-navigation-without-resolve -->
	<span
		class="inline-flex items-center justify-center shrink-0 text-white"
		style="width: {size}px; height: {size}px; background: {icon.color};"
	>
		{#if isAsset}
			<img
				src={icon.iconAsset}
				alt={resolvedTooltip}
				width={size * 0.8}
				class="select-none object-certain"
			/>
		{:else if isComponent}
			{@const Component = icon.iconComponent}
			<Component
				width={String(size * 0.8)}
			/>
		{:else}
			<Icon icon={icon.iconName} width={size * 0.8} />
		{/if}
	</span>
</a>