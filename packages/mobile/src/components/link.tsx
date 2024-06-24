import React, { FC } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import styles from "../styles/styles";

interface ILinkProps extends TouchableOpacityProps {
  text: string;
}

export const Link: FC<ILinkProps> = (props: ILinkProps) => {
  return (
    <TouchableOpacity {...props}>
      <Text style={styles.linkText}>{props.text}</Text>
    </TouchableOpacity>
  );
};
