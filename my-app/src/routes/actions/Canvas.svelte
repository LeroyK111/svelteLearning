<script lang="ts">
	import { onMount } from 'svelte';

	export let color;
	export let size;

	let canvas: HTMLCanvasElement;
	let context: any;
	let previous: any;

	function get_coords(e) {
		// 获取鼠标的绝对坐标
		const { clientX, clientY } = e;
		// console.log('鼠标绝对坐标系', Math.trunc(clientX), Math.trunc(clientY));

		// 画板的绝对坐标
		const { left, top } = canvas.getBoundingClientRect();
		// 求出鼠标在画板上的相对坐标系
		const x = clientX - left;
		const y = clientY - top;
		return { x, y };
	}

	onMount(() => {
		// 获取dom的参数
		context = canvas.getContext('2d');
		function resize() {
			// 直接设置canvas大小为整个视口界面
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}

		// 监听视口变换，canvas直接跟随变换
		window.addEventListener('resize', resize);
		resize();

		return () => {
			window.removeEventListener('resize', resize);
		};
	});
</script>

<canvas
	bind:this={canvas}
	on:pointerdown={(e) => {
		// 鼠标点下事件
		const coords = get_coords(e);

		context.fillStyle = color;

		context.beginPath();
		context.arc(coords.x, coords.y, size / 2, 0, 2 * Math.PI);
		context.fill();

		previous = coords;
	}}
	on:pointerleave={() => {
		// 鼠标离开
		previous = null;
	}}
	on:pointermove={(e) => {
		// 鼠标移动事件
		const coords = get_coords(e);

		if (e.buttons === 1) {
			e.preventDefault();

			context.strokeStyle = color;
			context.lineWidth = size;
			context.lineCap = 'round';
			context.beginPath();
			context.moveTo(previous.x, previous.y);
			context.lineTo(coords.x, coords.y);
			context.stroke();
		}

		previous = coords;
	}}
></canvas>

{#if previous}
	<div
		class="preview"
		style="--color: {color}; --size: {size}px; --x: {previous.x}px; --y: {previous.y}px"
	></div>
{/if}

<style>
	canvas {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.preview {
		position: absolute;
		left: var(--x);
		top: var(--y);
		width: var(--size);
		height: var(--size);
		transform: translate(-50%, -50%);
		background: var(--color);
		border-radius: 50%;
		opacity: 0.5;
		pointer-events: none;
	}
</style>
