# vile-depcheck [![Circle CI](https://circleci.com/gh/brentlintner/vile-depcheck.svg?style=svg&circle-token=af9b51dea76f191842f14db93644dc2d20cb2971)](https://circleci.com/gh/brentlintner/vile-depcheck)

A [vile](http://vile.io) plugin for reporting unused node modules,
using [depcheck](https://www.npmjs.com/package/depcheck).

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
