

import { Slot , Stack , SplashScreen } from 'expo-router'


const AuthLayout = () => {
 



  return (
    <Stack>
    <Stack.Screen name="OnboardingScreen" options={{headerShown: false}} />
    <Stack.Screen name="signup" options={{headerShown: false}} />
     <Stack.Screen name="signin" options={{headerShown: false}} />
    
    <Stack.Screen name="TermsConditions" options={{headerShown: false}} />
    
   
   
  </Stack>
  )
}

export default AuthLayout