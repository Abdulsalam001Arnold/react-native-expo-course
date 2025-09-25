
import { ScrollView, View, Text } from "react-native";
import Form from '@/components/Form'

export default function settings() {
    return(
    <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: "center", padding: 20}}>
        <Text>
            This is the settings page - Tabs 1
        </Text>

        <Form/>
    </ScrollView>
    )
};
