# @tomjs/vue-cli-plugin-mock

[![npm](https://img.shields.io/npm/v/@tomjs/vue-cli-plugin-mock)](https://www.npmjs.com/package/@tomjs/vue-cli-plugin-mock) ![node-current (scoped)](https://img.shields.io/node/v/@tomjs/vue-cli-plugin-mock) ![NPM](https://img.shields.io/npm/l/@tomjs/vue-cli-plugin-mock)

**English** | [中文](./README.zh_CN.md)

> Provide mock for [Vue CLI](https://cli.vuejs.org/)

This plugin is modified from [vite-plugin-mock](https://github.com/vbenjs) by [vben](https://github.com/vbenjs/vite-plugin-mock). Most of the code comes from this project. I also use this plugin in my project. Thank you very much.

This project supports the requirement `"@vue/cli-service": "^5.0.0"`, and supports `ts` and `js` to write `mock` data

## Install

```bash
# pnpm
pnpm add @tomjs/vue-cli-plugin-mock -D

# yarn
yarn add @tomjs/vue-cli-plugin-mock -D

# npm
npm add @tomjs/vue-cli-plugin-mock -D
```

## usage

This plugin is based on the `express@4` middleware. After installation, `Vue CLI` will automatically load the plugin.

### Configuration parameters

```ts
export interface MockOptions {
  /**
   * mock file path
   * @default 'mocks'
   */
  mockPath?: string;
  /**
   * ignore mock file
   * @default /^_/
   */
  ignore?: RegExp | ((fileName: string) => boolean);
  /**
   * watch mock file change
   * @default true
   */
  watch?: boolean;
  /**
   * enable mock
   * @default true
   */
  enable?: boolean;
  /**
   * enable logger
   * @default false
   */
  logger?: boolean;
}
```

### Use the Configuration File

Choose the configuration method according to your preference.

#### config file

Create a `mock.config.{json|js|ts|mjs|cjs}` file in the project root directory according to `"type":"commonjs"` or `"type":"module"` in `package.json`.

`mock.config.js` example:

```js
/**
 * @type {import('@tomjs/vue-cli-plugin-mock').MockOptions}
 */
export default {
  logger: true,
};
```

#### package.json

Add `"mock"` configuration item to package.json

```json
{
  "mock": {
    "logger": true
  }
}
```

#### vue.config.js

Add `mock` configuration item in `pluginOptions`

```js
module.exports = {
  pluginOptions: {
    mock: {
      logger: true,
    },
  },
};
```

### mock example

mocks/demo1.js

```ts
export default [
  {
    url: '/mock/demo1/get',
    method: 'get',
    response: () => {
      return {
        code: 500,
        data: 'Bearer 123456789',
      };
    },
  }
];
```

mocks/demo2.ts

```ts
import { MockMethod } from '@tomjs/vue-cli-plugin-mock';

const routes: MockMethod[] = [
  {
    url: 'get',
    method: 'get',
    response: () => {
      return {
        code: 500,
        data: 'Bearer 123456789',
      };
    },
  },
  {
    url: '404',
    rawResponse: (req, res) => {
      res.status(404).send(
        JSON.stringify({
          code: 404,
          msg: '404 Not Found',
        })
      );
    },
  },
  {
    url: '500',
    rawResponse: (req, res) => {
      res.status(500).send({
        code: 500,
        msg: '500 Server Error',
      });
    },
  },
];

export default routes.map(s => ({
  ...s,
  timeout: Math.random() * 300,
  url: `/mock/demo2/${s.url}`,
  method: s.method || 'get',
})) as MockMethod[];
```

## Examples

- [vue-ts](./examples/vue-ts)
- [vue-js](./examples/vue-js)
