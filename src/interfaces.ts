export interface Properties {
  [index: string]: string | number;
}

export interface Selector<P> {
  (params: P): Properties;
}

export interface Renderer<P> {
  (params: P): string;
}
