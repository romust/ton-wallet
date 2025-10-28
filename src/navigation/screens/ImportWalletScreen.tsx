import { useCreateWallet } from "@/hooks";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export const ImportWalletScreen = () => {
    const [seedPhrase, setSeedPhrase] = useState('');
    const { createWallet } = useCreateWallet();

    const handleImport = () => {
        createWallet(seedPhrase);
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Paste your seed phrase here</Text>
            <TextInput
                placeholder="Enter your seed phrase"
                style={styles.input}
                value={seedPhrase}
                onChangeText={setSeedPhrase}
            />
            <Button title="Import" onPress={handleImport} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
    },
});