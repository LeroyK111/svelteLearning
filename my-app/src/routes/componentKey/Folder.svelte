<script>
	import File from './File.svelte';

	// 展开默认值关闭
	export let expanded = false;
	export let name;
	export let files;

	function toggle() {
		expanded = !expanded;
	}
</script>

<button class:expanded on:click={toggle}>{name}</button>

{#if expanded}
	<ul>
		{#each files as file}
			<li>
				{#if file.files}
					<!-- <Folder {...file}/> -->
					<!-- 自己复用自己的组件，则我们可以这样做，自我递归组件 -->
					<svelte:self {...file} />
				{:else}
					<File {...file} />
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style>
	button {
		padding: 0 0 0 1.5em;
		background: url(/tutorial/icons/folder.svg) 0 0.1em no-repeat;
		background-size: 1em 1em;
		color: var(--fg-1);
		font-weight: bold;
		cursor: pointer;
		border: none;
		margin: 0;
	}

	.expanded {
		background-image: url(/tutorial/icons/folder-open.svg);
	}

	ul {
		padding: 0.2em 0 0 0.5em;
		margin: 0 0 0 0.5em;
		list-style: none;
		border-left: 1px solid rgba(128, 128, 128, 0.4);
	}

	li {
		padding: 0.2em 0;
	}
</style>
