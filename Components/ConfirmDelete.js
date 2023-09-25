import { View, Text, useWindowDimensions, TouchableOpacity, Linking, Alert, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import tw from 'twrnc'
import { TextInput } from 'react-native-gesture-handler'
import { getAuth, deleteUser} from 'firebase/auth'
import { getDatabase, ref, remove } from 'firebase/database'
import app from '../firebaseConfig'
import BackButton from './Backbutton'

export default function ConfirmDelete({navigation, route}) {
    const db = getDatabase(app)
      if(route.params){
      const {refresh} = route.params
    }
    const {width, height} = useWindowDimensions()
    const [text, setText] = useState()
    const [accountDeleted, setAccountDeleted] = useState(false)
    const [token, setToken] = useState(null)
    const auth = getAuth(app)
    const user = auth.currentUser


    function openSubscriptions(){
        
        Linking.openURL('https://apps.apple.com/account/subscriptions')
      }

    function deleteAccount(){
        console.log(user)
        if(user){
        const userReference = ref(db,`users/${user.uid}/userdata/`)
        remove(userReference).then(()=> {
        user.delete().then(()=> {
            
            Alert.alert("Account Deleted", "Your account has been permanently deleted. Redirecting to App Store subscriptions in 3 seconds.")
            setTimeout(()=> Linking.openURL('https://apps.apple.com/account/subscriptions'), 3000)
            
            
        }).catch((error)=> {
            if(error.code == "auth/requires-recent-login"){
                console.log(true)
                navigation.navigate('RefreshLogin', {redirect:true})
            }
            console.log(error.code)
        })

      }).catch((error)=> {
        console.log(error.code)
      })
        

        /*deleteUser(user).then(()=> {
            console.log("Account Deleted")
        })*/
        
        }
    }
  return (
    <View style={[{width:width, height:height}, tw`justify-start bg-indigo-900`]}>
      <BackButton navigation={navigation} />
        {!accountDeleted && !route.params &&
        <View>
      <Text style={tw`text-white text-center text-2xl  font-bold`}>Confirm Account Deletion</Text>
      <Text style={tw`text-white text-lg mt-3 mx-5`}>Are you sure you want to delete your account? This action is irreversible and all of your data will be permanently deleted.</Text>
      <Text style={tw`text-white text-lg mt-5 mx-5`}>Type "confirm" to Delete Your Account:</Text>
      <View style={[tw` justify-center mb-5`, {width:'75%'}]}>
      <TextInput
        style={tw` px-3  text-white text-lg mx-2 py-3 mt-3 mb-4`}
        multiline={false}
        numberOfLines={1}
        selectionColor={'white'}
        maxLength={7}
        keyboardAppearance="dark"
        onChangeText={setText}
        value={text}
        autoFocus={true}
        
      />
      </View>
      {text == "Confirm" || text == "confirm" ?
      <TouchableOpacity onPress={()=> setAccountDeleted(true)} style={tw`border border-white mx-20 items-center rounded-full p-5`}>
        <Text style={tw`text-white text-lg`}>Next</Text>
      </TouchableOpacity>

      :
      <TouchableOpacity  style={tw`border border-slate-500 mx-20 items-center rounded-full p-5`}>
      <Text style={tw`text-slate-500 text-lg`}>Next</Text>
    </TouchableOpacity>
    
        }
        
      </View>
      }
      {accountDeleted && !route.params &&
      <ScrollView contentContainerStyle={tw`pb-30`} showsVerticalScrollIndicator={false} style={[tw``]}>
        <Text style={tw`text-white text-center text-2xl  mx-5  font-bold`}>Delete Account & Cancel Subscription</Text>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>We're sorry to see you go. In addition to permanently deleting your account, it's important that you cancel your subscription through your iCloud account to avoid getting billed beyond your current period. </Text>
        <Text style={tw`text-white text-lg mx-5 mt-3`}>To do this:</Text>
        <Text style={tw`text-white text-lg mx-5 `}>1. Press the button below which will both delete your account with us and redirect you to your app store subscriptions.</Text>
        <Text style={tw`text-white text-lg mx-5`}>2. Find Flourish on your subscriptions list.</Text>
        <Text style={tw`text-white text-lg mx-5 `}>3. Tap into it.</Text>
        <Text style={tw`text-white text-lg mx-5`}>4. Press "Cancel Subscription".</Text>

        <Text style={tw`text-white text-lg mx-5 mt-5`}>If at any point you would like to join us again, you will need to create a new account.</Text>

        <Text style={tw` mx-5 mt-5 text-white`}>Note: If you haven't logged in a while, you will be redirected to the login screen to confirm your account.</Text>
        
        <View style={tw`items-center justify-end`}>
          
        <TouchableOpacity onPress={()=> deleteAccount()} style={tw`border-2 bg-red-600 border-white px-5 mx-5 mt-3 py-3 rounded-2xl`}>
            <Text style={tw`text-white text-lg text-center`}>Confirm Deletion</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
        }

        {route.params && 

          <View style={tw`flex-1 justify-start `}>
            <Text style={tw`text-white text-2xl font-bold items-center text-center`}>Sign In Successful</Text>
            <Text style={tw`text-white text-lg text-center font-light mt-1`}>Now you will be able to delete your account.</Text>
          <View style={tw`flex-1 justify-start  items-center`}>
             <TouchableOpacity onPress={()=> deleteAccount()} style={tw` border-2 bg-red-600 border-white px-5  mt-3 py-5 rounded-2xl`}>
            <Text style={tw`text-white text-lg text-center `}>Delete My Account & Go To Subscriptions</Text>
            </TouchableOpacity>
          </View>
          </View>
        
        
        }
        
    </View>
  )
}