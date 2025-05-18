/**
 * 接口返回结果
 */
export interface Result<T = any> {
  /**
   * 错误编码
   */
  code: number;
  /**
   * 返回结果
   */
  data?: T;
  /**
   * 提示说明
   */
  msg?: string;
}

export const R = {
  /**
   * 正常返回
   * @param data 结果
   * @param msg 消息
   */
  ok<T>(data?: T, msg?: string): Result {
    return {
      code: 0,
      data,
      msg: msg || '操作成功',
    };
  },
  /**
   * 异常返回
   * @param msg 消息
   */
  fail(msg?: string): Result {
    return {
      code: -1,
      msg: msg || '操作失败',
    };
  },
};
