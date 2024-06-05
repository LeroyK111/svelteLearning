<script lang="ts">
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	// 有必要添加动画
	import { flip } from 'svelte/animate';
	// 为dom元素添加了进入和出去的动画
	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
				transform: ${transform} scale(${t});
				opacity: ${t}
			`
			};
		}
	});

	export let store;
	export let done;
</script>

<ul class="todos">
	{#each $store.filter((todo: any) => todo.done === done) as todo (todo.id)}
		<li class:done in:receive={{ key: todo.id }} out:send={{ key: todo.id }} animate:flip={{ duration: 200 }}>
			<label>
				<input
					type="checkbox"
					checked={todo.done}
					on:change={(e) => store.mark(todo, e.currentTarget.checked)}
				/>

				<span>{todo.description}</span>

				<button on:click={() => store.remove(todo)} aria-label="Remove">删除</button>
			</label>
		</li>
	{/each}
</ul>

<style>
	label {
		width: 100%;
		height: 100%;
		display: flex;
	}

	span {
		flex: 1;
	}
</style>
