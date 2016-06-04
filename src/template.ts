export function template<P>(params: P): string {
  return '/' + this.parts.join('/');
}
