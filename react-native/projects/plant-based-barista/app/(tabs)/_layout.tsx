import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useOrderStore } from '@/hooks/use-order-store';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const orders = useOrderStore(state => state.orders);
  const coffeeCount = orders.reduce((acc, order) => acc + order.amount, 0);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
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
          title: 'Order',
          tabBarBadge: coffeeCount > 0 ? coffeeCount : undefined,
          tabBarIcon: ({ color, focused }) => <Ionicons size={28} name={focused ? 'cart' : 'cart-outline'} color={color} />,
        }}
      />
    </Tabs>
  );
}
