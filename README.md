# vile-depcheck [![Circle CI](https://circleci.com/gh/forthright/vile-depcheck.svg?style=shield&circle-token=af9b51dea76f191842f14db93644dc2d20cb2971)](https://circleci.com/gh/forthright/vile-depcheck) [![score-badge](https://vile.io/api/v0/projects/vile-depcheck/badges/score?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-depcheck) [![coverage-badge](https://vile.io/api/v0/projects/vile-depcheck/badges/coverage?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-depcheck) [![dependency-badge](https://vile.io/api/v0/projects/vile-depcheck/badges/dependency?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-depcheck)

A [Vile](https://vile.io) plugin for identifying unused dependencies in your Node projects (via [depcheck](https://www.npmjs.com/package/depcheck)).

## Requirements

- [Node.js](http://nodejs.org)

## Installation

    npm i -D vile vile-depcheck

## Config Example

```yaml
depcheck:
  config:
    ignore_dev_deps: false
    ignore_dirs:
      - "some-dir"
    ignore_deps:
      - "some-match-*"
```

## Versioning

This project uses [Semver](http://semver.org).

## Licensing

This project is licensed under the [MPL-2.0](LICENSE) license.

Any contributions made to this project are made under the current license.

## Contributions

Current list of [Contributors](https://github.com/forthright/vile-depcheck/graphs/contributors).

Any contributions are welcome and appreciated!

All you need to do is submit a [Pull Request](https://github.com/forthright/vile-depcheck/pulls).

1. Please consider tests and code quality before submitting.
2. Please try to keep commits clean, atomic and well explained (for others).

### Issues

Current issue tracker is on [GitHub](https://github.com/forthright/vile-depcheck/issues).

Even if you are uncomfortable with code, an issue or question is welcome.

### Code Of Conduct

By participating in this project you agree to our [Code of Conduct](CODE_OF_CONDUCT.md).

### Maintainers

- Brent Lintner - [@brentlintner](http://github.com/brentlintner)

## Architecture

- `src` is es6+ syntax compiled with [Babel](https://babeljs.io)
- `lib` generated js library

## Developing

    cd vile-depcheck
    npm install
    npm run dev
    npm test
