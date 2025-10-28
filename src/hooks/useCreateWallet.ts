import { useStoreContext } from "@/components/contexts";
import { useNavigation } from "@react-navigation/native";
import { mnemonicNew, mnemonicToPrivateKey } from '@ton/crypto';
import { WalletContractV5R1 } from '@ton/ton';

export const useCreateWallet = () => {
    const navigation = useNavigation();
    const { setStore } = useStoreContext();

    const createWallet = async () => {
        const mnemonic = await mnemonicNew(24);
        const keyPair = await mnemonicToPrivateKey(mnemonic);
        const wallet = WalletContractV5R1.create({
            workchain: 0,
            publicKey: keyPair.publicKey,
        });
        console.log('Wallet V5R1 address:', wallet.address.toString());
        setStore({ mnemonic, wallet });
        navigation.navigate('Seed', { fromWelcome: true })
    }
    return { createWallet };
}