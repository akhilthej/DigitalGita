

import { Slot , Stack , SplashScreen } from 'expo-router'


const AuthLayout = () => {
 



  return (
    <Stack>
     <Stack.Screen name="Settings" options={{headerShown: false}} />
     <Stack.Screen name="ProfileEdit" options={{headerShown: false}} />
  </Stack>
  )
}

export default AuthLayout