<script>
	// import { writable } from 'svelte/store';
	// let coords = writable({ x: 50, y: 50 });
	// let size = writable(10);
	import { spring } from 'svelte/motion';
  // 使用这个就可以设置阻尼器了
	let coords = spring(
		{ x: 50, y: 50 },
		{
      // 僵直系数
			stiffness: 0.1,
      // 阻尼
			damping: 0.25
		}
	);
  let size = spring(10);
</script>

<svg
	on:mousemove={(e) => {
		coords.set({ x: e.clientX, y: e.clientY });
	}}
	on:mousedown={() => size.set(30)}
	on:mouseup={() => size.set(10)}
	role="presentation"
>
	<circle cx={$coords.x} cy={$coords.y} r={$size} />
</svg>

<!-- 修改spring参数值 -->
<div class="controls">
	<label>
		<h3>stiffness ({coords.stiffness})</h3>
		<input bind:value={coords.stiffness} type="range" min="0.01" max="1" step="0.01" />
	</label>

	<label>
		<h3>damping ({coords.damping})</h3>
		<input bind:value={coords.damping} type="range" min="0.01" max="1" step="0.01" />
	</label>
</div>

<style>
	svg {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}

	circle {
		fill: #ff3e00;
	}

	.controls {
		position: absolute;
		top: 1em;
		right: 1em;
		width: 200px;
		user-select: none;
	}

	.controls input {
		width: 100%;
	}
</style>
