import * as React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer, type LinkingOptions, type Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Explore } from './screens/Explore';
import { Home } from './screens/Home';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';

type HomeTabParamList = {
  Home: undefined;
  Explore: undefined;
};

type RootStackParamList = {
  HomeTabs: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation(props: {
  theme?: Theme;
  linking?: LinkingOptions<RootStackParamList>;
  onReady?: () => void;
}) {
  return (
    <NavigationContainer theme={props.theme} linking={props.linking} onReady={props.onReady}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeTabs() {
  const renderTabBarBackground = () => {
    if (Platform.OS !== 'ios') return null;
    // Lazy require to avoid importing undefined default on non‑iOS platforms
    const TabBarBg = require('@/components/ui/TabBarBackground').default as
      | React.ComponentType
      | undefined;
    return TabBarBg ? React.createElement(TabBarBg) : null;
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarButton: (p) => <HapticTab {...p} />,
        tabBarBackground: renderTabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute' as const,
          },
          default: {},
        }),
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

declare global {
  namespace ReactNavigation {
     
    interface RootParamList extends RootStackParamList {}
  }
}
