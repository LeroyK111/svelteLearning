<script>
	import { onMount } from 'svelte';
	import { paint } from '../../hooks/gradient';

	import Update from '../../components/Update.svelte';
	import Tick from '../../components/Tick.svelte';

	onMount(() => {
		const canvas = document.querySelector('canvas');
		const context = canvas?.getContext('2d');

		// canvas 动画创建
		let frame = requestAnimationFrame(function loop(t) {
			frame = requestAnimationFrame(loop);
			paint(context, t);
		});

		// 记得销毁动画
		return () => {
			cancelAnimationFrame(frame);
		};
	});
</script>

<canvas width={32} height={32} style="display: none;"></canvas>

<!-- <Update></Update> -->
<!-- <Tick></Tick> -->

<style>
	canvas {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #666;
		mask: url(../../assets/svelte-logo-mask.svg) 50% 50% no-repeat;
		mask-size: 60vmin;
		-webkit-mask: url(../../assets/svelte-logo-mask.svg) 50% 50% no-repeat;
		-webkit-mask-size: 60vmin;
	}
</style>
