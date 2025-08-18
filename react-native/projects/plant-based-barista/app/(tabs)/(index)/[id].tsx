import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { coffees } from '@/data/coffees';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Image } from 'react-native';

export default function DetailScreen() {

  const { id } = useLocalSearchParams();
  const coffee = coffees.find((coffee) => coffee.id === Number(id));

  return (
    <ThemedView>
      <Stack.Screen
        options={{ title: coffee?.name }}
      />
      <Image source={coffee?.image} style={{ width: '100%', height: 300 }} />
      <ThemedView style={{ padding: 16 }}>
        <ThemedText>{coffee?.description}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}