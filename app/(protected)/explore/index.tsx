
import { ScrollView, Text, Switch } from "react-native"
import ImagePickerSetup from "@/components/ImagePicker"
import LocalNotification from "@/components/LocalNotification"

export default function HomeScreen() {
    return(
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: "center", padding: 20}}>
            <Text>
                Tabs 1 - homepage
            </Text>

            <ImagePickerSetup/>

            <LocalNotification/>

        </ScrollView>
    )
};
