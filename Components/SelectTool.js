import { View, Text, useWindowDimensions, ScrollView } from 'react-native'
import React, {useState} from 'react'
import tw from 'twrnc'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useChat } from '../Context/ChatContext'

export default function SelectTool({navigation}) {
    const {selectedTool, setSelectedTool} = useChat()
    const {width, height} = useWindowDimensions()

    function handleSelect(toolName){
        setSelectedTool(toolName)
        navigation.goBack()
        
    }



  return (
    <View  style={[tw`bg-slate-900 bg-opacity-80` , {width:width, height:height,}]}>
     <View style={tw`flex-1 justify-start  mt-20`}>
     <Text style={tw`text-white text-2xl text-center`}>Select Operation</Text>
        <ScrollView>
        <TouchableOpacity onPress={()=> handleSelect("Write At A Certain Grade Level")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Write At A Certain Grade Level</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>  
        <TouchableOpacity onPress={()=> handleSelect("Generate Executive Summary")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Generate Executive Summary</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>    

        <TouchableOpacity onPress={()=> handleSelect("Generate Essay")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Generate Essay</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect("Summarize")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Summarize</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>
        
        <TouchableOpacity onPress={()=> handleSelect("Find Action Items")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Find Action Items</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect("Translate")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Translate</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>
        
      

        <TouchableOpacity onPress={()=> handleSelect("Explain This")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Explain This</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect("Enhance Writing")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Enhance Writing</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>


        <TouchableOpacity onPress={()=> handleSelect("Make Shorter")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Make Shorter</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>


        <TouchableOpacity onPress={()=> handleSelect("Make Longer")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Make Longer</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect("Change Tone")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Change Tone</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>


        <TouchableOpacity onPress={()=> handleSelect("Simplify Language")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Simplify Language</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>
      

       

        <TouchableOpacity onPress={()=> handleSelect("Create Outline")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Create Outline</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect("Sales Email")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Sales Email</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        
        <TouchableOpacity onPress={()=> handleSelect("Pros and Cons List")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Pros and Cons List</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect("Job Description")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Job Description</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect("Recruiting Email")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Recruiting Email</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect("Text Completion")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Text Completion</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect("Correct Grammar & Spelling")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Correct Grammar And Spelling</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>

        <TouchableOpacity onPress={()=> handleSelect("Product Description to Ad Copy")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Product Description to Ad Copy</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>


        <TouchableOpacity onPress={()=> handleSelect("Product Name Generation")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Product Name Generation</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>


        <TouchableOpacity onPress={()=> handleSelect("Generate Analogy")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Generate Analogy</Text>
        </TouchableOpacity>
        <Text style={tw`bg-slate-300 h-0.25 mt-3`}></Text>
        
        <TouchableOpacity onPress={()=> handleSelect("Generate Interview Questions")}>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>Generate Interview Questions</Text>
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