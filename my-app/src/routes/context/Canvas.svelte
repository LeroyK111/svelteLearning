<script>
	// @ts-nocheck
	import { setContext, afterUpdate, onMount, tick } from 'svelte';

	export let width = 100;
	export let height = 100;

	let canvas, ctx;
	let items = new Set();
	let scheduled = false;

	onMount(() => {
		// 赋予canvas句柄
		ctx = canvas.getContext('2d');
	});

	// 有点临时全局状态的感觉，这里我们封装了一个函数, 所有的插槽和子组件都可以获取函数
	// 与生命周期函数类似， setContext getContext 必须在组件初始化期间调用。
	setContext('canvas', {
		addItem
	});

	function addItem(fn) {
		// 支持hooks语法，可以复用生命周期
		onMount(() => {
			items.add(fn);
			return () => items.delete(fn);
		});
		// 数据更新之后
		afterUpdate(async () => {
			if (scheduled) return;
			
			scheduled = true;
			await tick();
			scheduled = false;

			// 开始绘图
			draw();
		});
	}

	function draw() {
		ctx.clearRect(0, 0, width, height);
		items.forEach(fn => fn(ctx));
	}
</script>

<canvas bind:this={canvas} {width} {height}>
	<slot />
</canvas>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>