# Prephouse Frontend

## Development Setup
1. Run `brew install yarn` to install the yarn dependency manager
2. Open a tab, in the root directory of this project, on your command line interface (CLI)
3. Run `yarn install` on your CLI to install the [project dependencies](package.json)
4. Complete the development setup process for the other subsystems

## Local Website Startup
1. Run `yarn start` on your CLI
2. Navigate to [http://localhost:3000](http://localhost:3000) on your web browser

## Compatibility
As of November 11, 2021, Prephouse supports the following browsers:

- Chrome 80+
- Edge 80+
- Firefox 74+
- Opera 67+
- Safari 13.1+

## Development Tools
The following development tools are recommended for this project:

- React Developer Tools &ndash;
  [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) |
  [Firefox](https://addons.mozilla.org/en-CA/firefox/addon/react-devtools/) |
  [Edge](https://microsoftedge.microsoft.com/addons/detail/gpphkfbcpidddadnkolkpfckpihlkkil)
- Redux DevTools &ndash;
  [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) |
  [Firefox](https://addons.mozilla.org/en-CA/firefox/addon/reduxdevtools/)

## Code Style
We're utilizing [Prettier](https://prettier.io/) to enforce certain [styling rules](.prettierrc). If you use VSCode,
your code will be auto-formatted whenever you save it. If you use Webstorm, go to Languages & Frameworks > JavaScript >
Prettier in the IDE preferences, and then check "On 'Reformat code' action" and "On save".

A git pre-commit hook has been set up with [Husky](https://typicode.github.io/husky/#/) to enforce
these styling rules. When you attempt to make a commit that includes changes that do not satisfy the
rules, the hook will automatically try to refactor your code and add the refactored code to your commit;
otherwise, the hook will reject your commit, and you will need to manually refactor your code.

## Internalization
In order to keep our user-facing strings in one place for easy search and modification,
and in order to potentially support i18n in the feature, place your strings
_only_ in [strings.ts](./src/strings/strings.ts) and use the [react-intl](https://formatjs.io/docs/react-intl/)
library. Take extra pre-caution for strings that may be pluralized.
