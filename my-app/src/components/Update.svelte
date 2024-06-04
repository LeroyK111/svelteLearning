<script>
	// import { afterUpdate, beforeUpdate } from "svelte";

	let div;
	let autoscroll = false;

	// beforeUpdate(() => {
	// 	console.log("dom更新前");
	// });

	// afterUpdate(() => {
	// 	console.log("dom更新后");
	// });

  // 非常类似react effect了
  $effect(() => {
		console.log('Domg更新之后');
  })
  $effect.pre(()=>{
    console.log("dom更新前");
  })
  // 状态监听
  $effect.active()
  
</script>

<h1>测试dom更新前和dom更新后{$effect.active()}</h1>
<div></div>