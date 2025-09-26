import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { SignOutButton } from "@/components/SignOutBtn";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
      screenOptions={{
        headerRight: () => <SignOutButton/>,
        drawerActiveTintColor: "#e91e63",
        headerTitleAlign: "center"
      }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Home",
            drawerIcon: ({ color, focused, size }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            ),
            headerTitle: "Landing"
          }}
        />

        <Drawer.Screen
          name="profile/[id]"
          options={{
            title: "Profile",
            drawerIcon: ({ color, focused, size }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
