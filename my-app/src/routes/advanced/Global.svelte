<script>
	import { slide } from 'svelte/transition';

	let showItems = true;
	let i = 5;
	let items = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
</script>

<label>
	<input type="checkbox" bind:checked={showItems} />
	show list
</label>

<label>
	<input type="range" bind:value={i} max="10" />
</label>

<!-- 可以看到if层，没有缓动动画-->
{#if showItems}
	{#each items.slice(0, i) as item}
  <!-- 只有循环dom时才有缓动动画 -->
  <!-- 加入global，即可为这个组件添加全局缓动 -->
		<div transition:slide|global>
			{item}
		</div>
	{/each}
{/if}

<style>
	div {
		padding: 0.5em 0;
		border-top: 1px solid #eee;
	}
</style>
