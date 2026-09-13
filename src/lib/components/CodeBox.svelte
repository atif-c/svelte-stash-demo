<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, grow = false }: { children?: Snippet; grow?: boolean } = $props();
</script>

<pre class:grow> {@render children?.()} </pre>

<style>
	pre {
		overflow-x: auto;
		border: var(--border-width) solid var(--border-subtle);
		border-radius: var(--radius-m);
		background: var(--surface-1);
		padding: var(--space-m);
		color: var(--text-secondary);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		line-height: var(--leading-relaxed);

		&.grow {
			flex: 1;
		}
	}
</style>
