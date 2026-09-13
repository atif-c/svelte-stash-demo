<script lang="ts">
	import InMemoryStateCard from '$lib/components/Card/InMemoryStateCard.svelte';
	import PersistedStateCard from '$lib/components/Card/PersistedStateCard.svelte';
	import UserSettingsCard from '$lib/components/Card/UserSettingsCard.svelte';
	import CodeBox from '$lib/components/CodeBox.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { defaultUserSettings, type UserSettings } from '$lib/UserSettings';
	import { onDestroy, onMount } from 'svelte';
	import { Stash } from 'svelte-stash';

	const localStorageKey = 'userSettings';
	let saveStatus = $state<'idle' | 'pending' | 'saved'>('idle');
	let saveTimer: ReturnType<typeof setTimeout>;

	// Create a stash
	const settings = new Stash<UserSettings>(
		// Load callback
		async () => {
			const saved = localStorage.getItem('userSettings');
			return saved ? JSON.parse(saved) : defaultUserSettings;
		},

		// Save Callback
		async data => {
			saveStatus = 'pending';
			localStorage.setItem(localStorageKey, JSON.stringify(data));
			saveStatus = 'saved';

			persistedState = data;
			saveTimer = setTimeout(() => (saveStatus = 'idle'), 1500);
		},

		{ delay: 500, maxWait: 2000 }
	);

	let inMemoryState: UserSettings | undefined = $derived(settings.state);
	let persistedState: UserSettings | undefined = $state();

	// autosave stash
	$effect(() => {
		JSON.stringify(settings.state);
		settings.save();
	});

	onMount(async () => {
		await settings.load();
	});

	onDestroy(() => {
		clearTimeout(saveTimer);
		settings.flush();
		settings.destroy();
	});

	$effect(() => {
		if (!settings.state) return;

		document.documentElement.setAttribute('data-theme', settings.state.theme);
		document.documentElement.style.setProperty(
			'--theme-accent-hue',
			String(settings.state.accentHue)
		);
	});
</script>

<div class="page">
	<Header />

	{#if settings.state && inMemoryState && persistedState}
		<main>
			<UserSettingsCard bind:userSettings={settings.state} {saveStatus} />
			<div class="right-panel">
				<InMemoryStateCard {inMemoryState} />
				<PersistedStateCard {persistedState} />
			</div>
		</main>

		<Footer {localStorageKey} />
	{:else}
		<div class="loading-state">
			<CodeBox>{JSON.stringify(settings.state)}</CodeBox>
			<CodeBox>{JSON.stringify(inMemoryState)}</CodeBox>
			<CodeBox>{JSON.stringify(persistedState)}</CodeBox>
			<div class="loading">Loading state&hellip;</div>
		</div>
	{/if}
</div>

<style>
	:global {
		h1 {
			font-size: var(--text-2xl);
			font-weight: var(--font-bold);
		}

		h2 {
			font-size: var(--text-l);
			font-weight: var(--font-semibold);
		}
		p {
			color: var(--text-secondary);
			font-size: var(--text-s);

			line-height: var(--leading-relaxed);
		}
		code {
			border-radius: var(--radius-s);
			background: var(--accent-alpha);
			font-family: var(--font-mono);
			font-size: 0.9em;
			color: var(--accent);
			padding: 0.1em 0.35em;
		}
	}
	.page {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background: var(--surface-1);
		color: var(--text-primary);
		font-family: var(--font-sans);
		font-size: var(--text-base);
		line-height: var(--leading-normal);
		transition:
			background-color var(--duration-slow) var(--ease-out),
			color var(--duration-slow) var(--ease-out);
	}
	main {
		flex: 1;
		width: 100%;
		max-width: var(--container-l);
		margin-inline: auto;
		padding: var(--space-3xl) var(--space-xl);
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: var(--space-xl);
		align-items: stretch;
		.right-panel {
			display: flex;
			flex-direction: column;
			gap: var(--space-xl);
		}
	}

	@media (max-width: 780px) {
		main {
			grid-template-columns: 1fr;
			padding: var(--space-2xl) var(--space-l);
		}
	}

	.loading-state {
		display: flex;
		flex-direction: column;
		gap: var(--space-s);
		width: 100%;
		max-width: var(--container-fluid-s);
		margin-inline: auto;
		padding: var(--space-2xl) var(--space-l);

		.loading {
			text-align: center;
			padding: var(--space-l);
			color: var(--text-tertiary);
			font-size: var(--text-s);
		}
	}
</style>
