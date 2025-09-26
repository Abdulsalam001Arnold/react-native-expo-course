

import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { StyleSheet, Text, Pressable, View, ScrollView, Button, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CameraSetup() {
    const [facing, setFacing] = useState<CameraType>("back")
    const [photo, setPhoto] = useState<string | null>(null)
    const [permissions, requestPermissions] = useCameraPermissions()
    const cameraRef = useRef<CameraView | null>(null)

    if(!permissions) return <View/>;

    if(!permissions.granted) {
        return(
            <View
            style={styles.container}
            >
                <Text>
                    Practice app needs permission to access your camera.
                </Text>

                <Pressable
                onPress={requestPermissions}
                >
                    <Text>
                        Give Access
                    </Text>
                </Pressable>
            </View>
        )
    }

    const takePhoto = async() => {
        if(cameraRef.current){
            const result = await cameraRef?.current.takePictureAsync()
            setPhoto(result.uri)
            console.log("result:", result.uri)
        }
    }

    return(
        <ScrollView
        contentContainerStyle={{
            flexGrow: 1
        }}
        >
            {!photo ? (
                <>
                <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing={facing}
                />
                <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 20
                }}
                >
                    <Pressable
                    onPress={takePhoto}
                    >
                    <Ionicons name="camera" size={24} color="black" />
                    </Pressable>
                        <Pressable
                        onPress={() => setFacing(prev => prev === "back" ? "front" : "back")}
                        >
                    <Ionicons name="camera-reverse" size={24} color="black" />
                        </Pressable>
                </View>
                </>
            ): (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: photo }} style={{ width: 300, height: 400 }} />
          <Button title="Retake" onPress={() => setPhoto(null)} />
        </View>
            )}
            
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    camera: { flex: 1, width: 300, borderRadius: 400 }
})