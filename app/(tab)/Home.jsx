import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ImageSlider from '../../components/ImageSlider';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <LinearGradient
    colors={['#f9faf8',  '#dbe9db']} // Set your gradient colors here
    style={{ flex: 1 }}
  >
    <SafeAreaView>
     <ImageSlider /> 



     <StatusBar backgroundColor="#000000" style="light" />
    </SafeAreaView>

    </LinearGradient>

  );
}


