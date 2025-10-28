import { useStoreContext } from "@/components/contexts";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { mnemonicNew, mnemonicToPrivateKey } from '@ton/crypto';
import { WalletContractV5R1 } from '@ton/ton';

export const useCreateWallet = () => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const { setStore } = useStoreContext();

    const createWallet = async (mnemonicString?: string) => {
        const mnemonic = mnemonicString ? mnemonicString.split(' ') : await mnemonicNew(24);
        const keyPair = await mnemonicToPrivateKey(mnemonic);
        const wallet = WalletContractV5R1.create({
            workchain: 0,
            publicKey: keyPair.publicKey,
        });
        console.log('Wallet V5R1 address:', wallet.address.toString());
        setStore({ mnemonic, wallet });
        if (mnemonicString) {
            navigation.reset({ index: 0, routes: [{ name: 'Wallet' }] })
        } else {
            navigation.navigate('Seed', { fromWelcome: true })
        }
    }
    return { createWallet };
}