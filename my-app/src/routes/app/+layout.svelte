<script>
	import { goto } from '$app/navigation';
	import { page, navigating, updated } from '$app/stores';

	// 可以随时获取当前的页面信息
	// console.log($page);
  // 配合$app/navigation 可以实现各种跳转信息的拦截。
  // console.log("获取路由信息", $navigating?.from);
  // navigating.subscribe((router)=>{
  //   console.log(router);
  // })

  // 这个是debug脚本，用来检测sveltekit 版本是否落后
  console.log($updated);
</script>

<nav>
	<a href="/app" aria-current={$page.url.pathname === '/app'}> home </a>

	<a href="/app/apps" aria-current={$page.url.pathname === '/app/apps'}> about </a>
</nav>

<div>
	{#if $navigating}
		navigating to {$navigating.to.url.pathname}
	{/if}
</div>

{#if $updated}
	<div class="toast">
		<p>
			检测页面版本

			<button on:click={() => location.reload()}>
				reload the page
			</button>
		</p>
	</div>
{/if}

<slot />
