import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import Ionicons from '@expo/vector-icons/Ionicons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useOrderStore } from '@/store/useOrderStore';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const orders = useOrderStore(state => state.orders);
  const coffeeCount = orders.reduce((count, order) => count + order.amount, 0);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            // position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="(index)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <Ionicons size={28} name={focused ? 'cafe' : 'cafe-outline'} color={color} />,
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'Orders',
          tabBarBadge: coffeeCount > 0 ? coffeeCount : undefined,
          tabBarIcon: ({ color, focused }) => <Ionicons size={28} name={focused ? 'cart' : 'cart-outline'} color={color} />,
        }}
      />
    </Tabs>
  );
}
