import { R } from '../_utils';

export default [
  {
    url: '/mock/demo1/get',
    method: 'get',
    response: () => {
      return R.ok({
        id: '666',
        name: '测试',
      });
    },
  },
];
