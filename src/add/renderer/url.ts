import { Route } from '../../route';
import { Renderer } from '../../interfaces';
import { url } from '../../renderer/url';

Route.prototype.url = url;

declare module '../../route' {
  interface Route<P> {
    url: Renderer<P>;
  }
}
