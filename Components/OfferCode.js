import { View, Text, useWindowDimensions, TouchableOpacity, ActivityIndicator, Alert, Linking, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import tw from 'twrnc'
import { MotiView, MotiText } from 'moti'


import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../Context/AuthContext'
import { MaterialIcons } from '@expo/vector-icons';
import BackButton from './Backbutton';

export default function OfferCode({navigation}) {
const {firstLogin, setFirstLogin} = useAuth()
const {height, width} = useWindowDimensions()
const [code, setCode] = useState()

async function offerCode(){
    Linking.openURL(`https://apps.apple.com/redeem/?ctx=offercodes&id=1671440901&code=${code}`)
  }


  return (
    <View style={[{width:width, height:height}, tw`bg-indigo-900`]}>
      
      <View style={[tw`flex-1 justify-start `,{height:height, width:width, opacity:1, position:'absolute'}]}>
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
    </View>
    </View>
  )
}