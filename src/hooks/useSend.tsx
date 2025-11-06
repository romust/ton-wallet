import { useStoreContext } from "@/components/contexts";

export const useSend = () => {
    const { store } = useStoreContext();
    const sendTransaction = async (recipientAddress: string) => {
        console.log(recipientAddress);
    }
    return { sendTransaction };
}