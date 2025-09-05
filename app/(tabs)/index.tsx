

import { View, SafeAreaView, Image, ImageBackground, ScrollView, Pressable, TouchableOpacity, ActivityIndicator, StyleSheet, StatusBar, Text } from "react-native";
import React, {useState} from "react";

const localImage = require('@/assets/images/error-404.png')

const DATA = [
  { id: "1", title: "FlatList Item 1" },
  { id: "2", title: "FlatList Item 2" },
  { id: "3", title: "FlatList Item 3" },
];

export default function HomeScreen() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [enabled, setEnabled] = useState(false)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'}/>
    <Text style={styles.heading}>
      Welcome to RN
    </Text>
    <View style={styles.card}>
      <Text>
        Hello In this card
      </Text>
    </View>

    <View style={[styles.card, styles.alt]}>
      <Text numberOfLines={1}>
        Hello In this card Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, quasi placeat? Illo libero nostrum molestiae aliquid totam facere amet provident.
      </Text>
    </View>

    <Image style={styles.local} source={{uri: "https://plus.unsplash.com/premium_photo-1753982281836-4a7d5cb5792f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} resizeMode="cover"/>

    <ImageBackground source={localImage} style={styles.backgroundStyle}>
      <View style={styles.overlay}>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, iste?
        </Text>
      </View>
    </ImageBackground>
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

