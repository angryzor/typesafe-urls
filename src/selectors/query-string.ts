import { Properties } from '../route';
import assign = require('object-assign');

export const queryString = (props: Array<string>) => (obj: {}): Properties =>
  assign({}, obj, {
    queryString: props.reduce((res, key) => {
      res[key] = obj[key];
      return res;
    }, {})
  });
