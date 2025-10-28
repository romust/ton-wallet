import * as React from 'react';
import { Root } from '@/navigation/Root';
import { StoreProvider } from '@/components/contexts';

export function App() {

  return (
    <StoreProvider>
        <Root />
    </StoreProvider>
  );
}