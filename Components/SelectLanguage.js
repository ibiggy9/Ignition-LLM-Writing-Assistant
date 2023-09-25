import { View, Text, useWindowDimensions, ScrollView } from 'react-native'
import React, {useCallback, useState} from 'react'
import tw from 'twrnc'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useChat } from '../Context/ChatContext'

export default function SelectLanguage({navigation}) {
    
    const {width, height} = useWindowDimensions()
    const {setLanguage} = useChat()

    function handleSelect(rate){
        setLanguage(rate)
        navigation.goBack()
    }



  return (
    <View  style={[tw`bg-slate-900 bg-opacity-80` , {width:width, height:height,}]}>
     <View style={tw`flex-1 justify-start  mt-20`}>
     <Text style={tw`text-white text-2xl text-center`}>Select Language</Text>
        <ScrollView>
        <TouchableOpacity onPress={()=> handleSelect("English")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>English</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect("French")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>French</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>    

        <TouchableOpacity onPress={()=> handleSelect("Spanish")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Spanish</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>
        
        <TouchableOpacity onPress={()=> handleSelect("German")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>German</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect("Portuguese")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Portuguese</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>
        
        <TouchableOpacity onPress={()=> handleSelect("Italian")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Italian</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect("Dutch")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Dutch</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect("Russian")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Russian</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect("Chinese")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Chinese</Text>
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