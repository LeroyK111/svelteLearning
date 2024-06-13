<script lang="ts">
	import { onMount } from 'svelte';
	import { test } from './+page.svelte';

	test('外来模块用法');

	// 接受参数
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

	export function clear() {
		// 清除画布
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	onMount(() => {
		// 获取dom的2d对象
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
		console.log('鼠标点击');

		// 鼠标点下事件
		const coords = get_coords(e);
		// 填充颜色
		context.fillStyle = color;
		// 开始绘制
		context.beginPath();
		// 绘制圆心
		context.arc(coords.x, coords.y, size / 2, 0, 2 * Math.PI);
		// 填充
		context.fill();

		// 记录一下颜色
		previous = coords;
	}}
	on:pointerleave={() => {
		// 鼠标离开
		previous = null;
		console.log('鼠标离开');
	}}
	on:pointermove={(e) => {
		// 鼠标移动事件
		const coords = get_coords(e);
		console.log(e.buttons);

		if (e.buttons === 1) {
			// 移动并且 鼠标左键点下
			// 阻止事件传递
			e.preventDefault();
			// 画笔开始作画
			// 绘制线条颜色
			context.strokeStyle = color;
			// 线条粗细
			context.lineWidth = size;
			// 线条末端为圆形
			context.lineCap = 'round';
			// 开始一条新路径
			context.beginPath();
			// 将绘制的起点移动到坐标
			context.moveTo(previous.x, previous.y);
			// 从当前点绘制一条直线到坐标
			context.lineTo(coords.x, coords.y);
			// 根据当前的描边样式绘制路径
			context.stroke();
		}
		previous = coords;
	}}
></canvas>

<!-- 鼠标指引表示 -->
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
