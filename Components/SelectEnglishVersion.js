import { View, Text, useWindowDimensions, ScrollView } from 'react-native'
import React, {useState} from 'react'
import tw from 'twrnc'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function SelectLanguage({navigation}) {
    
    const {width, height} = useWindowDimensions()

    function handleSelect(rate){
        navigation.navigate({name:'EntryScreen', params:{englishVersion:rate}, merge:true})
        
    }



  return (
    <View  style={[tw`bg-slate-900 bg-opacity-80` , {width:width, height:height,}]}>
     <View style={tw`flex-1 justify-start  mt-20`}>
     <Text style={tw`text-white text-2xl text-center`}>Select Language</Text>
        <ScrollView>
        <TouchableOpacity onPress={()=> handleSelect("US English")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>US English</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>    

        <TouchableOpacity onPress={()=> handleSelect("Canadian English")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Canadian English</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>
        
        <TouchableOpacity onPress={()=> handleSelect("Australian English")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Australian English</Text>
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