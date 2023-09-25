import { View, Text, useWindowDimensions, Easing, TouchableOpacity, ScrollView, TextInput, FlatList, StatusBar, ActivityIndicator, Platform, KeyboardAvoidingView, Keyboard, AppState, Pressable, SafeAreaView} from 'react-native'
import React, {useState, useRef, useEffect} from 'react'
import tw from 'twrnc'
import { MotiView, useDynamicAnimation, MotiText } from 'moti';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { TypingAnimation } from 'react-native-typing-animation'
import useRevHook from '../Components/useRevHook';
import { useChat } from '../Context/ChatContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';


export default function Chat({navigation}) {
    const {isProMember} = useRevHook()
    const [pressed, setPressed] = useState(false)

    


    useEffect(()=> {
      getChatData()
      
    },[])
    
      
    const {
        getChatData,
        storeChatData,
        scrollToTop,
        exercises,
        chatMenuShow, 
        setChatMenuShow,
        fleurHelperRun, 
        setFleurHelperRun,
        textInputRef,
        abortControllerRef, 
        width,
        height,
        text,
        setText,
        loading, 
        setLoading,
        isFocused,
        setIsFocused,
        clicked, 
        setClicked,
        scrollRef, 
        transcriptRef, 
        error, 
        setError, 
        fleurResponse, 
        setFleurResponse,
        conversationString, 
        setConversationString, 
        helper, 
        setHelper,
        usageCount,
        setUsageCount,
        appStateVisible, 
        setAppStateVisible,
        appState,
        AndroidKey,
        initialSuggestions,
        runFocus,
        getChatUsage,
        storeChatUsage,
        runBlur,
        getUsageCount, 
        saveUsageCount, 
        clear, 
        classifier,
        fleurHelper,
        fleurResponseFunc,
        processFleurResponse,
        addMessage,
        scrollToBottom,
        reTry,
        cancelRun,
        cancelFleurRequest,
        userLeft, 
        setUserLeft,
        messageList,
        setMessageList,
        Message,
        setKeyboardHeight,
        keyboardHeight,
        startSelection, 
        setStartSelection,
        approaches
    } = useChat()
    
    useEffect(()=> {
      scrollToTop()
    }, [])


  return (
    
    <>
    {Platform.OS == "ios" &&
    <View style={{width:width, height:height}}>
     <LinearGradient 
    
     colors={['#E30000','#E34F00']}
     start={{x:0.05, y:0.6}}
     end={{x:0.9, y:0.3}}
     locations={[0.1,0.99]}
     
     
     style={{width:width, height:height, opacity:0.65}}
     >
 </LinearGradient>
    
 <View style={[tw`flex-1 justify-start`,{height:height, width:width, opacity:1, position:'absolute'}]}>
     
      <SafeAreaView style={tw`h-full ${Platform.OS == "android" && ``} `}>
    
    
    <View style={tw`justify-start items-center`}>
    {Platform.OS == 'android' ? <Text style={tw`text-white text-2xl text-center ${Platform.OS == "android" && ``}`}>Chat with Quill</Text> : <Text style={tw`text-white text-2xl text-center `}>Chat with Quill</Text>}
    </View>
    
    
    
    {!isProMember &&
    <View style={tw`ml-1`}>
      <Text style={tw`text-white ml-5 mb-1`}>{usageCount && usageCount == 0 || usageCount != "NaN" && <> {usageCount} Messages Remaining on Free Tier</>}</Text>
    </View>
    }
  
    
    <ScrollView
          contentContainerStyle={tw`pb-100`}
          extraScrollHeight={Platform.OS == 'ios' ? 50 :0} // use this prop for more fine tuning
          
    scrollToEnd={{animated:true}}
    style={tw` `}
    
    onContentSizeChange={() => messageList.length !== 1 ? scrollRef.current.scrollToEnd({ animated: true }) : null}
    //onLayout={() => scrollRef.current.scrollToEnd({ animated: true })}
    scrollEventThrottle={16}
    ref={scrollRef} 
    keyboardShouldPersistTaps='handled'
      
     >

    {messageList}
    
    {userLeft &&
    <View style={tw`mr-30 px-5 py-3`} onPress={()=> clear()}>
      
    <Text style={tw`text-white`}>Please don't leave the app while Quill is responding. Please send your message again.</Text>
    </View>
  
    }
    {loading &&
    <View style={tw`ml-10 mt-10 mb-20`}>
    
    <TypingAnimation 
        dotStyles={tw`mb-3`}
        dotColor="white"
        dotMargin={15}
        dotSpeed={0.20}
        dotRadius={5}
        dotX={20}
        
      />
      
      </View>
    }
    {error &&
      <View style={tw`mr-30 px-5 py-3 mb-2 `} onPress={()=> clear()}>
      <Text style={tw`text-white`}>{error}</Text>
      </View>
    }
    {messageList.length > 1 && !loading && 
    <TouchableOpacity style={tw`mr-30 ml-4 py-1 mb-5`} onPress={()=> clear()}>
    <Text style={tw`text-white `}>Close this conversation</Text>
    </TouchableOpacity>
    }

{messageList.length === 1 && !loading && chatMenuShow == false && 
      <>
      {!isProMember && usageCount > 0 &&
      <>
      <Text style={[tw`ml-4 mb-1 text-white font-bold mt-3`,{fontSize:15}]}>Some things you can try {startSelection != null && "(Tap to send)"}</Text> 
      {startSelection == null &&
     
      <View style={tw`flex-col  ml-4`}>
      <MotiView from={{scale:0, opacity:0}} animate={{scale:1, opacity:1}} transition={{type:'timing', duration:300}}>
      <TouchableOpacity onPress={()=> setStartSelection("exercises")} style={[tw` border border-white rounded-2xl justify-center items-center my-2`, {width:width/1.75, height:height/15}]}>
        <Text style={tw`text-white text-lg `}>Text/Email Drafting</Text>
      </TouchableOpacity>
      </MotiView>
      <MotiView from={{scale:0, opacity:0}} animate={{scale:1, opacity:1}} transition={{type:'spring', delay:100}}>
      <TouchableOpacity onPress={()=> setStartSelection("scenarios")} style={[tw` border border-white   rounded-2xl justify-center items-center my-2`, {width:width/1.75, height:height/15}]}>
        <Text style={tw`text-white text-lg `}>Social Media Posts</Text>
      </TouchableOpacity>
      </MotiView>
      <MotiView from={{scale:0, opacity:0}} animate={{scale:1, opacity:1}} transition={{type:'spring', delay:300}}>
      <TouchableOpacity onPress={()=> setStartSelection("approaches")} style={[tw` border border-white   rounded-2xl justify-center items-center my-2`, {width:width/1.75, height:height/15}]}>
        <Text style={tw`text-white text-lg `}>Twitter, Facebook, Reddit</Text>
      </TouchableOpacity>
      </MotiView>
      </View>
      
      }
      
      {startSelection == "scenarios" &&
      <>
      <MotiView from={{scale:0.5, opacity:0}} animate={{scale:1, opacity:1}} transition={{type:'timing', duration:600}}>
      <FlatList 
        data={initialSuggestions}
        //contentContainerStyle={tw`pb-80`}
        showsHorizontalScrollIndicator={false}
        pagingEnabled 
        horizontal
        keyboardShouldPersistTaps='handled'
        snapToEnd
        snapToStart
        snapToInterval={width/1.25}
        
        decelerationRate='fast'
        
        renderItem={(itemData)=> {
            
            return(
              <>
             
             <View style={[{width:width/1.25}, tw`mt-1`]}>
              
              <TouchableOpacity onPress={()=> {
                setText(itemData.item.message)
                setClicked(true)
                setChatMenuShow(false)
                //addMessage("user", text)
                }} style={[tw`ml-2  rounded-2xl p-2 `, ]}>
              <Text style={tw`text-white  font-bold`}>{itemData.index+1}. {itemData.item.title}</Text>
              <Text style={[tw`text-white `,{fontSize:16}]}>{itemData.item.description}</Text>
              </TouchableOpacity>
            </View>
             
             
  
              
              </>
            )
          
        }}
      
      />
      
      <TouchableOpacity style={tw`ml-4 mt-3  mx-10 items-center`} onPress={()=> setStartSelection(null)}>
        <Text style={tw`text-white font-extrabold text-lg`}>Go Back</Text>
      </TouchableOpacity>
        </MotiView>
      </>
        }

      {startSelection == "exercises" &&
      <>
      <MotiView from={{scale:0.5, opacity:0}} animate={{scale:1, opacity:1}} transition={{type:'timing', duration:600}}>
      <FlatList 
        data={exercises}
        //contentContainerStyle={tw`pb-80`}
        showsHorizontalScrollIndicator={false}
        pagingEnabled 
        horizontal
        keyboardShouldPersistTaps='handled'
        snapToEnd
        snapToStart
        snapToInterval={width/1.25}
        
        decelerationRate='fast'
        
        renderItem={(itemData)=> {
            
            return(
              <>
             
             <View style={[{width:width/1.25}, tw`mt-1`]}>
              
              <TouchableOpacity onPress={()=> {
                setText(itemData.item.message)
                setClicked(true)
                setChatMenuShow(false)
                //addMessage("user", text)
                }} style={[tw`ml-2  rounded-2xl p-2 `, ]}>
              <Text style={tw`text-white  font-bold`}>{itemData.index+1}. {itemData.item.title}</Text>
              <Text style={[tw`text-white `,{fontSize:16}]}>{itemData.item.description}</Text>
              </TouchableOpacity>
            </View>
             
             
  
              
              </>
            )
          
        }}
      
      />
      
      <TouchableOpacity style={tw`ml-4 mt-3  mx-10 items-center`} onPress={()=> setStartSelection(null)}>
        <Text style={tw`text-white font-extrabold text-lg`}>Go Back</Text>
      </TouchableOpacity>
        </MotiView>
      </>
        }


    {startSelection == "approaches" &&
      <>
      <MotiView from={{scale:0.5, opacity:0}} animate={{scale:1, opacity:1}} transition={{type:'timing', duration:600}}>
      <FlatList 
        data={approaches}
        //contentContainerStyle={tw`pb-80`}
        showsHorizontalScrollIndicator={false}
        pagingEnabled 
        horizontal
        keyboardShouldPersistTaps='handled'
        snapToEnd
        snapToStart
        snapToInterval={width/1.25}
        
        decelerationRate='fast'
        
        renderItem={(itemData)=> {
            
            return(
              <>
             
             <View style={[{width:width/1.25}, tw`mt-1`]}>
              
              <TouchableOpacity onPress={()=> {
                setText(itemData.item.message)
                setClicked(true)
                setChatMenuShow(false)
                //addMessage("user", text)
                }} style={[tw`ml-2  rounded-2xl p-2 `, ]}>
              <Text style={tw`text-white  font-bold`}>{itemData.index+1}. {itemData.item.title}</Text>
              <Text style={[tw`text-white `,{fontSize:16}]}>{itemData.item.description}</Text>
              </TouchableOpacity>
            </View>
             
             
  
              
              </>
            )
          
        }}
      
      />
      
      <TouchableOpacity style={tw`ml-4 mt-3  mx-10 items-center`} onPress={()=> setStartSelection(null)}>
        <Text style={tw`text-white font-extrabold text-lg`}>Go Back</Text>
      </TouchableOpacity>
        </MotiView>
      </>
        }
      


        </>
      }
      </>
      
      }
      {!isProMember && usageCount == 0 &&
      <TouchableOpacity onPress={()=> navigation.navigate("Paywall")} style={tw`ml-4 mb-3 mt-3 flex-row  items-center justify-center mx-30 py-5 items-center border-2 border-white rounded-2xl`} >
        <AntDesign name="unlock" size={24} color="white" />
        <Text style={tw`text-white ml-3 text-lg white`}>Upgrade</Text>
      </TouchableOpacity>
      }



    {helper ? 
    <>
    {helper.length > 1 ?
    <>
    {helper ? <Text style={[tw`ml-4 mb-1 text-white font-bold `,{fontSize:15}]}>Suggested Reponses (Tap to send)</Text> : <> <ActivityIndicator size='large' /> </>}
    <FlatList 
      data={helper ? helper : null}
      //contentContainerStyle={tw`pb-80`}
      showsHorizontalScrollIndicator={false}
      pagingEnabled 
      horizontal
      keyboardShouldPersistTaps='handled'
      snapToEnd
      snapToStart
      snapToInterval={width/1.25}
      
      decelerationRate='fast'
      
      renderItem={(itemData)=> {
          
          return(
            <>
           {itemData.item.q.includes('Thank you') || itemData.item.q.includes(':') || itemData.item.q == "." ?
           null 
           :
           <View style={[{width:width/1.25}, tw`mt-1`]}>
            
            <TouchableOpacity onPress={()=> {
              setText(itemData.item.q)
              setClicked(true)
              //addMessage("user", text)
              }} style={[tw`ml-2  rounded-2xl p-2 `, ]}>
            <Text style={[tw`text-white `,{fontSize:16}]}>{itemData.item.q}</Text>
            </TouchableOpacity>
          </View>
           
           }

            
            </>
          )
        
      }}
    
    />
    </>

    :
    <>
    {helper ? <Text style={[tw`ml-4 mb-1 text-white font-bold`,{fontSize:15}]}>Suggested Reponses (Tap to send)</Text> : <> <ActivityIndicator size='large' /> </>}
    <FlatList 
    data={helper ? helper : null}
    horizontal
    showsHorizontalScrollIndicator={false}
    pagingEnabled
    keyboardShouldPersistTaps='handled'
    snapToEnd
    //contentContainerStyle={tw`pb-80`}
    snapToStart
    snapToInterval={width}
    
    decelerationRate='fast'
    
    renderItem={(itemData)=> {
        
        return(
          <>
         
          <View style={[{width:width/1.25}, tw`mt-1`]}>
            
          <TouchableOpacity onPress={()=> {
            setText(itemData.item.q)
            setClicked(true)
            //addMessage("user", text)
            }} style={tw`ml-2  rounded-2xl  p-2`}>
          <Text style={[tw`text-white `,{fontSize:16}]}>{itemData.item.q}</Text>
          </TouchableOpacity>
        </View>

       
         
          
          </>
        )
      
    }}
  
  />
</>

    }
    </>
    :
    <View>
      {fleurHelperRun == true &&
    <ActivityIndicator size='large' color='white' />
      }
    </View>
    }
    </ScrollView>
 
 
    
    

         {/*
         
         {clicked && r
         <View style={tw`justify-start items-end mb-20 mr-5`}>
         <AntDesign name="questioncircle" size={40} color="black" /> 
         </View>
         }
        */}
 

{Platform.OS == 'ios' &&
  <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={0} style={[tw`flex-row items-center absolute bottom-0`, {width:width}]}>
  {chatMenuShow == false &&
 
   <View id='outer-container' style={[{width:width, maxHeight:height/2}, tw`bg-slate-600 flex-row    ${!isFocused ? `min-h-20`: `min-h-14`}`]} >
       
       <View id="inner-container" style={[tw`flex-row justify-start items-start rounded-2xl `, {width:width}]}>
        <View style={tw`flex-row items-center mt-2`}>
       <TouchableOpacity style={tw`ml-2`} onPress={()=> setChatMenuShow(true)}>
       <AntDesign name="minuscircleo" size={28} color="white" />
       </TouchableOpacity>

       <TextInput
       multiline
       autoFocus={Platform.OS == 'ios' ? true : false}
       numberOfLines={1}
       style={[tw`ml-2 mr-1 p-2 ${!isFocused && text.length > 20 && `mb-5`} text-white text-lg bg-black rounded-2xl`, { width:width/1.3, minHeight:40}]}
       placeholder={loading ? "Quill is responding...(~20 secs)" : "Enter Message..."}
       ref={textInputRef}
       placeholderTextColor={'gray'}
       value={text}
       maxLength={750}
       onBlur={()=> setIsFocused(false)}
       onChangeText={setText}
       onFocus={()=> scrollToBottom()}
       />
       
       
       <TouchableOpacity style={tw`flex-col `} onPress={()=> loading ? null : addMessage("user", text, navigation) && setPressed(prev => !prev)}>
         {text.length > 650 ? <MotiText from={{scale:0}} animate={{scale:1}} transition={{type:'timing', duration:400}} style={tw`font-light  text-slate-200`}>{text.length > 650 && text.length -750}</MotiText> : null}
       <Feather name="send" style={tw` ml-2`} size={28} color="white"  />
       </TouchableOpacity>
       </View>
       </View>
   </View>     
   
   }

   {chatMenuShow == true &&
   <TouchableOpacity  style={tw`flex-1 items-center justify-center mb-30 `} onPress={()=> {
     
     //setClicked(true)
     setChatMenuShow(false)
     
     }}>
   <MotiView from={{scale:0.2}} animate={{scale:1}} transition={{type:'timing'}}>
   <Ionicons name="add-circle" size={45} color="white" />
   
   </MotiView>
   </TouchableOpacity>
   }
   
     </KeyboardAvoidingView>
  }
       </SafeAreaView>
    </View>
    </View>
    
  }



    </>
    
  )
}