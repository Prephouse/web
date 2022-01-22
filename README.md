# Prephouse Frontend (ph-web)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

## Instructions

### Setup

1. Download and install [Node.js 16][node] and the [pnpm][] package manager
2. Copy the environment variable files (.env.\*) to the root directory of this repository
3. Run `pnpm i` to install the [project dependencies](package.json)

### Startup

1. Run `pnpm start`
2. Navigate to <http://localhost:3000> on your web browser

### Development

- Run `pnpm add -D <package-name>` or `pnpm add <package-name>` to install the corresponding npm
  package as a development dependency or universal dependency respectively in
  [package.json](package.json)
- Run `pnpm i` when you need to install any new packages
- Run `pnpm store prune` at your own convenience if your machine is low on disk space and contains
  orphan node modules in its pnpm store
- A hot reload of the Prephouse website will be triggered whenever you add, modify or delete any
  files in the [src](src) directory
- If you want to serve your local development server over HTTPS, then follow these steps on your CLI
  **in the root directory of this repository**

  1. Install the [mkcert][] tool
  2. Run `mkcert -install` to install a local certificate authority (CA)
  3. Run `mkdir -p .cert`
  4. Run `mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"` to create an SSL
     certificate
  5. Run `pnpm startsecure`
  6. Navigate to <https://localhost:3000> on your web browser

  > You must ensure that both the key.pem and cert.pem are stored in the .cert directory as that
  > directory is (a) where webpack is configured to look and (b) configured to be ignored by git.
  > Never commit the certificate to the git repository.

[node]: https://nodejs.org/en/
[pnpm]: https://pnpm.io/installation
[docker-desktop]: https://www.docker.com/products/docker-desktop
[docker-compose]: https://docs.docker.com/compose/install/
[mkcert]: https://github.com/FiloSottile/mkcert#installation

## Developer Tools

We support Visual Studio Code and WebStorm out of the box. Furthermore, we recommend installing the
_React Developer Tools_ ([Chrome][react-ext-chrome] | [Firefox][react-ext-firefox] |
[Edge][react-ext-edge]), _Redux DevTools_ ([Chrome][redux-ext-chrome] |
[Firefox][redux-ext-firefox]) and _axe DevTools_ ([Chrome][axe-chrome]) browser extensions.

[react-ext-chrome]:
  https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
  'Chrome Extension'
[react-ext-firefox]:
  https://addons.mozilla.org/en-CA/firefox/addon/react-devtools/
  'Firefox Browser Add-On'
[react-ext-edge]:
  https://microsoftedge.microsoft.com/addons/detail/gpphkfbcpidddadnkolkpfckpihlkkil
  'Microsoft Edge Add-On'
[redux-ext-chrome]:
  https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
  'Chrome Extension'
[redux-ext-firefox]:
  https://addons.mozilla.org/en-CA/firefox/addon/reduxdevtools/
  'Firefox Browser Add-On'
[axe-chrome]:
  https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd
  'Chrome Extension'

## Code Style

We are following, with some exceptions, the commonly recommended TypeScript and React styling rules
which includes the rules specified in the [_Airbnb JavaScript Style Guide_][airbnb-style-guide]
(adopted for TypeScript) and the recommended rules for the [_TypeScript ESLint
plugin_][ts-eslint-plugin]. To this end, we utilize [Prettier](.prettierrc), [ESLint](.eslintrc) and
[Stylelint](.stylelintrc) to enforce these styling rules. If you use VSCode or WebStorm, your code
will be auto-formatted whenever you save it. Moreover, a pre-commit hook has been created to enforce
these styling rules when you attempt to commit your code to the git repository.

[airbnb-style-guide]: https://github.com/airbnb/javascript
[ts-eslint-plugin]:
  https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin

## Troubleshooting

### OpenSSL provider

If you encounter an issue with OpenSSL when running `pnpm start` on Node.js 17, you should either
use Node.js 16 (the latest LTS version) **or** set `NODE_OPTIONS=--openssl-legacy-provider` as a
local environment variable.

### Dependency resolution

