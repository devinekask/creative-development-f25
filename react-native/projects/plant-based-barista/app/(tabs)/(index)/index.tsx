import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Coffee, coffees } from '@/data/coffees';
import { FlashList } from "@shopify/flash-list";
import { Pressable, Text } from 'react-native';
import { Image } from 'react-native';
import { Link, Stack } from 'expo-router';
import { useOrderStore } from '@/hooks/use-order-store';
import Ionicons from '@expo/vector-icons/Ionicons';

const MyList = () => {

  const orderCoffee = useOrderStore(state => state.orderCoffee);

  return (
    <FlashList
      data={coffees}
      renderItem={({ item }) => (
      <Link href={`/(tabs)/(index)/${item.id}`}>
        <ThemedView style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}>
          <Image source={item.image} style={{ width: 50, height: 50 }} />
          <ThemedView style={{ flex: 1 }}>
            <ThemedText type='defaultSemiBold'>{item.name}</ThemedText>
            <ThemedText>{item.price.toLocaleString("be-NL", { style: "currency", currency: "EUR" })}</ThemedText>
          </ThemedView>
          <Pressable
            onPress={() => orderCoffee(item)}
            style={({pressed}) => [
              {
                opacity: pressed ? 0.5 : 1.0,
                padding: 8,
              },
            ]}>
            <Ionicons name='add-circle' size={24} />
          </Pressable>
        </ThemedView>
      </Link>)}
    />
  );
};

export default function HomeScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <Stack.Screen
        options={{ title: "Coffees" }}
      />
      <MyList />
    </ThemedView>
  );
}