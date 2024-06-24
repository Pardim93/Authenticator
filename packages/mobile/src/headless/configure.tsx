import { Auth } from "@natura-auth/core";
import { AuthOptions } from "@natura-auth/core";
import { HeadlessAuthPiece } from "./headless-auth-piece";
import {
  finishWithSuccess,
  finishWithError
} from "../native-modules/natura-auth-sdk-module";

export class Configure extends HeadlessAuthPiece<AuthOptions, {}> {
  protected execute(): void {
    console.log("authConfigure with" + JSON.stringify(this.props));
    // eslint-disable-next-line
    Auth.configure(this.props.route.params).then(() => {
        finishWithSuccess();
      })
      .catch((error: Error) => {
        finishWithError("Finish with error Configure " + error.message);
      });
  }
}
