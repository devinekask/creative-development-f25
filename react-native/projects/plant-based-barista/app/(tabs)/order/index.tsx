import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useOrderStore } from '@/hooks/use-order-store';
import { FlashList } from '@shopify/flash-list';
import { router, Stack } from 'expo-router';
import { Button } from 'react-native';

const OrderList = () => {

  const orders = useOrderStore(state => state.orders);

  return (
    <FlashList
      data={orders}
      renderItem={({ item }) => <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <ThemedText>{item.coffee.name} x {item.amount}</ThemedText>
        <ThemedText>{(item.coffee.price * item.amount).toLocaleString("be-NL", { style: "currency", currency: "EUR" })}</ThemedText>
      </ThemedView>}
    />
  );

};

export default function OrderScreen() {

  const orders = useOrderStore(state => state.orders);
  const resetOrders = useOrderStore(state => state.resetOrders);
  const total = orders.reduce((sum, order) => sum + order.coffee.price * order.amount, 0);

  const handleConfirmOrder = () => {
    resetOrders();
    router.push('/(tabs)/order/confirmation');
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'Order' }} />
      <OrderList />
      <ThemedView>
        <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <ThemedText type="defaultSemiBold">Total</ThemedText>
          <ThemedText type="defaultSemiBold">{total.toLocaleString("be-NL", { style: "currency", currency: "EUR" })}</ThemedText>
        </ThemedView>
        <Button title='Confirm Order' onPress={handleConfirmOrder} />
      </ThemedView>
    </ThemedView>
  );
}