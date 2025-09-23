
import { Stack } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Linking from 'expo-linking'

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

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Stack>
        <Stack.Screen name="(drawer)" options={{headerShown: false }}/>
        <Stack.Screen name="explore" options={{headerShown: false}}/>
      </Stack>
    </GestureHandlerRootView>
)
};
