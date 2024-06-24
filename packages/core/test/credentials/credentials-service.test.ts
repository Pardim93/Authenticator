/* eslint-disable spellcheck/spell-checker */
import { chai, sandbox } from "../index";
import { ParameterStoreApi } from "../../src/integrations";
import {
  CredentialsParameterNames,
  CredentialsService,
} from "../../src/credentials";
import { Environment } from "../../src/";
import { MissConfiguredParameterError } from "../../src/errors";
import fakerStatic from "faker";

const environment: Environment = "qa";
const region = "us-east-1";
const peopleBaseUrl = fakerStatic.internet.url();
const peopleToken = fakerStatic.random.uuid();
const userPoolId = fakerStatic.lorem.word();
const userPoolWebClientId = fakerStatic.lorem.word();

describe("CredentialsService", (): void => {
  describe("fetch", (): void => {
    it("should return parameter store provided values on correct Credentials attributes", async (): Promise<void> => {
      await CredentialsService.configure({
        clientId: fakerStatic.lorem.word(),
        clientSecret: fakerStatic.lorem.word(),
        region,
        environment,
      });

      sandbox.stub(ParameterStoreApi, "getParameters").returns(
        Promise.resolve({
          $metadata: {},
          Parameters: [
            {
              Name: CredentialsParameterNames.getUserPoolId(),
              Value: userPoolId,
            },
            {
              Name: CredentialsParameterNames.getUserPoolWebClientId(),
              Value: userPoolWebClientId,
            },
            {
              Name: CredentialsParameterNames.getRegion(),
              Value: region,
            },
            {
              Name: CredentialsParameterNames.getPeopleBaseUrl(),
              Value: peopleBaseUrl,
            },
            {
              Name: CredentialsParameterNames.getPeopleToken(),
              Value: peopleToken,
            },
          ],
        })
      );

      const response = await CredentialsService.fetch();

      chai.expect(response.peopleBaseUrl).to.be.equal(peopleBaseUrl);
      chai.expect(response.peopleToken).to.be.equal(peopleToken);
      chai.expect(response.region).to.be.equal(region);
      chai.expect(response.userPoolId).to.be.equal(userPoolId);
      chai
        .expect(response.userPoolWebClientId)
        .to.be.equal(userPoolWebClientId);
    });
    it("should throw MissConfiguredParameterError when parameter wasn't fetched", async (): Promise<void> => {
      sandbox
        .stub(ParameterStoreApi, "getParameters")
        .returns(Promise.resolve({}));
      await CredentialsService.configure({
        clientId: fakerStatic.lorem.word(),
        clientSecret: fakerStatic.lorem.word(),
        region,
        environment,
      });
      await chai
        .expect(CredentialsService.fetch())
        .to.be.rejectedWith(MissConfiguredParameterError);
    });
  });
});
