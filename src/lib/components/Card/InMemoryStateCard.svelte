<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import CodeBox from '$lib/components/CodeBox.svelte';
	import Pill from '$lib/components/Pill.svelte';
	import type { UserSettings } from '$lib/UserSettings';

	let { inMemoryState }: { inMemoryState: UserSettings } = $props();
</script>

<Card>
	<div class="header">
		<h2>In-Memory State</h2>
		<Pill theme="accent">live</Pill>
	</div>
	<p>
		Direct read of the <code>$state</code> proxy on
		<code>Stash.state</code>. Updates on every change.
	</p>
	<CodeBox>{JSON.stringify(inMemoryState, null, 2)}</CodeBox>
</Card>

<style>
	.header {
		display: flex;
		align-items: center;
		gap: var(--space-sm);

		margin-bottom: var(--space-xs);
	}
</style>
