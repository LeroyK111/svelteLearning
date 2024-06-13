<script>
	// @ts-nocheck
	import { getContext } from 'svelte';
	/**
	 * {#each Array(12) as _, c}
			{#each Array(22) as _, r}
				<Square
					x={180 + c * 40 + jitter(r * 2)}
					y={180 + r * 40 + jitter(r * 2)}
					size={40}
					rotate={jitter(r * 0.05)}
				/>
			{/each}
		{/each}
	 * 
	*/
	// 
	export let x;
	export let y;
	export let size;
	export let rotate;

	// 调用父组件的函数
	getContext('canvas').addItem(draw);

	function draw(ctx) {
		// 非常取巧，这里使用了闭包的技巧，ctx是父组件的变量
		ctx.save();
		// 移动位置
		ctx.translate(x, y);
		// 旋转角度
		ctx.rotate(rotate);
		// 边框颜色
		ctx.strokeStyle = 'black';
		// 绘制矩形
		ctx.strokeRect(-size / 2, -size / 2, size, size);
		// 恢复之前的绘图状态
		ctx.restore();
	}
</script>