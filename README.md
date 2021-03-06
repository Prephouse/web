# Prephouse Frontend (ph-web)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

## Instructions

### Setup

1. Download and install [Node.js 17][node] and the [pnpm][] package manager
2. Copy the environment variable files (.env.\*) to the root directory of this repository
3. Run `pnpm i -g typescript@4` to install the TypeScript libraries and compiler
4. Run `pnpm i` to install the project [dependencies](package.json)

### Startup

1. Run `pnpm start`
2. Navigate to <http://localhost:3000> on your web browser

### Deployment

The production version of the Prephouse website is hosted on Netlify. You can sign in to Netlify
with the Prephouse admin account to view the deployment history and the status of any current
deployments. We created a continuous deployment (CD) pipeline that automatically deploys changes in
the release branch to the production environment. To trigger this pipeline, you need to create a
pull request on GitHub from the main branch, and include your changes in the PR. Once the PR is
merged to the release branch, Netlify will automatically create a new build.

### Development

#### Packages

- Run `pnpm add -D <package-name>` or `pnpm add <package-name>` to install the corresponding npm
  package as a development dependency or universal dependency respectively in
  [package.json](package.json)
- Run `pnpm i` when you need to install any new packages
- Run `pnpm store prune` at your own convenience if your machine is low on disk space and contains
  orphan node modules in its pnpm store

#### Serve over HTTPS

If you want to serve your local development server over HTTPS, then follow these steps **in the root
directory of this repository**.

1. Install the [mkcert][mkcert] tool
2. Run `mkcert -install` to install a local certificate authority (CA)
3. Run `mkdir .cert`
4. Run `mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"` to create an SSL
   certificate
5. Run `pnpm start:secure`
6. Navigate to <https://localhost:3000> on your web browser

Both key.pem and cert.pem must be stored in the .cert directory as webpack will search that
directory for the certificate during the build process, and git will ignore that directory. Do
**not** commit the certificate to the git repository.

#### Miscellaneous

- A hot reload of the Prephouse website will be triggered whenever you add, modify or delete any
  files in the [src](src) directory
- Place any client-side images in the [public/images](public/images) directory
  - Try to compress your image using some online tool (e.g., [tinypng][tinypng] for png, jpeg and
    webp files)
  - If the image is used exclusively in an HTML `img` element with a fixed width and height, resize
    the image to be close to the width and image of the HTML element
  - If the image is large, convert it to the WebP format and place that in
    [public/images](public/images) as the primary image along with the original image as a fallback
    image

[node]: https://nodejs.org/en/
[pnpm]: https://pnpm.io/installation
[docker-desktop]: https://www.docker.com/products/docker-desktop
[docker-compose]: https://docs.docker.com/compose/install/
[tinypng]: https://tinypng.com/
[mkcert]: https://github.com/FiloSottile/mkcert#installation

## Developer Tools

We support Visual Studio Code and WebStorm out of the box. Furthermore, we recommend installing the
_React Developer Tools_ ([Chrome][react-ext-chrome] | [Firefox][react-ext-firefox] |
[Edge][react-ext-edge]), _Redux DevTools_ ([Chrome][redux-ext-chrome] |
[Firefox][redux-ext-firefox]) and _axe DevTools_ ([Chrome][axe-chrome]) browser extensions.

If you use WebStorm 2020.2 or later, you should set pnpm as the project package manager in the IDE
preferences (Preferences > Languages & Frameworks > Node.js). This way, you can run pnpm commands on
WebStorm. Consult the relevant WebStorm [help page][pnpm-ws-help] for more information.

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
[pnpm-ws-help]:
  https://www.jetbrains.com/help/webstorm/installing-and-removing-external-software-using-node-package-manager.html

## Code Style

We are following, with some exceptions, the commonly recommended TypeScript and React styling rules
which includes the rules specified in the [_Airbnb JavaScript Style Guide_][airbnb-style-guide]
(adopted for TypeScript) and the recommended rules for the [_TypeScript ESLint
plugin_][ts-eslint-plugin]. To this end, we utilize [Prettier](.prettierrc), [ESLint](.eslintrc) and
[Stylelint](.stylelintrc) to enforce these styling rules. If you use VSCode or WebStorm, your code
will be auto-formatted whenever you save it. Moreover, the pre-commit hook will check your code for
any violations of these styling rules.

[airbnb-style-guide]: https://github.com/airbnb/javascript
[ts-eslint-plugin]:
  https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin

## Troubleshooting

### Dependency resolution

If pnpm fails to install a particular package or find the required dependencies, you should delete
the project-level node modules folder and run `pnpm i --frozen-lockfile`. As a last resort, you
could also try deleting your pnpm store (run `pnpm store path` to get the path of the store) and/or
the pnpm state directory and pnpm-lock.yaml file which usually share the same parent directory as
the store. However, this last resort may drastically affect the installation time for other pnpm
projects.

### RTK Query hook

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
    getSomething: builder.query(
      /* query implementation */
    ),
  }),
});

// with the BAD import, the createApi function wouldn't generate the useGetAQuery hook
// and hence this export statement would fail
export const { useGetSomethingQuery } = someApi;
```
