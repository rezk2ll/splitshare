<script lang="ts">
	import { Tipex } from '@friendofsvelte/tipex';
	import type { TipexEditor } from '@friendofsvelte/tipex';
	import '@friendofsvelte/tipex/styles/index.css';
	import { cn } from '$lib/utils.js';

	interface Props {
		value?: string;
		class?: string;
		minHeight?: string;
		floating?: boolean;
		focal?: boolean;
		onUpdate?: (html: string) => void;
	}

	let {
		value = $bindable(''),
		class: className,
		minHeight = '120px',
		floating = true,
		focal = true,
		onUpdate
	}: Props = $props();

	let editor = $state<TipexEditor | undefined>(undefined);

	// Update value when editor content changes
	$effect(() => {
		if (editor) {
			const updateHandler = () => {
				const html = editor?.getHTML() || '';
				if (onUpdate) {
					onUpdate(html);
				}
			};
			editor.on('update', updateHandler);
			return () => {
				editor?.off('update', updateHandler);
			};
		}
	});
</script>

<div class={cn('rounded-lg border-2 border-muted bg-background/50', className)}>
	<Tipex
		body={value}
		{floating}
		{focal}
		bind:tipex={editor}
		style="min-height: {minHeight};"
		class="prose prose-sm max-w-none p-4 focus:outline-none"
	/>
</div>
