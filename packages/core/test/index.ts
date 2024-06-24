import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import * as sinon from "sinon";

chai.use(chaiAsPromised);

var sandbox = sinon.createSandbox();

/**
 * restores the original methods after run each test
 */
afterEach(function () {
  sandbox.restore();
});

export { sandbox, chai };
