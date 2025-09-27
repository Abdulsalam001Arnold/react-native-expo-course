import { Link, useRouter } from "expo-router";
import * as ExpoSecure from 'expo-secure-store'
import {
  Text,
  TextInput,
  Pressable,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as WebBrowser from "expo-web-browser";
import { useSSO, useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const { startSSOFlow } = useSSO();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return null;

    try {
      setLoading(true);
      await signUp.create({
        emailAddress: email,
        password: password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      if (err instanceof Error) {
        Alert.alert(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return null;

    try {
      const signupAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (
        signupAttempt.status === "complete" &&
        signupAttempt.createdSessionId
      ) {
        await setActive({ session: signupAttempt.createdSessionId });
        if(signupAttempt.createdSessionId) {
          await ExpoSecure.setItemAsync("session", signupAttempt.createdSessionId)
        }
        router.replace("/");
      } else {
        console.warn("Verification pending:", signupAttempt);
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      if (err instanceof Error) {
        Alert.alert(err.message);
      }
    }
  };

  if (pendingVerification) {
    return (
      <View
        style={{
          padding: 20,
        }}>
        <Text>Verify Email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={setCode}
          style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
        />
        <Pressable onPress={onVerifyPress}>
          <Text>Verify</Text>
        </Pressable>
      </View>
    );
  }

  const onSSOPress = async (
    strategy: "oauth_google" | "oauth_github" | "oauth_microsoft"
  ) => {
    try {
      setLoading(true);
      const {
        createdSessionId,
        signUp,
        setActive: setSSOActive,
      } = await startSSOFlow({
        strategy,
      });

      if (createdSessionId) {
        await setSSOActive!({ session: createdSessionId });
        await ExpoSecure.setItemAsync("session", createdSessionId)
        router.replace("/");
        return;
      }
      if (signUp && signUp.missingFields?.length > 0) {
        Alert.alert(
          "Extra info required",
          `We need the following fields to finish sign-up: ${signUp.missingFields.join(
            ", "
          )}`
        );
      }
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
            Sign up
          </Text>
          {/* Form for email and password*/}
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
              onPress={onSignUpPress}
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

            <TouchableOpacity onPress={() => onSSOPress("oauth_google")}>
              <Text>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSSOPress("oauth_github")}>
              <Text>Continue with GitHub</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSSOPress("oauth_microsoft")}>
              <Text>Continue with Microsoft</Text>
            </TouchableOpacity>
          </View>

          <Link href={"/(auth)/sign-in"}>
            <Text>Or signin</Text>
          </Link>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}
