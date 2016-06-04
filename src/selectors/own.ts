import { Properties } from '../interfaces';

export const own = (obj: {}): Properties =>
  Object.keys(obj).reduce((res, key) => {
    res[key] = obj[key];
    return res;
  }, {});
