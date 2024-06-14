

import { error } from '@sveltejs/kit';

export function load() {
  // 这里是预期错误
	throw error(420, 'Enhance your calm');
  // 这里是意外错误
  throw new Error('Kaboom!');
}