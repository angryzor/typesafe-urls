import { Properties } from '../interfaces';
import { stringify } from 'query-string';

export const queryString = (props: Array<string>) => (obj: {}): Properties => {
  const qs = stringify(props.reduce((res, key) => {
    res[key] = obj[key];
    return res;
  }, {}));

  return Object.assign({}, obj, {
    queryString: qs.length > 0 ? '?' + qs : ''
  });
}
