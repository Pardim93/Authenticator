import { Auth } from "@natura-auth/core";
import { HeadlessAuthPiece } from "./headless-auth-piece";
import {
  finishWithSuccess,
  finishWithError
} from "../native-modules/natura-auth-sdk-module";

export class SignOut extends HeadlessAuthPiece<{}, {}> {
  protected execute(): void {
    // eslint-disable-next-line
    Auth.signOut().then(() => {
        finishWithSuccess();
      })
      .catch((error: Error) => {
        finishWithError(error.message);
      });
  }
}
