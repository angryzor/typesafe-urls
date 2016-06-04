export { Route } from './route';
export { all, own, queryString } from './selectors';
import './add/renderer/link';
import './add/renderer/url';
import './add/template'

// const home = new Route<{}>('/');
// const postsIndex = new Route<{}>('/posts');
// const postDetail = new Route<{ id: number }>('/posts/:id');
//
// postDetail.link({});
// postDetail.link({ id: 3 });
// postDetail.link({ id: 3, foo: 5 });
// postDetail.link(2);
