import { TonApiClient } from "@ton-api/client";
import { Address, fromNano } from "@ton/core";

export const tonapi = new TonApiClient({
    baseUrl: 'https://tonapi.io',
    apiKey: '',
  });
  
  export async function getTonBalance(address: Address) {
    const account = await tonapi.accounts.getAccount(address);
    const balanceNano = account.balance ?? 0n;
    const balanceTon = Number(fromNano(balanceNano));
    return balanceTon;
  }