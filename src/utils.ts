import type { MockOptions } from './types';
import path from 'node:path';
import { cosmiconfig } from 'cosmiconfig';

const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

// eslint-disable-next-line ts/no-unsafe-function-type
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, 'Function') || is(val, 'AsyncFunction');
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp');
}

export function isAbsPath(path: string | undefined) {
  if (!path) {
    return false;
  }
  // Windows path format: starts with C:\ or \\, or includes a drive letter (D:\ path\ to\ file)
  if (/^(?:[a-z]:\\|\\\\|(?:\/|\uFF0F){2,})/i.test(path)) {
    return true;
  }
  // Unix/Linux path: starts with /
  return /^\/[^/]/.test(path);
}

export function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, time);
  });
}

/**
 * get mock config from file
 */
export async function getMockConfig(options?: any) {
  const root = process.cwd();

  const explorer = cosmiconfig('mock', {
    stopDir: root,
    searchPlaces: [
      'package.json',
      'mock.config.json',
      'mock.config.js',
      'mock.config.ts',
      'mock.config.mjs',
      'mock.config.cjs',
    ],
  });

  const result = await explorer.search();
  const opts: MockOptions = Object.assign({}, options, result?.config);

  opts.enable = opts.enable ?? true;
  opts.ignore = opts.ignore ?? /^_/;
  opts.watch = opts.watch ?? true;
  opts.logger = opts.logger ?? false;

  const mockPath = opts.mockPath ?? 'mocks';
  opts.mockPath = isAbsPath(mockPath) ? mockPath! : path.join(root, mockPath || '');

  return opts;
}
