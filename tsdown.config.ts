import { defineConfig } from 'tsdown';

export default defineConfig((options) => {
  const isDev = !!options.watch;

  return {
    entry: ['src/index.ts'],
    format: ['cjs'],
    target: 'node16',
    clean: true,
    dts: true,
    sourcemap: isDev,
  };
});
