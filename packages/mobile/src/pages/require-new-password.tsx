import { I18n } from "@natura-auth/core";
import React from "react";
import { View } from "react-native";
import styles from "../styles/styles";
import { AuthPiece, IAuthPieceProps, IAuthPieceState } from "./auth-piece";
import { Button, FormField, Logo } from "../components";

export type IRequireNewPasswordProps = IAuthPieceProps;

interface IRequireNewPasswordState extends IAuthPieceState {
  password?: string;
  // TODO: Add required attributes keys
  requiredAttributes: Record<string, unknown>;
}

export class RequireNewPassword extends AuthPiece<
  IRequireNewPasswordProps,
  IRequireNewPasswordState
> {
  public constructor(props: IRequireNewPasswordProps) {
    super(props);
    this.getPasswordFromInput = this.getPasswordFromInput.bind(this);
  }

  public getPasswordFromInput(): string | undefined {
    return this.state.password;
  }

  public showComponent(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Logo />
        <FormField
          secureTextEntry
          placeholder={I18n.get("password")}
          onChangeText={(text: string): void =>
            this.setState({ password: text })
          }
        />
        <Button
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onPress={async (): Promise<void> => {}}
          text={I18n.get("confirm")}
        />
      </View>
    );
  }
}
