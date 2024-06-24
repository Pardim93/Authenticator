import { I18n } from "@natura-auth/core";
import React from "react";
import { View } from "react-native";
import styles from "../styles/styles";
import { AuthPiece, IAuthPieceProps, IAuthPieceState } from "./auth-piece";
import { Button, FormField, Logo } from "../components";

export type IForgotPasswordProps = IAuthPieceProps;
export interface IForgotPasswordState extends IAuthPieceState {
  username?: string;
}

export class ForgotPassword extends AuthPiece<
  IForgotPasswordProps,
  IForgotPasswordState
> {
  public constructor(props: IForgotPasswordProps) {
    super(props);
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
        <Button
          onPress={(): boolean =>
            this.props.navigation.push("ConfirmForgotPassword", {
              initial: false
            })
          }
          text={I18n.get("confirm")}
        />
      </View>
    );
  }
}
