"use strict";

var vile = require("@brentlintner/vile");
var _ = require("lodash");
var Promise = require("bluebird");
var depcheck = require("depcheck");

var PKG_INFO = "package.json";

var punish = function punish(plugin_config) {
  var config = _.get(plugin_config, "config", {});
  var opts = {
    ignoreMatches: _.get(config, "ignore_deps", []),
    ignoreDirs: _.get(config, "ignore_dirs", []),
    withoutDev: _.get(config, "ignore_dev_deps", false)
  };

  // TODO: refactor things out
  return new Promise(function (resolve, reject) {
    depcheck(process.cwd(), opts, function (unused) {
      var issues = [];

      _.each(unused.dependencies, function (dep) {
        issues.push(vile.issue(vile.ERROR, PKG_INFO, "unused module: " + dep));
      });

      _.each(unused.devDependencies, function (dep) {
        issues.push(vile.issue(vile.WARNING, PKG_INFO, "unused dev module: " + dep));
      });

      _.each(unused.invalidFiles, function (file) {
        issues.push(vile.issue(vile.INFO, PKG_INFO, "invalid file: " + file));
      });

      if (issues.length == 0) {
        issues.push(vile.issue(vile.OK, PKG_INFO));
      }

      resolve(issues);
    });
  });
};

module.exports = {
  punish: punish
};