

import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";



export default function Counter() {
    const [count, setCount] = useState(0)

    const handleDecrease = () => {
        if(count > 0) {
            setCount(count - 1)
        }
    }
    return(
        <View
        style={{flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20, padding: 40}}
        >
            <Pressable onPress={() => setCount(count + 1)}>
                    <Ionicons name="add" size={24} color={'black'}/>
            </Pressable>

            <Pressable onPress={handleDecrease}>
            <MaterialIcons name="exposure-minus-1" size={24} color="black" />
            </Pressable>

            <Text>
                Your count is: {count}
            </Text>
        </View>
    )
};
