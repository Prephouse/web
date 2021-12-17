# Prephouse Frontend (ph-web)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

## Instructions

You can run the Prephouse website in development mode in either your local environment or a Docker
container.

### Setup

#### Local Environment

1. Download and install [Node.js 16][node]
2. Install the [pnpm][] package manager
3. Run `pnpm install` on your command line interface (CLI) to install the
   [project dependencies](package.json)

#### Docker Container

1. Download and install [Docker Desktop][docker-desktop] and [Docker Compose][docker-compose]
2. Run Docker Desktop on your machine
3. Run `docker-compose build` on your command line interface (CLI)

### Startup

Once you have set up the local environment or Docker container, you can run the Prephouse website in
the respective environment.

#### Local Environment

1. Run `pnpm start` on your CLI
2. Navigate to <http://localhost:3000> on your web browser

> You may encounter an issue with OpenSSL when running `pnpm start` on Node.js 17. You should
> therefore either use Node.js 16 (the latest LTS version) _or_ set
> `NODE_OPTIONS=--openssl-legacy-provider` as an environment variable.

#### Docker Container

1. Run Docker Desktop on your machine
2. Run `docker-compose up` on your CLI
3. Navigate to <http://localhost:3000> on your web browser

[node]: https://nodejs.org/en/
[pnpm]: https://pnpm.io/installation
[docker-desktop]: https://www.docker.com/products/docker-desktop
[docker-compose]: https://docs.docker.com/compose/install/

### Development

- Run `pnpm add -D <package-name>` and `pnpm add <package-name>` on your CLI so that the
  corresponding package is included as a development dependency or universal dependency respectively
  in [package.json](package.json)
- Run `pnpm i` on your CLI when you need to install any new packages
- Run `pnpm store prune` on your CLI at your own convenience if your machine is low on disk space
  and contains orphan node modules in the pnpm store
- A hot reload of the Prephouse website will be triggered whenever you modify the [src](src)
  directory or its files

## Troubleshooting

If pnpm fails to install a particular package or find the required dependencies, you should delete
the project-level node modules folder and run `pnpm i --frozen-lockfile`. As a last resort, you
could also try deleting your pnpm store (run `pnpm store path` to get the path of the store) and/or
the pnpm state directory and pnpm-lock.yaml file which usually share the same parent directory as
the store. However, this last resort may drastically affect the installation time for other pnpm
projects.

## Browser Compatibility

**Last Updated** Nov 11, 2021

- Chrome 80+
- Edge 80+
- Firefox 74+
- Opera 67+
- Safari 13.1+

## Developer Tools

We support both Visual Studio Code and WebStorm out of the box with the proper configurations
automatically calibrated. Furthermore, we recommend installing the _React Developer Tools_
([Chrome][react-ext-chrome] | [Firefox][react-ext-firefox] | [Edge][react-ext-edge]) and _Redux
DevTools_ ([Chrome][redux-ext-chrome] | [Firefox][redux-ext-firefox]) browser extensions.

[react-ext-chrome]:
  https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en
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
