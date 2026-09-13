<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, grow = false }: { children?: Snippet; grow?: boolean } = $props();
</script>

<section class:grow>
	{@render children?.()}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: var(--space-m);
		box-shadow: var(--shadow-s);
		border: var(--border-width) solid var(--border-default);
		border-radius: var(--radius-l);
		background: var(--surface-2);
		padding: var(--space-xl);

		&.grow {
			flex: 1;
		}
	}
</style>
