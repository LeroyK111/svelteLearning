<script>
	import Grandsons from "./Grandsons.svelte"


	// 这是v4版本的父子组件事件传递
	// import { createEventDispatcher } from 'svelte';
	// const dispatch = createEventDispatcher();
	// function sayHello() {
	// 	dispatch('message', {
	// 		text: 'Hello!'
	// 	});
	// }
	// 使用最好的v5版本的父子组件事件传递
	// !声明式语法也可以
	// export let greeting;
  // 二者选其一， 否则会报错
	let { handleChange, greeting } = $props();

	

</script>

<button on:click={() => handleChange(111)}> Click to say hello </button>
<button on:click={greeting}> Click to say hello </button>
<Grandsons on:message ></Grandsons>