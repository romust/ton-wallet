import { useBalance } from "@/hooks";
import { View, StyleSheet, Text } from "react-native";

export const HomeScreen = () => {
const { balance } = useBalance();
  return (
    <View style={styles.container}>
      <Text>Balance: {balance} TON</Text>
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
