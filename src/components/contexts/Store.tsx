import { WalletContractV5R1 } from "@ton/ton";
import { createContext, useContext, useState } from "react";

interface Store {
    mnemonic: string[];
    wallet: WalletContractV5R1 | null;
}

const initialStore: Store = { mnemonic: [], wallet: null };

const StoreContext = createContext<{
    store: Store,
    setStore: (store: Store) => void
}>({ store: initialStore, setStore: () => { } });

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [store, setStore] = useState<Store>(initialStore);
    return (
        <StoreContext.Provider value={{ store, setStore }}>
            {children}
        </StoreContext.Provider>
    )
}

export function useStoreContext() {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStoreContext must be used within StoreProvider');
    }
    return context;
}