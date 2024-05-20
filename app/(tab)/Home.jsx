import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, View } from 'react-native';
import ImageSlider from '../../components/ImageSlider';

import Header from '../../components/homecomponents/Header'
import ServicesList from '../../components/homecomponents/ServicesList'

import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    
<LinearGradient colors={['#f9faf8',  '#dbe9db']}>

    <SafeAreaView>
    <Header />
    <ScrollView>
    <View>

     <ImageSlider /> 
     <ServicesList/>



 
    </View>

     </ScrollView>
     <StatusBar backgroundColor="#000000" style="light" />
    </SafeAreaView>

    </LinearGradient>





  );
}


