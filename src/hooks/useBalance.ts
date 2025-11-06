import { useStoreContext } from '@/components/contexts';
import { useEffect, useState } from 'react';
import { getTonBalance } from '@/api/tonapi';

export const useBalance = () => {
    const [balance, setBalance] = useState(-1);
    const { store } = useStoreContext();

    useEffect(() => {
        (async () => {
          try {
            if(store.wallet?.address) {
                const tonBalance = await getTonBalance(store.wallet.address, store.isTestnet);
                setBalance(tonBalance);
            }
        } catch (err) {
            console.error('Failed to fetch balance:', err);
        }
    })();
    }, [store.wallet?.address, store.isTestnet]);
    return { balance };
}