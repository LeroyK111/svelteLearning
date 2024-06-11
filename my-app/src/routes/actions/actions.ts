/**
 * @author Leroy
 * 借助use：绑定到dom上
 */

export function trapFocus(node: HTMLDivElement) {
	// 是一个只读属性，它返回当前文档中获得焦点的元素
	const previous = document.activeElement as HTMLElement;

	console.log('use: 绑定的dom节点', node);

	function focusable(): [HTMLElement] {
		/**
		 * 这个函数 focusable 用于获取指定节点（node）中所有可以获得焦点的元素，并返回它们的数组。
		 *
		 *
		 */
		return Array.from(
			// 炸掉所有符合button标签, href属性等内容的dom元素
			node.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)
		);
	}

	function handleKeydown(event: { key: string; shiftKey: any; preventDefault: () => void }) {
		/**
		 * 按下tab后的选择
		 *
		 */

		if (event.key !== 'Tab') return;
		// 当前被选中的dom元素
		const current = document.activeElement;
		// 获取菜单中的所有元素
		const elements = focusable();
		console.log(elements);
		// 获取首尾两个元素
		const first = elements.at(0) as HTMLElement;
		const last = elements.at(-1) as HTMLElement;

		console.log(event.shiftKey);
		
		// 让 tab 的聚焦循环起来
		if (event.shiftKey && current === first) {
			last.focus();
			event.preventDefault();
		}

		if (!event.shiftKey && current === last) {
			first.focus();
			event.preventDefault();
		}
	}

	// 默认聚焦第一个选型
	focusable()[0]?.focus();

	// 给整个菜单node绑定一个键盘事件
	node.addEventListener('keydown', handleKeydown);

	return {
		// 事件销毁
		destroy() {
			node.removeEventListener('keydown', handleKeydown);
			previous.focus();
		}
	};
}
