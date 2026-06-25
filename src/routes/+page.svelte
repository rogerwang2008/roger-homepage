<script lang="ts">
	import { _, locale } from 'svelte-i18n';

	import Platform from '$lib/components/platforms.svelte';
	import Project from '$lib/components/projects.svelte';

	import FriendLink from './FriendLink.svelte';

	import AnnotShanIcon from '$lib/assets/images/icons/annot-shan.svg'
	import KipMaIcon from '$lib/assets/images/icons/kip-ma.webp'

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

<div class="animate-fade-in-delay-2">
	<section>
		<p class="text-lg">{$_('profile.brief_introduction')}</p>
		<h3 class="my-6">{$_('profile.contact_me')}</h3>
		<div class="flex flex-col gap-2">
			<div class="card-actions flex-wrap gap-2 items-center">
				<Platform
					platform="email"
					url="mailto:wangchujun@hiroger.wang"
					description="wangchujun@hiroger.wang"
				/>
			</div>
			<div class="card-actions flex-wrap gap-2 items-center">
				<Platform
					platform="email"
					url="mailto:rogerwang2008@outlook.com"
					description="rogerwang2008@outlook.com"
				/>
			</div>
			<div class="card-actions flex-wrap gap-2 items-center">
				<Platform
					platform="github"
					url="https://github.com/rogerwang2008"
					description="{$_('platforms.github')}: @rogerwang2008"
				/>
				<Platform
					platform="bilibili"
					url="https://space.bilibili.com/424151176"
					description={$_('platforms.bilibili')}
				/>
				<Platform
					platform="netease_music"
					url="https://music.163.com/#/artist?id=98462179"
					description={$_('platforms.netease_music')}
				/>
				<Platform
					platform="qq_music"
					url="https://y.qq.com/n/ryqq_v2/singer/00070V2k3RxFfm"
					description={$_('platforms.qq_music')}
				/>
			</div>
		</div>
	</section>

	<section>
		<h2 class="mb-9">{$_('projects.title')}</h2>
		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
			<Project projectName="r3d" />
			<Project projectName="homepage" />
			<Project projectName="basic_spam_classifier" />
			<Project projectName="ran_wan" />
			<Project projectName="jiu_tian" />
			<Project projectName="jiu_tian_rhapsody" />
		</div>
	</section>

	<section>
		<h2 class="mb-9">{$_('friendly_links.title')}</h2>
		<div class="flex flex-wrap gap-2">
			<FriendLink
				Icon={AnnotShanIcon}
				bgImage="/friend-links/annot-homepage-bg.webp"
				title={$_('friendly_links.annot')}
				url="http://annot.x-way.work/"
			/>
			<FriendLink
				Icon={KipMaIcon}
				bgImage="/friend-links/kip-website-bg.webp"
				title={$_('friendly_links.kip')}
				url="https://kip.gay"
			/>
		</div>
	</section>
</div>

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
		h2,
		h3 {
			font-weight: bold;
		}
		h2 {
			font-size: var(--text-4xl);
		}
		h3 {
			font-size: var(--text-2xl);
		}
	}
</style>