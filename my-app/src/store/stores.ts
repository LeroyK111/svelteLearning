/**
 * @author Leroy
 * 全局商店
 */
import { derived, readable, writable } from 'svelte/store';

/**
 * writable: 可写对象
 * readable: 只读对象
 * derived；派生都西昂
 * ()=>{}: 自定义对象
 */

// 通过暴露语法暴露商店的对象
export const count = writable(0);

// 只读对象，参数意义：第一个参数是存储的初始值，第二个函数本质是获取了writable()之后的对象，将set, update方法映射出来
export const time = readable(new Date(), (set, update) => {
	// 设置循环函数
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	// 记得取消副作用
	return () => clearInterval(interval);
});

// 派生对象
const start: any = new Date();
export const elapsed = derived(time, ($time: any) => {
	// 如果不使用set，update等功能，则可以直接返回值
	return Math.round(($time - start) / 1000);
});

// 测试派生对象的初始值
export const countFake = derived(
	count,
	($a, set) => {
		// 这里会监听count的变换，持续执行
		setTimeout(() => set($a * 2), 3000);
	},
	2000
);

// 自定义商店
function createCount() {
  /**
   * 这里的可玩性就非常高了
   * 
  */
	const { subscribe, set, update } = writable(99);

	return {
		subscribe,
		increment: () => update((n) => n + 1),
		decrement: () => update((n) => n - 1),
		reset: () => set(0)
	};
}
export const customCount = createCount();