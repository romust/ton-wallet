import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { CreateWalletScreen } from '@/navigation/screens/CreateWalletScreen';

const Stack = createNativeStackNavigator();

export const Root = () => {
  const hasWallet = true;
  
  return (
    <Stack.Navigator initialRouteName="Welcome">
      {hasWallet ? (
        <Stack.Group>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="CreateWallet" component={CreateWalletScreen} options={{
            title: 'Create Wallet',
            headerBackButtonDisplayMode: "minimal"
          }} />
        </Stack.Group>
      ) : null}
    </Stack.Navigator>
  );
}