import { Configurable } from "../../configurable";
import { ParameterStoreApiOptions } from ".";
import { ParameterStoreApiRequestError } from "../../errors";
import AWS, { SSM } from "aws-sdk";

export let SSMInstance: SSM = new SSM({});
class ParameterStoreApiClass extends Configurable<ParameterStoreApiOptions> {
  public async getParameters(
    names: string[]
  ): Promise<SSM.GetParametersResult> {
    this.handleMissConfiguredCall();
    try {
      const parameters: SSM.GetParametersRequest = {
        Names: names,
        WithDecryption: true,
      };
      return await SSMInstance.getParameters(parameters).promise();
    } catch (e) {
      throw new ParameterStoreApiRequestError(e);
    }
  }

  protected async makeConfiguration(
    options: ParameterStoreApiOptions
  ): Promise<void> {
    AWS.config.accessKeyId = options.clientId;
    AWS.config.secretAccessKey = options.clientSecret;
    AWS.config.region = options.region;
    SSMInstance = new SSM({ region: options.region });
  }
}

export const ParameterStoreApi = new ParameterStoreApiClass();
