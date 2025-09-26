import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Text,
  Pressable,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as WebBrowser from "expo-web-browser";
import { useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

WebBrowser.maybeCompleteAuthSession();

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { startSSOFlow } = useSSO();

  const signinWithEmail = async () => {
    if (!isLoaded) return null;

    try {
      setLoading(true);

      const signInAttempt = await signIn.create({
        identifier: email,
        password: password,
      });

      if (
        signInAttempt.status === "complete" &&
        signInAttempt.createdSessionId
      ) {
        await setActive({ session: signIn.createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        Alert.alert(err.message);
      }
    }
  };

  const useSSOFlow = async (
    strategy: "oauth_google" | "oauth_microsoft" | "oauth_github"
  ) => {
    setLoading(true);
    try {
      const {
        createdSessionId,
        signIn,
        setActive: setSSOActive,
      } = await startSSOFlow({
        strategy,
      });
      if (createdSessionId) {
        await setSSOActive!({ session: createdSessionId });
      }
      router.replace("/");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      if (err instanceof Error) {
        Alert.alert(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
      <KeyboardAwareScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}>
          <Text
            style={{
              fontSize: 34,
              fontWeight: "bold",
              marginBottom: 20,
            }}>
            Signin
          </Text>
          {/* Form */}
          <View>
            <TextInput
              value={email}
              placeholder="Enter your email"
              onChangeText={setEmail}
              keyboardType="email-address"
              style={{
                borderWidth: 1,
                padding: 8,
                marginVertical: 10,
                width: 250,
                borderRadius: 10,
              }}
            />

            <TextInput
              value={password}
              placeholder="Enter your Password"
              onChangeText={setPassword}
              secureTextEntry
              style={{
                borderWidth: 1,
                padding: 8,
                marginVertical: 10,
                width: 250,
                borderRadius: 10,
              }}
            />

            <Pressable
              onPress={signinWithEmail}
              style={{
                backgroundColor: "#000",
                padding: 20,
                borderRadius: 40,
              }}
              disabled={!isLoaded || loading || !email || !password}>
              {loading ? (
                <ActivityIndicator size={"large"} color={"white"} />
              ) : (
                <Text style={{ textAlign: "center", color: "white" }}>
                  Continue with Email and Password
                </Text>
              )}
            </Pressable>

            <View style={{ marginVertical: 20 }}>
              <Text style={{ textAlign: "center" }}>Or continue with</Text>
            </View>
            <Pressable
              style={{
                width: "auto",
                borderWidth: 1,
                padding: 20,
                borderRadius: 10,
              }}
              onPress={() => useSSOFlow("oauth_google")}
              disabled={!isLoaded || loading}>
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  style={{ marginRight: 10 }}
                />
              ) : (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 10,
                  }}>
                  <Text>Continue with Google</Text>
                  <Ionicons name="logo-google" size={20} color="black" />
                </View>
              )}
            </Pressable>
          </View>

          <Link href={"/(auth)/sign-up"}>
            <Text>Or signup</Text>
          </Link>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}
