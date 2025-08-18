import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useOrderStore } from '@/store/useOrderStore';
import { FlashList } from '@shopify/flash-list';
import { router, Stack } from 'expo-router';
import { Button } from 'react-native';

export default function OrderScreen() {

  const orders = useOrderStore((state) => state.orders);
  const total = orders.reduce((acc, order) => acc + (order.amount * order.coffee.price), 0);
  const resetOrders = useOrderStore((state) => state.resetOrders);

  return (
    <ThemedView style={{
      flex: 1,
    }}>
      <Stack.Screen options={{ title: 'Order' }} />
      <ThemedView style={{
        flex:1,
      }}>
        <FlashList
          data={orders}
          renderItem={({ item }) => {
            return (
              <ThemedView style={{
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 4,
                paddingBottom: 4,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <ThemedText>{item.coffee.name} x {item.amount}</ThemedText>
                <ThemedText>{(item.amount * item.coffee.price).toLocaleString("nl-BE", { style: "currency", currency: "EUR" })}</ThemedText>
              </ThemedView>
            )
          }}
          keyExtractor={(item) => `${item.coffee.id}`}
          estimatedItemSize={50}
        />
      </ThemedView>
      <ThemedView>
        <ThemedView style={{
          paddingLeft: 8,
          paddingRight: 8,
          paddingTop: 4,
          paddingBottom: 4,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <ThemedText type="defaultSemiBold">Total</ThemedText>
          <ThemedText type="defaultSemiBold">{total.toLocaleString("nl-BE", { style: "currency", currency: "EUR" })}</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={{
          paddingLeft: 8,
          paddingRight: 8,
          paddingTop: 4,
          paddingBottom: 4,
        }}>
        <Button title="Confirm Order" onPress={() => {
          resetOrders();
          router.push('/(tabs)/order/confirmation');
        }} />
      </ThemedView>
    </ThemedView>
  );
}