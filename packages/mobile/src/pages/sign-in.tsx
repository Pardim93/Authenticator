import { View } from "react-native";
import React from "react";
import { AuthPiece, IAuthPieceProps, IAuthPieceState } from "./auth-piece";
import styles from "../styles/styles";
import { I18n } from "@natura-auth/core";
import { Button, FormField, Logo, Link } from "../components";
// import { finishWithSuccess } from "../native-modules/natura-auth-sdk-module";

export type ISignInProps = IAuthPieceProps;
export interface ISignInState extends IAuthPieceState {
  username?: string;
  password?: string;
}

export class SignIn extends AuthPiece<ISignInProps, ISignInState> {
  public constructor(props: ISignInProps) {
    super(props);

    // console.log("Navigation do Sign In ", this.props);

    this.getUsernameFromInput = this.getUsernameFromInput.bind(this);
    this.getPasswordFromInput = this.getPasswordFromInput.bind(this);
  }

  public getUsernameFromInput(): string | undefined {
    return this.state.username;
  }

  public getPasswordFromInput(): string | undefined {
    return this.state.password;
  }

  public showComponent(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Logo />
        <FormField
          placeholder={I18n.get("username")}
          onChangeText={(text: string): void =>
            this.setState({ username: text })
          }
        />
        <FormField
          secureTextEntry
          placeholder={I18n.get("password")}
          onChangeText={(text: string): void =>
            this.setState({ password: text })
          }
        />
        <Link
          text={I18n.get("forgot password?")}
          onPress={(): boolean =>
            this.props.navigation.navigate("ForgotPassword")
          }
        />
        <Button
          onPress={async (): Promise<void> => {
            await this.onSignInButtonClick();
          }}
          text={I18n.get("login")}
        />
        {this.renderErrorMessage()}
      </View>
    );
  }

  private async onSignInButtonClick(): Promise<void> {
    try {
      if (this.state.username === null || this.state.username === undefined) {
        throw new Error("fill username");
      }

      if (this.state.password === null || this.state.password === undefined) {
        throw new Error("fill password");
      }
      // console.log("Sign In Navigation: ", this.props.navigation);
      // await Auth.signIn(this.state.username, this.state.password);
      this.props.navigation.navigate("ConfirmSignIn", { initial: false });
      // finishWithSuccess();
    } catch (error) {
      this.setState({ errorMessage: (error as Error).message });
    }
  }
}
