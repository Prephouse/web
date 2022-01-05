# Prephouse Frontend (ph-web)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

## Instructions

You can run the Prephouse website in development mode on either your local development server or a
Docker container.

### Setup

#### Local Development Server

1. Download and install [Node.js 16][node] and the [pnpm][] package manager
2. Copy the environment variable files (.env.\*) to the root directory of this repository
3. Run `pnpm install` to install the [project dependencies](package.json)

#### Docker Container

1. Download and install [Docker Desktop][docker-desktop] and [Docker Compose][docker-compose]
2. Copy the environment variable files (.env.\*) to the root directory of this repository
3. Run Docker Desktop on your machine
4. Run `docker-compose build`

### Startup

Once you have set up the local development server or Docker container, you can run the Prephouse
website in the respective environment.

#### Local Development Server

1. Run `pnpm start`
2. Navigate to <http://localhost:3000> on your web browser

#### Docker Container

1. Run Docker Desktop on your machine
2. Run `docker-compose up`
3. Navigate to <http://localhost:3000> on your web browser

### Development

- Run `pnpm add -D <package-name>` or `pnpm add <package-name>` to install the corresponding npm
  package as a development dependency or universal dependency respectively in
  [package.json](package.json)
- Run `pnpm i` when you need to install any new packages
- Run `pnpm store prune` at your own convenience if your machine is low on disk space and contains
  orphan node modules in its pnpm store
- A hot reload of the Prephouse website will be triggered whenever you modify the [src](src)
  directory or its files
- If you want to serve your local development server over HTTPS, then follow these steps on your CLI
  **in the root directory of this repository**

  1. Install the [mkcert][] tool
  2. Run `mkcert -install` to install a local certificate authority (CA)
  3. Run `mkdir -p .cert`
  4. Run `mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"` to create an SSL
     certificate
  5. Run `pnpm startsecure`
  6. Navigate to <https://localhost:3000> on your web browser \
     <br />

  > You must ensure that both the key.pem and cert.pem are stored in the .cert directory as that
  > directory is (a) where webpack is configured to look and (b) configured to be ignored by git.
  > Never commit the certificate to the git repository.

[node]: https://nodejs.org/en/
[pnpm]: https://pnpm.io/installation
[docker-desktop]: https://www.docker.com/products/docker-desktop
[docker-compose]: https://docs.docker.com/compose/install/
[mkcert]: https://github.com/FiloSottile/mkcert#installation

## Troubleshooting

### OpenSSL provider

If you encounter an issue with OpenSSL when running `pnpm start` on Node.js 17, you should either
use Node.js 16 (the latest LTS version) _or_ set `NODE_OPTIONS=--openssl-legacy-provider` as a local
environment variable.

### Dependency resolution

If pnpm fails to install a particular package or find the required dependencies, you should delete
the project-level node modules folder and run `pnpm i --frozen-lockfile`. As a last resort, you
could also try deleting your pnpm store (run `pnpm store path` to get the path of the store) and/or
the pnpm state directory and pnpm-lock.yaml file which usually share the same parent directory as
the store. However, this last resort may drastically affect the installation time for other pnpm
projects.

## Browser Compatibility

**Last Updated** Nov 11 2021

- Chrome 80+
- Edge 80+
- Firefox 74+
- Opera 67+
- Safari 13.1+

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
plugin_][ts-eslint-plugin]. To this end, we utilize [Prettier](.prettierrc) and [ESLint](.eslintrc)
to enforce these styling rules. If you use VSCode or WebStorm, your code will be auto-formatted
whenever you save it. Moreover, a pre-commit hook has been created to enforce these styling rules
when you attempt to commit your code to the git repository.

[airbnb-style-guide]: https://github.com/airbnb/javascript
[ts-eslint-plugin]:
  https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin

## Internalization

You should place any translatable strings in the appropriate locale within the
[translations](./src/strings/translations) directory. Then, you can use the [react-intl][react-intl]
library in the code to retrieve the translated strings for the current user locale.

The strings should be formatted as [ICU messages][icu-message]. Take extra pre-caution for strings
that may be pluralized.

[react-intl]: https://formatjs.io/docs/react-intl/
[icu-message]:
  https://lokalise.com/blog/complete-guide-to-icu-message-format/
  'A complete guide to the ICU message format'
