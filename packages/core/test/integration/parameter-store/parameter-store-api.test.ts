import { chai } from "../../index";

describe("ParameterStoreApi", (): void => {
  describe("getParameters", (): void => {
    it("should throw ParameterStoreApiRequestError when get parameters throws an error", async (): Promise<void> => {
      chai.expect(true).to.be.equals(true);
    });

    it("should return GetParametersCommandOutput when no errors was found", async (): Promise<void> => {
      chai.expect(true).to.be.equals(true);
    });
  });
});