If pnpm fails to install a particular package or find the required dependencies, you should delete
the project-level node modules folder and run `pnpm i --frozen-lockfile`. As a last resort, you
could also try deleting your pnpm store (run `pnpm store path` to get the path of the store) and/or
the pnpm state directory and pnpm-lock.yaml file which usually share the same parent directory as
the store. However, this last resort may drastically affect the installation time for other pnpm
projects.

### Missing RTK Query hook

You may have built a query or mutation inside a `createApi` function call using the RTK Query
library but cannot find the hook for that query or mutation in the return value of `createApi`. In
such case, you should check that you imported `createApi` from the `@reduxjs/toolkit/query/react`
module and **not** the `@reduxjs/toolkit/query` module (note the `/react` in the suffix of the name
of the former module). The former module is designed specifically for React projects, and thus
automatically generates the necessary React hooks, whereas the latter module is designed for
JavaScript projects in general.

```typescript

/* GOOD */ import { createApi } from '@reduxjs/toolkit/query/react';
/* BAD  */ import { createApi } from '@reduxjs/toolkit/query';

const someApi = createApi({
  /* some stuff */
  endpoints: builder => ({
    getA: builder.query(
      /* query implementation */
    ),
  }),
});

// with the BAD import, the createApi function wouldn't generate the useGetAQuery hook
// and hence this export statement would fail
export const { useGetAQuery } = someApi;
```

## Implementation

This section clarifies some details on the implementation of the frontend subsystem. We try to defer
as many details as possible to the official library documentations, but sometimes our implementation
may deviate from other similar projects.

### Internalization (i18n)

If you need to add a new **user-facing** string (not, for example, a JavaScript `Error` message or
Rollbar messages) on the client side, write out that string in English and follow these steps to
ensure that it can get localized to other locales in the future.

1. Check whether one or more words in the string may be pluralized in some instances, e.g., 1 dog
   and 3 dogs
2. Format the string as an [ICU message][icu-message]
3. Place the string in the [index.json](./src/strings/translations/en-US/index.json) file for the
   en-US locale
4. Use the [react-intl][react-intl] library to retrieve the string in a React component

You can substitute the placeholder of an ICU message with almost any JSX element.

```typescript jsx
// assume that index.json contains the { "a.b.c": "Hello, {world}" } key value pair
const intl = useIntl();
// GOOD
intl.formatMessage({ id: 'a.b.c' }, { world: 'World!' });
// GOOD
intl.formatMessage({ id: 'a.b.c' }, { world: <b>World!</b> });
```

Any user-facing numbers, currencies, dates and times should also be localized using the respective
functions in the react-intl library. However, you do **not** need to be concerned about the
localization for the **built-in** MUI components, except in parts of the component that have been
overwritten (e.g., where some default text has been replaced with a custom one), as the default
localization has already been handled by open source contributors of the MUI library.

The localized strings are loaded asynchronously for each locale in order to optimize site loading
performance. Further information on the i18n implementation can be found in the
[locales.ts](src/strings/locales.ts) file.

[react-intl]: https://formatjs.io/docs/react-intl/
[icu-message]:
  https://lokalise.com/blog/complete-guide-to-icu-message-format/
  'A complete guide to the ICU message format'

### Client-server communication

