import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { SeedScreen } from '@/navigation/screens/SeedScreen';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '@/navigation/screens/HomeScreen';
import { HistoryScreen } from '@/navigation/screens/HistoryScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const WalletTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  )
}

export const Root = () => {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Welcome">
            <Stack.Group>
              <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
                headerShown: false,
              }} />
              <Stack.Screen name="Seed" component={SeedScreen} options={{
                title: 'Your SEED phrase',
                headerBackButtonDisplayMode: "minimal",
              }} />
              <Stack.Screen name="Wallet" component={WalletTabs} options={{
                headerShown: false,
              }} />
            </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}