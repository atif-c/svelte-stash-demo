<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import { themes, type UserSettings } from '$lib/UserSettings';

	let {
		userSettings = $bindable(),
		saveStatus
	}: { userSettings: UserSettings; saveStatus: 'idle' | 'pending' | 'saved' } = $props();
</script>

<Card>
	<h2>User Settings</h2>
	<p>
		Each change writes to <code>Stash.state</code>
		immediately and queues a <strong>debounced save</strong>
		(500ms delay, 2s max-wait) to
		<code>localStorage</code>.
	</p>

	<div class="field">
		<span class="label">Theme</span>
		<div class="theme">
			{#each themes as t (t)}
				<button class:active={userSettings.theme === t} onclick={() => (userSettings.theme = t)}
					>{t}</button
				>
			{/each}
		</div>
	</div>

	<div class="field">
		<label class="label" for="lang">Language</label>
		<select id="lang" class="select" bind:value={userSettings.language}>
			<option value="en">English</option>
			<option value="es">Español</option>
		</select>
	</div>

	<div class="field">
		<span class="label">Notifications</span>
		<label class="switch">
			<input type="checkbox" bind:checked={userSettings.notifications} />
			<span class="track"><span class="thumb"></span></span>
			<span class="switch-label">
				{userSettings.notifications ? 'Enabled' : 'Disabled'}
			</span>
		</label>
	</div>

	<div class="field">
		<span class="label">
			Accent Hue
			<span class="swatch" style="background: var(--accent)"></span>
			<span class="hue-chip">{userSettings.accentHue}&deg;</span>
		</span>
		<input type="range" min="0" max="359" class="range" bind:value={userSettings.accentHue} />
		<div class="hue-strip"></div>
	</div>

	<div class="actions">
		<span
			class="status"
			class:pending={saveStatus === 'pending'}
			class:saved={saveStatus === 'saved'}
		>
			{#if saveStatus === 'idle'}&nbsp;{/if}
			{#if saveStatus === 'pending'}saving&hellip;{/if}
			{#if saveStatus === 'saved'}saved to localStorage{/if}
		</span>
	</div>
</Card>

<style>
	h2 {
		margin-bottom: var(--space-sm);
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);

		margin-bottom: var(--space-xl);

		.label {
			display: flex;
			align-items: center;
			gap: var(--space-sm);

			color: var(--text-secondary);
			font-size: var(--text-sm);
			font-weight: var(--font-medium);

			.swatch {
				flex-shrink: 0;
				display: inline-block;

				height: 0.9rem;
				width: 0.9rem;
				border: var(--border-width) solid var(--border-strong);
				border-radius: var(--radius-full);
				transition: background var(--duration-fast) var(--ease-out);
			}

			.hue-chip {
				border-radius: var(--radius-sm);
				background: var(--accent-alpha);
				padding: 0.1em var(--space-sm);
				color: var(--accent);
				font-family: var(--font-mono);
				font-size: var(--text-xs);
			}
		}

		.theme {
			display: flex;
			gap: var(--space-xs);

			border: var(--border-width) solid var(--border-default);
			border-radius: var(--radius-md);
			background: var(--surface-1);
			padding: var(--space-xs);

			button {
				flex: 1;

				cursor: pointer;
				border: none;
				border-radius: var(--radius-sm);
				background: transparent;
				padding: var(--space-sm) var(--space-lg);
				color: var(--text-secondary);
				font-family: var(--font-sans);
				font-size: var(--text-sm);
				font-weight: var(--font-medium);
				transition: var(--transition-colors);

				&.active {
					background: var(--accent);
					color: var(--surface-1);
				}
			}
		}

		.select {
			cursor: pointer;
			border: var(--border-width) solid var(--border-default);
			border-radius: var(--radius-md);
			background: var(--surface-1);
			padding: var(--space-sm) var(--space-md);
			color: var(--text-primary);
			font-family: var(--font-sans);
			font-size: var(--text-base);
			transition: var(--transition-colors);

			&:focus {
				outline: var(--focus-ring);
				outline-offset: var(--focus-ring-offset);
			}
		}

		.switch {
			display: inline-flex;
			align-items: center;
			gap: var(--space-md);

			cursor: pointer;
			user-select: none;

			input {
				width: 0;
				height: 0;
				position: absolute;
				opacity: 0;
			}

			.track {
				flex-shrink: 0;

				width: 2.75rem;
				height: 1.5rem;
				position: relative;
				border: var(--border-width) solid var(--border-default);
				border-radius: var(--radius-full);
				background: var(--surface-4);
				transition: var(--transition-colors);

				.thumb {
					width: 1.1rem;
					height: 1.1rem;
					position: absolute;
					top: 50%;
					left: 0.2rem;
					border-radius: var(--radius-full);
					background: var(--text-disabled);
					transition: var(--transition);
					transform: translateY(-50%);
				}
			}

			input:checked ~ .track {
				border-color: var(--accent);
				background: var(--accent);

				.thumb {
					left: calc(100% - 1.3rem);
					background: var(--surface-1);
				}
			}

			.switch-label {
				min-width: 4.5rem;
				color: var(--text-secondary);
				font-size: var(--text-sm);
			}
		}

		.range {
			cursor: pointer;
			width: 100%;
			accent-color: var(--accent);
		}

		.hue-strip {
			height: 0.375rem;
			margin-top: calc(var(--space-xs) * -1);
			border-radius: var(--radius-full);
			background: linear-gradient(
				to right,
				oklch(0.65 0.28 0),
				oklch(0.65 0.28 60),
				oklch(0.65 0.28 120),
				oklch(0.65 0.28 180),
				oklch(0.65 0.28 240),
				oklch(0.65 0.28 300),
				oklch(0.65 0.28 359)
			);
		}
	}

	.actions {
		display: flex;
		align-items: center;
		gap: var(--space-sm);

		padding-top: var(--space-lg);

		.status {
			margin-left: auto;
			color: transparent;
			font-family: var(--font-mono);
			font-size: var(--text-xs);
			white-space: nowrap;
			transition: color var(--duration-fast) var(--ease-out);

			&.pending {
				color: var(--warning);
			}

			&.saved {
				color: var(--success);
			}
		}
	}
</style>
