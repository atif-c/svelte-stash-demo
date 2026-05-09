<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import CodeBox from '$lib/components/CodeBox.svelte';
	import Pill from '$lib/components/Pill.svelte';
	import type { UserSettings } from '$lib/UserSettings';

	let { persistedState }: { persistedState: UserSettings } = $props();
</script>

<Card>
	<div class="header">
		<h2>Persisted State</h2>
		<Pill theme="success">localStorage</Pill>
	</div>
	<p>
		Written by <code>saveCallback</code> after the debounce settles. Lags behind in-memory state by up
		to 500ms.
	</p>
	<CodeBox>{JSON.stringify(persistedState, null, 2)}</CodeBox>
</Card>

<style>
	.header {
		display: flex;
		align-items: center;
		gap: var(--space-sm);

		margin-bottom: var(--space-xs);
	}
</style>
