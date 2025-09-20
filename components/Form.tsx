
import { KeyboardAvoidingView, TextInput, ScrollView, Platform, StyleSheet, Text, View,Pressable } from "react-native";


export default function Form() {
    return(
        <View
        style={{flex: 1, justifyContent: "center", padding: 20, alignItems: "center"}}
        >
                <Text>
                    Form
                </Text>

                <TextInput
                    placeholder="Your name is..."
                    style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 8,
                        padding: 12,
                        marginBottom: 20,
                        width: "100%"
                    }}
                    />

                    <TextInput
                    keyboardType="email-address"
                    placeholder="Enter your e-mail"
                    style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 8,
                        padding: 12,
                        marginBottom: 20,
                        width: "100%"
                    }}
                    />

                    <TextInput
                    secureTextEntry
                    placeholder="Enter your password"
                    style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 8,
                        padding: 12,
                        marginBottom: 20,
                        width: "100%"
                    }}
                    />

                    <Pressable
                    onPress={() => alert("Form submitted!")}
                    >
                        <Text>
                            Submit
                        </Text>
                    </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20
    }
})