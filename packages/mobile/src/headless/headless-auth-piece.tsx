import * as React from "react";
import { I18n } from "@natura-auth/core";
import { dictionary } from "../I18n/dictionary";
import { View } from "react-native";
import { AuthOptions } from "core/src/types/auth-options";
interface INavigationProps<TProps> {
  screenProps: TProps;
  route: {
    params: AuthOptions;
  };
}

export class HeadlessAuthPiece<Props, State> extends React.Component<
  INavigationProps<Props>,
  State
> {
  public constructor(props: INavigationProps<Props>) {
    super(props);
    I18n.putVocabularies(dictionary);
    this.execute();
  }

  public render(): React.ReactNode {
    return <View />;
  }

  protected execute(): void {
    return;
  }
}
