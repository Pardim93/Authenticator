import { Auth } from "@natura-auth/core";
import { AuthOptions } from "@natura-auth/core";
import { HeadlessAuthPiece } from "./headless-auth-piece";
import {
  finishWithSuccess,
  finishWithError,
} from "../native-modules/natura-auth-sdk-module";

export class CurrentCredentials extends HeadlessAuthPiece<AuthOptions, {}> {
  protected execute(): void {
    // eslint-disable-next-line
    Auth.currentAuthenticatedUser().then((credentials) => {
        finishWithSuccess(JSON.stringify(credentials));
      })
      .catch((error: Error) => {
        finishWithError(error.message);
      });
  }
}
