<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Platform from '$lib/components/platforms.svelte';
	import type { platformIcons } from '$lib/components/platforms';
	import MailIcon from '@iconify-svelte/material-symbols/mail';

	let {
		projectName,
		roles,
		bgImage,
		platforms,
		TypeIcon
	}: {
		projectName: string;
		roles?: string[];
		bgImage?: string;
		platforms?: {
			platform: keyof typeof platformIcons;
			url: string;
			tooltip?: string;
		}[];
		TypeIcon?: typeof MailIcon;
	} = $props();
</script>

<div
	class="project-card card bg-base-200"
	class:has-bg={bgImage}
	style={bgImage ? '--bg-image: url(' + bgImage + ')' : ''}
>
	{#if TypeIcon}
		<div class="type-icon">
			<TypeIcon width="24" height="24" />
		</div>
	{/if}
	<div class="card-body p-6 gap-4">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<h2 class="card-title text-2xl font-bold me-3">{@html $_(`projects.${projectName}.title`)}</h2>
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
		{#if platforms && platforms.length > 0}
			<div class="card-actions flex-wrap gap-2">
				{#each platforms as social (social.platform)}
					<Platform platform={social.platform} url={social.url} tooltip={social.tooltip} />
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.project-card {
		position: relative;

		.card-title {
			display: block;
		}
		.card-body {
			position: relative;
			z-index: 1;
		}
		.type-icon {
			position: absolute;
			top: 0.75rem;
			right: 0.75rem;
			z-index: 2;
			opacity: 0.6;
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