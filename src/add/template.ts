import { Route } from '../route';
import { template } from '../template';

Route.prototype.template = template;

declare module '../route' {
  interface Route<P> {
    template: () => string;
  }
}
