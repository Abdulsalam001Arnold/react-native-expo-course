

import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Button } from "react-native";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/sign-in");
  };

  return <Button title="Sign out" onPress={handleSignOut} />;
};
