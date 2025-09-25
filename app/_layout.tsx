
import { Stack } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Linking from 'expo-linking'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const linking = {
  prefixes: [Linking.createURL('/')], 
  config: {
    screens: {
      index: "home",
      profile: "profile/:id", 
      explore: {
        screens: {
          index: "explore",
          settings: "explore/settings",
        },
      },
    },
  },
};

const publishableKey = "pk_test_am9pbnQtdGhydXNoLTQ4LmNsZXJrLmFjY291bnRzLmRldiQ"
// console.log(`This is a key: ${publishableKey}`)

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <SafeAreaProvider>
    <Slot />
      </SafeAreaProvider>
  </ClerkProvider>
)
};
