
import { useEffect } from "react";
import { Alert, Text, Pressable, View } from "react-native";
import * as Device from 'expo-device'
import * as Notification from 'expo-notifications'

export default function LocalNotification() {
    useEffect(() => {
        requestPermissions();
    }, [])

     const requestPermissions = async () => {
        if(Device.isDevice) {
            const {granted} = await Notification.requestPermissionsAsync()
            if(!granted){
                Alert.alert("Must give permission to receive notification.")
            }
        }else{
            Alert.alert("Must be a physical device.")
        }
    }
    
    const scheduleNotification = async() => {
        await Notification.scheduleNotificationAsync({
            content: {
                title: "Reminder",
                body: "This is a gentle reminder"
            },
            trigger: { 
                type: Notification.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: 5,
                 repeats: false
             }
        })
    }

    return(
        <View>
            <Text>
                Set Local Notification
            </Text>

            <Pressable
            onPress={scheduleNotification}
            >
                <Text>
                    Click to set Notification
                </Text>
            </Pressable>
        </View>
    )

};



