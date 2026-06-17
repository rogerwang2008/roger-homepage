<script lang="ts">
	import { _, locale } from 'svelte-i18n';

	const bgImage = '/three-plush-toys.webp';
	let imageAspectRatio = $state('3693 / 3072');
	let heroEl = $state<HTMLDivElement>();
	let imageOverflows = $state(false);

	$effect(() => {
		const img = new Image();
		img.onload = () => {
			imageAspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
		};
		img.src = bgImage;

		return () => {
			img.onload = null;
		};
	});

	$effect(() => {
		const el = heroEl;
		if (!el) return;

		const [w, h] = imageAspectRatio.split(' / ').map(Number);
		const ratio = w / h;

		const observer = new ResizeObserver(() => {
			const { width, height } = el.getBoundingClientRect();
			imageOverflows = height * ratio > width;
		});

		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>{$_('title')}</title>
	<meta name="description" content="Roger Wang's Homepage" />
</svelte:head>

<div
	class="title-hero hero py-30"
	class:overflow={imageOverflows}
	bind:this={heroEl}
	style="--img-ratio: {imageAspectRatio}; --bg-image: url({bgImage})"
>
	<div class="hero-content flex-col max-w-5xl w-full items-start px-6">
		<p class="sm:text-6xl text-4xl font-bold opacity-60">{$_('index.greeting')}</p>
		<h1 class="sm:text-9xl text-7xl font-extrabold mx-8 my-4">{$_('profile.name')}</h1>
		{#if !($locale && $locale.startsWith('zh'))}
			<p class="sm:text-6xl text-4xl font-extrabold opacity-80 mx-16">汪楚钧</p>
		{/if}
	</div>
</div>

<style>
	.title-hero {
		position: relative;
		overflow: hidden;
	}

	.title-hero::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: var(--bg-image) no-repeat right center / auto 100%;
		opacity: 0.5;
		pointer-events: none;
	}

	.title-hero::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		aspect-ratio: var(--img-ratio, 3693 / 3072);
		background: linear-gradient(to right, var(--color-base-100), transparent);
		pointer-events: none;
	}

	.title-hero.overflow::before {
		background-position: center center;
	}

	.title-hero.overflow::after {
		right: auto;
		left: 50%;
		transform: translateX(-50%);
	}

	.title-hero > :global(.hero-content) {
		position: relative;
		z-index: 1;
	}
</style>