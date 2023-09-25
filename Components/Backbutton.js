import React, { useEffect } from 'react'
import {View, Text, TouchableOpacity, Alert, SafeAreaView}  from 'react-native'
import tw from 'twrnc'
import { Motion } from "@legendapp/motion"

import { Ionicons } from '@expo/vector-icons';


export default function BackButton({navigation}) {
  return (
    <SafeAreaView style={tw``}>
    <TouchableOpacity onPress={()=> navigation.goBack()} style={tw`flex flex-row mt-2 ml-4`}>
    <Ionicons name="chevron-back-circle" size={38} color="white" />
    </TouchableOpacity>
    </SafeAreaView>
  )
}
