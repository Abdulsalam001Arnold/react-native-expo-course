
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ProtectedLayout() {
    const {isSignedIn, isLoaded} = useAuth()

    if(!isLoaded) return null;
    
    if(!isSignedIn) {
        return <Redirect href={"/(auth)/sign-up"}/>
    }
        return (
            <GestureHandlerRootView style={{flex: 1}}>
                <Stack 
                screenOptions={{
                    headerShown: false
                }}
                />
            </GestureHandlerRootView>
    );
};
