import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { SeedScreen } from '@/navigation/screens/SeedScreen';

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
          <Stack.Screen name="SeedScreen" component={SeedScreen} options={{
            title: 'Your SEED phrase',
            headerBackButtonDisplayMode: "minimal"
          }} />
        </Stack.Group>
      ) : null}
    </Stack.Navigator>
  );
}