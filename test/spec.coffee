_ = require "lodash"
path = require "path"
Bluebird = require "bluebird"
mimus = require "mimus"
lib = mimus.require "./../lib", __dirname, ["depcheck"]
chai = require "./helpers/sinon_chai"
sinon = require "sinon"
expect = chai.expect
vile = mimus.get lib, "vile"
depcheck = mimus.stub()

depcheck_returns = (dep, dev, invalid) ->
  depcheck.callsArgWith 2,
    dependencies: dep
    devDependencies: dev
    invalidFiles: invalid

describe "checking deps", ->
  afterEach mimus.reset

  before ->
    mimus.set lib, "depcheck", depcheck

  describe "config", ->
    beforeEach -> depcheck_returns [], [], []

    it "supports withoutDev", (done) ->
      lib
        .punish config: ignore_dev_deps: true
        .should.be.fulfilled.notify ->
          depcheck.should.have.been
            .calledWith sinon.match.string,
                        sinon.match withoutDev: true
          done()

    it "supports ignoreDirs", (done) ->
      dirs = ["foo"]

      lib
        .punish config: ignore_dirs: dirs
        .should.be.fulfilled.notify ->
          depcheck.should.have.been
            .calledWith sinon.match.string,
                        sinon.match ignoreDirs: dirs
          done()

    it "supports ignoreMatches", (done) ->
      pkgs = ["bar"]

      lib
        .punish config: ignore_deps: pkgs
        .should.be.fulfilled.notify ->
          depcheck.should.have.been
            .calledWith sinon.match.string,
                        sinon.match ignoreMatches: pkgs
          done()

  describe "when unused deps found", ->
    before -> depcheck_returns ["foo"], [], []

    it "generates an error", ->
      issues = [vile.issue(
        vile.ERROR, "package.json", "unused module: foo"
      )]

      lib.punish().should.become issues

  describe "when unused dev deps found", ->
    beforeEach -> depcheck_returns [], ["bar"], []

    it "generates a warning", ->
      issues = [vile.issue(
        vile.WARNING, "package.json", "unused dev module: bar"
      )]

      lib.punish().should.become issues

  describe "when invalid files found", ->
    beforeEach -> depcheck_returns [], [], ["file"]

    it "generates an info", ->
      issues = [vile.issue(
        vile.INFO, "package.json", "invalid file: file"
      )]

      lib.punish().should.become issues

  describe "when nothing is found", ->
    beforeEach -> depcheck_returns [], [], []

    it "generates an OK issue", ->
      issues = [vile.issue(vile.OK, "package.json")]

      lib.punish().should.become issues
