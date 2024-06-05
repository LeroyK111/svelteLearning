<script lang="ts">
	// import { writable } from 'svelte/store';
	// const progress = writable(0);

	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import Spring from './Spring.svelte';
	import Fade from './Fade.svelte';
	import CusCss from './CusCSS.svelte';
	import CusJS from './CusJS.svelte';
	import Trans from './Trans.svelte';
	import Global from './Global.svelte';
	import KeyBlock from './KeyBlock.svelte';
	import Deferred from './Deferred.svelte';

	// tweened 创建了一个高级的运动对象
	const progress = tweened(0, {
		duration: 5000,
		easing: cubicOut
	});
</script>

<h1>进阶用法</h1>
<!-- <progress value={$progress}></progress>
<button on:click={() => progress.set(0)}> 0% </button>
<button on:click={() => progress.set(0.25)}> 25% </button>
<button on:click={() => progress.set(0.5)}> 50% </button>
<button on:click={() => progress.set(0.75)}> 75% </button>
<button on:click={() => progress.set(1)}> 100% </button> -->

<!-- <Spring></Spring> -->

<!-- transition -->
<!-- <Fade></Fade> -->
<!-- <CusCss></CusCss> -->
<!-- <CusJS></CusJS> -->
<!-- <Trans></Trans> -->
<!-- <Global></Global> -->
<!-- <KeyBlock></KeyBlock> -->
<!-- 平滑过渡 -->
<Deferred></Deferred>




<!-- <style>
	progress {
		display: block;
		width: 100%;
	}
</style> -->
