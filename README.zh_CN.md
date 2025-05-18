# @tomjs/vue-cli-plugin-mock

[![npm](https://img.shields.io/npm/v/@tomjs/vue-cli-plugin-mock)](https://www.npmjs.com/package/@tomjs/vue-cli-plugin-mock) ![node-current (scoped)](https://img.shields.io/node/v/@tomjs/vue-cli-plugin-mock) ![NPM](https://img.shields.io/npm/l/@tomjs/vue-cli-plugin-mock)

[English](./README.md) | **中文**

> 为 [Vue CLI](https://cli.vuejs.org/) 提供数据模拟功能

本插件是根据 [vben](https://github.com/vbenjs) 的 [vite-plugin-mock](https://github.com/vbenjs/vite-plugin-mock) 修改而来，大部分代码源自该项目，我也在项目中使用该插件，非常感谢。

本项目支持要求 `"@vue/cli-service": "^5.0.0"`，支持 `ts`、`js` 写 `mock` 数据

## 安装

```bash
# pnpm
pnpm add @tomjs/vue-cli-plugin-mock -D

# yarn
yarn add @tomjs/vue-cli-plugin-mock -D

# npm
npm add @tomjs/vue-cli-plugin-mock -D
```

## 使用

本插件是基于 `express@4` 中间件实现，安装后 `Vue CLI` 会自动加载插件。

### 配置参数

```ts
interface MockOptions {
  /**
   * mock 文件目录
   * @default 'mocks'
   */
  mockPath?: string;
  /**
   * 定义过滤文件正则或方法
   * @default /^_/
   */
  ignore?: RegExp | ((fileName: string) => boolean);
  /**
   * 将监视文件夹中的文件更改
   * @default true
   */
  watch?: boolean;
  /**
   * 是否启用 mock 功能
   * @default true
   */
  enable?: boolean;
  /**
   * 是否在控制台显示请求日志
   * @default false
   */
  logger?: boolean;
}
```

### 使用配置文件

根据喜好自行选择配置方式

#### config 文件

根据 `package.json` 的 `"type":"commonjs"` 或 `"type":"module"` ，在项目根目录创建 `mock.config.{json|js|ts|mjs|cjs}` 文件。

`mock.config.js` 示例：

```js
/**
 * @type {import('@tomjs/vue-cli-plugin-mock').MockOptions}
 */
export default {
  logger: true,
};
```

#### package.json

package.json 添加 `"mock"` 配置项

```json
{
  "mock": {
    "logger": true
  }
}
```

#### vue.config.js

在 `pluginOptions` 中添加 `mock` 配置项

```js
module.exports = {
  pluginOptions: {
    mock: {
      logger: true,
    },
  },
};
```

### mock 示例

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

## 示例

- [vue-ts](./examples/vue-ts)
- [vue-js](./examples/vue-js)
