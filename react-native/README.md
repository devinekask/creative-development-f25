# React Native

React Native allows you to write native applications for Android and iOS using React. Ideally, you can write your code once using JavaScript / React and create platform specific builds.

We will be using Expo as a toolset to create our React Native Applications.

See also: https://expo.dev/

## Prerequisites

- Make sure to install XCode (through App store)
- Have a working [homebrew](https://brew.sh/) installation on your system. Not sure if you've got Homebrew on your system? Open a Terminal and type:

  ```bash
  brew --version
  ```

  If you get command not found, install Homebrew using the instructions on their website.

- You also should have a working nodejs version. In Devine, we've been managing our nodejs installations using [nvm](https://github.com/nvm-sh/nvm)

- Install [Watchman](https://facebook.github.io/watchman/docs/install#buildinstall) using homebrew (explained on the Watchman website).

## Getting Started

We'll build react native apps as managed expo apps instead of bare react native apps. This provides us with an improved developer experience and is sufficient for our applications.

**Go through the [Getting Started Tutorial](https://docs.expo.dev/tutorial/introduction/) on the Expo website to explore the basics of Expo and create your first app.**

## Expo Router

The next chunk of content will be implementing a multi-page app using [Expo Router](https://docs.expo.dev/routing/introduction/) - which is a wrapper around [React Navigation](https://reactnavigation.org/).

**Take some time to read through [the documentation pages](https://docs.expo.dev/routing/introduction/) before starting on our first exercise: "The Plant Based Barista"**

## Plant Based Barista App

We'll be building a multi-page app that allows you to order a plant based coffee at a fictional coffee bar.

For this exercise, there is a **video series** available on our learning platform. I highly recommend you **watch those videos first**, so you get a general idea of what we're building.

Create a new project based upon the tabs template from Expo (also see https://docs.expo.dev/routing/installation/#quick-start)

```bash
npx create-expo-app@latest
```

It'll ask you to give your app a name, choose "plant-based-barista".

Give it some time to install the dependencies, and once it is done **cd into the project folder** and run npm start:

```bash
cd plant-based-barista
npm start
```

You'll be offered a menu with some options to run the app in dev mode on web, iOS or android. Choose the option to run it in the iOS simulator.

Explore the generated code. You'll see that there are two tabs created.

```
├── app
│   ├── (tabs)
│   │   ├── _layout.tsx
│   │   ├── explore.tsx
│   │   ├── index.tsx
│   ├── _layout.tsx
│   ├── +not-found.tsx
```

Make sure to read through the documentation to get a grasp of how this file structure works:

- https://docs.expo.dev/router/basics/core-concepts/
- https://docs.expo.dev/router/basics/layout/

### Cleaning up the starter code

The explore.tsx and index.tsx files contain a lot of demo code, let's get rid of that and keep them a bare minimum:

```tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView>
      <ThemedText type="title">Coffees</ThemedText>
    </ThemedView>
  );
}
```

> When running the project in the iOS simulator, you'll notice our content is appearing behind the status bar. We will ignore this for now, as this will be fixed automatically when we start wrapping our views in a navigation stack.

### Tab icon and label

Rename the `explore.tsx` file to `order.tsx`. You'll notice the tab icon disappears and the label suddenly starts with a lowercase letter. You will also get a warning:

> No route named "explore" exists in nested children

You'll need to fix this by updating the name of the screen in the `app/(tabs)/_layout.tsx` file:

```diff
  <Tabs.Screen
-  name="explore"
+  name="order"
    options={{
      title: 'Explore',
      tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
    }}
  />
```

Our two tabs need a nice icon and a label. Expo ships with IonIcons icons. Find an icon for our coffees list and checkout on https://ionic.io/ionicons/v4.

Change the `title` properties of the two tabs as well into "Coffees" and "Order".

```diff
- import { IconSymbol } from '@/components/ui/IconSymbol';
+ import Ionicons from '@expo/vector-icons/Ionicons';

//...

  <Tabs.Screen
    name="index"
    options={{
      title: 'Home',
-      tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
+      tabBarIcon: ({ color, focused }) => <Ionicons size={28} name={focused ? 'cafe' : 'cafe-outline'} color={color} />,
    }}
  />
```

## Display a list of coffees

We'll be using the [FlashList](https://docs.expo.dev/versions/latest/sdk/flash-list/) component to display a list of coffees on our first tab.

This is a highly optimized component which is able to display a ton of data in a fast scrolling list. 

Add this component to your project using the command below:

```bash
npx expo install @shopify/flash-list
```

You can find the full documentation of the component at: https://shopify.github.io/flash-list/. Find the basic usage of that component in those docs, and try to implement that basic usage in your app (`app/(tabs)/index.tsx`).

In order for the component to have a "size", you'll want to modify the styling of the root view of the component:

```tsx
return (
  <ThemedView style={{
    flex: 1,
  }}>
```

### Load the data

You can find the data and images for the coffees [in this zip file](projects/data.zip). Download it and unzip it in the root of your project folder (❗️ not your app subfolder):

```
├── app
│   ├── (tabs)
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── order.tsx
│   ├── _layout.tsx
│   ├── +html.tsx
│   ├── +not-found.tsx
├── data
│   ├── coffees
│   │   ├── 1-oat-milk-latte.jpg
│   │   ├── ...
│   ├── coffees.ts
```

We're using Typescript in our project, which helps us to define the shape of our data. You can find the data in the `data/coffees.ts` file. It's an array of objects, each object representing a coffee.

It contains an extra type definition, giving a bit more details about the properties and types of "Coffee" objects:

```ts
export type Coffee = {
  id: number;
  name: string;
  plantbased: boolean;
  description: string;
  price: number;
  image: any;
}
```

That very same file also exports an array of coffees:

```ts
const coffees:Coffee[] = [
  {
    "id":1,
    "name":"Oat Latte",
    "plantbased":true,
    "description":"Latte coffee with oat plant milk.",
    "price":3.5,
    "image": require('./coffees/1-oat-milk-latte.jpg')
  },
  ...
]
export { coffees }
```

**import this coffees array and Coffee type in your `app/(tabs)/index.tsx` file and use it to display the list of coffees in the FlashList component.**

```ts
import { Coffee, coffees } from '@/data/coffees';
```

```diff
const MyList = () => {
  return (
    <FlashList
-     data={DATA}
-     renderItem={({ item }) => <ThemedText>{item.title}</ThemedText>}
+     data={coffees}
+     renderItem={({ item }) => <ThemedText>{item.name}</ThemedText>}
    />
  );
};
```

You might need to do a full app refresh to see the changes, because of the **aggressive caching** of Flashlist. As this is a bit annoying to do on iOS, you **might want to switch to the web** version of your app to do faster refreshes.

### Display the image, name and price

We want to show more than just a coffee name, but also a thumbnail and price of the coffee.

Import the Image component in your `app/(tabs)/index.tsx` file:

```ts
import { Image } from 'react-native';
```

Adjust the renderItem method, so it shows the Image and the label next to each other:


```diff
<FlashList
  data={coffees}
-  renderItem={({ item }) => <ThemedText>{item.name}</ThemedText>}
+  renderItem={({ item }) => <ThemedView>
+    <Image source={item.image} style={{ width: 50, height: 50 }} />
+    <ThemedText>{item.name}</ThemedText>
+  </ThemedView>}
/>
```

Once you've got that image working, adjust the renderItem method so it shows the price as well. Use extra `<ThemedView>` components (which are basically react-native flexbox divs) to style the layout of the image, name and price.

![overview screen](images/overview-screen.png)

## Navigate to detail

Whenever we tab on one of the coffees, we want to navigate to a detail page. In order to do so, we will nest a StackNavigator inside of our TabNavigator.

1. Within the `(tabs)` group, add a folder called `(index)`.
2. Inside that folder, create a file called `_layout.tsx`.
3. In that file, import and export the Stack component from expo-router:

  ```ts
  import { Stack } from 'expo-router';
  export default Stack;
  ```

4. Move the `(tabs)/index.tsx` file into the `(tabs)/(index)` folder and update the necessary imports.

```
├── app
│   ├── (tabs)
│   │   ├── _layout.tsx
│   │   ├── (index)
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx
│   │   ├── _layout.tsx
│   │   ├── order.tsx
│   ├── _layout.tsx
...
```

You'll notice you're getting a familiar warning message:

> No route named "index" exists in nested children

Make sure to update the name of the `index` screen to `(index)` in the `app/(tabs)/_layout.tsx` file.

### Link to the detail screen

Within the (index) group, create a new file `[id].tsx`. This will be our detail screen.

Create a basic view with some text in it:

```tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function DetailScreen() {
  return (
    <ThemedView>
      <ThemedText type="title">Detail</ThemedText>
    </ThemedView>
  );
}
```

In your `app/(tabs)/(index)/index.tsx` file, import the Link component from expo-router:

```ts
import { Link } from 'expo-router';
```

Wrap the FlashList items in a Link component, and link to the detail screen:

```diff
renderItem={({ item }) => (
+ <Link href={`/(tabs)/(index)/${item.id}`}>
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
+</Link>)}
```

Test the app (you might need to do a full restart of your dev server). Tapping an item should move to the detail screen:

![basic detail screen](images/navigate-to-detail.gif)

## Display the coffee details

The filename of our detail view has a special name: `[id].tsx`. This means that the id of the coffee will be available as a parameter in the `useLocalSearchParams` hook of expo-router.

```tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams } from 'expo-router';

export default function DetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ThemedView>
      <ThemedText type="title">Detail of {id}</ThemedText>
    </ThemedView>
  );
}
```

You should see the id of the coffee in the detail screen now.

Using that id, we can get the relevant coffee from our coffees array:

```tsx
const { id } = useLocalSearchParams();
const coffee = coffees.find((coffee) => coffee.id === id);

return (
  <ThemedView>
    <ThemedText>Detail of {coffee?.name}</ThemedText>
  </ThemedView>
)
```

Trying this code, you'll see that it doesn't work. Thanks to Typescript, some of the code with an issue is being highlighted, with an error message:

> This comparison appears to be unintentional because the types 'number' and 'string | string[]' have no overlap.

This is because the id parameter is a string, and the id of the coffee is a number. We can fix this by converting the id parameter to a number:

```tsx
const { id } = useLocalSearchParams();
const coffee = coffees.find((coffee) => coffee.id === Number(id));
```

Once you've got this working, adjust the code so that it shows the image and description of the coffee.

![basic detail screen](images/basic-detail-screen.png)

## Header Titles

Our detail header currently shows the text "[id]". We want to show the name of the coffee in the header.

We can do so, by adding a `<Stack.Screen />` component in our view.

```diff
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { coffees } from '@/data/coffees';
- import { useLocalSearchParams } from 'expo-router';
+ import { Stack, useLocalSearchParams } from 'expo-router';
import { Image } from 'react-native';

export default function DetailScreen() {

  const { id } = useLocalSearchParams();
  const coffee = coffees.find((coffee) => coffee.id === Number(id));

  return (
    <ThemedView>
+      <Stack.Screen
+        options={{ title: coffee?.name }}
+      />
      <Image source={coffee?.image} style={{ width: '100%', height: 300 }} />
      <ThemedView style={{ padding: 16 }}>
        <ThemedText>{coffee?.description}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
```

The detail screen should now show the coffee title.

Also adjust the overview, so that it shows the title "Coffees" in the header.

## Central data store using Zustand

On our coffees list screen, we want to add coffees to our order (which is further handled on the order screen). We'll manage this shared data in a [Zustand store](https://github.com/pmndrs/zustand). Make sure to read through the documentation of Zustand to get a grasp of how it works.

**Add Zustand to your project using the command below:**

```bash
npm install zustand
```

Create a new file `hooks/use-order-store.ts` (again: the hooks folder should be in the root of your project, not the app subfolder) and add the following code, defining our Order type:

```ts
import { Coffee } from '@/data/coffees'
import { create } from 'zustand'

type Order = {
  coffee: Coffee,
  amount: number,
}
```

We need to describe the interface of our store as well. We will manage an array of Orders, and have two methods to add a coffee to the order and to reset the order:

```ts
interface OrderState {
  orders: Order[],
  orderCoffee: (coffee: Coffee) => void,
  resetOrders: () => void,
}
```

This interface is just a description of what the store will do, but doesn't contain any logic. It's a contract where our implementation will adhere to.

Create a store using zustand's `create` method:

```ts
export const useOrderStore = create<OrderState>()((set) => ({
  orders: [],
  orderCoffee: (coffee) => set((state) => {
    // todo
  }),
  resetOrders: () => set((state) => {
    // todo
  }),
}))
```

We're (obviously) still missing the implementation details of our orderCoffee and resetOrders methods.

These methods will update the data of our store, and return the result of a built-in zustand method called `set`. This method receives the existing state of our store, and expects us to return the new state of our store.

In case of our orderCoffee and resetOrders methods, they should return an object containing the updated `orders` array.

### resetOrders

This is an easy one: we just want to return an empty array:

```ts
resetOrders: () => set((state) => ({
  orders: [],
})),
```

### orderCoffee

The orderCoffee function receives a `Coffee` instance, and needs to update the orders array. There are two scenarios:

1. The coffee is not yet in the orders array, in which case we need to add a new order to the array.
2. The coffee is already in the orders array, in which case we need to update the amount of that order.

```ts
const coffeeIndex = state.orders.findIndex((order) => order.coffee.id === coffee.id);
const coffeeHasAlreadyBeenOrdered = coffeeIndex !== -1;
if (coffeeHasAlreadyBeenOrdered) {
  // todo: return an updated array
}
// else: return orders array with an added order
```

In case of the else statement, we need to return an array with an added order. We can do this using the spread operator:

```ts
return {
  orders: [
    ...state.orders,
    {
      coffee,
      amount: 1,
    }
  ]
}
```

In case the coffee is already in the array, we will map over the orders and update the one order with the matching id:

```ts
if (coffeeHasAlreadyBeenOrdered) {
  return {
    orders: state.orders.map((order, index) => {
      if (index === coffeeIndex) {
        return {
          ...order,
          amount: order.amount + 1,
        }
      }
      return order;
    })
  };
}
```

## Add coffee orders to the store

Inside of the list, we want to add a button to add a coffee to the cart.

Import the useOrderStore hook in your `app/(tabs)/(index)/index.tsx` file:

```ts
import { useOrderStore } from '@/hooks/use-order-store';
```

Inside the component's render function get the `orderCoffee` method from the store's state:

```ts
const orderCoffee = useOrderStore(state => state.orderCoffee);
```

Update the renderItem logic, so that it contains an add button to the right.

```tsx
<Pressable
  onPress={() => orderCoffee(item)}
  style={({pressed}) => [
    {
      opacity: pressed ? 0.5 : 1.0,
    },
  ]}>
  <Ionicons name='add-circle' size={24} />
</Pressable>
```

Pressing the button will now execute the logic in the store and add items to the orders array.

### Display the number of items in the cart

We can show a badge on our cart tab icon, to display the amount of items in the cart. Open up `app/(tabs)/_layout.tsx`, and get the orders from the store using the hook:

```ts
const orders = useOrderStore(state => state.orders);
const coffeeCount = orders.length;
```

Add a tabBarBadge to the tab options:

```diff
<Tabs.Screen
  name="order"
  options={{
    title: 'Orders',
+    tabBarBadge: coffeeCount > 0 ? coffeeCount : undefined,
    tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
  }}
/>
```

You should see a badge with a number on the tab icon now. This does not take into account the amount of items in the order.

**Adjust the code calculating the coffeeCount so it takes the amount of items into account.**

![order count badge](images/order-count-badge.png)

## Order Screen

The Order tab will also consist of two screens in a stack: the order overview and an order confirmation screen.

1. Create a subfolder `app/(tabs)/order` and create a file `_layout.tsx` in that folder. This layout is a copy from the `(index)` layout, which is a re-export of the Stack component from expo-router.
2. Move the `app/(tabs)/order.tsx` file into the `app/(tabs)/order` folder and update the imports. Rename that file to `index.tsx`.

```
├── app
│   ├── (tabs)
│   │   ├── (index)
│   │   │   ├── _layout.tsx
│   │   │   ├── [id].tsx
│   │   │   ├── index.tsx
│   │   ├── order
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx
│   │   ├── _layout.tsx
│   ├── _layout.tsx
...
```

Use the useOrderStore hook to retrieve the orders from the store, and display them in a FlashList component. Add the necessary calculations to calculate the line item totals and total price, and display those as well. Make sure there is a Button (`import { Button } from "react-native";` ) at the bottom of that screen to confirm the order.

![order screen](images/order-screen.png)

## Order confirmed screen

When the user confirms the order, we want to show a confirmation screen. This screen will be a simple screen with a text and a button to go back to the coffees list.

Create a file `app/(tabs)/order/confirmation.tsx` which displays a simple thank you message.

![confirmation](images/confirmation.png)

When clicking the "Confirm Order" button on the order screen, we need to clear the order list from the store and navigate to the confirmation screen.

Make sure to import the router from expo-router at the top of that file:

```ts
import { Stack, router } from "expo-router";
```

Get the resetOrders method from the store:

```ts
const resetOrders = useOrderStore(state => state.resetOrders);
```

And link the necessary logic to that confirmation button:

```tsx
<Button title="Confirm Order" onPress={() => {
  resetOrders();
  router.push('/(tabs)/order/confirmation');
}} />
```

## Where to go from here

We've barely scratched the surface of what you can do using React Native.

- Provide App icons and a splash screen
- Try running the app on your physical device
- Did it actually happen, if it's not on social media? Add an image capture screen with share functionality.
- Take a look at https://github.com/jondot/awesome-react-native