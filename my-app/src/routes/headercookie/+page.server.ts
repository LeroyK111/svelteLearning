
export function load({ setHeaders, cookies }: any) {
  // 手动设置响应头
	// setHeaders({
	// 	'Content-Type': 'text/html; charset=utf-8;'
	// });
  
  // 手动设置cookie
	cookies.set('visited', 'true', { path: '/' });
  const visited = cookies.get('visited');
	cookies.set('visited', 'true', { path: '/' });

  return {
    visited
  }
}


