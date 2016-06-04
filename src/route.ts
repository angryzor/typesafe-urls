import { all } from './selectors/all';

export interface Properties {
  [index: string]: string | number;
}

export interface Selector<P> {
  (params: P): Properties;
}

export interface Renderer<P> {
  (params: P): string;
}

export class Route<P> {
  private _parts: Array<string>;

  constructor(template: string, private _selector: Selector<P> = all) {
    this._parts = template.split('/').filter((s) => s.length != 0);
  }

  renderProperties(params: P) {
    return this._selector(params);
  }

  get parts() {
    return this.parts;
  }
}
