import { Text, View, StyleSheet } from "react-native";

export const SeedScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Seed Phrase Screen</Text>
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
