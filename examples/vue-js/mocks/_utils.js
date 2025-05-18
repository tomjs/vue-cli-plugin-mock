export const R = {
  /**
   * 正常返回
   * @param {any} [data] 结果
   * @param {string} [msg] 消息
   */
  ok(data, msg) {
    return {
      code: 0,
      data,
      msg: msg || '操作成功',
    };
  },
  /**
   * 异常返回
   * @param {string} msg 消息
   */
  fail(msg) {
    return {
      code: -1,
      msg: msg || '操作失败',
    };
  },
};
