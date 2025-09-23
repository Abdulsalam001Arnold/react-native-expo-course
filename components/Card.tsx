

import { ScrollView } from "react-native-gesture-handler";
import { View, Text, Image } from "react-native";

export default function Card({image, name, post, paragraph}: {image: string, name: string, post: string, paragraph: string}) {
    
    return(
        <ScrollView
        contentContainerStyle={{ padding: 20, flexGrow: 1, justifyContent: "center", alignItems: "center", gap: 20 }}
        >
            <View
            style={{ width: '100%', backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 8 }}
            >
                <Image 
                source={{uri: image}}
                style={{ width: '100%', height: 200, borderRadius: 12, marginBottom: 20 }}
                />
                <Text
                style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}
                >
                    {name}
                </Text>
                <Text
                style={{ fontSize: 18, fontWeight: '600', marginBottom: 12, color: 'gray' }}
                >
                    {post}
                </Text>
                <Text
                style={{ fontSize: 16, lineHeight: 22, color: '#333' }}
                >
                    {paragraph}
                </Text>
            </View>
        </ScrollView>
    )
};
