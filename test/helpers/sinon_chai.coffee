sinon = require "sinon"
chai = require "chai"
sinonChai = require "sinon-chai"
chaiAsPromised = require "chai-as-promised"

chai.use sinonChai
    .use chai.should
    .should()

chai.use chaiAsPromised

module.exports = chai
