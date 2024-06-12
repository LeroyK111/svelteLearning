<script lang="ts">
	import AdvancedBindings from '../../components/AdvancedBindings.svelte';
	import AdvancedEach from '../../components/AdvancedEach.svelte';
	import AdvancedMdia from '../../components/AdvancedMdia.svelte';
	import AdvancedDim from '../../components/AdvancedDim.svelte';
  import Keypad from './Keypad.svelte';


	let pin: any;
	$: view = pin ? pin.replace(/\d(?!$)/g, '•') : 'enter your pin';

  $: {
		console.log("pin值被改变了:", pin);
	}

	function handleSubmit() {
		alert(`submitted ${pin}`);
    
	}
</script>

<!-- html绑定 -->
<AdvancedBindings></AdvancedBindings>
<!-- 循环绑定 -->
<AdvancedEach></AdvancedEach>
<!-- 这个牛逼，媒体绑定 -->
<AdvancedMdia></AdvancedMdia>
<!-- 测量包装元素 -->
<AdvancedDim></AdvancedDim>
<!-- 组件传参绑定 -->
<h1 style="opacity: {pin ? 1 : 0.4}">
	{view}
</h1>
<!-- 非常不推荐这么做，不使用on:submit，使用$props -->
<Keypad bind:value={pin} on:submit={handleSubmit} />



