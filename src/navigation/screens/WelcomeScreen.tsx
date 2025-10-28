import { useCreateWallet } from "@/hooks";
import { View, StyleSheet, Button } from "react-native";

export const WelcomeScreen = () => {
  const { createWallet } = useCreateWallet();

  return (
    <View style={styles.container}>
      <Button title="Create Wallet" onPress={createWallet} />
      <Button title="Import Wallet" onPress={() => { }} />
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
