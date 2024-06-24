import { GlobalPeoplePlatformApi, Person } from "../../src/integrations";
import {
  UsernameExchanger,
  UsernameExchangerOptions,
} from "../../src/exchangers";
import { ConfigurationError, Username, UsernameNotFoundError } from "../../src";
import { chai, sandbox } from "../index";
import fakerStatic from "faker";

const options: UsernameExchangerOptions = {
  country: fakerStatic.address.county(),
  peopleBaseUrl: fakerStatic.internet.domainWord(),
  peopleToken: fakerStatic.random.uuid(),
};

const personId = fakerStatic.random.uuid();
const naturaCode = "2223598";

const person: Person = {
  approvedCandidate: {
    candidateId: naturaCode,
    personId: personId,
  },
  tenantId: fakerStatic.random.uuid(),
  personId: personId,
  naturaCode: naturaCode,
};

describe("UsernameExchanger", (): void => {
  describe("exchange", (): void => {
    it("should throw an error if GlobalPeoplePlatformApi configuration throws an error", async (): Promise<void> => {
      sandbox
        .stub(GlobalPeoplePlatformApi, "configure")
        .throws(new ConfigurationError(""));
      await chai
        .expect(UsernameExchanger.configure(options))
        .to.be.rejectedWith(ConfigurationError);
    });

    it("should throw ConfigurationError when exchange is called without call configure before", async (): Promise<void> => {
      const username = new Username(personId);
      await chai
        .expect(UsernameExchanger.exchange(username))
        .to.be.rejectedWith(ConfigurationError);
    });

    it("should return provided username when username type doesn't requires exchange", async (): Promise<void> => {
      await UsernameExchanger.configure(options);
      const username = new Username(personId);
      const result = await UsernameExchanger.exchange(username);
      chai.expect(result.value).to.be.equal(username.value);
    });

    it("should return provided username of type personId when provided username requires exchange", async (): Promise<void> => {
      sandbox
        .stub(GlobalPeoplePlatformApi, "fetchPersonByNaturaCode")
        .returns(Promise.resolve([person]));

      const username = new Username(naturaCode);
      const result = await UsernameExchanger.exchange(username);
      chai.expect(result.value).to.be.equals(personId);
    });

    it("should throw UsernameNotFound when provided username doesn't returns any data from Global People Platform", async (): Promise<void> => {
      sandbox
        .stub(GlobalPeoplePlatformApi, "fetchPersonByNaturaCode")
        .returns(Promise.resolve([]));
      const username = new Username(naturaCode);
      await chai
        .expect(UsernameExchanger.exchange(username))
        .to.be.rejectedWith(UsernameNotFoundError);
    });
  });
});
