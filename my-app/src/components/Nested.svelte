<script>
	$: console.log(`组件初始化时，自动执行，参数变化时，自动执行`);

	// 引入
	let nums = [0, 1, 2, 3];
	const obj = { foo: { bar: 0 } };
	const foo = obj.foo;
	function addNumber() {
		// nums push反而会失去响应式
		// nums.push(nums.length + 1);
		// 更常用的方法， pop 、 shift 和 unshift splice 。都是如此
		// nums = [...nums, nums.length++];
		// 数组需要索引赋值，也可以引起响应式的改变
		nums[nums.length] = nums.length;
		// 对象则可以自动响应
		obj.foo.bar = nums.length;
	}
</script>

<p>这是一个嵌入的组件</p>
<p>
	{nums.join(' + ') +
		`=${nums.reduce((previousValue, currentValue) => previousValue + currentValue), 0}`}
</p>
<p>对象赋值的修改:{obj.foo.bar}:{foo.bar}</p>
<button on:click={addNumber}> 点我 </button>

<style>
	p {
		color: goldenrod;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>
