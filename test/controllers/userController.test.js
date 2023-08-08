const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { faker } = require("@faker-js/faker");

chai.use(sinonChai);
const { Users } = require("../../models");
const { signup } = require("../../controllers/User");
const { expect } = chai;

describe("User Controller", async () => {
  const sandbox = sinon.createSandbox();
  const mockResponse = function () {
    const res = {};
    res.status = sandbox.stub().returns(res);
    res.send = sandbox.stub().returns(res);
    return res;
  };

  afterEach(() => {
    sandbox.restore();
  });

  it("Failed to signup, details are not correct", async () => {
    const req = {
      body: {
        userName: faker.internet.userName(),
        password: "password",
      },
    };
    const res = mockResponse();
    sandbox.stub(Users, "create").returns(null);

    await signup(req, res);

    expect(res.status.calledOnce).to.be.true;
    expect(res.send.calledOnce).to.be.true;
    expect(res.status).calledWith(409);
    expect(res.send).calledWith("Details are not correct");
  });
});
