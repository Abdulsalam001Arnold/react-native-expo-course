
import { Stack } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Linking from 'expo-linking'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import * as ExpoSecure from "expo-secure-store"
import { useEffect } from "react";
import { useRouter } from "expo-router";
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
  const router = useRouter()
  useEffect(() => {
    const getToken = async () => {
        const session = await ExpoSecure.getItemAsync("session")
        if(session) {
          console.log(`This is my session: ${session}`)
        } else {
          router.replace("/(auth)/sign-in");
        }
    }

    getToken()
  }, [])
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <SafeAreaProvider>
    <Slot />
      </SafeAreaProvider>
  </ClerkProvider>
)
};
