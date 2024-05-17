import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import {images} from '../../constants'
import { StatusBar } from 'expo-status-bar'

const Home = () => {
  return (
    <SafeAreaView>
     <ScrollView>
      <Text>Home</Text>
      </ScrollView>
      
      <StatusBar backgroundColor="#000000" style="light" />
    </SafeAreaView>
  )
}

export default Home