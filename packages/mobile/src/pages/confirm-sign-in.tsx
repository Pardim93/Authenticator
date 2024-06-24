import { I18n } from "@natura-auth/core";
import React from "react";
import { View } from "react-native";
import styles from "../styles/styles";
import { AuthPiece, IAuthPieceProps, IAuthPieceState } from "./auth-piece";
import { Button, FormField, Logo } from "../components";
import { finishWithSuccess } from "../native-modules/natura-auth-sdk-module";

export type IConfirmSignInProps = IAuthPieceProps;

interface IConfirmSignInState extends IAuthPieceState {
  code?: string;
}

export class ConfirmSignIn extends AuthPiece<
  IConfirmSignInProps,
  IConfirmSignInState
> {
  public constructor(props: IConfirmSignInProps) {
    super(props);
    this.getCodeFromInput = this.getCodeFromInput.bind(this);
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
        <Button
          onPress={(): void => finishWithSuccess()}
          text={I18n.get("confirm")}
        />
      </View>
    );
  }
}
