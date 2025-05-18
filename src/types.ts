import type { Request, Response } from 'express';

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

export interface RespThisType {
  req: Request;
  res: Response;
  parseJson: () => any;
}

export type MethodType = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type Recordable<T = any> = Record<string, T>;

export declare interface MockMethod {
  url: string;
  method?: MethodType;
  timeout?: number;
  statusCode?: number;
  response?:
    | ((
      this: RespThisType,
      opt: { url: Recordable; body: Recordable; query: Recordable; headers: Recordable },
    ) => any)
    | any;
  rawResponse?: (this: RespThisType, req: Request, res: Response) => void | Promise<void>;
}
