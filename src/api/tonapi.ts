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

  export async function getAccountEvents(address: Address, before_lt?: number) {
    const res = await tonapi.accounts.getAccountEvents(address, {
      limit: 20,
      before_lt: before_lt ? BigInt(before_lt) : undefined,
    });
  
    return {
      items: res.events ?? [],
      nextLt: res.nextFrom,
    };
  }