


import { StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback, Keyboard,Switch } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ProfileCard from "@/components/ProfileCard";

export default function TabTwoScreen() {
  const {id} = useLocalSearchParams()
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView contentContainerStyle={styles.scrollContent}
    enableOnAndroid={true}
    extraScrollHeight={20}
    keyboardShouldPersistTaps="handled"
    keyboardOpeningTime={0}
    >
      <Text style={styles.title}>
          Hello Profile with ID - {id}
      </Text>

      <View style={{marginTop: 30, flex: 1, flexDirection: "row", justifyContent: "center", alignContent: "center", gap: 10}}>
        <View style={{width: 100, height: 100, backgroundColor: "red"}}/>
        <View style={{width: 100, height: 100, backgroundColor: "blue"}}/>
        <View style={{width: 100, height: 100, backgroundColor: "green"}}/>
      </View>
      <Switch/>


      <ProfileCard/>
    </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1, 
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40, 
    backgroundColor: "#f6f6f6",
  },
  title: {
    fontSize: 30,
    fontWeight: "heavy"
  }
});
