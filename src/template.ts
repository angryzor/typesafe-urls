export function template(): string {
  return '/' + this.parts.join('/');
}
