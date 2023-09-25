import React, { useState, useRef, useEffect } from 'react'

import {View, Text, useWindowDimensions, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert} from 'react-native'
import tw from 'twrnc'
import { LinearGradient } from 'expo-linear-gradient'
import { MotiText } from 'moti'
import Checkbox from 'expo-checkbox';
import { MotiView } from 'moti'
import { FontAwesome5 } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import app from '../firebaseConfig'
import { getAuth, signInWithCredential, signInWithCustomToken, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider} from 'firebase/auth';
import { getDatabase, ref, set, onValue, forEach, push } from "firebase/database";
import useRevHook from '../Components/useRevHook'
import Purchases from 'react-native-purchases'
import Spinner from 'react-native-loading-spinner-overlay';

import * as WebBrowser from 'expo-web-browser';


export default function OnBoarding({navigation}) {
  const {height, width} = useWindowDimensions()
  const [privacy, setPrivacy] = useState(false) 
  const [spinner, setSpinner] = useState(false) 
  const [user, setUser] = useState(false)
   const {currentOffering, isProMember, customerInfo} = useRevHook()


  const disclaimer= 'All services provided by Ignition are for general mental wellness support only and do not constitute the practice of professional mental health care service including the giving of medical advice. No doctor patient relationship is formed. The use of these services and the materials linked to the mobile app is at the users own risk. The content on the application is not intended to be a substitute for professional medical advice, diagnosis or treatment. Users should not disregard or delay in obtaining medical advice from any medical condition they have and they should seek the assistance for any such conditions. '

  useEffect(()=> {
    if(privacy==true ){
      navigation.navigate('Paywall')
    }

  }, [privacy, user])

  useEffect(() => {
    setUser(false)
    setPrivacy(false)
    console.log(isProMember)
    console.log(customerInfo)
    if(isProMember){
      navigation.navigate('Explore')
    }
  }, [])


  

  async function openPrivacy(){
    await WebBrowser.openBrowserAsync('https://docs.google.com/document/d/1ZnDltWBZXbpDc47ipJgFtS0cNvVfJGDScb1gS9MYopE/edit?usp=sharing')
  }


  const welcomeMessage = [
    {instructionTitle:"Message From The Developer"},
    
    
    {instructionTitle:"Agree To Our Policies"},
  ]

  


  return (
    <View style={{width:width, height:height}}>
      
        <Spinner
        visible={spinner}
        
        textStyle={{color:'white'}}
        />
   
    <LinearGradient 
    
    colors={['#182E77','#EA1D3F']}
    start={{x:0.05, y:0.6}}
    end={{x:0.9, y:0.3}}
    locations={[0.1,0.99]}
    
    
    style={{width:width, height:height, opacity:0.65}}
    >
    </LinearGradient>
    <View style={[tw`flex-1 justify-start mt-20`,{height:height, width:width, opacity:1, position:'absolute'}]}>
    
   
              
        <MotiText from={{scale:0}} animate={{scale:1}} style={tw`text-white text-2xl text-center`}>Welcome to Ignition!</MotiText>
        <FlatList 
        data={welcomeMessage}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled
        snapToEnd
        snapToStart
        snapToInterval={width}
        
        decelerationRate='fast'
        renderItem={(itemData)=> {
          return(
            
            <View style={[{height:height/1.3, width:width}, tw`flex-1 justify-start mt-3 items-center`]}>
              <View style={[tw`flex-1 bg-slate-600 bg-opacity-40 rounded-2xl items-center mb-3 `, {width:width-40, height: height/2.7}]}>
              
              {itemData.index == 0 &&
              <View style={[tw`flex-7 justify-start`, {width:width}]}>
              <View style={tw`mt-0 mx-5  justify-start`}>
              
              {itemData.item.image}
              
              <Text style={[tw`text-white  text-center mt-7 font-bold`, {fontSize:25}]}>{itemData.item.instructionTitle}</Text>
              <View style={tw`items-center my-4`}>
              <FontAwesome name="hand-peace-o" size={80} color="white" />
              </View>
              <Text style={[tw`text-white text-start mx-4 mt-3`, {fontSize:16}]}>Hey, </Text>
              <Text style={[tw`text-white text-start mx-4 mt-3`, {fontSize:16}]}>Thanks for checking out our app. Our goal is to provide a writing solution that can improve the quality of your writing from emails to essays.</Text>
              <Text style={[tw`text-white text-start mx-4 mt-3`, {fontSize:16}]}>This is an early version of the app and we are excited to bring new features and improvements in the coming weeks.</Text>
              <Text style={[tw`text-white text-start mx-4 mt-3`, {fontSize:16}]}>With that said, we'd really appreciate any feedback you might have. Whether that be bugs, crashes or feature requests. So if you have any feedback, please feel free to go to the support section under "Profile" or send us a note to:</Text>
              <Text style={[tw`text-blue-400 underline text-start mx-4 mt-3`, {fontSize:16}]}>support@flourishtech.app</Text>
              <Text style={[tw`text-white text-start mx-4 mt-3`, {fontSize:16}]}>Thank you and welcome!</Text>
              <Text style={[tw`text-white text-start mx-4 mt-3`, {fontSize:16}]}>Ian</Text>
              
              </View>
              </View>
              }

           

          


              {itemData.index == 1 &&
              <View style={[tw`flex-7 justify-start`, {width:width}]}>
              <View style={tw` mx-5 items-center justify-start`}>
              <Text style={[tw`text-white  text-center mt-7 mb-3 font-bold`, {fontSize:25}]}>{itemData.item.instructionTitle}</Text>
              <View style={[tw`flex-row`, {width: width/1.2}]}>
                <Checkbox 
                color={"white"}

                value={privacy}
                onValueChange={() => setPrivacy(!privacy)}
                style={tw`items-center justify-center mt-2 p-3`}
                />
              <TouchableOpacity onPress={()=> openPrivacy()}>
              <Text style={[tw`items-center justify-center text-lg text-white text-start mx-2`]}>By checking this box you agree to Ignition's <Text style={tw`text-blue-300  text-lg`}>Privacy Policy</Text> </Text>
              </TouchableOpacity>
              </View>


              

              
              
              </View>
              </View>
              }   

              {itemData.index == 1 && privacy && 
              <TouchableOpacity onPress={()=> navigation.navigate("Paywall")} style={tw`border border-white rounded-2xl px-20 py-5`}>
                  <Text style={tw`text-lg text-white`}>Open Plans</Text>
                </TouchableOpacity>  
                }
                <View style={tw`flex-1 flex-col mb-5 justify-end items-center`}>
                
                
                <View style={tw` flex-row items-center `}>
                  
                {itemData.index == 0 &&
                <>
                <View style={tw`bg-white rounded-full w-3 h-3 mx-2  `}></View>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2  `}></View>
                
                
                </>
                }
                {itemData.index == 1 && (!privacy) &&
                <>
                
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2  `}></View>
                <View style={tw`bg-white rounded-full w-3 h-3 mx-2  `}></View>
                
                
                </>
                }
             

             
                </View>
                </View>

              </View>
            </View>
          )
          }
        }
        />
    </View>
    </View>
  )
}
