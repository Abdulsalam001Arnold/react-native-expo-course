
import { ScrollView, View, Text } from "react-native";
import Form from '@/components/Form'
import * as Device from 'expo-device'

export default function settings() {
    return(
    <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: "center", padding: 20}}>
        <Text>
            This is the settings page - Tabs 1
        </Text>

        <View>
            <Text>Phone Details:</Text>

            <Text>
                    {Device.manufacturer} - {Device.brand} - {Device.osName}
            </Text>
        </View>

        <Form/>
    </ScrollView>
    )
};
