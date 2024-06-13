import { json } from '@sveltejs/kit';

export function GET(res: any) {
  // 直接获取response呢
  console.log(res);
  
	const number = Math.floor(Math.random() * 6) + 1;
  // 自定义输出
	// return new Response(number.toString(), {
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	}
	// });
  // 简单输出
  return json("123123123123")
}