<script lang="ts">
	import { tick } from 'svelte';

	let items: string[] | [] = [];
	let inputElement: HTMLInputElement;

	async function addItem() {
		items = [...items, `Item ${items.length + 1}`];
		// await tick(); 等待dom更新后，再做其他操作
		await tick();
    // 每次有新dom生成，则自动聚焦与input输入栏
		inputElement.focus();
	}
</script>

<input bind:this={inputElement} placeholder="Type something..." />
<button on:click={addItem}>Add Item</button>
<ul>
	{#each items as item}
		<li>{item}</li>
	{/each}
</ul>
