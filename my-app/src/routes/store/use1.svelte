<script>
	import { count } from '../../store/stores';

  // 这个写法已经不流行
	// let s = 0;
	// count.subscribe((value) => {
	// 	s = value;
	// });

	const hanleSub = () => {
		count.update((v) => v - 1);
	};
	const hanleAdd = () => {
		count.update((v) => v + 1);
	};


  

</script>

<button on:click={hanleAdd}>加一</button>
<button on:click={hanleSub}>减一</button>
<button on:click={() => count.set(0)}>重置为0</button>
<!-- 直接$ 订阅即可 -->
<p>子组件观察框:{$count}</p>
