import { chai } from "../index";
import { CredentialsParameterNames } from "../../src/credentials";
import { Environment } from "../../src/";

describe("CredentialsParameterNames", (): void => {
  describe("parameter name should contain the provided environment in their path", (): void => {
    it("should return correct environment prefix", async (): Promise<void> => {
      const environment: Environment = "qa";
      await CredentialsParameterNames.configure(environment);
      chai
        .expect(CredentialsParameterNames.getUserPoolWebClientId())
        .to.contain(environment);
      chai
        .expect(CredentialsParameterNames.getUserPoolId())
        .to.contain(environment);
      chai
        .expect(CredentialsParameterNames.getRegion())
        .to.contain(environment);
      chai
        .expect(CredentialsParameterNames.getPeopleToken())
        .to.contain(environment);
      chai
        .expect(CredentialsParameterNames.getPeopleBaseUrl())
        .to.contain(environment);
    });
  });
});
