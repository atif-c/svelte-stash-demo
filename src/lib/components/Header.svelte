<script lang="ts">
</script>

<header>
	<div class="inner">
		<h1>svelte-stash</h1>
		<p>Change settings below and watch the two panels eventually sync.</p>
		<p>Confirm in <strong>DevTools &rarr; Storage &rarr; Local Storage</strong>.</p>
		<div class="badges">
			<a href="https://github.com/atif-c/svelte-stash">
				<img
					src="https://img.shields.io/badge/GitHub-atif--c%2Fsvelte--stash-blue?logo=github"
					alt="GitHub Repo"
				/>
			</a>
			<a href="https://npmjs.com/package/svelte-stash">
				<img src="https://img.shields.io/npm/v/svelte-stash?logo=npm" alt="npm Package" />
			</a>
		</div>
	</div>
</header>

<style>
	header {
		border-bottom: var(--border-width) solid var(--border-default);
		padding: var(--space-2xl) var(--space-xl);

		.inner {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-s);

			max-width: var(--container-l);
			margin: 0 auto;

			p {
				max-width: 60ch;
				font-size: var(--text-m);
				color: var(--text-secondary);
			}

			.badges {
				display: flex;
				gap: var(--space-s);
				margin-top: var(--space-s);
			}
		}
	}

	@media (max-width: 780px) {
		header {
			padding: var(--space-xl) var(--space-l);
		}
	}
</style>
