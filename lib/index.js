"use strict";

var vile = require("vile");
var _ = require("lodash");
var Promise = require("bluebird");
var depcheck = require("depcheck");

var PKG_INFO = "package.json";

var punish = function punish(plugin_config) {
  var config = _.get(plugin_config, "config", {});
  var opts = {
    ignoreMatches: _.get(config, "ignore_deps", []),
    ignoreDirs: _.get(config, "ignore_dirs", []),
    withoutDev: _.get(config, "ignore_dev_deps", true)

    // TODO: refactor things out
  };return new Promise(function (resolve, reject) {
    depcheck(process.cwd(), opts, function (unused) {
      var issues = [];

      _.each(unused.dependencies, function (dep) {
        issues.push(vile.issue({
          type: vile.MAIN,
          path: PKG_INFO,
          title: "unused module",
          message: "" + dep,
          signature: "depcheck::" + dep
        }));
      });

      _.each(unused.devDependencies, function (dep) {
        issues.push(vile.issue({
          type: vile.MAIN,
          path: PKG_INFO,
          title: "unused dev module",
          message: "" + dep,
          signature: "depcheck::" + dep
        }));
      });

      _.each(unused.invalidFiles, function (err, file) {
        issues.push(vile.issue({
          type: vile.ERR,
          path: file,
          title: "invalid file",
          message: _.get(err, "stack"),
          signature: "depcheck::invalid::" + file
        }));
      });

      resolve(issues);
    });
  });
};

module.exports = {
  punish: punish
};