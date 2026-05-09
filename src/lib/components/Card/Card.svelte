<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<section>
	{@render children?.()}
</section>

<style>
	section {
		box-shadow: var(--shadow-sm);
		border: var(--border-width) solid var(--border-default);
		border-radius: var(--radius-lg);
		background: var(--surface-2);
		padding: var(--space-xl);
	}
</style>
