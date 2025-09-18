
import { StyleSheet, Image, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const image = require("@/assets/images/pic.jpg")
export default function ProfileCard() {
    return(
        <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        >
            <Image
            source={{uri: "https://res.cloudinary.com/prod/image/upload/ar_1:1,c_auto,g_auto,w_500/r_max/me/rc/portrait-2.png"}}
            />
        </KeyboardAwareScrollView>
    )
};

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 40
    }
})
