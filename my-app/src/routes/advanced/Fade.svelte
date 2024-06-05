<script>
	import { fade, fly } from 'svelte/transition';
	let visible = true;
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<!-- 缓动动画 -->
	<p transition:fade>Fades in and out</p>
	<!-- 动画 -->
	<p transition:fly={{ y: 200, duration: 2000 }}>Flies in and out</p>
	<!-- 设置dom进出的动画 -->
	<p in:fly={{ y: 200, duration: 2000 }} out:fade>Flies in, fades out</p>
{/if}


