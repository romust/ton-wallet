import { useStoreContext } from "@/components/contexts";
import { useBalance } from "@/hooks";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, Button } from "react-native";

export const HomeScreen = () => {
  const { balance } = useBalance();
  const { store } = useStoreContext();
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Text style={styles.balance}>Balance: {balance} TON</Text>
      <Text style={styles.address}>{store.wallet?.address.toString()}</Text>
      <Button title="Show Seed" onPress={() => navigation.navigate('Seed')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  balance: {
    fontSize: 24,
    fontWeight: "bold",
  },
  address: {
    marginTop: 8,
    fontSize: 12,
    color: "gray",
    marginBottom: 24,
  },
});
