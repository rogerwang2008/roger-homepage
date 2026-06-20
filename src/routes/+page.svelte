<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import Project from './Project.svelte';
	import Platform from '$lib/components/platforms.svelte';

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
	<title>{$_('index.title')}</title>
	<meta name="description" content="Roger Wang's Homepage" />
</svelte:head>

<div
	class="title-hero hero py-30 bg-base-200"
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

<section>
	<p class="text-lg">{$_('profile.brief_introduction')}</p>
	<h3 class="text-2xl font-bold my-6">{$_('profile.contact_me')}</h3>
	<div class="flex flex-col gap-2">
		<div class="card-actions flex-wrap gap-2 items-center">
			<Platform platform="email" url="mailto:wangchujun@hiroger.wang" description="wangchujun@hiroger.wang" />
		</div>
		<div class="card-actions flex-wrap gap-2 items-center">
			<Platform platform="email" url="mailto:rogerwang2008@outlook.com" description="rogerwang2008@outlook.com" />
		</div>
		<div class="card-actions flex-wrap gap-2 items-center">
			<Platform platform="github" url="https://github.com/rogerwang2008" description="{$_('platforms.github')}: @rogerwang2008" />
			<Platform platform="bilibili" url="https://space.bilibili.com/424151176" description={$_('platforms.bilibili')} />
			<Platform platform="netease_music" url="https://music.163.com/#/artist?id=98462179" description={$_('platforms.netease_music')} />
			<Platform platform="qq_music" url="https://y.qq.com/n/ryqq_v2/singer/00070V2k3RxFfm" description={$_('platforms.qq_music')} />
		</div>
	</div>
</section>

<section>
	<h2 class="text-4xl font-bold mb-9">{$_('projects.title')}</h2>
	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
		<Project
			projectName="r3d"
			roles={['backend_engineering_lead', 'frontend_engineering_lead']}
			bgImage="/projects/r3d-bg.webp"
			typeIcon="material-symbols:code"
			platforms={[
				{ platform: 'official_website', url: 'https://r3d.x-way.work' },
				{ platform: 'github', url: 'https://github.com/RDFZ3D' },
				{ platform: 'gitee', url: 'https://gitee.com/RDFZ3D' }
			]}
		/>
		<Project
			projectName="homepage"
			roles={['independent_project']}
			bgImage="/three-plush-toys.webp"
			typeIcon="material-symbols:code"
			platforms={[
				{ platform: 'official_website', url: '/' },
				{ platform: 'github', url: 'https://github.com/rogerwang2008/roger-homepage' }
			]}
		/>
		<Project
			projectName="basic_spam_classifier"
			roles={['independent_project']}
			typeIcon="material-symbols:code"
			platforms={[
				{ platform: 'github', url: 'https://github.com/rogerwang2008/bayes-spam-filter' }
			]}
		/>
		<Project
			projectName="ran_wan"
			roles={['composer']}
			bgImage="/projects/ran_wan_bg.jpg"
			typeIcon="material-symbols:music-note-2"
			platforms={[
				{ platform: 'netease_music', url: 'https://music.163.com/#/album?id=272340040' },
				{ platform: 'qq_music', url: 'https://y.qq.com/n/ryqq_v2/albumDetail/00119Qfy23sDyw' }
			]}
		/>
		<Project
			projectName="jiu_tian"
			roles={['composer']}
			bgImage="/projects/jiu_tian_bg.webp"
			typeIcon="material-symbols:music-note-2"
			platforms={[
				{ platform: 'netease_music', url: 'https://music.163.com/#/album?id=260108878' },
				{ platform: 'qq_music', url: 'https://y.qq.com/n/ryqq_v2/albumDetail/002Fl7l82KtE1O' }
			]}
		/>
		<Project
			projectName="jiu_tian_rhapsody"
			roles={['independent_project']}
			bgImage="/projects/jiu_tian_rhapsody_bg.webp"
			typeIcon="material-symbols:music-note-2"
			platforms={[
				{ platform: 'netease_music', url: 'https://music.163.com/song?id=2705681311' },
				{ platform: 'qq_music', url: 'https://y.qq.com/n/ryqq_v2/songDetail/001WcVUs4LeXSd' }
			]}
		/>
	</div>
</section>

<style>
	.title-hero {
		position: relative;
		overflow: hidden;
		&::before {
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
		&::after {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			height: 100%;
			aspect-ratio: var(--img-ratio, 3693 / 3072);
			background: linear-gradient(to right, var(--color-base-200), transparent);
			pointer-events: none;
		}
		&.overflow {
			&::before {
				background-position: center center;
			}
			&::after {
				right: auto;
				left: 50%;
				transform: translateX(-50%);
			}
		}
		& > .hero-content {
			position: relative;
			z-index: 1;
		}
	}

	section {
		width: 100%;
		max-width: var(--container-7xl);
		margin: 0 auto;
		padding: calc(var(--spacing) * 9) calc(var(--spacing) * 6);
	}
</style>
