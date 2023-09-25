import { View, Text, useWindowDimensions, Easing, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, KeyboardAvoidingView, Keyboard, AppState} from 'react-native'
import React, {useState, useRef} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import tw from 'twrnc'
import { AnimatePresence, Motion } from '@legendapp/motion'
import { MotiView, useDynamicAnimation, MotiText } from 'moti';
import * as Haptics from 'expo-haptics';
import { AntDesign } from '@expo/vector-icons';
import { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Clipboard from 'expo-clipboard';
import { onValue, ref, set, getDatabase } from 'firebase/database'
import { FontAwesome5 } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth'
import useRevHook from '../Components/useRevHook'
import { useChat } from '../Context/ChatContext'
import * as StoreReview from 'expo-store-review';
import { Ionicons } from '@expo/vector-icons';
import analytics from '@react-native-firebase/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function EntryScreen({navigation, route}) {
  const [copiedText, setCopiedText] = useState('');
  const abortControllerRef = useRef(null)
    const {englishVersion} = route?.params || {}
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const {width, height} = useWindowDimensions()
    const [guidance, setGuidance] = useState()
    const [guidanceText, setGuidanceText] = useState()
    const [text, setText] = useState()
    const [isHidden, setIsHidden] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [aiResponse, setAiResponse] = useState(false)
    const [loadingRequest, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const appState = useRef(AppState.currentState)
    const [responseHidden, setResponseHidden] = useState()
   const [appStateVisible, setAppStateVisible] = useState(appState.current)
   
   const [userLeft, setUserLeft] = useState(false)
   const {isProMember, loading} = useRevHook()
   const auth = getAuth()
   const [usageCount, setUsageCount] = useState()
   const {selectedTool, setSelectedTool, tone, language, grade} = useChat()

    useEffect(()=> {
      //getUsageCount()
      getEntryData()
    }, [])


    async function storeEntryData(value){
      try {
        console.log("updating value to", value)
        await AsyncStorage.setItem('entryUsage', String(value));
        console.log('Data saved successfully.');
      } catch (error) {
        console.error('Error storing data:', error);
      }
    }



    async function getEntryData(){
      //storeEntryData(2)
      try{
        const value = await AsyncStorage.getItem('entryUsage')
        if(value !== null){
          console.log("Value Found", value)
          setUsageCount(Number(value))
        } else{
          console.log("No value found")
          storeEntryData(20)
        }
      } catch(error){
        console.error("Error retrieving data", error)
      }
    }
    
    useEffect(()=> {
      getEntryData()
    }, [])

    useEffect(() => {
      console.log("ispro" + isProMember);
  
      if (!loading && isProMember === false) {
          //navigation.navigate('Paywall');
      }
  }, [loading, isProMember, navigation]);
  


    async function review(){
      if (usageCount % 4 === 0) {  // Check if usageCount is a multiple of 3
        if (await StoreReview.hasAction()) {
          // you can call StoreReview.requestReview()
          StoreReview.requestReview()
        }
      }
    }


    /*
   function getUsageCount(){
    console.log("Getting Database")
    const db = getDatabase()
    const userRef = ref(db, `users/${auth.currentUser.uid}/userdata/usage/ignitionUsage`)

    onValue(userRef, (snapshot) => {
        var temp = snapshot.val()
        setUsageCount(temp)   

    });
  }
  */

  /*
  function saveUsageCount(){
    console.log("usageCount:"+usageCount)
    const db = getDatabase()  
  if(auth.currentUser.uid){ 
  set(ref(db, `users/${auth.currentUser.uid}/userdata/usage/ignitionUsage`), 
      usageCount+1
  )
} else {
  console.log("no user id")
}
  }
    */

   const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  async function copyToClipboard(){
    await Clipboard.setStringAsync('')
  }
     
    const title = "Ignition"
    const label = "Paste or type some text below and tap the flame to get started."
  
    
    const prompts =[
      {
        "Write At A Certain Grade Level":{prompt:`Take this text and write it at the ${grade} level: ${text + '.'}`},
        "Generate Executive Summary":{ prompt:`Take this text and change it into a well written executive summary. The answer should render well in a text tag for react native: ${text + "."}`},
        "Generate Essay":{prompt:`Take this text and transform it into an extremely well written essay of about 500 words. The answer should render well in a text tag for react native: ${text + "."}`},
        "Summarize":{ prompt:`Take this text and summarize it in a well written concise way. The answer should render well in a text tag for react native: ${text + "."}`},
        "Find Action Items":{ prompt:`Take this text and extract the action items from it in list form. The answer should render well in a text tag for react native: ${text + "."}`},
        "Translate":{ prompt:`Translate the following text to ${language}. The answer should render well in a text tag for react native:${text + "."}`},
        "Explain This":{ prompt:`Explain this in a well written, easy to understand way. The answer should render well in a text tag for react native: ${text + "."}`},
        "Enhance Writing":{ prompt:`Write this better. The answer should render well in a text tag for react native: ${text + "."}`},
        "Make Shorter":{ prompt:`Shorten this. The answer should render well in a text tag for react native:${text + "."}`},
        "Make Longer":{ prompt:`Lengthen this. The answer should render well in a text tag for react native:${text + "."}`},
        "Change Tone":{ prompt:`Change the tone of this to ${tone}. The answer should render well in a text tag for react native: ${text + "."}`},
        "Simplify Language":{ prompt:`Simplify this language. The answer should render well in a text tag for react native: ${text + "."}`},
        "Create Outline":{ prompt:`Create an outline for this. The answer should render well in a text tag for react native: ${text + "."}`},
        "Sales Email":{ prompt:`Translate this into a sales email. The answer should render well in a text tag for react native:${text + "."}`},
        "Pros and Cons List":{ prompt:`Translate this into a pros and cons list. The answer should render well in a text tag for react native:${text + "."}`},
        "Job Description":{ prompt:`Translate this into a modern professional job description. The answer should render well in a text tag for react native:${text + "."}`},
        "Recruiting Email":{ prompt:`Translate this into a recruiting email. The answer should render well in a text tag for react native:${text + "."}`},
        "Text Completion":{ prompt:`Complete this text: ${text + "."}`},
        "Correct Grammar & Spelling":{ prompt:`Correct any spelling or grammatical errors in this assuming ${englishVersion}. The answer should render well in a text tag for react native: ${text + "."}`},
        "Product Description to Ad Copy":{ prompt:`Translate this product description to ad copy and provide 10 different versions. The answer should render well in a text tag for react native:${text + "."}`},
        "Product Name Generation":{ prompt:`Take this description of a product and come up with 30 names. The answer should render well in a text tag for react native: ${text + "."}`},
        "Generate Analogy":{ prompt:`Generate an analogy for this. The answer should render well in a text tag for react native: ${text + "."}`},
        "Generate Interview Questions":{ prompt:`Generate 10 interview questions from this. The answer should render well in a text tag for react native: ${text + "."}`}
      }
    ]

    const guidancePrompts =[
      {
        "Write At A Certain Grade Level":{prompt:`Enter some text you'd like written at a particular grade level...`},
        "Generate Essay": {prompt:"Enter a topic or a rough essay from Quill to get started"},
        "Generate Executive Summary":{ prompt:`Enter some text that you'd like to be turned into an executive summary...`},
        "Summarize":{ prompt:`Enter some text you'd like summarized...`},
        "Find Action Items":{ prompt:`Enter some text and Ignition will find action items within it...`},
        "Translate":{ prompt:`Enter some text you'd like translated...`},
        "Explain This":{ prompt:`Enter some text you'd like explained...`},
        "Enhance Writing":{ prompt:`Enter some text you'd like written better...`},
        "Make Shorter":{ prompt:`Enter some text you'd like shortened...`},
        "Make Longer":{ prompt:`Enter some text you'd like lengthened...`},
        "Change Tone":{ prompt:`Enter some text you'd like to be more funny, casual, friendly, confident, technical etc...`},
        "Simplify Language":{ prompt:`Enter some text you'd like simplified...`},
        "Create Outline":{ prompt:`Enter some general guidelines you'd like to be turned into an outline...`},
        "Sales Email":{ prompt:`Enter some notes you'd like changed into a sales email...`},
        "Pros and Cons List":{ prompt:`Enter some text and Ignition will generate a pros and cons list...`},
        "Job Description":{ prompt:`Enter a general outline of a job and Ignition will change it into a formal job description...`},
        "Recruiting Email":{ prompt:`Enter some general information you'd like translated into a formal recruiting email...`},
        "Text Completion":{ prompt:`Enter some text you'd like completed...`},
        "Correct Grammar & Spelling":{ prompt:`Enter some text you'd like proofread...`},
        "Product Description to Ad Copy":{ prompt:`Enter a product description you'd like changed into ad copy...`},
        "Product Name Generation":{ prompt:`Enter a general idea for a product and Ignition will generate a list of potential product names...`},
        "Generate Analogy":{ prompt:`Enter an idea and Ignition will find the right analogy...`},
        "Generate Interview Questions":{ prompt:`Enter a job title, industry and description and Ignition will translate it into a set of interview questions. You can add any additional relevant information as well...`}
      }
    ]
    //set prompts:
    useEffect(()=> {
      if(selectedTool){
      
      setGuidanceText(guidancePrompts[0][selectedTool].prompt)
      }
      
    },[selectedTool, guidance, textBoxFocus])
    

    


    useEffect(()=>{
       if(aiResponse != false){
        console.log(aiResponse)
       }
    },[aiResponse])

     //Background or foreground app state listener
   useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) && 
        nextAppState === 'active'
        
      ) {
        console.log('App has come to the foreground!');
      } else{
        console.log("App has gone to the background.")
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      //console.log(appState.current)
      
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(()=> {
    console.log(AppState.currentState)
    if(AppState.currentState != 'active' && submitted){
      
      
      cancelRun()

    }

    if(AppState.currentState == 'active' && userLeft){
      setError(true)
    }
  },[AppState.currentState])
  

    function runAgain(){
        setSubmitted(false)        
        
    }

    function handleClear(){
        setText()
        setAiResponse(false)
    }

    function cancelRun(){
      cancelQuillRequest()
      setUserLeft(true)
      setSubmitted(false)
      
      //setText()
      //setUserLeft(true)
      setLoading(false)
      //setHelper(false)
      setAiResponse(false)

    }

    function cancelQuillRequest(reasonCode){
      setLoading(false)
      reasonCode == "timeout" && setError("Either the network timed out or there was a server error. Retry sending")
      abortControllerRef.current && abortControllerRef.current.abort()
      console.log("Request to Quill cancelled.")
    }     




    async function handleSubmit(){
        //getUsageCount()
        await analytics().logEvent("entryScreenUsed", {id:"yup"})
        console.log("submitted")
        getEntryData()
        console.log("usage count", usageCount)
        if(usageCount==0){
            console.log("THIS IS SO TRUE OH MA GAWD")
            navigation.navigate('Paywall')
        } else{
        //saveUsageCount()
        storeEntryData(usageCount-1)
        setUserLeft(false)
        setAiResponse(false)
        setError(false)
        review()

      

        abortControllerRef.current = new AbortController()
        console.log("This is running.")
        setSubmitted(true)
        var myHeaders = new Headers();
  
        myHeaders.append("Authorization", "Bearer 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");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "model": "gpt-4",
        "messages": [
          {role:"system", content:"You are a writing assistant. Your job is to fulfill the request of your users. "},
          //{role:"assistant", content:""},
          {role:'user', content: prompts[0][selectedTool].prompt}
          
        ],
        
        "max_tokens": 1500,
        "presence_penalty": 1,
        "temperature": 0.3,
        "frequency_penalty": 1,
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        signal: abortControllerRef.current.signal,
        };
        fetch("https://api.openai.com/v1/chat/completions", requestOptions)
            .then(response => response.json())
            .then(result =>  {
              //saveUsageCount()
              storeEntryData(usageCount-1)
              getEntryData()
              setAiResponse(result.choices[0].message.content)
            })//setAiResponse(result.choices[0].messages.content))
            .catch(error => console.log(error));
          }
    }

    const TextBox = useDynamicAnimation(()=> {
        return{
          translateY:0,
       
        }
      })
    
      const ResponseBox = useDynamicAnimation(()=> {
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
          setError(false)
          setGuidance(false)
          if(title.length < 20){
          if(label){
            TextBox.animateTo({translateY:[{value:-100, easing:Easing.easing, type:'timing', duration:400}]})
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

      function responseBoxFocus(){
        setGuidance(false)
        setResponseHidden(true)
        ResponseBox.animateTo({translateY:[{value:-70, easing:Easing.easing, type:'timing', duration:400}]})
       
        setIsHidden(true)
    }
  
      function isNotFocused(){
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        TextBox.animateTo({translateY:[{value:0, easing:Easing.easing, type:'timing', duration:400}]})
        ResponseBox.animateTo({translateY:[{value:0, easing:Easing.easing, type:'timing', duration:400}]})
        setResponseHidden(false)
        setIsHidden(false)
        Keyboard.dismiss()
      }


      function workAgain(){
        setSubmitted(false)
        setText(aiResponse)
      }
    

  return (
    <View style={{width:width, height:height}}>
    <LinearGradient 
    colors={['#E30000','#E34F00']}
    //colors={['#182E77','#FF0000']}
    start={{x:0.05, y:0.6}}
    end={{x:0.9, y:0.3}}
    locations={[0.1,0.99]}
    
    
    style={{width:width, height:height, opacity:0.65}}
    >
    </LinearGradient>
    <View style={[tw`flex-1 justify-start mt-7`,{height:height, width:width, opacity:1, position:'absolute'}]}>
    {!submitted ? 
    <ScrollView contentContainerStyle={[{width:width}, tw`pb-40 items-center`]}>
        
        <View style={tw`items center`}>
          
        <AnimatePresence style={tw`items-center`}>
        {isHidden === false &&
        
        <MotiView style={tw`items-center`} animate={{opacity:1}} exit={{opacity:0}} key='asdf' >
        
    
        
        
       
        <MotiView from={{ opacity:0, scale:1.3}} animate={{opacity:1, scale:1}} transition={{default:{type:"timing", duration:1000, easing: Easing.easing}}}>
        
        
        
        {error ?
          <MotiView style={tw`mt-8 bg-red-700 rounded-2xl py-2`} from={{scale:0}} animate={{scale:1}} transition={{type:'spring', stiffness:300}}>
            
            <Text style={tw`text-white font-bold  text-lg mx-5`}>We cancelled your request because you left the app while it was processing. Please try again without leaving.</Text>
          </MotiView>

          :
          <View style={tw`mt-7`}>
            <Text style={tw`text-center text-white text-2xl`}>Ignition</Text>
          <Text style={tw`text-white text-center  mx-2 text-lg items-start text-left font-light mt-2 text-white `}>{label}</Text>
          
          </View>

        
        }
        
        
        
          
        
       
          
        </MotiView>
        </MotiView>
        }
      
      
        
        
      <MotiView from={{ opacity:0, scale:0.7}} animate={{opacity:1, scale:1}} transition={{default:{type:"timing", duration:1000, easing: Easing.easing}}}>
       
        
        
        <MotiView style={{height:'100%'}} state={TextBox}>
        {!isHidden &&
        <View style={tw`flex-row items-center justify-between`}>
        {!isProMember && <Text style={tw` ml-3 mb--3 text-white text-xs`}>{usageCount != null && usageCount != 0 ? <Text style={tw` ml-3 mb--3 text-white text-xs`}> {usageCount} Submissions Remaining in the Free Tier</Text> : <Text style={tw` ml-3 mb--3 text-white text-xs`}>0 Submissions Remaining in the Free Tier</Text>}</Text>}
        <Text style={tw` text-center  mt-2 text-lg text-white`}>{text ? text.length : 0}/100,000</Text>
        </View>
          }
      
        
        
       
      
      <View style={tw`items-center`}>
      <TextInput
        style={[tw`my-1 px-3 rounded-xl border border-white text-white  font-light `, {aspectRatio:isHidden ? 4/4.5 : 4/3.6, width:width/1.1, fontSize:17}]}
        multiline={true}
        numberOfLines={5}
        selectionColor={'white'}
        maxLength={100000}
        onFocus={textBoxFocus}
        placeholderTextColor={"white"}
        placeholder={guidanceText}
        onBlur={()=> isNotFocused()}
        keyboardAppearance="dark"
        onChangeText={setText}
        value={text}
        
      />
       </View>
      

      {isHidden &&
      <KeyboardAvoidingView style={tw`flex-1 flex-row justify-end`}>
        
      <View style={[tw`flex-row justify-end `, {aspectRatio:4/3}]}>
      


        <MotiText key='asdfasflkjrh' exit={{opacity:0}} from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:1000, easing:Easing.easing}} style={tw`mx-10 text-right  mt-2 text-lg text-white`}>{text ? text.length : 0}/100000</MotiText>
          
      <MotiView key="asdfadgh" exit={{opacity:0, translateX:-20}} from={{opacity:0, translateX:50}} animate={{opacity:1, translateX:-20}}><TouchableOpacity onPress={()=>isNotFocused()} style={[tw`items-end  `]} ><AntDesign name="checkcircle" size={50} color="white" /></TouchableOpacity></MotiView> 
      </View>
      </KeyboardAvoidingView>
        }

      {!isHidden && 
      <MotiView style={tw`flex-1`}>

      <View style={tw`justify-center items-center `}>
      
        <View style={tw`flex-row`}>
        <TouchableOpacity onPress={()=> handleClear()} style={tw`flex-1 items-center p-1  mx-5 rounded-2xl  justify-end `}>
        <Text style={tw`text-white  text-lg`}>Clear</Text>
      </TouchableOpacity>

      {selectedTool && text && selectedTool !="Translate" && selectedTool != "Change Tone" && selectedTool != "Correct Grammar & Spelling" &&
      <MotiView from={{scale:0}} animate={{scale:1}} transition={{type:"spring", stiffness:200, damping:10}} style={tw`flex-1 rounded-2xl p-1 mx-5 items-center justify-end`}>
        {!isProMember && !usageCount > 0 ?
         <TouchableOpacity onPress={()=> navigation.navigate("Paywall")}  style={tw`flex-1 items-center p-1  mx-5 rounded-2xl  justify-end `}>
         <Text style={tw`text-white text-lg`}>Submit</Text>
       </TouchableOpacity> 
        
        :
        <TouchableOpacity onPress={()=> handleSubmit()} style={tw`    `}>
        <Text style={tw`text-white  text-lg`}>Submit</Text>
      </TouchableOpacity> 
        }
      </MotiView>

      
    
    }
    {!text && !selectedTool &&
    <TouchableOpacity  style={tw`flex-1 items-center p-1  mx-5 rounded-2xl  justify-end `}>
    <Text style={tw`text-slate-400  text-lg`}>Submit</Text>
  </TouchableOpacity> 
    
    
    }
    {text && !selectedTool &&
    <TouchableOpacity  style={tw`flex-1 items-center p-1  mx-5 rounded-2xl  justify-end `}>
    <Text style={tw`text-slate-400  text-lg`}>Submit</Text>
  </TouchableOpacity> 
    
    
    }

  {!text && selectedTool &&
    <TouchableOpacity  style={tw`flex-1 items-center p-1  mx-5 rounded-2xl  justify-end `}>
    <Text style={tw`text-slate-400  text-lg`}>Submit</Text>
  </TouchableOpacity> 
    
    
    }

    {text && selectedTool =="Translate" && language &&
      <MotiView from={{scale:0}} animate={{scale:1}} transition={{type:"spring", stiffness:200, damping:10}} style={tw`flex-1 rounded-2xl p-1 mx-5 items-center justify-end`}>
      {!isProMember && !usageCount > 0 ?
         <TouchableOpacity onPress={()=> navigation.navigate("Paywall")}  style={tw`flex-1 items-center p-1  mx-5 rounded-2xl  justify-end `}>
         <Text style={tw`text-white text-lg`}>Submit</Text>
       </TouchableOpacity> 
        
        :
        <TouchableOpacity onPress={()=> handleSubmit()} style={tw`    `}>
        <Text style={tw`text-white  text-lg`}>Submit</Text>
      </TouchableOpacity> 
        }
    </MotiView>

    }

    { text && selectedTool == "Change Tone" && tone &&
     <MotiView from={{scale:0}} animate={{scale:1}} transition={{type:"spring", stiffness:200, damping:10}} style={tw`flex-1 rounded-2xl p-1 mx-5 items-center justify-end`}>
     {!isProMember && !usageCount > 0 ?
        <TouchableOpacity  style={tw`flex-1 items-center p-1  mx-5 rounded-2xl  justify-end `}>
        <Text style={tw`text-slate-400  text-lg`}>Submit</Text>
      </TouchableOpacity> 
        
        :
        <TouchableOpacity onPress={()=> handleSubmit()} style={tw`    `}>
        <Text style={tw`text-white  text-lg`}>Submit</Text>
      </TouchableOpacity> 
        }
   </MotiView>

    
    }

    { text && selectedTool == "Correct Grammar & Spelling" && englishVersion &&

      <MotiView from={{scale:0}} animate={{scale:1}} transition={{type:"spring", stiffness:200, damping:10}} style={tw`flex-1 rounded-2xl p-1 mx-5 items-center justify-end`}>
      {!isProMember && !usageCount > 0 ?
        <TouchableOpacity onPress={()=> navigation.navigate("Paywall")}  style={tw`flex-1 items-center p-1  mx-5 rounded-2xl  justify-end `}>
        <Text style={tw`text-white text-lg`}>Submit</Text>
      </TouchableOpacity> 
        
        :
        <TouchableOpacity onPress={()=> handleSubmit()} style={tw`    `}>
        <Text style={tw`text-white  text-lg`}>Submit</Text>
      </TouchableOpacity> 
        }
      </MotiView>

    
    }
        </View>
      
        <View style={tw`flex-col `}>
            <View style={tw`items-center`}>
                <TouchableOpacity  onPress={()=> navigation.navigate("SelectTool")} style={[tw`rounded-full items-center justify-center bg-yellow-500`,{height:60, width:60}]}>
                <Ionicons name="flame" size={40} color="red" />
            </TouchableOpacity>
            
            {selectedTool && <Text style={tw`text-white mt-1`}>{selectedTool}</Text>}
            </View>
            {selectedTool && selectedTool =="Translate" &&  
            <MotiView from={{scale:0}} animate={{scale:1}} transition={{type:"spring", stiffness:200, damping:15}}>
              <TouchableOpacity onPress={()=> navigation.navigate("SelectLanguage")} style={tw`border  border-white items-center justify-center px-5 py-3 mt-5 rounded-2xl`}>
                <Text style={tw`text-white text-lg`}>{language ? language : "Select a Language"}</Text>
              </TouchableOpacity>
              </MotiView>
            
            } 
            
            {selectedTool && selectedTool == "Change Tone" &&
            <MotiView from={{scale:0}} animate={{scale:1}} transition={{type:"spring", stiffness:200, damping:15}}>
            <TouchableOpacity onPress={()=> navigation.navigate("SelectTone")} style={tw`border  border-white items-center justify-center px-5 py-3 mt-5 rounded-2xl`}>
            <Text style={tw`text-white text-lg`}>{tone ? tone : "Select a Tone"}</Text>
          </TouchableOpacity>
          </MotiView>
            }

          {selectedTool && selectedTool == "Correct Grammar & Spelling" &&
            <MotiView from={{scale:0}} animate={{scale:1}} transition={{type:"spring", stiffness:200, damping:15}}>
            <TouchableOpacity onPress={()=> navigation.navigate("SelectEnglishVersion")} style={tw`border  border-white items-center justify-center px-5 py-3 mt-5 rounded-2xl`}>
            <Text style={tw`text-white text-lg`}>{englishVersion ? englishVersion : "Select a Version of English"}</Text>
          </TouchableOpacity>
          </MotiView>
            }

        {selectedTool && selectedTool == "Write At A Certain Grade Level" &&
            <MotiView from={{scale:0}} animate={{scale:1}} transition={{type:"spring", stiffness:200, damping:15}}>
            <TouchableOpacity onPress={()=> navigation.navigate("SelectGrade")} style={tw`border  border-white items-center justify-center px-5 py-3 mt-5 rounded-2xl`}>
            <Text style={tw`text-white text-lg`}>{grade ? grade : "Select A Complexity Level"}</Text>
          </TouchableOpacity>
          </MotiView>
            }
         
            </View>

            </View>
          </MotiView>}
      
     
      </MotiView>
        
      </MotiView>
     
       </AnimatePresence>
      </View>
      
      </ScrollView>
      
      :
      <View style={{width:width}}>
        <MotiView style={{height:height, width:width}} from={{ opacity:0, scale:0.7}} animate={{opacity:1, scale:1}} transition={{default:{type:"timing", duration:1000, easing: Easing.easing}}}>
        <ScrollView contentContainerStyle={[{width:width},tw`pb-40 `]}>
        <View style={tw`mt-13`}>
        {responseHidden === false && aiResponse && <Text style={tw`text-white text-3xl text-center`}>Response:</Text>}
        
        {aiResponse === false ? 
            <MotiView from={{scale:0.7}} animate={{scale:1}} transition={{duration:400, easing:Easing.easing, type:'timing'}} style={tw` rounded-2xl mx-10 p-3 bg-slate-700 bg-opacity-40 mt-50 `}>
              
              <Text style={tw`text-white text-center text-xl mx-10 mb-3`}>Loading: Please Don't Leave The App</Text>
            <ActivityIndicator size={"large"} color={"white"}/>
            <Text style={tw`text-white text-center font-light text-sm mt-3 mx-5`}>Please be patient. Ignition can take up to 20-30 seconds to respond. Don't leave the app while this is running. </Text>
            </MotiView>
        :
        <AnimatePresence >
          <MotiView state={ResponseBox} style={tw`items-center`}>
        <TextInput style={[tw`text-white  border border-white p-3 rounded-2xl mt-10 pb-10`, {width:width/1.05, aspectRatio:responseHidden ? 4/4.4 : 4/3.6, fontSize:17}]} 
          value={aiResponse}
          onChangeText={setAiResponse}
          multiline
          onFocus={responseBoxFocus}
          onBlur={()=> isNotFocused()}
        />
        </MotiView>
        </AnimatePresence>
        
        }

      {responseHidden &&
      <KeyboardAvoidingView style={tw`flex-1 flex-row mt--15 justify-end`}>
      <View style={[tw`flex-row justify-end `, {aspectRatio:4/3}]}>
      
        <MotiText key='asdfasflkjrh' exit={{opacity:0}} from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:1000, easing:Easing.easing}} style={tw`mx-10 text-right  text-lg text-white`}>{text ? text.length : 0}/10000</MotiText>
          
      <MotiView key="asdfadgh" exit={{opacity:0, translateX:-20}} from={{opacity:0, translateX:50}} animate={{opacity:1, translateX:-20}}><TouchableOpacity onPress={()=>isNotFocused()} style={[tw`items-end  `]} ><AntDesign name="checkcircle" size={50} color="white" /></TouchableOpacity></MotiView> 
      </View>
      </KeyboardAvoidingView>
        }
        </View>
        {aiResponse !== false && !responseHidden &&
        <MotiView state={ResponseBox} style={tw`mt-2`}>
        <TouchableOpacity style={tw`  border border-white items-center mx-20 rounded-2xl p-3 justify-end mt-3`} onPress={()=> workAgain()}>
            <Text style={tw`text-white text-center text-lg`}>Improve This Response</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`  border border-white items-center mx-20 rounded-2xl p-3 justify-end mt-3`} onPress={()=> runAgain()}>
            <Text style={tw`text-white text-center text-lg`}>Go Back</Text>
        </TouchableOpacity>
        </MotiView>
        }
        </ScrollView>
        
        </MotiView>
    </View>
      }
      
    </View>
    </View>
  )
}