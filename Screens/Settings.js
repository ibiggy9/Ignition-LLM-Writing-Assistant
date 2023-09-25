import React, {useState, useEffect, useReducer} from 'react'
import {View, Text, useWindowDimensions, TouchableOpacity, Linking, Alert} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'moti';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../Context/AuthContext';
import { Entypo } from '@expo/vector-icons';
import app from '../firebaseConfig';
import * as WebBrowser from 'expo-web-browser';
import useRevHook from '../Components/useRevHook';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Purchases from 'react-native-purchases';



export default function Settings({navigation}) {
  const {width, height} = useWindowDimensions()
  const {logout, auth} = useAuth(app)
  const {isProMember} = useRevHook()
  const [spinner, setSpinner] = useState()

  async function restorePurchases(){
    setSpinner(true)
    const purchaserInfo = await Purchases.restorePurchases().catch((error)=> {
      setSpinner(false)
    })

    if(purchaserInfo.activeSubscriptions.length > 0){
      Alert.alert("Success", "Your purchase has been restored")
      setSpinner(false)
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

  function openUserAgreement(){
    Linking.openURL('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/')
  }
  
  
  function openSubscriptions(){
    
    Linking.openURL('https://apps.apple.com/account/subscriptions')
  }

  async function openPrivacy(){
    await WebBrowser.openBrowserAsync('https://www.flourishtech.app/ignition')
  }

  async function openSite(){
    await WebBrowser.openBrowserAsync('https://www.flourishtech.app/')
  }

  return (
    <View style={{width:width, height:height}}>
       <Spinner
        visible={spinner}
        
        textStyle={{color:'white'}}
        />
<LinearGradient 
    
    colors={['#E30000','#E34F00']}
    start={{x:0.05, y:0.6}}
    end={{x:0.9, y:0.3}}
    locations={[0.1,0.99]}
    
    
    style={{width:width, height:height, opacity:0.65}}
    >
</LinearGradient>
<View style={[tw`flex-1 justify-start`,{height:height, width:width, opacity:1, position:'absolute'}]}>
        <Text style={tw`text-white text-center text-2xl  mt-15`}>Your Profile</Text>
        <ScrollView>  
       
        
        

    
        <View  style={tw`bg-white h-0.5 mx-4 mt-5 my-4`}></View>

        

        {/*
        <TouchableOpacity onPress={async () => {

          openSite()
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>About</Text>
        </TouchableOpacity>
        */}

      {!isProMember &&
        <TouchableOpacity onPress={async () => {
          
          navigation.navigate('Paywall')
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>Upgrade to Premium</Text>
        </TouchableOpacity>
        }


        {!isProMember &&
        <TouchableOpacity onPress={async () => {
          
          restorePurchases()
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>Restore Purchases</Text>
        </TouchableOpacity>
        }
        




        <TouchableOpacity onPress={async ()=> {
          
          Linking.openURL('mailto:support@flourishtech.app')
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2`}>Feature Requests & Support</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={async ()=> {
          openSubscriptions()
          
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2`}>Cancel Membership</Text>
        </TouchableOpacity>



          {/*
        <TouchableOpacity onPress={async ()=> {
          navigation.navigate("OfferCode")
          
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2`}>Enter Offer Code</Text>
        </TouchableOpacity>
        */}
        <TouchableOpacity onPress={async ()=> {
          
          openPrivacy()
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={async ()=> {
          
          openUserAgreement()
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>End User Agreement</Text>
        </TouchableOpacity>
        {/* 
        <TouchableOpacity onPress={()=> logout()}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>Logout</Text>
        </TouchableOpacity>
        */}

        <View  style={tw`bg-white h-0.5 mx-4 mt-5 my-4`}></View>
        
       

        
       
        <TouchableOpacity onPress={async ()=> {
        
          navigation.navigate("ConfirmDelete")

        }}>
          {/* 
        <View style={tw`flex-row items-center justify-center  rounded-2xl`}>
          
        
      <Text style={tw`text-slate-300  mx-5  mb-2   `}>Delete Your Account</Text>
      
        </View>
        */}
        </TouchableOpacity>

        </ScrollView>

      


      </View>
      
  
    </View>
  )
}
