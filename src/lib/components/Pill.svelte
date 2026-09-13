<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		theme = 'plain'
	}: { children?: Snippet; theme?: 'plain' | 'accent' | 'success' | 'warning' | 'error' | 'info' } =
		$props();
</script>

<span class={theme}>{@render children?.()}</span>

<style>
	span {
		border: var(--border-width) solid;
		border-radius: var(--radius-full);
		padding: 0.15em var(--space-s);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: var(--font-medium);
		white-space: nowrap;

		&.accent {
			border-color: var(--accent-muted);
			background: var(--accent-alpha);
			color: var(--accent);
		}

		&.success {
			border-color: var(--success);
			background: var(--success-bg);
			color: var(--success);
		}

		&.warning {
			border-color: var(--warning);
			background: var(--warning-bg);
			color: var(--warning);
		}

		&.error {
			border-color: var(--error);
			background: var(--error-bg);
			color: var(--error);
		}

		&.info {
			border-color: var(--info);
			background: var(--info-bg);
			color: var(--info);
		}
	}
</style>
