import { View, Text, useWindowDimensions, TouchableOpacity, ActivityIndicator, Alert, Linking, TextInput, AppState } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import tw from 'twrnc'
import { MotiView, MotiText } from 'moti'
import Purchases from 'react-native-purchases'
import useRevHook from '../Components/useRevHook'
import Spinner from 'react-native-loading-spinner-overlay'

import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


export default function Promocode({navigation}) {

const {height, width} = useWindowDimensions()
const [code, setCode] = useState()
const {currentOffering, isProMember, customerInfo} = useRevHook()
const [offerCodeClicked, setOfferCodeClicked] = useState(false)
const appState = useRef(AppState.currentState)
const [appStateVisible, setAppStateVisible] = useState(appState.current)
const [userLeft, setUserLeft] = useState(false)
const [spinner, setSpinner] = useState(false)



useEffect(() => {
  const subscription = AppState.addEventListener('change', nextAppState => {
    if (
      appState.current.match(/inactive|background/) && 
      nextAppState === 'active'
      
    ) {
      console.log('App has come to the foreground!');
    } else{
      console.log("App has gone to the background.")
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    //console.log(appState.current)
    
  });

  return () => {
    subscription.remove();
  };
}, []);

useEffect(()=> {
  console.log(AppState.currentState)
  if(AppState.currentState != 'active' && offerCodeClicked){
    
    setUserLeft(true)
    

  }
  if(AppState.currentState == 'active' && offerCodeClicked && userLeft){
    console.log("resyncTriggered")
    Purchases.syncPurchases()
  }
},[AppState.currentState])


async function restorePurchases(){
  setSpinner(true)
  const purchaserInfo = await Purchases.restorePurchases().catch((error)=> {
    setSpinner(false)
  })

  if(purchaserInfo.activeSubscriptions.length > 0){
    Alert.alert("Success", "Your purchase has been restored")
    navigation.goBack()
  } else {
    Alert.alert("Error", "No purchases to restore")
    setSpinner(false)
  }

  if(!currentOffering){
    return(
      <View>
        <ActivityIndicator size="large" color='white' />
      </View>
    )
  }
}

async function offerCode(){
  if(code == 'TESTER2023'){
    navigation.navigate('home')
  } else {
    setOfferCodeClicked(true)
    Platform.OS == 'ios' ?
    Linking.openURL(`https://apps.apple.com/redeem/?ctx=offercodes&id=1671440901&code=${code}`)
    :
    Linking.openURL(`https://play.google.com/redeem?code=${code}`)
  }
  }
  


  return (
    <View style={[{width:width, height:height}, tw`bg-indigo-900`]}>
      <Spinner
        visible={spinner}
        
        textStyle={{color:'white'}}
        />
      <View style={[tw`flex-1 justify-start mt-13`,{height:height, width:width, opacity:1, position:'absolute'}]}>
        <TouchableOpacity style={tw`items-center`} onPress={()=> navigation.goBack()}>
      <MaterialIcons name="drag-handle" size={32} color="white" />
      </TouchableOpacity>
      
      <Text style={tw`text-white text-2xl text-center font-bold`}>Enter Offer Code</Text>
      <TextInput
        style={tw`mx-10  text-white text-lg`}
        maxLength={50}m
        autoFocus
        selectionColor={'white'}
        cursorColor={"#fff"}
        onChangeText={setCode}
        value={code}
       />

       {code &&
       <View style={tw`mt-5 mx-20 rounded-2xl border-2 border-white `}>
       <TouchableOpacity onPress={()=> offerCode()} style={tw` p-3`}>
            <Text style={tw`text-center text-white`}>Submit</Text>
        </TouchableOpacity>
       </View>
       
       }

      {AppState.currentState =="active" && offerCodeClicked && userLeft &&
       <View style={tw`mt-3`}>
          <Text style={tw`text-white text-center`}>If you redeemed a code and were not redirected into the application, press the button below.</Text>
          <TouchableOpacity onPress={() => restorePurchases()} style={tw`mt-5 border-2 border-white mx-15 p-4 rounded-2xl`}>
            <Text style={tw`text-white text-center font-bold`}>Enter the App</Text>
          </TouchableOpacity>
       </View>
        }
      
    </View>
    </View>
  )
}