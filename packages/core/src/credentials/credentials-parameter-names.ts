/* eslint-disable spellcheck/spell-checker */
import { Configurable } from "../configurable";
import { Environment } from "..";

class CredentialsParameterNamesClass extends Configurable<Environment> {
  private environment: Environment = "development";

  public getUserPoolWebClientId(): string {
    return `${this.getParameterNamePrefix()}/cognito-authentication-client-id`;
  }

  public getUserPoolId(): string {
    return `${this.getParameterNamePrefix()}/cognito-authentication-userpool-id`;
  }

  public getRegion(): string {
    return `${this.getParameterNamePrefix()}/cognito-authentication-region`;
  }

  public getPeopleBaseUrl(): string {
    return `${this.getParameterNamePrefix()}/global-people-management-url`;
  }

  public getPeopleToken(): string {
    return `${this.getParameterNamePrefix()}/global-people-management-key`;
  }

  protected async makeConfiguration(options: Environment): Promise<void> {
    this.environment = options;
  }

  private getParameterNamePrefix(): string {
    this.handleMissConfiguredCall();
    return `/${this.environment.toString()}/authenticator-cognito/parameterstore`;
  }
}

export const CredentialsParameterNames = new CredentialsParameterNamesClass();
