# Prephouse Frontend (ph-web)

## Setup Instructions

You can run the Prephouse website in development mode in either your
local environment or a Docker container.

### Local Environment

1. Install the [yarn](https://classic.yarnpkg.com/lang/en/docs/install) dependency manager
2. Run `yarn install` on your command line interface (CLI) to install [project dependencies](package.json)

### Docker Container

1. Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop) and
   [Docker Compose](https://docs.docker.com/compose/install/
2. Run Docker Desktop on your machine
3. Run `docker-compose build` on your command line interface (CLI)

## Startup Instructions

Once you have set up the local environment or Docker container, you can
run the Prephouse website in the respective environment. In either case,
the website will reload when you make any changes to the [src](src)
directory or its files.

### Local Environment

1. Run `yarn start` on your CLI
2. Navigate to [http://localhost:3000](http://localhost:3000) on your web browser

### Docker Container

1. Run Docker Desktop on your machine
2. Run `docker-compose up` on your CLI
3. Navigate to [http://localhost:3000](http://localhost:3000) on your web browser

## Browser Compatibility

As of November 11, 2021, Prephouse supports the following browsers

- Chrome 80+
- Edge 80+
- Firefox 74+
- Opera 67+
- Safari 13.1+

## Development Tools

We recommend the following development tools for this project

- React Developer Tools &ndash;
  [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
  | [Firefox](https://addons.mozilla.org/en-CA/firefox/addon/react-devtools/) |
  [Edge](https://microsoftedge.microsoft.com/addons/detail/gpphkfbcpidddadnkolkpfckpihlkkil)
- Redux DevTools &ndash;
  [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
  | [Firefox](https://addons.mozilla.org/en-CA/firefox/addon/reduxdevtools/)

## Code Style

We are utilizing [Prettier](.prettierrc) and [ESLint](.eslintrc) to enforce certain styling rules. If
you use VSCode, your code will be auto-formatted whenever you save it. If you use Webstorm, go to
Languages & Frameworks > JavaScript > Prettier in the IDE preferences, and then check "On 'Reformat
code' action" and "On save".

A git pre-commit hook has been set up with [Husky](https://typicode.github.io/husky/#/) to enforce
these styling rules. When you attempt to make a commit that includes changes that do not satisfy the
rules, the hook will automatically try to refactor your code and add the refactored code to your
commit; otherwise, the hook will reject your commit, and you will need to manually refactor your
code.

## Internalization

Place your translatable strings _only_ in the appropriate locale within the
[translations](./src/strings/translations) directory and use the
[react-intl](https://formatjs.io/docs/react-intl/) library in the code. Take extra pre-caution for
strings that may be pluralized.
