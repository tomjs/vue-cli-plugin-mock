import type { MockMethod } from '@tomjs/vue-cli-plugin-mock';
import { R } from '../_utils';

const routes: MockMethod[] = [
  {
    url: 'get',
    method: 'get',
    response: () => {
      return R.ok('Bearer 123456789');
    },
  },
  {
    url: '404',
    rawResponse: (req, res) => {
      res.status(404).send(
        JSON.stringify({
          code: 404,
          msg: '404 Not Found',
        }),
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
