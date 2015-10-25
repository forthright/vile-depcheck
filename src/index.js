let vile = require("@brentlintner/vile")
let _ = require("lodash")
let Promise = require("bluebird")
let depcheck = require("depcheck")

const PKG_INFO = "package.json"

let punish = (plugin_config) => {
  let config = _.get(plugin_config, "config", {})
  let opts = {
    ignoreMatches: _.get(config, "ignore_deps", []),
    ignoreDirs:    _.get(config, "ignore_dirs", []),
    withoutDev:    _.get(config, "ignore_dev_deps", false)
  }

  // TODO: refactor things out
  return new Promise((resolve, reject) => {
    depcheck(process.cwd(), opts, (unused) => {
      let issues = []

      _.each(unused.dependencies, (dep) => {
        issues.push(
          vile.issue(vile.ERROR, PKG_INFO, `unused module: ${dep}`)
        )
      })

      _.each(unused.devDependencies, (dep) => {
        issues.push(
          vile.issue(vile.WARNING, PKG_INFO, `unused dev module: ${dep}`)
        )
      })

      _.each(unused.invalidFiles, (file) => {
        issues.push(
          vile.issue(vile.INFO, PKG_INFO, `invalid file: ${file}`)
        )
      })

      if (issues.length == 0) {
        issues.push(vile.issue(vile.OK, PKG_INFO))
      }

      resolve(issues)
    })
  })
}

module.exports = {
  punish: punish
}
