let vile = require("@forthright/vile")
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
          vile.issue({
            type: vile.MAIN,
            path: PKG_INFO,
            title: "unused module",
            message: `${dep}`,
            signature: `depcheck::${dep}`
          })
        )
      })

      _.each(unused.devDependencies, (dep) => {
        issues.push(
          vile.issue({
            type: vile.MAIN,
            path: PKG_INFO,
            title: "unused dev module",
            message: `${dep}`,
            signature: `depcheck::${dep}`
          })
        )
      })

      _.each(unused.invalidFiles, (file) => {
        issues.push(
          vile.issue({
            type: vile.ERR,
            path: PKG_INFO,
            title: "invalid file",
            message: file,
            signature: `depcheck::${file}`
          })
        )
      })

      resolve(issues)
    })
  })
}

module.exports = {
  punish: punish
}
