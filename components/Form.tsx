
import  * as yup from 'yup'
import {Formik} from 'formik'
import { Alert, Text, View, Pressable, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FormEvent } from 'react'


const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(4, "Password must be at least 4 characters").required("Password is required"),
})
export default function Form() {
    return(
        <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: "center"}}
        >
        <Formik
        initialValues={{email: "", password: ""}}
        validationSchema={validationSchema}
        onSubmit={(values) => (
            Alert.alert(JSON.stringify(values, null, 2))
        )}
        >
            {({handleChange, values, errors, handleSubmit}) => (
                <View
                style={{padding: 20}}
                >
                    <TextInput
                    keyboardType='email-address'
                    value={values.email}
                    onChangeText={handleChange("email")}
                    style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, borderRadius: 8 }}
                    />
                    {errors && errors.email && (<Text style={{ color: 'red', marginBottom: 10 }}>{errors.email}</Text>)}

                    <TextInput
                    secureTextEntry
                    value={values.password}
                    onChangeText={handleChange("password")}
                    style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, borderRadius: 8 }}
                    />
                    {errors && errors.password && (<Text style={{ color: 'red', marginBottom: 10 }}>{errors.password}</Text>)}


                    <Pressable
                    onPress={() => handleSubmit}
                    >
                        <Text
                        
                        style={{ backgroundColor: 'black', color: 'white', padding: 15, textAlign: 'center', borderRadius: 8 }}
                        >
                            Submit
                        </Text>
                    </Pressable>
                </View>
            )}
        </Formik>

        </KeyboardAwareScrollView>
    )
};
