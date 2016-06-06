import { Properties } from '../interfaces';

export const own = (obj: any): any =>
  Object.keys(obj).reduce((res, key) => {
    res[key] = obj[key];
    return res;
  }, {});
