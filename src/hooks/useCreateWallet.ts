import { useNavigation } from "@react-navigation/native";
import { mnemonicNew, mnemonicToPrivateKey } from '@ton/crypto';
import { WalletContractV5R1 } from '@ton/ton';

export const useCreateWallet = () => {
    const navigation = useNavigation();

    const createWallet = async () => {
        const mnemonic = await mnemonicNew();
        const keyPair = await mnemonicToPrivateKey(mnemonic);
        const wallet = WalletContractV5R1.create({
            workchain: 0,
            publicKey: keyPair.publicKey,
        });
        console.log('Wallet V5R1 address:', wallet.address.toString());
        navigation.navigate('CreateWallet')
    }
    return { createWallet };
}