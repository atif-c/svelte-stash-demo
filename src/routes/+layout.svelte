<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>svelte-stash demo</title>
</svelte:head>

{@render children()}
