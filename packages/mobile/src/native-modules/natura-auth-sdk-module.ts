import { NativeModules } from "react-native";

export const finishWithSuccess = (response: string = ""): void => {
  // eslint-disable-next-line
  return NativeModules.NaturaAuthSDKModule.finishWithSuccess(response);
};

export const finishWithError = (response: string = ""): void => {
  // eslint-disable-next-line
  return NativeModules.NaturaAuthSDKModule.finishWithError(response);
};
