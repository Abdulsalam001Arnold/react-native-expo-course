

import { View, SafeAreaView, Image, ImageBackground, ScrollView, Pressable, TouchableOpacity, ActivityIndicator, StyleSheet, StatusBar, Text, FlatList, KeyboardAvoidingView, Platform, Button, Alert } from "react-native";
import React, {useState, useEffect} from "react";
import { TextInput } from "react-native-gesture-handler";
import { Link } from "expo-router";
import Counter from "@/components/Counter";
import Card from "@/components/Card";

const localImage = require('@/assets/images/error-404.png')

const users = [
  { id: "1", name: "Abdul" },
  { id: "2", name: "Maria" },
  { id: "3", name: "James" },
  { id: "4", name: "Sophia" },
  { id: "5", name: "Daniel" },
];

export default function HomeScreen() {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [users, setUsers] = useState([])
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch("https://archbuild-api.vercel.app/api/peopleList")
        if(!response.ok) {
          Alert.alert("Error fetching data")
        }
        const data = await response.json()
        console.log(data)
        setUsers(data.data)
        if(loading) return
          <ActivityIndicator size="large" color="#0000ff" />
        
      } catch (err) {
        
      }finally{
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const renderItem = ({ item }: any) => (
   <Card
   name={item.name}
   image={item.image}
    post={item.post}
    paragraph={item.paragraph}
   />
  );
  const [enabled, setEnabled] = useState(false)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f5f9' }}>
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <StatusBar barStyle={'light-content'} />

      <Text style={styles.heading}>Welcome to RN</Text>

      <View style={styles.card}>
        <Text>Hello In this card</Text>
      </View>

      <View style={[styles.card, styles.alt]}>
        <Text numberOfLines={1}>
          Hello In this card Lorem ipsum dolor sit amet consectetur...
        </Text>
      </View>

      <Image
        style={styles.local}
        source={{
          uri: 'https://plus.unsplash.com/premium_photo-1753982281836-4a7d5cb5792f?...',
        }}
        resizeMode="cover"
      />

      <ImageBackground source={localImage} style={styles.backgroundStyle}>
        <View style={styles.overlay}>
          <Text style={{ color: '#fff' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, iste?
          </Text>
        </View>
      </ImageBackground>



      <Pressable
        onPress={() => alert('Clicked')}
        style={({ pressed }) => [
          {
            padding: 15,
            margin: 20,
            borderRadius: 8,
            backgroundColor: pressed ? '#80deea' : '#000',
          },
        ]}>
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>
          Click me
        </Text>
      </Pressable>

      <KeyboardAvoidingView
      style={{flex: 1, justifyContent: "center", padding: 20 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={{ marginBottom: 10, fontSize: 18 }}>Enter your name:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            borderRadius: 8,
          }}
          placeholder="Type here..."
          value={name}
          onChangeText={setName}
        />
        <Text>
          Hello {name || 'Guest'}
        </Text>
      </KeyboardAvoidingView>

      <View style={{ margin: 20 }}>
        <Text style={{ marginBottom: 10, fontSize: 18 }}>Enter your password:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            borderRadius: 8,
          }}
          secureTextEntry
          placeholder="Type password here..."
          value={password}
          onChangeText={setPassword}
        />
      </View>

        <Text style={{ marginBottom: 10, fontSize: 18 }}>Enter your age:</Text>
        
        <KeyboardAvoidingView
        className="flex-1 justify-center p-5"
        >
          <TextInput
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          placeholder="Enter your age here"
          className="border-[3px] border-black p-3 rounded-lg mb-5"
          />
        </KeyboardAvoidingView>
        

      <TextInput
      multiline
      numberOfLines={6}
      placeholder="Type your bio...."
      style={{
        borderWidth: 1,
        borderColor: '#000'
      }}
      />

<KeyboardAvoidingView
      style={{ flex: 1, justifyContent: "center", padding: 20 }}
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      keyboardVerticalOffset={100}
    >
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Type something..."
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
          marginBottom: 20,
        }}
      />
      <Pressable onPress={() => alert(name)} >
        <Text>
          Show
        </Text>
      </Pressable>
    </KeyboardAvoidingView>

    <Link href={{pathname: "/(drawer)/profile/[id]", params: { id: "123" }}} asChild>
        <Button title="Open Profile with id 123"/>
    </Link>

    <Counter/>

        <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        />
      
    </ScrollView>
  </SafeAreaView>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      gap: 40,
      justifyContent: 'center',
      backgroundColor: "#f1f5f9",
    },
    card: {
      backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 6, 
    elevation: 8,
    },
    alt: {
      backgroundColor: "#e2e8f0",
    },
    heading: {
      fontSize: 40,
      fontWeight: 500
    },
    local: {
      width: 170,
      height: 170
    },
    backgroundStyle:{
      width: '100%',
      height: 200,
      alignItems: 'center',
      justifyContent: "center"
    },
    overlay: {
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 5,
      color: '#fff'
    }
  })

