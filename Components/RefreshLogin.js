import React, { useState, useEffect, useContext } from 'react'
import {View, Text, useWindowDimensions, TextInput, ScrollView, KeyboardAvoidingView, Keyboard, Image} from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MotiView } from 'moti';
import * as AppleAuthentication from 'expo-apple-authentication';
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../Context/AuthContext';
import { AppContext } from '../App';
import { getAuth, signInWithCredential, signInWithCustomToken, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider} from 'firebase/auth';
import { getDatabase, ref, set, onValue, forEach, push } from "firebase/database";
import app from '../firebaseConfig'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import jwt_decode from "jwt-decode";




export default function RefreshLogin({navigation, route}) {
    if(route.params){
        const {redirect} = route.params
    }
    const [accessToken, setAccessToken] = useState()
    const db = getDatabase()
    const [user, setUser] = useState()
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId:'340004188318-qpr2s5494cub5l17c3ocbh3s9j1msfgu.apps.googleusercontent.com',
        iosClientId:"340004188318-cmvqrd4pqgn5ggbk2ft3stf6lb81jp5l.apps.googleusercontent.com"
    })
    
    const {width, height} = useWindowDimensions()
    const [signUp, setSignUp]  = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showCheck, setShowCheck] = useState(false)
    const {login, loginError, setLoginError, } = useAuth()
    const { setIsSignedIn } = useContext(AppContext)
    const auth = getAuth(app)
   

    //IOS: 340004188318-cmvqrd4pqgn5ggbk2ft3stf6lb81jp5l.apps.googleusercontent.com
    //WEB: 340004188318-qpr2s5494cub5l17c3ocbh3s9j1msfgu.apps.googleusercontent.com

        

      useEffect(()=> {
        if(response?.type === "success"){
            setAccessToken(response.authentication.accessToken)
            accessToken && fetchUserInfo()  
        } 
      }, [response, accessToken]
      )

      useEffect(()=> {setLoginError()}, [])

      
      
          //This is used for Google Login
      async function fetchUserInfo(){
        console.log("Fetching...")
        let response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers:{
                Authorization: `Bearer ${accessToken}`
            }

             
        })
        const userInfo = await response.json()

        setUser(userInfo)
        
        
     
        .catch((error) => {
            console.log(error.code)
            console.log(error.message)

            if(error.code == "auth/email-already-in-use"){
                signInWithEmailAndPassword(auth, userInfo.email, userInfo.id).then(()=> navigation.navigate('ConfirmDelete', {refreshed:true}))
            }
        })
      }

    
    function dismissCheck(){
        setShowCheck(false)
        Keyboard.dismiss()
    }
    

  return (
    <TouchableWithoutFeedback style={{width: width, height:height, backgroundColor:'#030B27'}}> 
        <KeyboardAvoidingView style={tw`flex-1`} behavior={'padding'}>
        <View style={tw`flex-1 justify-center items-center mx-10`}>
    
        <>
            <View style={tw` mb-1 items-center flex-row`}>
                <MotiView from={{scale:0, opacity:0}} animate={{scale:1 ,opacity:1}} transition={{type:'timing', duration:1000}}  style={tw`flex-row`}>
                
                <Text style={tw` ml-3 text-white text-2xl font-bold text-center`}>Login To Confirm Account Deletion</Text>
                </MotiView>

                
            </View> 
            
            {loginError && 
                <View style={tw`flex-row items-baseline mb-3 font-light text-sm`}>
                    <AntDesign style={tw`mr-2`} name="exclamationcircle" size={24} color="white" />
                    <Text style={tw`text-white`}>{loginError}</Text>
                </View>
                }
            <View style={tw``}>
            {/*
                <TextInput 
                onChangeText={text => setEmail(text)}
                keyboardAppearance='dark'
                onFocus={()=> setShowCheck(true)}
                placeholder='Email'
                 placeholderTextColor={'white'}
                value={email} 
                numberOfLines={2}
                style={[tw`text-white bg-gray-700 font-light rounded-2xl p-5 h-18 text-xl`, {width: width-100}]} 
                /> 
                <TextInput
                 value={password}
                 
                 keyboardAppearance='dark'
                 secureTextEntry
                 onFocus={()=> setShowCheck(true)}
                 placeholder='Password'
                 placeholderTextColor={'white'} 
                 onChangeText={text => setPassword(text)}
                 style={[tw`mt-5 text-white bg-gray-700  font-light rounded-2xl h-18 p-5 text-xl`,{width: width-100}]} 
                 /> 
                
                <View style={tw}>
                    <TouchableOpacity onPress={()=> login(email, password)} style={tw`bg-orange-700 rounded-2xl mt-10 py-5 mx-10 `}>
                        <Text style={tw`text-white text-center text-lg`}>Login</Text>
                    </TouchableOpacity>
                </View>
            */}
                <MotiView from={{scale:0, opacity:0}} animate={{scale:1, opacity:1}} transition={{type:'timing', duration:1000}} style={tw`mt-4 flex-col items-center `}>
                  {!showCheck &&
                    <MotiView from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:800}} style={tw` mt-5  justify-evenly items-center`}>
                    <TouchableOpacity onPress={async () => {
                       
                        promptAsync().then(()=> route.params ? navigation.navigate('Confirm Delete') : null)
                        
                        
                    
                    }} style={[tw`flex-row justify-center items-center bg-black p-3 px-7 rounded-2xl border border-slate-400`,{height:70, width:300}]}>
                <Image style={{width:25, height:25}} source={require('../assets/Google.png')}/>
                <Text style={tw`text-white ml-4 text-xl font-bold`}>Sign In With Google</Text>
                </TouchableOpacity>
                    <View style={[{width:300, height:70}, tw`mt-5 border border-slate-400 rounded-2xl bg-black items-center justify-center`]}>
                        <AppleAuthentication.AppleAuthenticationButton
                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                    cornerRadius={5}
                    style={[{width:250, height:65},tw``]}
                    onPress={async () => {
                    
                    try {
                        const credential = await AppleAuthentication.signInAsync({
                        requestedScopes: [
                            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                            AppleAuthentication.AppleAuthenticationScope.EMAIL,
                        ],
                        }).then((userToken)=> {
                            if(!userToken.email){
                                var decoded = jwt_decode(userToken.identityToken)
                                
                                signInWithEmailAndPassword(auth, decoded.email, userToken.user).then(()=> navigation.navigate('ConfirmDelete', {refreshed:true}))
                                
                                
                            } 
                   
                            
                        }).catch((error) => {
                            console.log(error.message)
                            setLoginError(error.message)
                            if(error.message == "auth/missing-email"){
                                
                            }
                        })
                        
                    } catch (e) {
                        console.log(e)
                        setLoginError(e)
                        if (e.code === 'ERR_REQUEST_CANCELED') {
                        console.log("cancelled")
                        } else {
                        // handle other errors
                        }
                    }
                    }}
                />
                </View>

                 </MotiView>
                }
                </MotiView>

            </View>

            </>
      
            
                

            

        
        </View>
        
        {showCheck && 
        <MotiView key="asdfadgh" style={[tw`justify-end items-end`]} exit={{opacity:0, translateX:-20}} from={{opacity:0, translateX:50 , translateY:0}} animate={{opacity:1, translateX:-20, translateY:-20}}>
            <TouchableOpacity onPress={()=>dismissCheck()}  >
                <AntDesign name="checkcircle" size={50} color="#21AC47" />
            </TouchableOpacity>
        </MotiView> }
        </KeyboardAvoidingView>
        
    </TouchableWithoutFeedback>
  )
}
