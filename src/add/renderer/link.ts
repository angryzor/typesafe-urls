import { Route } from '../../route';
import { Renderer } from '../../interfaces';
import { link } from '../../renderer/link';

Route.prototype.link = link;

declare module '../../route' {
  interface Route<P> {
    link: Renderer<P>;
  }
}
