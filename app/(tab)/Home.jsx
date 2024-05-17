import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ImageSlider from '../../components/ImageSlider';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  return (
   
    <SafeAreaView className='bg-black'>
     <ImageSlider /> 



     <StatusBar backgroundColor="#000000" style="light" />
    </SafeAreaView>

  );
}


