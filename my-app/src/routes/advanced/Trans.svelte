<script>
	import { fly } from 'svelte/transition';

	let visible = true;
	let status = '开始阶段';
</script>

<p>status: {status}</p>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<!-- 监听器可以设置到的颗粒度能过够如此之细 -->
	<p
		transition:fly={{ y: 200, duration: 2000 }}
		on:introstart={() => (status = '开始了...')}
		on:outrostart={() => (status = '停止中...')}
		on:introend={() => (status = '开始阶段')}
		on:outroend={() => (status = '结束阶段')}
	>
		Flies in and out
	</p>
{/if}
