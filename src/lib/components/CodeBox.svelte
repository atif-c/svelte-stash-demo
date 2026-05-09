<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<pre> {@render children?.()} </pre>

<style>
	pre {
		border: var(--border-width) solid var(--border-subtle);
		border-radius: var(--radius-md);
		background: var(--surface-1);
		padding: var(--space-md);
		color: var(--text-secondary);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
	}
</style>
