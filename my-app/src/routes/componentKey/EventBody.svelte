<script>
	let hereKitty = true;
</script>

<svelte:body on:mouseenter={() => (hereKitty = false)} on:mouseleave={() => (hereKitty = true)} />

{#if hereKitty}
  {#each Array(10) as _}
    	<h1>🐱</h1>
  {/each}

{/if}

<style>
	:global(body) {
		width: 100vw;
		height: 100vh;
	}
</style>
