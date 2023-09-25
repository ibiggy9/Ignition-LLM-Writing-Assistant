import { View, Text, useWindowDimensions, TouchableOpacity, ActivityIndicator, Alert, Linking, AppState } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import tw from 'twrnc'
import { MotiView, MotiText } from 'moti'
import Purchases from 'react-native-purchases'

import Spinner from 'react-native-loading-spinner-overlay'
import useRevHook from '../Components/useRevHook'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { MaterialIcons } from '@expo/vector-icons';

export default function Paywall({navigation}) {

const {height, width} = useWindowDimensions()
const [spinner, setSpinner] = useState(false) 
const {currentOffering, isProMember, customerInfo, loadingOffering, currentProduct} = useRevHook()

const appState = useRef(AppState.currentState)

useEffect(()=> {
  if(isProMember){
    navigation.navigate('home')
  }
}, [])



async function restorePurchases(){
    setSpinner(true)
    const purchaserInfo = await Purchases.restorePurchases().catch((error)=> {
      setSpinner(false)
    })

    if(purchaserInfo.activeSubscriptions.length > 0){
      Alert.alert("Success", "Your purchase has been restored")
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

  async function handleMonthlyPurchase(){
    setSpinner(true)
    if(!currentOffering?.monthly) return
    console.log(currentOffering.monthly)    
    const purchaserInfo = await Purchases.purchasePackage(currentOffering.monthly).catch((error)=> {
      console.log(error)
      setSpinner(false)
    })

    console.log("Monthly sub purchased", purchaserInfo.customerInfo.entitlements.active)
    if(purchaserInfo.customerInfo.entitlements.active){
      navigation.navigate("home")
    }


    
    /*
    const purchaserInfo = await Purchases.purchasePackage(currentOffering.monthly).catch((error)=> {
      console.log(error)
      setSpinner(false)
    })
    console.log(purchaserInfo)
    
    if(purchaserInfo.entitlements.active.pro){
      setSpinner(false)
      
    } else {
      setSpinner(false)
    }
    */
  }
  
  async function test(){
    console.log(currentOffering)
    const purchaserInfo = await Purchases.purchasePackage(currentOffering.lifetime).catch((error)=> {
      console.log(error)
      setSpinner(false)
    })
  }
  async function handleAnnualPurchase(){
    setSpinner(true)
    if(!currentOffering?.annual) return console.log('false')
    const purchaserInfo = await Purchases.purchasePackage(currentOffering.annual).catch((error)=> {
      setSpinner(false)
    })

    console.log("Annual sub purchased", purchaserInfo.customerInfo.entitlements.active)
    if(purchaserInfo.customerInfo.entitlements.active.pro){
      setSpinner(false)
      
    } else{
      setSpinner(false)
    }
    
    
  }



  return (
    <View style={[{width:width, height:height}, tw`bg-slate-900`]}>
      <Spinner
        visible={spinner}
        
        textStyle={{color:'white'}}
        />
      <View style={[tw`flex-1 justify-start mt-13`,{height:height, width:width, opacity:1, position:'absolute'}]}>
        <TouchableOpacity style={tw`items-center`} onPress={()=> navigation.goBack()}>
      <MaterialIcons name="drag-handle" size={32} color="white" />
      </TouchableOpacity>
      <MotiView>
      <Text style={tw`text-white text-2xl text-center font-bold`}>Next Gen Writing Support.</Text>
      <Text style={tw`text-slate-200 text-center font-light`}>Pick a plan to get unlimited access to all Features</Text>
      <View style={tw`items-center`}>
      <MaterialCommunityIcons name="trophy-award" size={130} color="#E5962D" />
      </View>
      </MotiView>

      {/*Content Block */}
      <View style={tw` px-5`}>
      <MotiView from={{translateY:700}} animate={{translateY:0}} transition={{type:'timing', duration:1000, }} style={tw`flex-row items-center`}>
        <Ionicons style={tw`mr-5`} name="key" size={32} color="#E5962D" />
        <View style={tw`flex-1`}>
        <Text style={tw`text-white font-bold`}>Get Unlimited Access to All Features</Text>
        <Text style={tw`text-slate-300 font-light`}>This includes all improvement tools and writing assistance tools.</Text>
        </View>
        
      </MotiView>

      <MotiView from={{translateY:700}} animate={{translateY:0}} transition={{type:'timing', duration:1400}} style={tw`flex-row items-center pt-5`}>
        <Ionicons style={tw`mr-5`} name="ios-person-add" size={32} color="#E5962D" />
        <View style={tw`flex-1 `}>
        <Text style={tw`text-white font-bold`}>24/7 Access to Quill, Our AI-Writing Assistant</Text>
        <Text style={tw`text-slate-300 font-light`}>Don't just edit your writing, but improve the content of your writing by asking Quill what an author said about a certain topic, how to say something in the proper tone, how to come across a certain way, and much more!</Text>
        </View>
      </MotiView>

      <MotiView from={{translateY:700}} animate={{translateY:0}} transition={{type:'timing', duration:1600}} style={tw`flex-row items-center pt-5`}>
        
        <Ionicons style={tw`mr-5`} name="md-star" size={32} color="#E5962D" />
        <View style={tw`flex-1`}>
        <Text style={tw`text-white font-bold`}>First to access to new tools, content and exercises</Text>
        <Text style={tw`text-slate-300 font-light`}>Be first to get access to our newest writing tools. We've got a lot of new features coming soon. </Text>
        </View>

      </MotiView>
      </View>
      {loadingOffering ?

        <View>
        <Spinner
        visible={spinner}
        textStyle={{color:'white'}}
        />
        </View>

        :

      <View style={tw` items-center`}>
               
                <MotiView style={tw`items-center flex-row mt-5`} from={{scale:0.0}} animate={{scale:1}} transition={{type:'spring', stiffness:250, delay:1500}}>
                {currentOffering && currentOffering.monthly &&
                <View style={tw`flex-col`}>
                
                <TouchableOpacity onPress={() => handleMonthlyPurchase()} style={[tw`flex-col mb-2 border-2 border-black bg-blue-900  rounded-3xl justify-center `, {height:height/12, width:width/1.5, backgroundColor:'#E5962D'}]}>
                  <View style={tw``}>
                <Text style={tw`text-center text-black text-lg font-bold`}>Subscribe for {currentOffering.monthly?.product.priceString}/Month</Text>
                <Text style={tw`text-center text-black  `}>Cancel Anytime.</Text>  
                </View>
                </TouchableOpacity>
                </View>
                }
                {/*
                {currentOffering.annual && 
                <TouchableOpacity onPress={() => handleAnnualPurchase()} style={[tw`flex-col border-2 border-black  mx-2 mb-3 bg-blue-900 rounded-3xl  `, {height:height/7 , width:width/4, backgroundColor:'#E5962D'}]}>
                  <View style={tw`flex-col`}>
                
                
                  <MotiView from={{scale:0}} animate={{scale:1.2}} transition={{type:'spring', stiffness:250, delay:3000}} style={tw`mx-2 mt--3 p-1 bg-white rounded-2xl`}>
                <MotiText  style={tw` text-indigo-800 mt-1 text-center font-bold`}>Save {100-((currentOffering.annual?.product.price) / (currentOffering.monthly?.product.price * 12)*100).toPrecision(2)}%</MotiText>
                </MotiView>
                  <View style={tw`justify-start mt-1`}>
                    
                <Text style={tw`text-center text-black text-lg font-bold`}>Annual</Text>  
                </View>
                  
                
                  <View style={tw``}>
                  <Text style={tw`text-center font-light mx-3 text-slate-900`}>{currentOffering.annual?.product.priceString}/Year After </Text>
                  </View>
                  
  
                  
                
                </View>
                  
                </TouchableOpacity>
                } 
                */}
            
  
                </MotiView>
                <MotiView from={{scale:0.0}} animate={{scale:1}} transition={{type:'spring', stiffness:250, delay:2400}} >
                <TouchableOpacity onPress={() => restorePurchases()} style={tw`flex-col mt-5  rounded-2xl  `}>
                  <Text style={tw`ml-2 text-white font-light underline text-center`}>Restore Purchases</Text>
                  
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.goBack()} style={tw`flex-col mt-5  rounded-2xl  `}>
                  <Text style={tw`ml-2 text-white font-bold text-lg text-center`}>Return to Free Version</Text>
                  
                </TouchableOpacity>
                  


                </MotiView>
                </View>
               
           
                
                }
                
    </View>
    </View>
  )
}