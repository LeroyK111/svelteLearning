<script lang="ts">
  import { onDestroy } from 'svelte'

	import Use1 from './use1.svelte';

	import { count } from '../../store/stores';
	import Use2 from './use2.svelte';

	let count_value: number;

  // 订阅全局对象
	const unsubscribe = count.subscribe((value: number) => {
		count_value = value;
	});
  

  // 组件卸载时，自动取消订阅
  onDestroy(unsubscribe)
  
</script>

<h1>全局状态商店测试</h1>

<div style="background-color: pink; height: 500px; width: 500px">
	this count is {count_value}
</div>

<Use1></Use1>

<Use2></Use2>
