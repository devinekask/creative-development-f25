import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack } from 'expo-router';

export default function OrderScreen() {

  return (
    <ThemedView style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Stack.Screen options={{ title: 'Order Confirmed' }} />
      <ThemedView>
        <ThemedText type="title" style={{
          textAlign: 'center',
        }}>Order Confirmed</ThemedText>
        <ThemedText type="default" style={{
          textAlign: 'center',
        }}>Thank you for your order!</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}