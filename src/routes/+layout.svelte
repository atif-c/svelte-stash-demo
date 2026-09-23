<script lang="ts">
	import pkg from '../../package.json';

	let { children } = $props();
</script>

<svelte:head>
	<title>{pkg.name}</title>
</svelte:head>

{@render children()}

<style>
	@import '@atifc/css';
	:global(*),
	:global(*)::before,
	:global(*)::after {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: sans-serif;
	}
</style>
