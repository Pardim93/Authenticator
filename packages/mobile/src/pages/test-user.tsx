import { View } from "react-native";
import React from "react";
import { AuthPiece, IAuthPieceProps, IAuthPieceState } from "./auth-piece";
import styles from "../styles/styles";
import { I18n } from "@natura-auth/core";
import { Button, Logo } from "../components";

export type ITestUserProps = IAuthPieceProps;
export type ITestUserState = IAuthPieceState;

export class TestUser extends AuthPiece<ITestUserProps, ITestUserState> {
  public constructor(props: ITestUserProps) {
    super(props);
  }

  public showComponent(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Logo />
        <Button
          onPress={(): boolean => this.props.navigation.navigate("SignOut")}
          text={I18n.get("logout")}
        />
        {this.renderErrorMessage()}
      </View>
    );
  }
}
