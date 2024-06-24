import Axios, { AxiosResponse } from "axios";
import {
  Person,
  GlobalPeoplePlatformApiRequestError,
  GlobalPeoplePlatformApi,
} from "../../../src/integrations";
import { sandbox, chai } from "../..";
import fakerStatic from "faker";

const naturaCode = fakerStatic.lorem.word();
const invalidNaturaCode = fakerStatic.lorem.word();
const personId = fakerStatic.random.uuid();
const tenantId = fakerStatic.random.uuid();
const options = {
  baseUrl: fakerStatic.internet.domainWord(),
  APIKey: fakerStatic.random.uuid(),
};

const expectedGPPResponse: AxiosResponse<Person[]> = {
  data: [
    {
      approvedCandidate: {
        candidateId: naturaCode,
        personId,
      },
      naturaCode,
      personId,
      tenantId,
    },
  ],
  status: 200,
  statusText: "success",
  headers: {},
  config: {},
};

describe("GlobalPeoplePlatformApi", (): void => {
  describe("fetchPersonByNaturaCode", (): void => {
    it("should throw GPPRequestError when natura code doesn't exists", async (): Promise<void> => {
      await GlobalPeoplePlatformApi.configure(options);
      sandbox.stub(Axios, "request").throws(new Error(""));
      const response = GlobalPeoplePlatformApi.fetchPersonByNaturaCode(
        tenantId,
        invalidNaturaCode
      );
      await chai
        .expect(response)
        .to.be.rejectedWith(GlobalPeoplePlatformApiRequestError);
    });

    it("should return person when natura code exists", async (): Promise<void> => {
      await GlobalPeoplePlatformApi.configure(options);
      sandbox
        .stub(Axios, "request")
        .returns(Promise.resolve(expectedGPPResponse));
      const response = GlobalPeoplePlatformApi.fetchPersonByNaturaCode(
        tenantId,
        naturaCode
      );
      await chai.expect(response).to.eventually.equal(expectedGPPResponse.data);
    });
  });
});
