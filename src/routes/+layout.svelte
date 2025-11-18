<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import ModeToggle from '$lib/components/mode-toggle.svelte';

	let { children } = $props();
</script>

<ModeWatcher />

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="relative min-h-screen h-dvh flex flex-col">
	<header
		class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
	>
		<div class="flex h-14 items-center justify-between px-4 md:px-6">
			<div class="flex items-center gap-2">
				<a href="/" class="flex items-center space-x-2">
					<span class="font-bold">SplitShare</span>
				</a>
			</div>
			<div class="flex items-center gap-2">
				<ModeToggle />
			</div>
		</div>
	</header>

	<main class="flex-1">
		{@render children()}
	</main>
</div>
