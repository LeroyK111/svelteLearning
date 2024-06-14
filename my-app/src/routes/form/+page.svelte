<script lang="ts">
	/**
	 * @author Leroy
	 * ui回传到server端
	 */
  // 
   import { enhance } from '$app/forms';
  //  载入过度
  import { fly, slide } from 'svelte/transition';

	// 接收load 传递的参数
	export let data;
	// 接收form 异常表单返回
	export let form;

  async function handleSubmit(a) {
    /**
     * 直接获取 可以获取到事件的尾声，但是没有具体的参数，一般用来处理某些变化。实现慢加载之类的效果
    */
    // const response = await fetch('/api/todos', {
    //   method: 'POST',
    //   body: data
    // });

    // if (response.ok) {
    //   // Handle success
    //   console.log('Todo added successfully');
    // } else {
    //   // Handle error
    //   console.error('Failed to add todo');
    // }
    // 
    console.log("啊啊啊啊", a);
  }
</script>

<div class="centered">
	<h1>todos</h1>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}
	<!-- 输入值, 默认表单action就是 default -->
	<!-- <form method="POST"> -->
	<form method="POST" action="?/create" use:enhance={handleSubmit}>
		<label>
			add a todo:
			<!-- 第一道防线是浏览器的内置表单验证，这使得您可以轻松地根据需要标记 <input> ： -->
			<input name="description" autocomplete="off" required value={form?.description ?? ''} />
		</label>
	</form>

	<!-- 循环渲染 -->
	<ul class="todos">
		{#each data.todos as todo (todo.id)}
			<li>
				<!-- 改变action 就可以改变server端 的触发器接口 -->
				<form method="POST" action="?/delete">
					<input type="hidden" name="id" value={todo.id} />
					<span>{todo.description}</span>
					<!-- 隐藏式表单传参数 -->
					<button aria-label="Mark as complete">del</button>
				</form>
			</li>
		{/each}
	</ul>
</div>

<style>
	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	label {
		width: 100%;
	}

	input {
		flex: 1;
	}

	span {
		flex: 1;
	}

	button {
		border: none;
		background-size: 1rem 1rem;
		cursor: pointer;
		height: 100%;
		aspect-ratio: 1;
		opacity: 0.5;
		transition: opacity 0.2s;
	}

	button:hover {
		opacity: 1;
	}

	.saving {
		opacity: 0.5;
	}
</style>
