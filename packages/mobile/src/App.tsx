import "react-native-gesture-handler";

import React from "react";
import { AuthOptions } from "@natura-auth/core";
// import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Root } from "./factory/natura-auth-sdk-action.factory";
// import { NavigationContainer } from "@react-navigation/native";
// import { SignIn } from "./pages";
// import { createStackNavigator } from "@react-navigation/stack";

export interface IAppProps extends AuthOptions {
  SDKAction: string;
}

// const Stack = createStackNavigator();

export default class App extends React.Component<IAppProps> {
  // private readonly factory: NaturaAuthSDKActionFactory = new NaturaAuthSDKActionFactory();

  public constructor(props: IAppProps) {
    super(props);
  }

  public render() {
    console.log("on app:" + JSON.stringify(this.props));

    // const StackSDK = this.factory.factory(this.props);
    return <Root {...this.props} />;
  }
}
