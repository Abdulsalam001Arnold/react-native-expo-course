import {
  StyleSheet,
  Image,
  Text,
  View,
  Alert,
  Pressable,
  ActivityIndicator,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { Video } from "expo-av";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useState } from "react";
export default function ProfileCard() {
  const [name, setName] = useState("Abdul Larry");
  const [bio, setBio] = useState(
    "Mobile Developer | Tech Enthusiast | Coffee Lover"
  );
  const [loading, setLoading] = useState(false);
  const videoSource = "https://res.cloudinary.com/dqpbdik90/video/upload/v1757089139/Notepad_-_Google_Chrome_2025-09-05_17-05-01_rzqrbr.mp4"

  async function handleSave() {
    await new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        resolve(true);
      }, 4000);
    });
    Alert.alert("Profile Saved", `Name: ${name}\nBio: ${bio}`);
  }
  const player = useVideoPlayer(videoSource, play => {
    play.loop = true;
    play.play();
    play.muted = true;
  })
  const {isPlaying} = useEvent(player, "playingChange", {isPlaying: player.playing})
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled">
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.4)", "#f9f9f9", ""]}
          style={styles.header}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/prod/image/upload/ar_1:1,c_auto,g_auto,w_500/r_max/me/rc/portrait-2.png",
            }}
            resizeMode="cover"
            style={styles.image}
          />

          <Feather name="edit-3" size={25} color={"white"} />
          <Text style={{ color: "white" }}>{name}</Text>
          <Text style={{ color: "white" }}>{bio}</Text>
        </LinearGradient>

        <View style={styles.form}>
          <TextInput
            placeholder="Full Name"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              marginBottom: 20,
              paddingVertical: 8,
            }}
          />
        </View>
        <Pressable onPress={handleSave} style={styles.button}>
          {loading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <Text style={{ color: "white",  }}>
                <Ionicons name="save-outline" size={20} color={"white"} style={{marginRight: 8}}/>
              Save Profile
            </Text>
          )}
        </Pressable>

        <View style={{marginTop: 20}}>
            <Text>
              A quick intro video
            </Text>

            <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture/>

            <Pressable
            onPress={() => {
              if(isPlaying) {
                player.pause()
              }else{
                player.play()
              }
            }}
            >
              <Text style={{textAlign:  "center"}}>
                {isPlaying ? <Ionicons name="pause" size={30} color="black" /> : <Ionicons name="play" size={30} color="black" />}
              </Text>
            </Pressable>

            <Text className="text-red-500 text-xl">
              This is a tailwindcss case.
            </Text>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 40,
  },
  video: {
    width: 300,
    height:  200,
    borderRadius: 30
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 8,
    flexDirection:"row", alignItems: "center", justifyContent: "center"
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  form: {
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
});
