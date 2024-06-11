<script lang="ts">
	import tippy, { type MultipleTargets, type Props } from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/themes/material.css';

	let content = 'Hello!';

	function tooltip(node: MultipleTargets | HTMLButtonElement, options: Partial<Props> | undefined) {
    console.log('传递的参数', options);

    // 浮动事件
		const tooltip = tippy(node, options);

		return {
      // update 回调
			update(options: any) {
				tooltip.setProps(options);
			},
			destroy() {
				tooltip.destroy();
			}
		};
	}
</script>

<input bind:value={content} />

<button use:tooltip={{ content, theme: 'material' }}> Hover me </button>
