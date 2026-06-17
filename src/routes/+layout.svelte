<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="app flex flex-col min-h-screen">
	<Header />
	<main class="flex-1 flex flex-col w-full">{@render children()}</main>

	<footer class="footer footer-center p-10">
		<aside>
			<p>汪楚钧 Roger Wang</p>
			<p><a href="https://beian.miit.gov.cn/" target="_blank">京 ICP 备 2025110603 号-1</a></p>
		</aside>
	</footer>
</div>

<style>
	/*main {*/
	/*	flex: 1;*/
	/*	display: flex;*/
	/*	flex-direction: column;*/
	/*	padding: 1rem;*/
	/*	width: 100%;*/
	/*	max-width: 64rem;*/
	/*	margin: 0 auto;*/
	/*	box-sizing: border-box;*/
	/*}*/
	/*@media (min-width: 480px) {*/
	/*	footer {*/
	/*		padding: 12px 0;*/
	/*	}*/
	/*}*/
</style>