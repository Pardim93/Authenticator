import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Configurable } from "../../configurable";
import { ChangePasswordApiOptions, ApiError, PasswordPattern } from "./types";
import { ChangePasswordRequestError } from "../global-people-platform";

class ChangePasswordApiClass extends Configurable<ChangePasswordApiOptions> {
  private baseUrl: string | undefined;

  public async getPasswordPattern(): Promise<PasswordPattern> {
    try {
      var request = this.buildRequest("GET", "password-pattern");
      const response = await axios.request<PasswordPattern>(request);
      return response.data;
    } catch (err) {
      const data = (err as AxiosError).response?.data as ApiError;
      throw new ChangePasswordRequestError(data.message);
    }
  }

  public async forgotPassword(username: string): Promise<void> {
    try {
      const request = this.buildRequest("POST", "forgot-password", {
        username: username,
      });

      await axios.request(request);
    } catch (err) {
      const data = (err as AxiosError).response?.data as ApiError;
      throw new ChangePasswordRequestError(data.message);
    }
  }

  public async changePassword(
    username: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const request = this.buildRequest("POST", "change-password", {
        username: username,
        currentPassword: currentPassword,
        newPassword: newPassword,
      });

      await axios.request(request);
    } catch (err) {
      const data = (err as AxiosError).response?.data as ApiError;
      throw new ChangePasswordRequestError(data.message);
    }
  }

  public async confirmForgotPassword(
    username: string,
    code: string,
    newPassword: string
  ): Promise<void> {
    try {
      const request = this.buildRequest("POST", "confirm-forgot-password", {
        username: username,
        code: code,
        newPassword: newPassword,
      });

      await axios.request(request);
    } catch (err) {
      const data = (err as AxiosError).response?.data as ApiError;
      throw new ChangePasswordRequestError(data.message);
    }
  }

  public async resendTemporaryPassword(username: string): Promise<void> {
    try {
      const request = this.buildRequest("POST", "resend-temporary-password", {
        username: username,
      });

      await axios.request(request);
    } catch (err) {
      const data = (err as AxiosError).response?.data as ApiError;
      throw new ChangePasswordRequestError(data.message);
    }
  }

  protected async makeConfiguration(
    options: ChangePasswordApiOptions
  ): Promise<void> {
    this.baseUrl = options.baseUrl;
  }

  private buildRequest(
    method: string,
    URI: string,
    data?: object
  ): AxiosRequestConfig {
    return {
      method: method,
      data: data,
      url: `${this.baseUrl}/${URI}`,
    } as AxiosRequestConfig;
  }
}

export const ChangePasswordApi = new ChangePasswordApiClass();