We use the [RTK Query][rtk-query] library to fetch and cache data from servers, including from the
Prephouse backend server, through queries and mutations. The library integrates very well with Redux
(see [Global State Management](#global-state-management)) and handles a lot of the boilerplate code
for us. The library is by default framework-agnostic, but we want to utilize React hooks to call our
queries and mutations so make sure to use the React "version" of the library.

```typescript
// GOOD — React version of RTX Query
import { createApi } from '@reduxjs/toolkit/query/react';
// BAD — default (general) version of RTX Query
import { createApi } from '@reduxjs/toolkit/query';
```

Follow the official RTK Query documentation for instructions on implementing a new query or mutation
on the client. Do **not** use the RTK Query version of the `baseQuery` function; we have our own
custom implementations of that function as highlighted in the subsequent paragraphs of this readme.
The queries and mutations should be placed in the proper service in the [services](src/services)
directory. We have one separate service for each base URL.

For REST APIs, although RTK Query provides its own HTTP client, we use [Axios][axios] as our HTTP
client as the latter provides more customization options. We provide
[`baseQuery`](src/services/query.ts) and [`rawBaseQuery`](src/services/query.ts) functions that you
can utilize as the base query in the RTK Query `createApi` function. The `baseQuery` function
automatically converts the HTTP request and response keys to snake case and camel case respectively.
This is particularly important for the Prephouse APIs since our backend server expects snake case in
accordance with our Python variable naming rules but the client uses camel case. On the other hand,
the `rawBaseQuery` function does **not** perform any pre- or post-processing on the HTTP request and
response data.

[rtk-query]: https://redux-toolkit.js.org/rtk-query/overview
[axios]: https://axios-http.com/docs/intro
[graphql-request]: https://github.com/prisma-labs/graphql-request

### Global state management

We use [react-redux][react-redux] to manage the global application states. The Redux actions and
reducers can be found in the [states](src/states) directory, and the corresponding Redux store in
[store.ts](src/store.ts).

We follow most rules, including all priority A rules, in the [Redux Style Guide][react-style-guide].
However, we continue to use JavaScript functions and operators, such as the spread operator, instead
of Immer to immutably update the Redux states.

We utilize the `createAction` and `createReducer` functions in the [Redux Toolkit][redux-toolkit] to
create our actions and reducers respectively. Furthermore, we use the
[`useAppDispatch`](src/hooks/useAppDispatch.ts) and [`useAppSelector`](src/hooks/useAppSelector.ts)
hooks in lieu of the react-redux `useDispatch` and `useSelector` hooks respectively (see the
following code block for how their behaviours differ). These approaches minimize the amount of
boilerplate code, which was a common criticism of Redux in the past, in our Redux logic.

```typescript
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

import { useAppSelector } from 'src/hooks/useAppSelector';

// GOOD - minimal boilerplate code
const firstName1 = useAppSelector(state => state.person.firstName);

// BAD — must always specify the type of the `state` parameter
const firstName2 = useSelector((state: RootState) => state.person.firstName);
```

[react-redux]: https://redux.js.org/usage/index
[react-style-guide]: https://redux.js.org/style-guide/style-guide
[redux-toolkit]: https://redux-toolkit.js.org/usage/usage-guide

### Form management

We use the [Formik][formik] library to create our HTML forms and manage the state of such forms. The
library can be easily integrated with the MUI components as demonstrated [here][formik-mui-example].

[formik]: https://formik.org/
[formik-mui-example]: https://formik.org/docs/examples/with-material-ui

### Schema declaration and validation

We use the [Zod][zod] library to declare and validate the schema of values, such as form input
values or API response values, on the client. We refer to any schema declared using Zod as a "zod
schema".

In order to declare a zod schema, follow these steps:

1. Implement your zod schema, or a function that generates a dynamic zod schema; consult the Zod
   documentation
2. Place your zod schema in the [schemas](src/schemas) directory
3. Declare the TypeScript type for the schema using the `infer` function in Zod

As highlighted in step 2, Zod is able to infer and generate the TypeScript types of the schemas at
compile-time. Consequently, we can ensure type safety when working with the corresponding data, such
as when setting initial input values in our HTML forms as exemplified in the following code block.

```typescript
import { z } from 'zod';

const schema = z.object({
  school: z.string(),
});
type Schema = z.infer<typeof schema>;

const initialValues: Schema = {
  school: 'University of Waterloo',
};
```

In order to validate the inputs of a Formik form (see [Form Management](#form-management)) against a
zod schema, call the `toFormikValidationSchema` function from the zod-formik-adapter library on that
schema. This function returns a Formik validation schema that can then be passed on the
`validationSchema` prop in the `Formik` component. As long as the keys in the zod schema object
matches the names of each form input component (e.g., the name prop in the Formik `Field`
component), the form inputs will be automatically validated by Formik with minimal boilerplate code
and any error message will be passed on from the zod schema to the corresponding erroneous form
input.

Any client-side schema validation should **not** serve as a replacement for server-side validation.
A user can change the JavaScript logic on the client and thus bypass the validation. Instead,
client-side validation is designed to avoid the need to make unnecessary API calls that the client
already knows would fail on the server.

[zod]: https://github.com/colinhacks/zod
