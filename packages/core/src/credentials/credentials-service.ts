import { Configurable } from "../configurable";
import { ParameterStoreApi, ParameterStoreApiOptions } from "../integrations";
import { SSM } from "aws-sdk";
import {
  CredentialsServiceOptions,
  Credentials,
  CredentialsParameterNames,
} from ".";
import { MissConfiguredParameterError } from "../errors";

export class CredentialsServiceClass extends Configurable<CredentialsServiceOptions> {
  public async fetch(): Promise<Credentials> {
    this.handleMissConfiguredCall();

    const names = CredentialsParameterNames;

    const parametersNames: string[] = [
      names.getUserPoolId(),
      names.getUserPoolWebClientId(),
      names.getRegion(),
      names.getPeopleBaseUrl(),
      names.getPeopleToken(),
    ];
    const output = await ParameterStoreApi.getParameters(parametersNames);
    return {
      userPoolId: this.getValue(output, names.getUserPoolId()),
      region: this.getValue(output, names.getRegion()),
      userPoolWebClientId: this.getValue(
        output,
        names.getUserPoolWebClientId()
      ),
      peopleBaseUrl: this.getValue(output, names.getPeopleBaseUrl()),
      peopleToken: this.getValue(output, names.getPeopleToken()),
    };
  }

  protected async makeConfiguration(
    options: CredentialsServiceOptions
  ): Promise<void> {
    await ParameterStoreApi.configure(options as ParameterStoreApiOptions);
    await CredentialsParameterNames.configure(options.environment);
  }

  private getValue(output: SSM.GetParametersResult, name: string): string {
    const value =
      output.Parameters?.find((x: SSM.Parameter) => x.Name === name)?.Value ??
      "";
    if (value === "") {
      throw new MissConfiguredParameterError(
        `parameter ${name} is not declared on SSM`
      );
    }
    return value;
  }
}

export const CredentialsService = new CredentialsServiceClass();
