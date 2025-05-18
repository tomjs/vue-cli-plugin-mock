import type { ServicePlugin } from '@vue/cli-service';
import type { MockOptions } from './types';
import { createMiddleware, createMockServer } from './create';
import { getMockConfig } from './utils';

export * from './types';

const mockPlugin: ServicePlugin = async (api, options) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  const opts: MockOptions = Object.assign((options.pluginOptions as any)?.mock || {});
  opts.enable = opts.enable ?? true;

  if (!opts.enable) {
    return;
  }

  api.configureDevServer((app) => {
    app.use(createMiddleware(opts));
  });

  const cfg = await getMockConfig((options.pluginOptions as any)?.mock);
  Object.assign(opts, cfg);
  opts.enable = opts.enable ?? true;

  await createMockServer(opts);

  // await createMockServer(opts);
};

export default mockPlugin;
