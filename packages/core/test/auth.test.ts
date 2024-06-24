import { Auth as AmplifyAuth } from "@aws-amplify/auth";
import {
  Auth,
  ConfigurationError,
  AuthOptions,
  UsernameTypeError,
  UsernameType,
  Username,
  Environment,
  Language,
} from "../src";
import { Credentials, CredentialsService } from "../src/credentials";
import { sandbox, chai } from ".";
import fakerStatic from "faker";
import { UsernameExchanger } from "../src/exchangers";
import sinon from "sinon";

const naturaCodeExample = "2223598";
const personIdExample = fakerStatic.random.uuid();
const region = "us-east-1";
const language: Language = "en";
const environment: Environment = "qa";

const options: AuthOptions = {
  clientId: fakerStatic.lorem.word(),
  clientSecret: fakerStatic.lorem.word(),
  company: fakerStatic.lorem.word(),
  country: fakerStatic.address.country(),
  environment: environment,
  language: language,
  region: region,
};

const gppCredentials: Credentials = {
  peopleBaseUrl: fakerStatic.internet.domainWord(),
  peopleToken: fakerStatic.random.uuid(),
  region: region,
  userPoolId: fakerStatic.lorem.word(),
  userPoolWebClientId: "",
};

async function fakeConfigure(types?: UsernameType[]): Promise<void> {
  sandbox.stub(CredentialsService, "configure").returns(Promise.resolve());
  sandbox
    .stub(CredentialsService, "fetch")
    .returns(Promise.resolve(gppCredentials));
  sandbox.stub(UsernameExchanger, "configure").returns(Promise.resolve());
  sandbox.stub(AmplifyAuth, "configure").returns({});
  await Auth.configure(
    Object.assign({}, options, { acceptedUsernameTypes: types })
  );
}

describe("auth", (): void => {
  describe("configure", (): void => {
    it("should throw an error if provided acceptable username types doesn't contains at least default types", async (): Promise<void> => {
      const invalidOptions = Object.assign({}, options);
      invalidOptions.acceptedUsernameTypes = ["email"];
      await chai
        .expect(Auth.configure(invalidOptions))
        .to.be.rejectedWith(ConfigurationError);
    });
    it("should throw an error if credentials exchanger configuration throws an error", async (): Promise<void> => {
      sandbox
        .stub(CredentialsService, "configure")
        .throws(new ConfigurationError(""));
      await chai
        .expect(Auth.configure(options))
        .to.be.rejectedWith(ConfigurationError);
    });
  });

  describe("onBeforeConfigure", (): void => {
    describe("signIn", (): void => {
      it("should throw an error when called", async (): Promise<void> => {
        await chai
          .expect(Auth.signIn("", ""))
          .to.be.rejectedWith(ConfigurationError);
      });
    });
    describe("signOut", (): void => {
      it("should throw an error when called", async (): Promise<void> => {
        await chai
          .expect(Auth.signOut())
          .to.be.rejectedWith(ConfigurationError);
      });
    });
  });

  describe("signIn", (): void => {
    it("should complete when default type and valid username and password is provided", async (): Promise<void> => {
      await fakeConfigure(["email", "personId"]);
      sandbox.stub(AmplifyAuth, "signIn").returns(Promise.resolve(undefined));
      await chai
        .expect(Auth.signIn(personIdExample, ""))
        .to.eventually.equal(undefined);
    });
    it("should complete when non default type and valid username and password is provided", async (): Promise<void> => {
      await fakeConfigure(["naturaCode", "email", "personId"]);
      sandbox
        .stub(UsernameExchanger, "exchange")
        .returns(Promise.resolve(new Username(personIdExample)));
      sandbox.stub(AmplifyAuth, "signIn").returns(Promise.resolve(undefined));
      await chai
        .expect(Auth.signIn(naturaCodeExample, ""))
        .to.eventually.equal(undefined);
    });
    it("should throw an error when invalid credentials are provided", async (): Promise<void> => {
      await fakeConfigure();
      sandbox.stub(AmplifyAuth, "signIn").throws(new Error(""));
      await chai
        .expect(Auth.signIn("", ""))
        .to.be.rejectedWith(UsernameTypeError);
    });
    it("should throw an error when disabled username type are provided", async (): Promise<void> => {
      await fakeConfigure(["email", "personId"]);
      await chai
        .expect(Auth.signIn(naturaCodeExample, ""))
        .to.be.rejectedWith(UsernameTypeError);
    });
  });

  describe("signOut", (): void => {
    it("should complete when there is a user loggedIn", async (): Promise<void> => {
      await fakeConfigure(["email", "personId"]);
      sinon.stub(AmplifyAuth, "signOut").returns(Promise.resolve());
      await chai.expect(Auth.signOut()).to.eventually.equal(undefined);
    });
  });
});
