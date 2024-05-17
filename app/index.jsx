import { Image, ScrollView,StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import Icon from 'react-native-vector-icons/Ionicons'; 

import {images} from '../constants'
import { StatusBar } from 'expo-status-bar'

const index = () => {
  return (
    <SafeAreaView style={styles.gradientBackground}>

   <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-[85vh] px-4">
          
        <View style={{ position: 'absolute', top: 50, left: 30}}>
  <Image className='rounded-md'
    source={images.logo}
    style={{ width: 60, height: 60, resizeMode: 'contain' }}
  />
</View>

          <Image
            source={images.welcomescreen1}
            className="max-w-[280px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-[18px]  font-pmedium text-white font-bold text-center">
              Let's Start your  </Text>
              <Text className="text-[24px] font-pblack text-white font-bold text-center">Medical Assistant !</Text> 
           
          </View>

          <Text className="text-xs font-pregular  text-gray-100 mt-2 text-center">
          Transform your well-being with DoctorMe. {"\n"}
          We're dedicated to meeting all your medical needs.
          </Text>

        
    
                   

                    <TouchableOpacity onPress={() => router.push("/Home")}  className='flex-row items-center bg-white mt-10 rounded-2xl '>
                        <Text 
                        className='text-[13px] w-[150px] text-center font-bold text-black p-5' >Get Started</Text>
                      <Icon name="log-in-outline" size={30} className='ml-auto mr-5'/> 
                    </TouchableOpacity>
      

        </View>
      </ScrollView>

      <StatusBar backgroundColor="#000000" style="light" />

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    backgroundColor: 'black', // This will not work directly in React Native
  },
});

export default index
