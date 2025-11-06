import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { getAccountEvents } from '@/api/tonapi';
import { useStoreContext } from '@/components/contexts';
import { AccountEvent } from '@ton-api/client';
import { parseEvent } from '@/utils';

export function HistoryScreen() {
  const { store } = useStoreContext();
  const [events, setEvents] = useState<any[]>([]);
  const [nextLt, setNextLt] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function loadMore() {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      if (!store.wallet?.address) return;
      const { items, nextLt: next } = await getAccountEvents(store.wallet?.address, store.isTestnet, nextLt);
      setEvents(prev => [...prev, ...items]);
      setNextLt(next);
      if (!next) setHasMore(false);
    } catch (e) {
      console.error('Error loading events:', e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMore();
  }, []);

  const renderEvent = ({ item }: { item: AccountEvent }) => {
    const actions = parseEvent(item, store.wallet?.address.toString({ testOnly: store.isTestnet }) ?? '');
    return (
      <View style={{ marginBottom: 12, borderBottomWidth: 1, borderColor: '#eee', paddingBottom: 8 }}>
        {actions.map((a, i) => (
          <View key={i}>
            <Text style={{ fontWeight: 'bold' }}>
              {a.direction === 'in' ? '+' : '-'}
              {a.amount.toFixed(4)} {a.symbol}
            </Text>
            <Text style={{ fontSize: 12, color: '#666' }}>{a.timestamp.toLocaleString()}</Text>
            {a.symbol !== 'TON' && (
              <Text style={{ fontSize: 12, color: '#888' }}>{a.symbol}</Text>
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={events}
        keyExtractor={item => item.eventId}
        renderItem={renderEvent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </View>
  );
}
