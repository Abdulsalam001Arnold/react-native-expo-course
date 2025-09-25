

import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Pressable, View, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import { useSSO } from '@clerk/clerk-expo'
import * as AuthSession from 'expo-auth-session'
import { Ionicons } from '@expo/vector-icons'

WebBrowser.maybeCompleteAuthSession()

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { startSSOFlow } = useSSO()

  const handleGoogle = async () => {
    setLoading(true)
    try{
      const {createdSessionId, signIn, signUp, setActive} = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri({
          scheme: "practice"
        })
      })
      if(createdSessionId) {
        await setActive!({session: createdSessionId})

        router.replace("/")
      }

      if(signIn) {
        console.log("SignIn object", signIn)
      }

      if (signUp) {
        console.log("SignUp object returned:", signUp);
      }

    }catch(err){
      console.error(JSON.stringify(err, null, 2))
    }finally{
      setLoading(false)

    }
  }

  return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
          <KeyboardAwareScrollView
          >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
        <Text style={{
          fontSize: 34,
          fontWeight: 'bold',
          marginBottom: 20,
        }}>
          Signin
        </Text>
          {/* Form */}
        <View>
          <Pressable 
          style={{
            
            width: "auto",
            borderWidth: 1,
            padding: 20,
            borderRadius: 10
          }}
          onPress={handleGoogle}
          disabled={!isLoaded || loading}
          >
            {loading ? 
            
            <ActivityIndicator size="large" color="#0000ff" style={{marginRight: 10}} /> : 
            
            (
              <View style={{
                display: "flex",
            flexDirection: "row",
            justifyContent:"flex-end",
            alignItems: "center",
            gap: 10
              }}>
                <Text>
                  Continue with Google
                </Text>
                  <Ionicons name="logo-google" size={20} color="black" />
              </View>
            )}
          </Pressable>
        </View>

        <Link href={'/(auth)/sign-up'}>
            <Text>
              Or signup
            </Text>
        </Link>
      </View>
          </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
  )
}