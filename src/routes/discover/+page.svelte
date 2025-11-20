<script lang="ts">
	import type { PageData } from './$types';
	import SplitCard from '$lib/components/split-card.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { goto } from '$app/navigation';
	import { DIFFICULTY_LEVELS } from '$lib/constants';

	let { data }: { data: PageData } = $props();

	function filterByDifficulty(difficulty: string | null) {
		const url = new URL(window.location.href);
		url.searchParams.set('page', '1');
		if (difficulty) {
			url.searchParams.set('difficulty', difficulty);
		} else {
			url.searchParams.delete('difficulty');
		}
		goto(url.toString(), { keepFocus: true, noScroll: true });
	}

	function loadMore() {
		const url = new URL(window.location.href);
		url.searchParams.set('page', (data.currentPage + 1).toString());
		if (data.appliedFilter) {
			url.searchParams.set('difficulty', data.appliedFilter);
		}
		goto(url.toString(), { keepFocus: true });
	}
</script>

<div class="container mx-auto px-4 py-8">
	<!-- Header Section -->
	<div class="mb-8">
		<div class="mb-2 flex items-center gap-2">
			<Button href="/" variant="ghost" size="sm">← Back to Home</Button>
		</div>
		<h1 class="text-3xl font-bold">Discover Popular Splits</h1>
		<p class="mt-2 text-muted-foreground">
			Browse workout splits created by the community, sorted by popularity
		</p>
	</div>

	<!-- Filter Section -->
	<div class="mb-6 flex items-center justify-between">
		<p class="text-sm text-muted-foreground">
			{#if data.appliedFilter}
				Showing {data.appliedFilter} splits
			{:else}
				Showing all splits
			{/if}
		</p>

		<!-- Difficulty Filter -->
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant="outline">
						{#if data.appliedFilter}
							{data.appliedFilter.charAt(0).toUpperCase() + data.appliedFilter.slice(1)}
						{:else}
							All Difficulties
						{/if}
						<span class="ml-2">▼</span>
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item onclick={() => filterByDifficulty(null)}>
					All Difficulties
				</DropdownMenu.Item>
				{#each DIFFICULTY_LEVELS as difficulty (difficulty)}
					<DropdownMenu.Item onclick={() => filterByDifficulty(difficulty)}>
						{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>

	<!-- Splits Grid -->
	{#if data.popularSplits.length > 0}
		<div class="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.popularSplits as item (item.split.id)}
				<SplitCard
					split={item.split}
					author={item.author}
					likesCount={item.likesCount}
					commentsCount={item.commentsCount}
					isLiked={item.isLiked}
				/>
			{/each}
		</div>

		<!-- Pagination -->
		<div class="flex flex-col items-center gap-4">
			{#if data.hasMore}
				<Button onclick={loadMore} variant="outline" size="lg">Load More Splits</Button>
			{/if}
			<p class="text-sm text-muted-foreground">
				Page {data.currentPage} of {data.totalPages}
			</p>
		</div>
	{:else}
		<div class="rounded-lg border p-12 text-center">
			<p class="text-muted-foreground">
				{#if data.appliedFilter}
					No splits found for {data.appliedFilter} difficulty.
				{:else}
					No public splits available yet. Be the first to create one!
				{/if}
			</p>
			{#if !data.user}
				<Button href="/register" class="mt-4">Sign Up to Create Splits</Button>
			{:else}
				<Button href="/splits/new" class="mt-4">Create Your First Split</Button>
			{/if}
		</div>
	{/if}
</div>
