import { View, Text, useWindowDimensions, ScrollView } from 'react-native'
import React, {useState} from 'react'
import tw from 'twrnc'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useChat } from '../Context/ChatContext'

export default function SelectTone({navigation}) {
    
    const {width, height} = useWindowDimensions()
    const {grade, setGrade} = useChat()

    function handleSelect(rate){
        setGrade(rate)
        navigation.goBack()
        
    }

    const options =  [
        "KinderGarten",
        "Grade 1",
        "Grade 3",
        "Grade 6",
        "Grade 9",
        "Grade 12",
        "University",
        "Masters",
        "PHD"
    ]



  return (
    <View  style={[tw`bg-slate-900 bg-opacity-80` , {width:width, height:height,}]}>
     <View style={tw`flex-1 justify-start  mt-20`}>
     <Text style={tw`text-white text-2xl text-center`}>Select Grade Level</Text>
        <ScrollView>
        <TouchableOpacity onPress={()=> handleSelect(options[0])}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>{options[0]}</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>    

        <TouchableOpacity onPress={()=> handleSelect(options[1])}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>{options[1]}</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>
        
        <TouchableOpacity onPress={()=> handleSelect(options[2])}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>{options[2]}</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect(options[3])}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>{options[3]}</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect(options[4])}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>{options[4]}</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect(options[5])}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>{options[5]}</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect(options[6])}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>{options[6]}</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect(options[7])}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>{options[7]}</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect(options[8])}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>{options[8]}</Text>
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