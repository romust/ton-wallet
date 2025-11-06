import { useStoreContext } from "@/components/contexts";
import { useBalance } from "@/hooks";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, Button } from "react-native";

export const HomeScreen = () => {
  const { balance } = useBalance();
  const { store, setStore } = useStoreContext();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  
  return (
    <View style={styles.container}>
      <Text style={styles.balance}>Balance: {balance} TON</Text>
      <Text style={styles.address}>{store.wallet?.address.toString({ testOnly: store.isTestnet })}</Text>
      <Button title="Send Transaction" onPress={() => navigation.navigate('Send')} />
      <Button title="Show Seed" onPress={() => navigation.navigate('Seed')} />
      <Button title="Disconnect wallet" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] })} />
      <Button title={`Switch to ${store.isTestnet ? 'mainnet' : 'testnet'}`} onPress={() => setStore({ ...store, isTestnet: !store.isTestnet })} />
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
