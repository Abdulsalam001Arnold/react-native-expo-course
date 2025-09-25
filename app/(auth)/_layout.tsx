

import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context';

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()
  const inset = useSafeAreaInsets()

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  return (
      <SafeAreaView style={{flex: 1, paddingTop: inset.top, paddingLeft: inset.left, paddingRight: inset.right}}>
      <Stack
      screenOptions={{
        headerShown: false
      }}
      />
      </SafeAreaView>

  )
}