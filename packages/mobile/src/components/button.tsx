import React, { FC } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import styles from "../styles/styles";

interface IButtonProps extends TouchableOpacityProps {
  text: string;
}

export const Button: FC<IButtonProps> = (props: IButtonProps) => {
  return (
    <TouchableOpacity {...props} style={styles.button}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
};
