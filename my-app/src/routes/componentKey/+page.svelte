<script>
	// import Folder from './Folder.svelte';
	// import { files } from './data.js';

	// import RedThing from './RedThing.svelte';
	// import GreenThing from './GreenThing.svelte';
	// import BlueThing from './BlueThing.svelte';

	// import EventWindow from './EventWindow.svelte';
	// import EventBody from './EventBody.svelte';
	// import EventDocu from './EventDocu.svelte';
	// meta 元信息绑定
	// import EventHead from './EventHead.svelte';

	// const options = [
	// 	{ color: 'red', component: RedThing },
	// 	{ color: 'green', component: GreenThing },
	// 	{ color: 'blue', component: BlueThing }
	// ];

	// let selected = options[0];

	// const options = ['h1', 'h2', 'h3', 'p', 'marquee'];
	// let selected = options[0];

	// 全局事件用
	// let y = 0;

	// options
	// import Todo from './Todo.svelte';
	// let todos = [
	// 	{ id: 1, done: true, text: 'wash the car' },
	// 	{ id: 2, done: false, text: 'take the dog for a walk' },
	// 	{ id: 3, done: false, text: 'mow the lawn' }
	// ];
	// function toggle(toggled) {
	// 	todos = todos.map((todo) => {
	// 		if (todo === toggled) {
	// 			// return a new object
	// 			return {
	// 				id: todo.id,
	// 				text: todo.text,
	// 				done: !todo.done
	// 			};
	// 		}
	// 		// return the same object
	// 		return todo;
	// 	});
	// }


	// 该 <svelte:fragment> 元素允许您将内容放置在命名插槽中，而无需将其包装在容器 DOM 元素中。
	import Fragment from './Fragment.svelte';
	

</script>

<!-- 也支持bool值语法，这里是svelte:self -->
<!-- <Folder name="Home" {files} expanded /> -->

<!-- 动态组件，元编程 -->
<!-- <select bind:value={selected}>
	{#each options as option}
		<option value={option}>{option.color}</option>
	{/each}
</select> -->
<!-- 太常见了 -->
<!-- <svelte:component this={selected.component} /> -->

<!-- 动态DOM，不得了，不得了 -->
<!-- <select bind:value={selected}>
	{#each options as option}
		<option value={option}>{option}</option>
	{/each}
</select>
<svelte:element this={selected}>
	I'm a <code>&lt;{selected}&gt;</code> element
</svelte:element> -->

<!-- 全局侦听器 -->
<!-- <EventWindow></EventWindow> -->
<!-- 直接绑定全局事件也可以 -->
<!-- <svelte:window bind:scrollY={y} />
<span>depth: {y}px</span>
<div></div> -->
<!-- <EventBody></EventBody> -->
<!-- <EventHead></EventHead> -->

<!-- 使用options 可以在复用组件时，避免不必要的事件触发 -->
<!-- <div class="centered">
	<h1>todos</h1>
	<ul class="todos">
		{#each todos as todo (todo.id)}
			<Todo {todo} on:change={() => toggle(todo)} />
		{/each}
	</ul>
</div> -->


<!-- 是 Svelte 提供的一个特殊组件，它允许你在特定的上下文中使用多根节点。通常在 Svelte 中，一个组件的顶级结构只能有一个根节点，但在某些情况下，你可能需要使用多个根节点，这时 <svelte:fragment> 就会派上用场。 -->
<Fragment></Fragment>


<style>
	span {
		position: fixed;
		top: 0;
		left: 0;
	}

	div {
		height: 10000px;
	}

	.centered {
		max-width: 20em;
		margin: 0 auto;
	}
</style>
