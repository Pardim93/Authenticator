/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { I18n } from "@natura-auth/core";
import { Text, BackHandler } from "react-native";
import styles from "../styles/styles";
// import {
//   NavigationEventSubscription,
//   NavigationScreenProp,
// } from "react-navigation";

export interface IAuthPieceProps {
  navigation: any;
}
export interface IAuthPieceState {
  errorMessage?: string;
}
export class AuthPiece<
  Props extends IAuthPieceProps,
  State extends IAuthPieceState
> extends React.Component<Props, State> {

  public constructor(props: Props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  public showComponent(): React.ReactNode {
    const error = I18n.get("You must implement showComponent()");
    throw new Error(error);
  }

  public renderErrorMessage(): JSX.Element {
    return (
      <Text style={styles.linkText}>{this.state?.errorMessage ?? ""}</Text>
    );
  }

  public componentWillMount(): void {
      console.log("Will Mount");
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

       this.props.navigation.addListener('focus',() => {
         console.log("Focus");
         return true;
       });

  }

  public componentWillUnmount(): void {
    console.log("Will Unmount");
    // if (this.navigationSubscription != undefined) {
    //   this.navigationSubscription.remove();
    // }
  }

  public render(): React.ReactNode {
    return this.showComponent();
  }

  public handleBackButtonClick(): boolean {
    console.log("Props ", this.props);
    console.log("Navigation ", this.props.navigation);
    console.log("Navigation State", this.props.navigation.dangerouslyGetState());


    const a = this.props.navigation.goBack(null);
    console.log("Return of goBack", a);

    return true;
  }
}
