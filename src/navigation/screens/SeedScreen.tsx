import { useStoreContext } from "@/components/contexts";
import { useParams } from "@/utils";
import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, Button } from "react-native";

export const SeedScreen = () => {
  const { store } = useStoreContext();
  const navigation = useNavigation();
  const { fromWelcome } = useParams<{ fromWelcome: boolean }>();

  return (
    <View style={styles.container}>
      <View style={styles.wordsContainer}>
        <View>
          {store.mnemonic.slice(0, 12).map((word, index) => (
            <Text key={index} style={styles.word}>{word}</Text>
          ))}
        </View>
        <View>
          {store.mnemonic.slice(-12).map((word, index) => (
            <Text key={index} style={styles.word}>{word}</Text>
          ))}
        </View>
      </View>
      {fromWelcome && <Button title="Continue" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Wallet' }] })} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wordsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    backgroundColor: "white",
    padding: 24,
    borderRadius: 35,
    marginBottom: 50,
  },
  word: {
    fontSize: 32,
  },
});
