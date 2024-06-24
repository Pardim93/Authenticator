import React, { FC } from "react";
import { Image } from "react-native";
import styles from "../styles/styles";

export const Logo: FC = () => {
  return (
    <Image
      style={styles.logo}
      // eslint-disable-next-line
      source={require("@natura-auth/mobile/assets/natura-logo.png")}
    />
  );
};
