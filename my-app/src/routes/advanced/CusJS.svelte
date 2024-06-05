<script lang="ts">
	let visible = false;

  /**
   * @author Leroy
   * 打字机效果
  */

	function typewriter(node: any, { speed }: any) {
    // 判断是否是是字符串
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

    
    // 如果不是字符串，则异常报错
		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

    // 获取html中的字符串
		const text = node.textContent;
    // console.log(text);
    // 用文字数量 / 打字频率 = 打字总时间
		const duration = text.length / (speed * 0.01);
    
		return {
			duration,
      // 利用tick的断点
			tick: (t: number) => {
        // 取整？
				const i = Math.trunc(text.length * t);
        // 不断分割字符串，不断渲染dom
				node.textContent = text.slice(0, i);
			}
		};
	}
  
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>



{#if visible}
	<p transition:typewriter={{ speed: 2 }}>The quick brown fox jumps over the lazy dog</p>
{/if}
