<script lang="ts">
	let m = { x: 0, y: 0 };

	function handleMove(event: PointerEvent) {
		console.log(event);
		m.x = event.clientX;
		m.y = event.clientY;
	}

	import Inner from '../../components/Inner.svelte';
	function handleChange(value: any) {
    console.log('Value changed:', value);
  }

	function handleLoaded() {
    console.log('Component loaded');
  }

	function handleMessage(event) {
		alert(event.detail.text);
	}
</script>

<h1>全部的事件捕获</h1>

<!-- <div style="margin-top: 100px;" on:pointermove={handleMove}>
	The pointer is at {m.x} x {m.y}
</div> -->

<!-- 内联处理事件 -->
<!-- <div
	on:pointermove={(e) => {
		m = { x: e.clientX, y: e.clientY };
	}}
>
	The pointer is at {m.x} x {m.y}
</div> -->

<!-- 事件修饰符 -->
<!-- <button on:click|once={() => alert('clicked')}> Click me </button>
<button on:click|preventDefault={() => alert('clicked')}> Click me </button>
<button on:click|stopPropagation={() => alert('clicked')}> Click me </button>
<button on:click|passive={() => alert('clicked')}> Click me </button>
<button on:click|nonpassive={() => alert('clicked')}> Click me </button>
<button on:click|capture={() => alert('clicked')}> Click me </button>
<button on:click|self={() => alert('clicked')}> Click me </button>
<button on:click|trusted={() => alert('clicked')}> Click me </button>
<button on:click|trusted|once={() => alert('clicked')}> Click me </button> -->

<!-- 老方法，事件传递 -->
<!-- <Inner on:message={handleMessage} /> -->
<Inner handleChange={handleChange} greeting={handleLoaded} on:message={handleMessage}/>





<style>
	div {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		padding: 1rem;
	}
</style>
