
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Button, Platform } from "react-native";
import { useRouter } from "expo-router";

export default function RootLayout() {
    const router = useRouter()
    return(
    <GestureHandlerRootView style={{flex: 1}}>
        <Tabs>
            <Tabs.Screen name="index" options={{title: "Explore - Home", tabBarLabel: "Home",
            tabBarIcon: ({color, size, focused}) => (
                <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color}/>
            ),
            headerTitle: "Customized",
            tabBarBadge: 4
            }}/>
        <Tabs.Screen name="settings" options={{title: "Settings", tabBarLabel: "Settings",
            tabBarIcon: ({focused, size, color}) => (
                <Ionicons name={focused ? "settings" : "settings-outline"} size={size} color={color}/>
            ),
            headerRight: () => <Button title="Save" onPress={() => alert("Saved!")}/>,
            headerLeft: () => <Ionicons name="return-up-back-sharp" size={20} color={'black'} onPress={() => router.back()}/>,
            tabBarStyle: {
                backgroundColor: "black",
                borderTopWidth: 0,
                height: Platform.OS === "ios" ? 60 : 90,
            },
            tabBarActiveTintColor: "#007AFF",
            tabBarInactiveTintColor: "gray",

        }}/>
        </Tabs>
    </GestureHandlerRootView>
    )
};
