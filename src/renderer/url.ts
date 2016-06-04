import { link } from './link';

export function url<P>(params: P): string {
  return location.origin + link.call(this, params);
}
