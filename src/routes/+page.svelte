<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import Project from './Project.svelte';

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

<section class="w-full max-w-7xl mx-auto px-6 py-12">
	<h2 class="text-3xl font-bold mb-6">{$_('projects.title')}</h2>
	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
		<Project
			projectName="r3d"
			roles={['backend_engineering_lead', 'frontend_engineering_lead']}
			bgImage="/projects/r3d-bg.webp"
			typeIcon="material-symbols:code"
			platforms={[
				{platform: 'official_website', url: 'https://r3d.x-way.work'},
				{platform: 'github', url: 'https://github.com/RDFZ3D'},
				{platform: 'gitee', url: 'https://gitee.com/RDFZ3D'},
			]}
		/>
		<Project
			projectName="basic_spam_classifier"
			roles={['independent_project']}
			typeIcon="material-symbols:code"
			platforms={[
				{platform: 'github', url: 'https://github.com/rogerwang2008/bayes-spam-filter'},
			]}
		/>
		<Project
			projectName="ran_wan"
			roles={['composer']}
			bgImage="/projects/ran_wan_bg.jpg"
			typeIcon="material-symbols:music-note-2"
			platforms={[
				{platform: 'netease_music', url: 'https://music.163.com/#/album?id=272340040'},
				{platform: 'qq_music', url: 'https://y.qq.com/n/ryqq_v2/albumDetail/00119Qfy23sDyw'},
			]}
		/>
		<Project
			projectName="jiu_tian"
			roles={['composer']}
			bgImage="/projects/jiu_tian_bg.webp"
			typeIcon="material-symbols:music-note-2"
			platforms={[
				{platform: 'netease_music', url: 'https://music.163.com/#/album?id=260108878'},
				{platform: 'qq_music', url: 'https://y.qq.com/n/ryqq_v2/albumDetail/002Fl7l82KtE1O'},
			]}
		/>
		<Project
			projectName="jiu_tian_rhapsody"
			roles={['independent_project']}
			bgImage="/projects/jiu_tian_rhapsody_bg.webp"
			typeIcon="material-symbols:music-note-2"
			platforms={[
				{platform: 'netease_music', url: 'https://music.163.com/song?id=2705681311'},
				{platform: 'qq_music', url: 'https://y.qq.com/n/ryqq_v2/songDetail/001WcVUs4LeXSd'},
			]}
		/>
	</div>
</section>

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