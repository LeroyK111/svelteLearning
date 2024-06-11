<script>
	let todos = [
		{ done: false, text: 'finish Svelte tutorial' },
		{ done: false, text: 'build an app' },
		{ done: false, text: 'world domination' }
	];

	function add() {
    // 加入新参数
		todos = todos.concat({
			done: false,
			text: ''
		});
	}

	function clear() {
    // 过滤被选中的
		todos = todos.filter((t) => !t.done);
	}

  // 计算器
	$: remaining = todos.filter((t) => !t.done).length;
</script>

<div class="centered">
	<h1>todos</h1>

	<ul class="todos">
		{#each todos as todo}
			<li class:done={todo.done}>
        <!-- 直接绑定两个事件 -->
				<input type="checkbox" bind:checked={todo.done} />
				<input type="text" placeholder="What needs to be done?" bind:value={todo.text} />
			</li>
		{/each}
	</ul>

	<p>{remaining} remaining</p>

	<button on:click={add}> Add new </button>

	<button on:click={clear}> Clear completed </button>
</div>

<style>
	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	.done {
		opacity: 0.4;
	}

	li {
		display: flex;
	}

	input[type='text'] {
		flex: 1;
		padding: 0.5em;
		margin: -0.2em 0;
		border: none;
	}
</style>
