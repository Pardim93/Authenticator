import React from "react";
import { CurrentCredentials } from "../headless/current-credentials";
import {
  SignIn,
  ConfirmSignIn,
  ForgotPassword,
  ConfirmForgotPassword,
  TestUser
} from "../pages";
import { Configure, SignOut } from "../headless";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { IAppProps } from "../App";

const Stack = createStackNavigator();

export function Root(options: IAppProps): JSX.Element {
  // console.log("Switch props ", options);

  switch (options.SDKAction) {
    case "Configure":
      return (
        <NavigationContainer>
          <Stack.Navigator headerMode={"none"}>
            <Stack.Screen
              name="Configure"
              component={Configure}
              initialParams={options}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    case "CurrentCredentials":
      return (
        <NavigationContainer>
          <Stack.Navigator headerMode={"none"}>
            <Stack.Screen
              initialParams={options}
              name="CurrentCredentials"
              component={CurrentCredentials}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    case "SignIn":
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              initialParams={options}
            />
            <Stack.Screen name="ConfirmSignIn" component={ConfirmSignIn} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen
              name="ConfirmForgotPassword"
              component={ConfirmForgotPassword}
            />
            <Stack.Screen name="SignOut" component={SignOut} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    case "TestUser":
      return (
        <NavigationContainer>
          <Stack.Navigator headerMode={"none"}>
            <Stack.Screen
              name="TestUser"
              component={TestUser}
              initialParams={options}
            />
            <Stack.Screen name="SignOut" component={SignOut} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    case "SignOut":
      return (
        <NavigationContainer>
          <Stack.Navigator headerMode={"none"}>
            <Stack.Screen
              name="SignOut"
              component={SignOut}
              initialParams={options}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    default:
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="SignInOn"
              component={SignIn}
              initialParams={options}
            />
            <Stack.Screen name="ConfirmSignIn" component={ConfirmSignIn} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen
              name="ConfirmForgotPassword"
              component={ConfirmForgotPassword}
            />
            <Stack.Screen name="SignOut" component={SignOut} />
          </Stack.Navigator>
        </NavigationContainer>
      );
  }
}
