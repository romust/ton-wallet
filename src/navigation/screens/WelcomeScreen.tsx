import { useCreateWallet } from "@/hooks";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Button } from "react-native";

export const WelcomeScreen = () => {
  const { createWallet } = useCreateWallet();
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Button title="Create Wallet" onPress={() => createWallet()} />
      <Button title="Import Wallet" onPress={() => navigation.navigate('ImportWallet')} />
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
