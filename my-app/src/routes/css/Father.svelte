<script>
	import Son from './Son.svelte';
</script>

<!-- 支持style 穿透 -->
<div class="boxes">
	<Son --color="red" />
	<Son --color="green" />
	<Son --color="blue" />
</div>

