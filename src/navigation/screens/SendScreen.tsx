import { useSend } from "@/hooks";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export const SendScreen = () => {
    const [recipientAddress, setRecipientAddress] = useState('');
    const { sendTransaction } = useSend();

    const onSend = () => {
        sendTransaction(recipientAddress);
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Send Transaction</Text>
            <TextInput
                placeholder="Enter the recipient address"
                style={styles.input}
                value={recipientAddress}
                onChangeText={setRecipientAddress}
            />
            <Button title="Send" onPress={onSend} />
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