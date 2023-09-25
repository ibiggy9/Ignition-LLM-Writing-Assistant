import React, {useState, useMemo} from 'react'
import {View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Tabs from './Navigation/Tabs';
import { HapticsProvider } from 'react-native-custom-haptics';
import { useEffect } from 'react'
import Login from './Screens/Login'
import { AuthProvider } from './Context/AuthContext'
import 'react-native-reanimated'
import EntryScreen from './Screens/EntryScreen'
import 'react-native-gesture-handler'
import SelectTool from './Components/SelectTool';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Settings from './Screens/Settings';
import SelectEnglishVersion from './Components/SelectEnglishVersion'
import SelectGrade from './Components/SelectGrade'
import Chat from './Screens/Chat';
import { Entypo } from '@expo/vector-icons';
import useRevHook from './Components/useRevHook';
import 'react-native-reanimated'





import { 
  createUserWithEmailAndPassword, 
  signout,
  onAuthStateChanged, 
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  getUserByEmail,
  signInWithEmailAndPassword,
  signOut, 
  getAuth,
} from 'firebase/auth'
import app from './firebaseConfig';
import SelectLanguage from './Components/SelectLanguage';
import SelectTone from './Components/SelectTone';
import ConfirmDelete from './Components/ConfirmDelete';
import RefreshLogin from './Components/RefreshLogin';
import OfferCode from './Components/OfferCode';
import Paywall from './Components/Paywall';
import { ChatProvider, useChat } from './Context/ChatContext';
import Promocode from './Screens/Promocode';

export const AppContext = React.createContext()
export default function App({navigation}) {

  const Stack = createNativeStackNavigator()
  //const auth = getAuth(app)
  
  
  const {isProMember ,customerInfo, membershipLevel} = useRevHook()

/*
const appContextValue = useMemo(
  () => ({
    isSignedIn,
    setIsSignedIn,
  }),
  [isSignedIn]
)


useEffect(() => {
  console.log(auth.currentUser)
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)  
      setIsSignedIn(true)
      
  })
  
  return () =>{
      unsubscribe()
      
  }
}, [auth.currentUser])
*/
  
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent'
    }
  }
 return (
    
    <AuthProvider>
    <ChatProvider>
    <HapticsProvider>
    
    <NavigationContainer>
    
      <Stack.Navigator  
      screenOptions={{
          headerShown:false, 
          headerTransparent:true,
          title:''
          }}
          initialRouteName="home"
      >
        <>
        <>
        <Stack.Screen name="home" component={Tabs} />
        <Stack.Screen name='ConfirmDelete' component={ConfirmDelete} />
        <Stack.Screen name='RefreshLogin' component={RefreshLogin} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Group screenOptions={{presentation:'modal'}} />
        <Stack.Screen name="OfferCode" component={OfferCode} />
        <Stack.Group screenOptions={{presentation:"fullScreenModal"}}>
        <Stack.Screen name="Paywall" component={Paywall} />
        <Stack.Screen name="EntryScreen" component={EntryScreen} />
        
        
        <Stack.Group screenOptions={{presentation:'transparentModal'}}>
              <Stack.Screen  name="SelectTool" component={SelectTool}/>
              <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
              <Stack.Screen name="SelectTone" component={SelectTone} />
              <Stack.Screen name="SelectEnglishVersion" component={SelectEnglishVersion} />
              <Stack.Screen name="SelectGrade" component={SelectGrade} />
              <Stack.Screen name="Chat" component={Chat} />
              <Stack.Screen name="Promocode" component={Promocode} />
              
          </Stack.Group>
        
        </Stack.Group>
        </>
        </>
    </Stack.Navigator>
    
    </NavigationContainer>
    
    </HapticsProvider>
    
    </ChatProvider>
    </AuthProvider>
    
    
  );
}

