import Axios, { AxiosRequestConfig } from "axios";
import { Configurable } from "../../configurable";
import {
  GlobalPeoplePlatformApiOptions,
  GlobalPeoplePlatformApiRequestError,
  Person,
} from ".";

class GlobalPeoplePlatformApiClass extends Configurable<GlobalPeoplePlatformApiOptions> {
  private baseUrl: string | undefined;

  private APIKey: string | undefined;

  private timeout: number | undefined;

  public async fetchPersonByNaturaCode(
    tenantId: string,
    naturaCode: string
  ): Promise<Person[]> {
    this.handleMissConfiguredCall();

    const request = this.buildRequest(
      "GET",
      `v1/people`,
      {
        candidateId: naturaCode,
        relations: "approvedCandidate",
      },
      { tenantId }
    );
    try {
      const response = await Axios.request<Person[]>(request);
      return response.data;
    } catch (err) {
      throw new GlobalPeoplePlatformApiRequestError(err);
    }
  }

  protected async makeConfiguration(
    options: GlobalPeoplePlatformApiOptions
  ): Promise<void> {
    this.baseUrl = options.baseUrl;
    this.APIKey = options.APIKey;
    this.timeout = options.timeout;
  }

  private buildRequest(
    method: string,
    URI: string,
    params?: object,
    additionalHeaders?: object
  ): AxiosRequestConfig {
    return {
      headers: Object.assign({}, additionalHeaders, {
        "x-api-key": this.APIKey,
      }),
      method: method,
      params: params,
      timeout: this.timeout,
      url: `${this.baseUrl}/${URI}`,
    } as AxiosRequestConfig;
  }
}

export const GlobalPeoplePlatformApi = new GlobalPeoplePlatformApiClass();
