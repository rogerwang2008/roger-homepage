<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Icon from '@iconify/svelte';
	import Platform from '$lib/components/platforms.svelte';
	import { projects, projectTypes, type ProjectConfig } from './projects';

	let { projectName }: { projectName: keyof typeof projects } = $props();

	// svelte-ignore state_referenced_locally
	const config: ProjectConfig = projects[projectName];
	// svelte-ignore state_referenced_locally
	const roles = config.roles;
	// svelte-ignore state_referenced_locally
	const bgImage = config.bgImage;
	// svelte-ignore state_referenced_locally
	const platformsList = config.platforms;

	// svelte-ignore state_referenced_locally
	const typeConfig = config.type
		? projectTypes[config.type as keyof typeof projectTypes]
		: undefined;
	// svelte-ignore state_referenced_locally
	const TypeIcon = typeConfig?.icon;
	// svelte-ignore state_referenced_locally
	const SubTypeIcon =
		config.subType && typeConfig
			? (typeConfig.subTypes as Record<string, { icon: typeof typeConfig.icon }>)[config.subType]
					?.icon
			: undefined;
</script>

<div
	class="project-card card bg-base-200 relative overflow-visible"
	class:has-bg={bgImage}
	style={bgImage ? '--bg-image: url(' + bgImage + ')' : ''}
>
	<svg
		class="absolute inset-0 w-full h-full z-3 pointer-events-none border-svg opacity-50"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 1000 600"
		preserveAspectRatio="none"
	>
		<rect class="border-path" x="0" y="0" width="1000" height="600" fill="none" />
	</svg>
	{#if TypeIcon}
		<div class="type-icon absolute top-3 right-3 z-2 opacity-60 flex flex-col items-center gap-1">
			{#if typeof TypeIcon === 'string'}
				<Icon icon={TypeIcon} width="24" height="24" />
			{:else}
				<TypeIcon width="24" height="24" />
			{/if}
			{#if SubTypeIcon}
				{#if typeof SubTypeIcon === 'string'}
					<Icon icon={SubTypeIcon} width="24" height="24" />
				{:else}
					<SubTypeIcon width="24" height="24" />
				{/if}
			{/if}
		</div>
	{/if}
	<div class="card-body p-6 gap-4 relative z-1">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<h2 class="card-title text-2xl font-bold me-3 block">
			{@html $_(`projects.${projectName}.title`)}
		</h2>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<p class="opacity-80">{@html $_(`projects.${projectName}.descriptions`)}</p>
		{#if roles && roles.length > 0}
			<div class="card-actions flex-wrap gap-2">
				{#each roles as role (role)}
					<div
						class="badge"
						class:badge-outline={role !== 'independent_project'}
						class:bg-base-content={role === 'independent_project'}
						class:text-base-100={role === 'independent_project'}
						class:opacity-60={role === 'independent_project'}
						class:font-bold={role === 'independent_project'}
					>
						{$_(`profile.roles.${role}`)}
					</div>
				{/each}
			</div>
		{/if}
		{#if platformsList && platformsList.length > 0}
			<div class="card-actions flex-wrap gap-2">
				{#each platformsList as social (social.platform)}
					<Platform platform={social.platform} url={social.url} tooltip={social.tooltip} />
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.project-card {
		.border-path {
			stroke: var(--color-base-content);
			stroke-width: 2;
			stroke-linejoin: miter;
			stroke-dasharray: 3200;
			stroke-dashoffset: 3200;
			vector-effect: non-scaling-stroke;
			animation: border-clockwise-reverse 0.6s ease forwards;
		}
	}

	.project-card:hover .border-path {
		animation: border-clockwise 0.6s ease forwards;
	}

	@keyframes border-clockwise {
		from {
			stroke-dashoffset: 3200;
		}
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes border-clockwise-reverse {
		from {
			stroke-dashoffset: 0;
		}
		to {
			stroke-dashoffset: -3200;
		}
	}

	.project-card.has-bg {
		background-image: var(--bg-image);
		background-size: cover;
		background-position: center;
	}

	.project-card.has-bg::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			var(--color-base-200) 0%,
			color-mix(in oklch, var(--color-base-200) 85%, transparent) 40%,
			color-mix(in oklch, var(--color-base-200) 45%, transparent) 100%
		);
		pointer-events: none;
	}
</style>