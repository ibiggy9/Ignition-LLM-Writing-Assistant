import React, {useState, useEffect} from 'react'
import {View, Text, Easing, TouchableOpacity, TextInput, ScrollView, NativeAppEventEmitter, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert, useWindowDimensions, SafeAreaView} from 'react-native'
import tw from 'twrnc'
import { Entypo } from '@expo/vector-icons';
import {AnimatePresence, Motion} from '@legendapp/motion'
import { MotiView, useDynamicAnimation, MotiText } from 'moti';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import {ProgressBar} from 'react-native-paper'
import BackButton from './Backbutton';


export default function TextInputComponent({navigation, title,  label, text, setText,  emphasis, emphasisTitle, emphasisDescription, emphasisExample, nextStepper, lastStepper, noBack, hasProgressBar, progress, backButton}) {
 
    const height = useWindowDimensions()
    const [isHidden, setIsHidden] = useState(false)
    const TextBox = useDynamicAnimation(()=> {
      return{
        translateY:0,
     
      }
    })


   function next(){
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      nextStepper()

   }

   function last(){
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    lastStepper()
   }

    function textBoxFocus(){

        if(title.length < 20){
        if(label){
          TextBox.animateTo({translateY:[{value:-150, easing:Easing.easing, type:'timing', duration:400}]})
        } else {
          TextBox.animateTo({translateY:[{value:-80, easing:Easing.easing, type:'timing', duration:400}]})
        }
      } else if(title.length > 20 && title.length < 45){
        if(label){
          TextBox.animateTo({translateY:[{value:-200, easing:Easing.easing, type:'timing', duration:400}]})
        } else {
          TextBox.animateTo({translateY:[{value:-120, easing:Easing.easing, type:'timing', duration:400}]})
        }
      } else if (title.length > 45){
        if(label){
          TextBox.animateTo({translateY:[{value:-200, easing:Easing.easing, type:'timing', duration:400}]})
        } else {
          TextBox.animateTo({translateY:[{value:-150, easing:Easing.easing, type:'timing', duration:400}]})
        }
      }
        setIsHidden(true)
    }

    function isNotFocused(){
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      TextBox.animateTo({translateY:[{value:0, easing:Easing.easing, type:'timing', duration:400}]})
      
      setIsHidden(false)
      Keyboard.dismiss()
    }
    //Saving description for later from thoughts are not feelings:


  return (
    
        <View>
        
        <View>
        <AnimatePresence style={{height:1, width:1}}>
        {isHidden === false &&
        
        <MotiView style={tw``} animate={{opacity:1}} exit={{opacity:0}} key='asdf' >
          {backButton && <BackButton navigation={navigation} />}
        {hasProgressBar && <ProgressBar style={tw` mt-2 mx-16`} progress={progress} color={'#FB7A01'} />}
       
        <MotiView from={{ opacity:0, scale:1.3}} animate={{opacity:1, scale:1}} transition={{default:{type:"timing", duration:1000, easing: Easing.easing}}}>
        <Text style={tw`text-white  text-2xl mx-5 text-center  mt-5 text-white`}>{title}</Text>
        </MotiView>
        
       
        <MotiView from={{ opacity:0, scale:1.3}} animate={{opacity:1, scale:1}} transition={{default:{type:"timing", duration:1000, easing: Easing.easing}}}>
        
        {label &&
        <View style={tw``}>

        <Text style={tw`text-white text-center  mx-2 text-lg items-start text-left font-light mt-3 text-slate-200 `}>{label}</Text>
        
        </View>
          }
        {emphasis &&
        <TouchableOpacity style={tw``} onPress={() => navigation.navigate('Reminder', {title: emphasisTitle, description:emphasisDescription, example:emphasisExample})}>
        <Text id="emphasis" style={[tw` text-center text-blue-100 text-xl mt-3 underline`, {width:'100%'}]}>{emphasis}</Text>
        </TouchableOpacity>
          }
        </MotiView>
        </MotiView>
        }
      
      
        
        
      <MotiView from={{ opacity:0, scale:0.7}} animate={{opacity:1, scale:1}} transition={{default:{type:"timing", duration:1000, easing: Easing.easing}}}>
       
        
        
        <MotiView style={{height:'100%'}} state={TextBox}>
        {!isHidden &&
        <Text style={tw`mx-10 text-right  mt-2 text-lg text-white`}>{text ? text.length : 0}/750</Text>
          }
      
        
        <ScrollView>
       
        <TextInput
        style={[tw`my-4 px-3 rounded-xl border border-white text-white text-lg mx-2`, {aspectRatio:4/3, width:'95%'}]}
        multiline={true}
        numberOfLines={5}
        selectionColor={'white'}
        maxLength={750}
        onFocus={textBoxFocus}
        onBlur={()=> isNotFocused()}
        keyboardAppearance="dark"
        
        onChangeText={setText}
        value={text}
        
      />

      {isHidden &&
      <KeyboardAvoidingView style={tw`flex-1 flex-row justify-end`}>
      <View style={[tw`flex-row justify-end `, {aspectRatio:4/3}]}>
      
        <MotiText key='asdfasflkjrh' exit={{opacity:0}} from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:1000, easing:Easing.easing}} style={tw`mx-10 text-right  mt-2 text-lg text-white`}>{text ? text.length : 0}/750</MotiText>
          
      <MotiView key="asdfadgh" exit={{opacity:0, translateX:-20}} from={{opacity:0, translateX:50}} animate={{opacity:1, translateX:-20}}><TouchableOpacity onPress={()=>isNotFocused()} style={[tw`items-end  `]} ><AntDesign name="checkcircle" size={50} color="white" /></TouchableOpacity></MotiView> 
      </View>
      </KeyboardAvoidingView>
        }
      {!isHidden && 
      <>
      {!noBack ?
      <MotiView style={tw`flex-row justify-between mx-10 mt-10`}>
        
        <TouchableOpacity onPress={() => last()}>
        <MaterialIcons name="navigate-before" size={50} color="white" />
          </TouchableOpacity>
      
          {text && 
          <MotiView from={{scale:0}} animate={{scale:1}} transition={{type:'spring', stiffness:150, damping:10}} key='alkjsadhfkljasdhf'>
          <TouchableOpacity onPress={() => next()}>
        <MaterialIcons name="navigate-next" size={50} color="white" />
          </TouchableOpacity>
          </MotiView>
          }

          </MotiView>
          :
          <MotiView style={tw`flex-row justify-end mx-10 mt-10`}>
        
        
      
          {text && 
          <MotiView from={{scale:0}} animate={{scale:1}} transition={{type:'spring', stiffness:150, damping:10}} key='alkjsadhfkljasdhf'>
          <TouchableOpacity onPress={() => next()}>
        <MaterialIcons name="navigate-next" size={50} color="white" />
          </TouchableOpacity>
          </MotiView>
          }

          </MotiView>

          }
          </> 
          }

      </ScrollView>
     
      </MotiView>
      
      
      </MotiView>
     
       </AnimatePresence>
      </View>
      
      </View>
      
      
        
        
      
  )
}
