import { Route, Renderer } from '../../route';
import { link } from '../../renderer/link';

Route.prototype.link = link;

declare module '../../route' {
  interface Route<P> {
    link: Renderer<P>;
  }
}
