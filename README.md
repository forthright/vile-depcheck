# vile-depcheck [![Circle CI](https://circleci.com/gh/forthright/vile-depcheck.svg?style=svg&circle-token=af9b51dea76f191842f14db93644dc2d20cb2971)](https://circleci.com/gh/forthright/vile-depcheck)

[![score-badge](https://vile.io/api/v0/projects/vile-depcheck/badges/score?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-depcheck) [![security-badge](https://vile.io/api/v0/projects/vile-depcheck/badges/security?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~/brentlintner/vile-depcheck) [![coverage-badge](https://vile.io/api/v0/projects/vile-depcheck/badges/coverage?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~/brentlintner/vile-depcheck) [![dependency-badge](https://vile.io/api/v0/projects/vile-depcheck/badges/dependency?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~/brentlintner/vile-depcheck)

A [vile](https://vile.io) plugin for reporting unused node modules, using [depcheck](https://www.npmjs.com/package/depcheck).

## Requirements

- [nodejs](http://nodejs.org)
- [npm](http://npmjs.org)

## Installation

    npm i vile-depcheck

## Config Example

```yaml
depcheck:
  config:
    ignore_dev_deps: false
    ignore_dirs: [ "some-dir" ]
    ignore_deps: [ "some-match-*" ]
```

## Architecture

- `src` is es6+ syntax compiled with [babel](https://babeljs.io)
- `lib` generated js library

## Hacking

    cd vile-depcheck
    npm install
    npm run dev
    npm test
