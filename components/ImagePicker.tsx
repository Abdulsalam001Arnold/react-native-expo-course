

import * as ImagePicker from 'expo-image-picker'
import { useState, useRef } from 'react'
import { View, Image, ScrollView, StyleSheet, Pressable, Text } from 'react-native'

export default function ImagePickerSetup() {
    const [image, setImage] = useState<string | null>(null)
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)


    const pickImage = async() => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["videos", "images"],
            aspect: [4, 3],
            allowsEditing: true,
            quality: 1
        })

        if(!result.canceled){
            setImage(result.assets[0].uri)
            setWidth(result.assets[0].width)
            setHeight(result.assets[0].height)
        }
    }
    return(
        <View>
            {image && <Image source={{uri: image}} width={300} height={height}/>}
            <Pressable
            onPress={pickImage}
            >
                <Text>
                    Pick an image
                </Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({

})
