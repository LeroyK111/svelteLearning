<!-- 使用svelte:options, 可以确保组件复用时，只有对应组件才会更新 -->
<svelte:options immutable accessors={false} namespace={undefined} customElement={'sss'}/>

<script>
	import { afterUpdate } from 'svelte';

	function flash(element) {
		requestAnimationFrame(() => {
			element.style.transition = 'none';
			element.style.color = 'rgba(255,62,0,1)';
			element.style.backgroundColor = 'rgba(255,62,0,0.2)';

			setTimeout(() => {
				element.style.transition = 'color 1s, background 1s';
				element.style.color = '';
				element.style.backgroundColor = '';
			});
		});
	}

	export let todo;

	let element;

	afterUpdate(() => {
    // 只要todo被更新了，就会触发全局afterUpdate
		flash(element);
	});
</script>

<li bind:this={element}>
	<label>
		<input type="checkbox" checked={todo.done} on:change />
		{todo.text}
	</label>
</li>
