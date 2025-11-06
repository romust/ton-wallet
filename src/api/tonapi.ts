import { TonApiClient } from "@ton-api/client";
import { Address, fromNano } from "@ton/core";

function getTonApiClient(isTestnet: boolean): TonApiClient {
  return new TonApiClient({
    baseUrl: isTestnet ? 'https://testnet.tonapi.io' : 'https://tonapi.io',
    apiKey: '',
  });
}

const MainnetTonApiClient = getTonApiClient(false);
const TestnetTonApiClient = getTonApiClient(true);

export async function getTonBalance(address: Address, isTestnet: boolean = false) {
  const tonapi = isTestnet ? TestnetTonApiClient : MainnetTonApiClient;
  const account = await tonapi.accounts.getAccount(address);
  const balanceNano = account.balance ?? 0n;
  const balanceTon = Number(fromNano(balanceNano));
  return balanceTon;
}

export async function getAccountEvents(address: Address, isTestnet: boolean = false, before_lt?: number) {
  const tonapi = isTestnet ? TestnetTonApiClient : MainnetTonApiClient;
  const res = await tonapi.accounts.getAccountEvents(address, {
    limit: 20,
    before_lt: before_lt ? BigInt(before_lt) : undefined,
  });

  return {
    items: res.events ?? [],
    nextLt: res.nextFrom,
  };
}