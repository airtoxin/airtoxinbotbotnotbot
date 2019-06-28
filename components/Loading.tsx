import React from "react";
import { Spinner } from "native-base";
import { StyleSheet, View } from "react-native";

export const Loading: React.FunctionComponent = () => (
  <View style={styles.container}>
    <Spinner color="black" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
