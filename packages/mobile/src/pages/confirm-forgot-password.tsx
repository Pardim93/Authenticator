import { I18n } from "@natura-auth/core";
import React from "react";
import { View } from "react-native";
import styles from "../styles/styles";
import { AuthPiece, IAuthPieceState, IAuthPieceProps } from "./auth-piece";
import { Button, FormField, Logo } from "../components";
import { finishWithSuccess } from "../native-modules/natura-auth-sdk-module";

type IConfirmForgotPasswordProps = IAuthPieceProps;
interface IConfirmForgotPasswordState extends IAuthPieceState {
  code?: string;
  password?: string;
}

export class ConfirmForgotPassword extends AuthPiece<
  IConfirmForgotPasswordProps,
  IConfirmForgotPasswordState
> {
  public constructor(props: IConfirmForgotPasswordProps) {
    super(props);
    this.getCodeFromInput = this.getCodeFromInput.bind(this);
    this.getPasswordFromInput = this.getPasswordFromInput.bind(this);
  }

  public getPasswordFromInput(): string | undefined {
    return this.state.password;
  }

  public getCodeFromInput(): string | undefined {
    return this.state.code;
  }

  public showComponent(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Logo />
        <FormField
          secureTextEntry
          placeholder={I18n.get("code")}
          onChangeText={(text: string): void => this.setState({ code: text })}
        />
        <FormField
          secureTextEntry
          placeholder={I18n.get("password")}
          onChangeText={(text: string): void =>
            this.setState({ password: text })
          }
        />
        <Button
          onPress={async (): Promise<void> => {
            finishWithSuccess();
          }}
          text={I18n.get("confirm")}
        />
      </View>
    );
  }
}
