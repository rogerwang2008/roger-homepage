<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { hasTranslation } from '#lib/i18n/index.js';

	let {
		href,
		children,
		/** Dialog id under `confirm.dialogs`; resolves title/message/buttons from i18n. */
		dialog,
		title,
		message,
		confirmText,
		cancelText,
		target = '_blank',
		rel = 'noopener noreferrer',
		...rest
	}: HTMLAnchorAttributes & {
		children: Snippet;
		dialog?: string;
		title?: string;
		message?: string;
		confirmText?: string;
		cancelText?: string;
	} = $props();

	// Unique id/anchor per instance so multiple confirm links never collide.
	let popoverEl = $state<HTMLElement>();
	const uid = Math.random().toString(36).slice(2, 9);
	const anchorName = `--confirm-${uid}`;
	const popoverId = `confirm-${uid}`;

	// Resolve text from the dialog id, falling back to shared action labels.
	// Missing dialog keys also fall back, so a dialog only overrides what it needs.
	// Explicit props always win, keeping the component usable standalone.
	const base = $derived(dialog ? `confirm.dialogs.${dialog}` : null);
	const key = (k: string) => (base ? `${base}.${k}` : null);
	const resolvedTitle = $derived(
		title ?? (key('title') && hasTranslation(key('title')!) ? $_(key('title')!) : '')
	);
	const resolvedMessage = $derived(
		message ?? (key('message') && hasTranslation(key('message')!) ? $_(key('message')!) : '')
	);
	const resolvedConfirm = $derived(
		confirmText ??
			(key('proceed') && hasTranslation(key('proceed')!)
				? $_(key('proceed')!)
				: $_('confirm.actions.proceed'))
	);
	const resolvedCancel = $derived(
		cancelText ??
			(key('cancel') && hasTranslation(key('cancel')!)
				? $_(key('cancel')!)
				: $_('confirm.actions.cancel'))
	);

	function toggle() {
		if (popoverEl?.matches(':popover-open')) {
			popoverEl.hidePopover();
		} else {
			popoverEl?.showPopover();
		}
	}

	function proceed() {
		popoverEl?.hidePopover();
		window.open(href ?? '', target ?? '_blank', rel ?? 'noopener noreferrer');
	}
</script>

<a
	{...rest}
	{href}
	{target}
	{rel}
	style:anchor-name={anchorName}
	onclick={(e) => {
		e.preventDefault();
		toggle();
	}}
>
	{@render children()}
</a>

<div
	class="dropdown"
	popover
	id={popoverId}
	bind:this={popoverEl}
	style:position-anchor={anchorName}
>
	<div
		class="alert alert-warning alert-soft w-72 shadow-lg"
		role="alertdialog"
		aria-label={resolvedTitle || resolvedMessage}
	>
		<div class="flex w-full flex-col gap-3">
			<div class="text-start">
				{#if resolvedTitle}
					<h3 class="font-bold">{resolvedTitle}</h3>
				{/if}
				<p class="text-sm {resolvedTitle ? 'mt-1' : ''}">{resolvedMessage}</p>
			</div>
			<div class="card-actions justify-end gap-2">
				<button class="btn btn-ghost btn-sm" onclick={() => popoverEl?.hidePopover()}>
					{resolvedCancel}
				</button>
				<button class="btn btn-primary btn-sm" onclick={proceed}>{resolvedConfirm}</button>
			</div>
		</div>
	</div>
</div>
