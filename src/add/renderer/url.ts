import { Route, Renderer } from '../../route';
import { url } from '../../renderer/url';

Route.prototype.url = url;

declare module '../../route' {
  interface Route<P> {
    url: Renderer<P>;
  }
}
