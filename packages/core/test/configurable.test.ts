import { Configurable } from "../src/configurable";
import { expect } from "chai";
import { ConfigurationError } from "../src";

class ConfigurableTest extends Configurable<{}> {
  public publicHandleMissConfiguredCall(): void {
    this.handleMissConfiguredCall();
  }

  // eslint-disable-next-line
  protected async makeConfiguration(_options: {}): Promise<void> {}
}

describe("configurable", (): void => {
  describe("handleMissConfiguredCall", (): void => {
    it("should throw an exception if not configured", (): void => {
      const instance = new ConfigurableTest();
      expect(() => instance.publicHandleMissConfiguredCall()).to.throw(
        ConfigurationError
      );
    });

    it("should return if configure was called before", async (): Promise<void> => {
      const instance = new ConfigurableTest();
      await instance.configure({});
      expect(instance.publicHandleMissConfiguredCall()).to.be.equal(undefined);
    });
  });
});
