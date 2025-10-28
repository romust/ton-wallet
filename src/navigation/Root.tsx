import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { SeedScreen } from '@/navigation/screens/SeedScreen';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const Stack = createNativeStackNavigator();

export const Root = () => {
  const hasWallet = true;
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Welcome">
        {hasWallet ? (
          <Stack.Group>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
              headerShown: false,
            }} />
            <Stack.Screen name="Seed" component={SeedScreen} options={{
              title: 'Your SEED phrase',
              headerBackButtonDisplayMode: "minimal"
            }} />
          </Stack.Group>
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
}