import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlashList } from "@shopify/flash-list";
import { coffees } from '../../../data/coffees';
import { Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useOrderStore } from '../../../store/useOrderStore';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomeScreen() {

  const orderCoffee = useOrderStore(state => state.orderCoffee);

  return (
    <ThemedView style={{
      flex: 1,
    }}>
      <ThemedText type="title">Coffees</ThemedText>
      <FlashList
        data={coffees}
        estimatedItemSize={200}
        renderItem={({ item }) => <ThemedView style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 8,
          paddingRight: 8,
          paddingTop: 4,
          paddingBottom: 4,
          gap: 8,
        }}>
          <Link href={`/(tabs)/(index)/${item.id}`}>
            <ThemedView style={{
              flexDirection: 'row',
              gap: 10,
            }}>
              <Image source={item.image} style={{ width: 50, height: 50 }} />
              <ThemedView>
                <ThemedText type='defaultSemiBold'>{item.name}</ThemedText>
                <ThemedText>{item.price.toLocaleString("be-NL", { style: "currency", currency: "EUR" })}</ThemedText>
              </ThemedView>
            </ThemedView>
          </Link>
          <Pressable
            onPress={() => orderCoffee(item)}
            style={({pressed}) => [
              {
                opacity: pressed ? 0.5 : 1.0,
              },
            ]}>
            <Ionicons name='add-circle' size={24} />
          </Pressable>
        </ThemedView>}
      />
    </ThemedView>
  );
}