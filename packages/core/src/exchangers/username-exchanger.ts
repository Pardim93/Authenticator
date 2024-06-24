import { Username } from "../types";
import { Configurable } from "../configurable";
import { UsernameExchangerOptions } from ".";
import { GlobalPeoplePlatformApi } from "../integrations";
import { UsernameNotFoundError } from "../errors";

class UsernameExchangerClass extends Configurable<UsernameExchangerOptions> {
  private tenantId: string | undefined;

  public async exchange(username: Username): Promise<Username> {
    this.handleMissConfiguredCall();
    if (username.type === "naturaCode") {
      const persons = await GlobalPeoplePlatformApi.fetchPersonByNaturaCode(
        this.tenantId as string,
        username.value
      );

      if (persons.length === 0) {
        throw new UsernameNotFoundError("");
      }

      return new Username(persons[0].personId);
    }
    return username;
  }

  protected async makeConfiguration(
    options: UsernameExchangerOptions
  ): Promise<void> {
    this.tenantId = options.country;
    await GlobalPeoplePlatformApi.configure({
      APIKey: options.peopleToken,
      baseUrl: options.peopleBaseUrl,
      timeout: 0,
    });
  }
}

export const UsernameExchanger = new UsernameExchangerClass();
