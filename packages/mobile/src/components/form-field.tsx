import styles from "../styles/styles";
import React, { FC } from "react";
import { TextInputProps, View, TextInput } from "react-native";

interface IFormFieldProps extends TextInputProps {
  placeholder: string;
}

export const FormField: FC<IFormFieldProps> = (props: IFormFieldProps) => {
  return (
    <View style={styles.inputView}>
      <TextInput
        style={styles.inputText}
        placeholderTextColor={styles.placeholderText.color}
        {...props}
      />
    </View>
  );
};
