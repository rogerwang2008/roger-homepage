<script lang="ts">
	import { _, locale } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_('title')}</title>
	<meta name="description" content="Roger Wang's Homepage" />
</svelte:head>

<div class="hero py-30">
	<div class="hero-content flex-col max-w-4xl w-full items-start px-6">
		<p class="text-6xl font-bold opacity-60">{$_('index.greeting')}</p>
		<h1 class="text-9xl font-extrabold ms-8">{$_('profile.name')}</h1>
		{#if !($locale && $locale.startsWith('zh'))}
			<p class="text-6xl font-extrabold opacity-80 ms-16">汪楚钧</p>
		{/if}
	</div>
</div>
