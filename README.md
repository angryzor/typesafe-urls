NOTE: This library is not yet functional and the API is clunky because parts
are missing, check back soon for a decent version!

# Introduction
This library abstracts your routes away behind type safe objects.
This way it prevents you not only from writing incorrect links to your routes,
but also helps you by pointing out broken links due to routing changes.
This is best explained with an example.

# Usage
typesafe-urls can be used with most router libraries. Some may work immediately,
some may need a plugin package. We're using @ngrx/router for our example.
NOTE: There is a `typesafe-urls-ngrx-router` available which makes it so you
don't have to type `.template()` every time.

routes.ts:
```typescript
import { Routes } from '@ngrx/router';
import { Route } from 'typesafe-urls';

export const homeRoute = new Route<{}>('/');
export const blogRoute = new Route<{}>('/blog');
export const postRoute = new Route<{ id: number }>('/blog/:id');

export const routes: Routes = [{
  path: homeRoute.template(),
  component: HomePage
}, {
  path: blogRoute.template(),
  component: BlogPage,
  children: [{
    path: postRoute.template(),
    component: PostPage
  }]
}]
```

As you can see, route paths are no longer simple strings. They are abstracted away
behind a Route object, and should be referred to through this object only! The
Route object is also specialized with typed parameters corresponding to the
parameters you expect. Let's have a look at what effect this has on the links
referring to these route paths.

some-view.ts:

```typescript
import { postRoute } from '../routes';
import 'typesafe-urls/add/renderer/link';

const template = `<a href="${postRoute.link({ id: 4 })}">A post</a>`;
```

Since you are referring to your routes by means of an imported object, you'll
never have unexpected broken links: your compiler will complain!

Moreover, the parameters to your links are type-checked as well! This makes sure
that whenever your parameters change, you'll be notified by the compiler of all
the places where you have to fix calls!

# Selector functions
We can go even further with a selector function! Suppose you don't like plain
id's and prefer a model instead. You can do this with selector functions.
Let's continue with the previous application:

routes.ts:
```typescript
import { Routes } from '@ngrx/router';
import { Route } from 'typesafe-urls';
import { Post } from '../models';

export const homeRoute = new Route<{}>('/');
export const blogRoute = new Route<{}>('/blog');
export const postRoute = new Route<{ post: Post }>('/blog/:id', (post) => ({ id: post.id }));

export const routes: Routes = [{
  path: homeRoute.template(),
  component: HomePage
}, {
  path: blogRoute.template(),
  component: BlogPage,
  children: [{
    path: postRoute.template(),
    component: PostPage
  }]
}]
```

This time we defined a selector function! A selector function is a function
mapping the type you defined between the angle brackets to an object
with values that can be string-interpolated (string or number).

Now our route requires us to send a Post model as an attribute instead of an
id:

some-view.ts:

```typescript
import { postRoute } from '../routes';
import 'typesafe-urls/add/renderer/link';
import { Post } from '../models';

const aVeryNicePost = new Post("Very nice", "This post is nice.");
const template = `<a href="${postRoute.link({ post: aVeryNicePost })}">A post</a>`;
```

At the moment there are 3 built-in selector functions available:

* `own`: Selects all own properties of an object
* `all`: Selects all properties of an object
* `queryString`: Returns a copy of the object where an extra key is added: `queryString`.
  This key contains  all the parameters passed as an argument to `queryString`
  in query string format. If the renderer finds a `queryString`
  key on the result of the selector function, it will automatically append
  it to the link.

`all` is used by default if no selector is specified.

Example usage:

```typescript
import { own, all, queryString } from 'typesafe-urls/selectors';
import { flowRight } from 'lodash';

export const fooRoute = new Route<{ comment: Comment }>('/blog/:postId/comments/:id', own);
export const barRoute = new Route<{ comment: SpecialComment }>('/blog/:postId/comments/:id', all);
export const bazRoute = new Route<{ uuid: string, startDate?: int, endDate?: int }>('/req/:uuid', queryString(['startDate', 'endDate']));

// Note that selectors can be composed for more specific results:
const advancedSelector = flowRight(
  queryString(['startDate', 'endDate']),
  (input) => Object.assign({}, input, {
    startDate: input.startDate && input.startDate.getTime(),
    endDate: input.endDate && input.endDate.getTime()
  }),
  own
);
export const bazRoute = new Route<{ uuid: string, startDate?: Date, endDate?: Date }>('/req/:uuid', advancedSelector);
```

# Rendering functions
Plugins can write custom rendering functions. This package provides 2 at the
moment: `link` and `url`

```typescript
postRoute.link({ id: 4 })
>> "/blog/4"

postRoute.url({ id: 4 })
>> "https://myverysecureblog.me/blog/4"
```
