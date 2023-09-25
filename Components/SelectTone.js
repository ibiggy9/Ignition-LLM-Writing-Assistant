import { View, Text, useWindowDimensions, ScrollView } from 'react-native'
import React, {useCallback, useState} from 'react'
import tw from 'twrnc'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useChat } from '../Context/ChatContext'

export default function SelectTone({navigation}) {
    
    const {width, height} = useWindowDimensions()
    const {setTone, tone} = useChat()

    function handleSelect(rate){
        setTone(rate)
        navigation.goBack()
        
    }



  return (
    <View  style={[tw`bg-slate-900 bg-opacity-80` , {width:width, height:height,}]}>
     <View style={tw`flex-1 justify-start  mt-20`}>
     <Text style={tw`text-white text-2xl text-center`}>Select Tone</Text>
        <ScrollView>
        <TouchableOpacity onPress={()=> handleSelect("Friendly")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Friendly</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>    

        <TouchableOpacity onPress={()=> handleSelect("StraightForward")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>StraightForward</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>
        
        <TouchableOpacity onPress={()=> handleSelect("Casual")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Casual</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect("Confident")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Confident</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect("Technical")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Technical</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect("Funny")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Funny</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect("Serious")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Serious</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>



        </ScrollView>
      
     </View>
     <TouchableOpacity onPress={()=> navigation.goBack()}>
     <Text style={tw`text-white text-center text-lg mx-5 mt-3 mb-20`}>Dismiss</Text>
     </TouchableOpacity>
    </View>
  )
}