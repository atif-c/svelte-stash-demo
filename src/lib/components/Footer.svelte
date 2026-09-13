<script lang="ts">
	let { localStorageKey }: { localStorageKey: string } = $props();
</script>

<footer>
	<div class="inner">
		<div class="text">
			<strong>Verify in DevTools</strong>
			<p>
				Press <kbd>F12</kbd> &rarr; <strong>Application</strong>
				tab &rarr; <strong>Local Storage</strong> &rarr; select your origin &rarr; key
				<code>{localStorageKey}</code>. The value updates after each debounced write, not on every
				keystroke.
			</p>
		</div>
		<div class="key">
			<span class="key-label">Storage key</span>
			<code class="key-value">{localStorageKey}</code>
		</div>
	</div>
</footer>

<style>
	footer {
		border-top: var(--border-width) solid var(--border-subtle);
		padding: var(--space-xl);

		.inner {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
			gap: var(--space-l);

			max-width: var(--container-l);
			margin-inline: auto;
			border: var(--border-width) solid var(--info);
			border-radius: var(--radius-l);
			background: var(--info-bg);
			padding: var(--space-l) var(--space-xl);
			color: var(--info);

			.text p {
				font-size: var(--text-s);
				line-height: var(--leading-relaxed);
				opacity: 0.85;

				kbd {
					border: var(--border-width) solid var(--border-default);
					border-radius: var(--radius-s);
					background: var(--surface-3);
					padding: 0.1em 0.4em;
					color: var(--text-primary);
					font-family: var(--font-mono);
					font-size: 0.85em;
				}
			}

			.key {
				flex-shrink: 0;
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: var(--space-xs);

				.key-label {
					font-size: var(--text-xs);
					letter-spacing: var(--tracking-wider);
					text-transform: uppercase;
					opacity: 0.7;
				}

				.key-value {
					border: var(--border-width) solid var(--accent-muted);
					border-radius: var(--radius-m);
					background: var(--surface-2);
					padding: var(--space-xs) var(--space-m);
					color: var(--accent);
					font-family: var(--font-mono);
					font-size: var(--text-s);
					white-space: nowrap;
				}
			}
		}
	}

	@media (max-width: 640px) {
		footer {
			padding: var(--space-l);

			.inner {
				flex-direction: column;
				align-items: flex-start;

				.key {
					align-items: flex-start;
				}
			}
		}
	}
</style>
