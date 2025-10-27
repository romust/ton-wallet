import { Text, View, StyleSheet } from "react-native";

export const CreateWalletScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Create Wallet Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
