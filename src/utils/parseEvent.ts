import { fromBnWithDecimals } from "@/utils/withDecimals";
import { AccountEvent } from "@ton-api/client";

export const parseEvent = (event: AccountEvent, walletAddress: string) => {
    const results: {
      type: string;
      amount: number;
      from?: string;
      to?: string;
      symbol?: string;
    }[] = [];
  
    for (const action of event.actions || []) {
      switch (action.type) {
        case 'TonTransfer': {
          const t = action.TonTransfer!;
          results.push({
            type: 'TON',
            amount: Number(t.amount) / 1e9,
            from: t.sender?.toString(),
            to: t.recipient?.toString(),
            symbol: 'TON',
          });
          break;
        }
  
        case 'JettonTransfer': {
          const j = action.JettonTransfer!;
          const jetton = j.jetton;
          results.push({
            type: 'Jetton',
            amount: Number(fromBnWithDecimals(j.amount, jetton.decimals)),
            from: j.sender?.toString(),
            to: j.recipient?.toString(),
            symbol: jetton.symbol || 'JETTON',
          });
          break;
        }
  
        default:
          break;
      }
    }
  
    return results.map(r => ({
      ...r,
      direction: r.from === walletAddress ? 'out' : 'in',
      timestamp: new Date(event.timestamp * 1000),
    }));
  }