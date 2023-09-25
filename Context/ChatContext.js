import React, {createContext, useContext, useEffect, useState, useRef} from 'react'
import { 
    createUserWithEmailAndPassword, 
    signout,
    onAuthStateChanged, 
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence,
    getUserByEmail,
    signInWithEmailAndPassword,
    signOut, 
    getAuth,
    GoogleAuthProvider,
    getRedirectResult,

 } from 'firebase/auth'
 import { getDatabase, ref, onValue, set, get, push } from 'firebase/database'
 import * as AppleAuthentication from 'expo-apple-authentication';
 import { MotiView, useDynamicAnimation,} from 'moti';
 import * as Clipboard from 'expo-clipboard';
 import { View, Text, useWindowDimensions, Easing, TouchableOpacity, ScrollView, TextInput, FlatList, StatusBar, ActivityIndicator, Platform, KeyboardAvoidingView, Keyboard, AppState, Pressable, SafeAreaView} from 'react-native'
 import * as StoreReview from 'expo-store-review';
import { AppContext } from '../App'
import tw from 'twrnc'
import useRevHook from '../Components/useRevHook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';

const ChatContext = createContext()

export function useChat(){
    return useContext(ChatContext)
    
}   

export function ChatProvider({children, navigation}) {
    const [isFleur, setIsFleur] = useState(false)
    const [chatMenuShow, setChatMenuShow] = useState(true)
    const [fleurHelperRun, setFleurHelperRun] = useState(false)
    const textInputRef = useRef(null)
    const abortControllerRef = useRef(null)
    const [selectedTool, setSelectedTool] = useState()
    
    const {width, height} = useWindowDimensions()
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [clicked, setClicked] = useState(false)
    const scrollRef = useRef()
    const auth = getAuth()
    const {isProMember} = useRevHook()
    const [tone, setTone] = useState()
    
    const [grade, setGrade] = useState()
    const [language, setLanguage] = useState()
     
    const transcriptRef = useRef([
      {role: "system", content:"You are a world class writing assistant. Your job is to provide users with very high quality assistance with their writing needs whether that be writing emails, essays, thank you notes or anything else.",},
      {role: "assistant", content:"Hi I'm Quill, your AI Writing Assistant. Please ask me a question, for writing ideas or for advice on how to write something."},
     ])
    const [error, setError] = useState(false)
    const [fleurResponse, setFleurResponse] = useState("")
    const [conversationString, setConversationString] = useState("")
    const [helper, setHelper] = useState(false)
    const [usageCount, setUsageCount] = useState()
    const appState = useRef(AppState.currentState)
   const [appStateVisible, setAppStateVisible] = useState(appState.current)
   const [userLeft, setUserLeft] = useState(false)
   const [keyboardHeight, setKeyboardHeight] = useState(0);
   const [startSelection, setStartSelection] = useState(null)
   const [messageList, setMessageList] = useState([
    <Message type={'fleur'} key={Math.random()* 1000} content="Hi I'm Quill, your AI Writing Assistant. Please ask me a question, for writing ideas or for advice on how to write something." />
])

  
    /*
    const AndroidKey = useDynamicAnimation(()=> {
        return{
          translateY:0,
          opacity:1,
          scale:1
       
        }
      })
      */

      const approaches = [
        // Tweets (Twitter)
        {
            title:"Twitter Status Update:",
            description:"Short messages or thoughts shared with followers on Twitter.",
            message:"Can you help me draft a tweet expressing my excitement for the upcoming music festival?"
        },
        {
            title:"Twitter Poll:",
            description:"Interactive polls to gauge the opinion of followers on Twitter.",
            message:"I'm considering two topics for my next podcast episode. Can you help me create a poll to see which one my followers would prefer?"
        },
        {
            title:"Twitter Retweet with Comment:",
            description:"Sharing someone else's tweet while adding your own perspective or comment.",
            message:"I'd like to share a groundbreaking article on climate change. How should I comment on it to emphasize its importance?"
        },
        {
            title:"Twitter Link Share:",
            description:"Sharing links to articles, videos, or other content on Twitter.",
            message:"I just wrote a blog post on the benefits of meditation. How can I introduce it in an enticing way to my Twitter audience?"
        },
        {
            title:"Twitter Photo or Video Share:",
            description:"Uploading visual content to engage followers on Twitter.",
            message:"I took a photo of a stunning sunset yesterday. Can you help me come up with a captivating caption?"
        },
    
        // Facebook Posts
        {
            title:"Facebook Status Update:",
            description:"Personal or general thoughts shared with friends and followers on Facebook.",
            message:"It's my 10th wedding anniversary today. Can you help me draft a heartfelt status about the journey so far?"
        },
        {
            title:"Facebook Photo/Album Share:",
            description:"Sharing memories through photos or a collection of photos on Facebook.",
            message:"I've just returned from a trip to Europe. How should I caption my album to encapsulate the experience?"
        },
        {
            title:"Facebook Event Creation:",
            description:"Creating an event on Facebook to invite friends and notify them about upcoming occasions.",
            message:"I'm organizing a local community cleanup drive. How can I draft an inviting event description?"
        },
        {
            title:"Facebook Live Video:",
            description:"Going live on Facebook to interact with friends and followers in real time.",
            message:"I plan to go live from a tech expo tomorrow. How should I announce this to maximize viewer turnout?"
        },
        {
            title:"Facebook Link Share:",
            description:"Posting articles, blogs, or other external content on Facebook.",
            message:"I found an insightful article on sustainable living. Can you suggest a brief introduction for sharing it on Facebook?"
        },
    
        // Reddit Posts
        {
            title:"Reddit Discussion Post:",
            description:"Initiating a conversation or discussion on a specific topic in a subreddit.",
            message:"I'd like to discuss the rise of independent filmmaking in the /r/movies subreddit. How can I start my post?"
        },
        {
            title:"Reddit Question:",
            description:"Seeking answers or advice from the Reddit community on a particular topic.",
            message:"I'm new to gardening and have some questions. How can I frame my post in the /r/gardening subreddit to get the best advice?"
        },
        {
            title:"Reddit Link Share:",
            description:"Sharing a link to an article, video, or other content on a subreddit.",
            message:"I'd like to share a tutorial on digital painting in the /r/art subreddit. How can I introduce it to the community?"
        },
        {
            title:"Reddit Photo Share:",
            description:"Uploading an image to share with a specific subreddit community.",
            message:"I captured a rare bird in my backyard and want to share it with /r/birdwatching. What's a good caption?"
        }
    ];

      const exercises =[
      
        {
            title:"Instant Messaging:",
            description:"Quick and real-time messaging through platforms like WhatsApp, Telegram, and Facebook Messenger.",
            message:"How can I effectively communicate my feelings to a friend in a slack message without sounding confrontational?"
        },
        {
            title:"Personal Diaries and Journals:",
            description:"Traditional or digital platforms where one records daily thoughts, experiences, and reflections.",
            message:"What's a good journal prompt to help me reflect on my recent life changes?"
        },
        {
            title:"Voice Communications:",
            description:"Using voice for communication, whether it's recorded messages or real-time conversation.",
            message:"Can you guide me on leaving a concise and clear voicemail for my doctor's office?"
        },
        {
            title:"Postcards:",
            description:"Physical cards sent, often from travelers, to share a snapshot and short message.",
            message:"Can you suggest a heartfelt message for a postcard I'm sending from Paris to my family?"
        },
        {
            title:"Greeting Cards:",
            description:"Cards sent on special occasions to convey wishes and sentiments.",
            message:"I need help writing a birthday card for my sister. Can you provide a touching message?"
        },
        {
            title:"Memoirs:",
            description:"Personal accounts of one's life and experiences.",
            message:"How can I start writing the first chapter of my memoir about growing up in the 80s?"
        },
        {
            title:"Scrapbooks:",
            description:"Collections of photos, memories, and writings capturing personal events and memories.",
            message:"Do you have any creative ideas for a scrapbook theme centered around my college years?"
        },
        {
            title:"Personal Newsletters:",
            description:"Updates sent to friends and family about personal events, stories, or news.",
            message:"Can you help me structure a monthly newsletter I plan to send to my extended family?"
        },
        {
            title:"Discussion Forums:",
            description:"Online platforms where people share personal experiences and engage in discussions.",
            message:"I want to share a personal story about my journey with anxiety on a forum. How should I structure my post?"
        }
    ];
      const initialSuggestions = [
    {
        title:"Text Status Updates:",
        description:"Simple written posts sharing thoughts, news, or updates.",
        message:"I want to share some exciting news about my recent endeavors. Can you help me craft an engaging status?"
    },
    {
        title:"Photo/Video Posts:",
        description:"Visual content shared with or without captions, telling a story or sharing a moment.",
        message:"I have a beautiful picture from my hike last weekend. What's a captivating caption to go with it?"
    },
    {
        title:"Link Shares:",
        description:"Sharing URLs to articles, blogs, videos, or other content.",
        message:"I found an interesting article about sustainable living. How can I introduce it to my followers?"
    },
    {
        title:"Polls:",
        description:"Interactive posts to gauge opinions or get answers.",
        message:"I'm deciding between two book covers for my upcoming novel. How can I set up an engaging poll?"
    },
    {
        title:"Live Streams:",
        description:"Real-time broadcasts to engage with followers live.",
        message:"I'm planning a live Q&A session about my travels. Any tips to introduce and engage my audience?"
    },
    {
        title:"Check-ins:",
        description:"Indicating current location or sharing about a visited place.",
        message:"I'm at this amazing beachside café. What's a fun way to check-in and describe the ambiance?"
    },
    {
        title:"Events:",
        description:"Creating or sharing details of an upcoming event.",
        message:"I'm hosting a webinar next month. How should I promote it to maximize attendance?"
    },
    {
        title:"Reviews and Recommendations:",
        description:"Sharing feedback or promoting a product/service.",
        message:"I had an excellent experience with this new vegan restaurant. Can you help me write a glowing review?"
    },
    {
        title:"Carousel Posts:",
        description:"A sequence of images or videos shared in one post.",
        message:"I have a series of pictures from my pottery class. How can I narrate a story as I post them in a carousel?"
    },
    {
        title:"Ads and Sponsored Posts:",
        description:"Paid content for promoting a brand or product.",
        message:"I'm launching a new line of organic skincare. How can I craft an attention-grabbing sponsored post?"
    },
    {
        title:"Infographics:",
        description:"Visual representation of data or information.",
        message:"I made an infographic about recycling stats. How can I introduce it to emphasize its importance?"
    },
    {
        title:"GIFs and Memes:",
        description:"Entertaining content for humor or relatability.",
        message:"I found a hilarious GIF related to Monday blues. Any witty captions in mind?"
    },
    {
        title:"Stories Highlights:",
        description:"Curated stories for profile viewers.",
        message:"I want to create a highlight of my baking adventures. Any suggestions on a catchy title?"
    },
    {
        title:"User-Generated Content (UGC):",
        description:"Sharing content from fans or followers.",
        message:"A follower sent a picture using my makeup product. How can I share it while giving them proper credit?"
    },
    {
        title:"Collaborations and Takeovers:",
        description:"Partnering with another user or brand for content.",
        message:"A popular influencer wants to take over my Instagram for a day. How should we announce it?"
    },
    {
        title:"Quizzes and Trivia:",
        description:"Engaging followers with knowledge tests.",
        message:"I'm thinking of doing a quiz about 90s music on my page. Can you help me frame some fun questions?"
    },
    {
        title:"Countdowns:",
        description:"Building anticipation for a launch or event.",
        message:"My debut album releases in a week. How can I use countdowns to generate excitement?"
    },
    {
        title:"Q&A Sessions:",
        description:"Answering questions from followers.",
        message:"I'm doing a Q&A about my fitness routine. How should I invite questions?"
    },
    {
        title:"Announcements:",
        description:"Sharing big news or updates.",
        message:"I'm moving to a new city for a job. How can I announce this big change?"
    },
    {
        title:"Challenges and Hashtags:",
        description:"Engaging content around a theme or activity.",
        message:"I want to start a 30-day yoga challenge on my profile. Can you help me devise a catchy hashtag and intro?"
    }
];


      async function copyToClipboard(content){
        await Clipboard.setStringAsync(content)
      }

      async function storeChatData(value){
        
        try {
          console.log("updating value to", value)
          
          
          await AsyncStorage.setItem('chatUsage', String(value));
          console.log('Data saved successfully.');
          
        } catch (error) {
          console.error('Error storing data:', error);
        }
      }

      async function getChatData(){
        
        try{
          
          const value = await AsyncStorage.getItem('chatUsage')
          if(value != null ){
            console.log("Value Found", value)
            
            
            setUsageCount(Number(value))
          } else{
            console.log("No value found")
            storeChatData(20)
          
          }
        } catch(error){
          console.error("Error retrieving data", error)
        }
      }

      function runFocus(kbHeight){
        console.log("running Animation"+kbHeight)
        
        //AndroidKey.animateTo({translateY:[{value:-kbHeight, easing:Easing.easing, type:'timing', duration:100}]})
        //AndroidKey.animateTo({scale:[{value:4, easing:Easing.easing, type:'timing', duration:400}]})
        try {
        scrollRef.current.scrollToEnd({ animated: true });
        } catch {
          console.log("Passed")
        }
        setIsFocused(true)
      }
    
      function runBlur(){
        //AndroidKey.animateTo({translateY:[{value:0, easing:Easing.easing, type:'timing', duration:100}]})
        setIsFocused(false)
      }
      
    function getUsageCount(){
      console.log("Getting Database")
      const db = getDatabase()
      
      const userRef = ref(db, `users/${auth.currentUser.uid}/userdata/usage/quillUsage`)
      
      onValue(userRef, (snapshot) => {
          var temp = snapshot.val()
          console.log(temp)
          setUsageCount(temp)   

      });
  }

      async function review(){
        if (usageCount % 10 === 0) {  
          if (await StoreReview.hasAction()) {
            // you can call StoreReview.requestReview()
            StoreReview.requestReview()
          }
        }
      }
       

      function saveUsageCount(){
       console.log("usageCount:"+usageCount)
    const db = getDatabase()  
  if(auth.currentUser.uid){ 
  set(ref(db, `users/${auth.currentUser.uid}/userdata/usage/quillUsage`), 
      usageCount+1
  )
} else {
  console.log("no user id")
}
  }

      useEffect(()=> {
        if(clicked && Platform.OS != 'ios'){
          setTimeout(() => {
            textInputRef.current && textInputRef.current.focus();
            console.log('focus');
          }, 10);
        }
      }, [clicked])

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
        //console.log(AppState.currentState)
        if(AppState.currentState != 'active' && loading == true){
          cancelRun()
        }
      },[AppState.currentState])

      function clear(){
        setHelper(false)
        setError()
        setUserLeft(false)
        console.log("Cleared!")
        setMessageList([
            <Message type={'fleur'} content="Hi I'm Quill, your AI Writing Assistant. Please ask me a question, for writing ideas or for advice on how to write something." />
        ])
       
        setConversationString("")
        transcriptRef.current = [
          {role: "system", content:"You are a world class writing assistant. Your job is to provide users with very high quality assistance with their writing needs whether that be writing emails, essays, thank you notes or anything else.",},
          {role: "assistant", content:"Hi I'm Quill, your AI Writing Assistant. Please ask me a question, for writing ideas or for advice on how to write something."},
         ]
       }
       
       async function classifier(latestResponse){
        abortControllerRef.current = new AbortController()
    
          //transcriptRef.current.push({role:"user", content:latestInput})
          //console.log(transcriptRef.current)
          
            setFleurResponse(false)
            var myHeaders = new Headers();
      
            myHeaders.append("Authorization", "Your GPT-4 Token");
            myHeaders.append("Content-Type", "application/json");
    
            var raw = JSON.stringify({
            "model": "gpt-4",
            
            "messages": [
              {role:'system', content:"Your job is to classify the users input as either giving advice or asking questions, conversing etc."},
              {role:'user', content:"It sounds like you're interested in getting into great physical shape. Can you tell me a bit more about why this is important to you? Are there any specific goals or events that are motivating you to get shredded?"},
              {role:"assistant", content:'Asking Questions'},
              {role:'user', content:"It sounds like you're interested in building muscle and getting into shape. That's great! Before we get started, can you tell me a bit more about why you want to get ripped? Is it for health reasons or aesthetic reasons? Are there any underlying issues that may be contributing to this desire, such as low self-esteem or body dysmorphia? Understanding your motivations and goals will help us create a plan that is tailored specifically to your needs."},
              {role:"assistant", content:'Asking Questions'},
  
              {role:"user", content:latestResponse}
    
            ],
    
            "presence_penalty": 1,
            "frequency_penalty": 1,
            "temperature": 0.2,
            "max_tokens": 300
            });
    
            
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            signal: abortControllerRef.current.signal,
            };
    
            const response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions)
            const respJson = await response.json()
            setTimeout(()=> !respJson ? cancelFleurRequest('timeout'): null, 7000)
            
            //console.log(respJson)
            if(respJson && respJson.choices[0].message.content.includes('advice') || respJson.choices[0].message.content.includes("Advice")){
              fleurHelper(latestResponse)
            }
            return respJson
    
      
    }

    


   async function fleurHelper(latestResponse){
    setFleurHelperRun(true)
    abortControllerRef.current = new AbortController()

      //transcriptRef.current.push({role:"user", content:latestInput})
      //console.log(transcriptRef.current)
      
        setFleurResponse(false)
        var myHeaders = new Headers();
  
        myHeaders.append("Authorization", "Your GPT-4 Token");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "model": "gpt-4",
        
        "messages": [
          {role:'system', content:"The user is a professional writing assistant and you are a client. Generate a 2-5 questions about the writing assistant's advice to get more insight into their advice."},
          {role:'user', content:"Certainly! Here's a suggestion for your tweet: 'Counting down the days until #MusicFestival2023 Can't wait to immerse myself in the rythem of live music, meet fellow music lovers and create unforgettable memories. Let the good vibes roll! #Excited #LiveMusicLover'"},
          {role:"assistant", content:'1. How can I tune this for country music specifically., 2.How should I use hashtags to be most effective?., 3. What factors of a tweet help it go viral?., 4. How can I figure out what my audience really wants to hear about regarding music?, 5. How would you write this more casually?'},
          {role:"user", content:latestResponse}

        ],

        "presence_penalty": 1,
        "frequency_penalty": 1,
        "temperature": 0.2,
        "max_tokens": 300
        });

        
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        signal: abortControllerRef.current.signal,
        };

        const response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions)
        const respJson = await response.json()
        setTimeout(()=> !respJson ? cancelFleurRequest('timeout'): null, 7000)
        
        //console.log(respJson)
        const str = respJson.choices[0].message.content

        

        const sentences = str.split(/\d+\./).filter(Boolean);


        
        const questions = sentences.map((sentence) => {
          return { q: sentence.trim() };
        });

          //console.log(questions);
          setFleurHelperRun(false)
          setHelper(!questions.includes("As an") ? questions : null)

   }

   async function fleurResponseFunc(latestInput){
    console.log("Request to Fleur sent.")
    abortControllerRef.current = new AbortController()

    transcriptRef.current.push({role:"user", content:latestInput})
    //console.log(transcriptRef.current)
    
      setFleurResponse(false)
      var myHeaders = new Headers();

      myHeaders.append("Authorization", "Your GPT-4 Token");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
      "model": "gpt-4",
      
      "messages": transcriptRef.current,

      "presence_penalty": 1,
      "frequency_penalty": 1,
      "temperature": 0.2,
      "max_tokens": 500
      });

      
      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      signal: abortControllerRef.current.signal,
      };

      const response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions)
      const respJson = await response.json()
      setTimeout(()=> !respJson ? cancelFleurRequest('timeout'): null, 7000)
      
      return respJson
      /*
      fetch("https://api.openai.com/v1/chat/completions", requestOptions)
          .then(response => response.json())
          .then(result => appStateVisible == 'active' && fleurError != true ? processFleurResponse(result, latest) : null)
          .catch(error => setFleurError(true) && console.log(error))  
        */
    
  }

  useEffect(()=> {
    getChatData() 
  }, [])

  async function processFleurResponse(response){

    console.log("Processing Fleur Response")
    setError(false)
    if(response){
    //console.log(response)
      //await analytics().logEvent('fleurResponse', {id:response})
      const tokenUsage = response.usage.total_tokens
      //console.log(tokenUsage)
     
      if(tokenUsage > 3400){
        transcriptRef.current = transcriptRef.current.slice(1,3)
        
      }
      var resString = response.choices[0].message.content
      //console.log(resString)
      classifier(resString)
      var resStringNoSpace = resString.replace(/\r?\n|\r/, "")
      setLoading(false)
      var messageObj = {role:'assistant', content: resStringNoSpace}
      var messageComponent = <Message type='fleur' content={resStringNoSpace} />
      setMessageList((prev)=>[...prev, messageComponent])
      transcriptRef.current.push(messageObj)
      console.log("usageCount", usageCount)
      console.log("minus 1", usageCount-1)
      storeChatData(usageCount-1)
      getChatData()
    } else {
      console.log("Hi")
    }
      return 
  }


  async function addMessage(type, input, nav){
      console.log("addmessage called")
      await analytics().logEvent("quillUsed", {id:"yup"})
      getChatData()
      //getUsageCount()
      if(!isProMember && usageCount <= 0){
        console.log("Should be navigate")
        nav.navigate('Paywall')
      } else {
      if(usageCount){
        
        review()
      }
      setHelper(false)
      let tempText = text
      //await analytics().logEvent("fleurMessageSent", {
        //id:tempText
      //})
      setText("")
      setUserLeft(false)
      //This switches onIf the typing animation
      setLoading(true)
      
      //This builds the message object for the model
      var messageObj = {role:'user', content:input}
      //create the message component
      var newMessage = <Message type="user" content={tempText} />
      

      //add the message component to the list of messages to be displayed to the users. 
      setMessageList((prev)=> [...prev, newMessage]) 
      

      //This calls the api
      try{
       let fleurResp = await fleurResponseFunc(tempText)
        
       let processed = await processFleurResponse(fleurResp)
      } catch (error){
        //console.log(error.message)
      }
      
      //This contains the conversation history. Important to note that ref is required to avoid rerender. 
      //transcriptRef.current.push(messageObj)
      //Clear the text box once a message is sent to Fleur. 
    }
    }

    const scrollToBottom = () => {
        scrollRef.current.scrollToEnd({ animated: true });
        setIsFocused(true)
        
      };

    function scrollToTop(){
        scrollRef.current.scrollTo({x:0, y:0, animated:true})
        
    }

      function reTry(){
        setError("Sorry, there was an error, retrying...")
        fleurResponseFunc()

      }

      //This function cancels the run if a user leaves the app
      function cancelRun(){
        cancelFleurRequest()
        const lastMessage = transcriptRef.current[transcriptRef.current.length -1]
        setMessageList(messageList.slice(0, -1))
        setText(lastMessage.content)
        transcriptRef.current.pop()
        setUserLeft(true)
        setLoading(false)
        setHelper(false)

      }

      //This function cancells the fetch request. 
      function cancelFleurRequest(reasonCode){
        setLoading(false)
        reasonCode == "timeout" && setError("Either the network timed out or there was a server error. Retry sending")
        abortControllerRef.current && abortControllerRef.current.abort()
        console.log("Request to Fleur cancelled.")
      }     

      useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          (e) => {
            setKeyboardHeight(e.endCoordinates.height)
            runFocus(e.endCoordinates.height)
            //console.log(e.endCoordinates.height)
            console.log("keyboard open")
          }
        );
    
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
           (e) => {
            setKeyboardHeight(0)
            console.log("keyboard closed")
            runBlur()
          }
        );
    
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);



      function Message({type, content}){
        const [copied, setCopied] = useState(false)
        if(type=="fleur"){
            return(
              <View style={tw`flex-row`}>
                <MotiView from={{translateY:500, opacity:0, scale:0.6}} animate={{translateY:0, opacity:1, scale:1}} transition={{type:'timing', duration:300}} id="text-Fleur" style={[tw`${Platform.OS == 'android' ? `bg-slate-600` : `bg-slate-600` } ml-2 justify-center mt-3 items-start rounded-2xl  p-2`, {maxWidth:width/1.5}]}>
                  
                  
                  
                  
                <Text style={[tw`p-1 text-white `, {fontSize:17}]}>{content}
                </Text>
                
                </MotiView>
                <TouchableOpacity onPress={()=> 
                  {
                    copyToClipboard(content)
                    setCopied(true)
                  }} style={tw`ml-5 justify-center`}>
                {!content.includes("Hi I'm Quill") &&  !copied && 
                        <Text style={tw`text-white text-lg`}>Copy</Text>
                    }
                    {copied && 
                        <Text style={tw`text-green-400 text-lg`}>Copied</Text>
                    }
                
                
                </TouchableOpacity>
                </View>

                )

        } else {
            return(
                <MotiView from={{translateY:500}} animate={{translateY:0}} transition={{type:'timing', duration:200}} id="row" style={[{width:width}, tw`items-end`]}>
                <View id="text-Fleur" style={[tw`  mr-2 mt-1 justify-end items-start mt-3 rounded-2xl bg-opacity-80 p-2 bg-blue-700`, {maxWidth:width/1.5}]}>
                    <Text style={[tw`p-1 text-white `, {fontSize:17}]}>{content}
                </Text>
                </View>
                </MotiView>

            )
        }
        
      }

    const value = {
        isFleur, 
        setIsFleur, 
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
        //AndroidKey,
        initialSuggestions,
        runFocus,
        runBlur,
        storeChatData, 
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
        exercises,
        approaches,
        scrollToTop,
        selectedTool, 
        setSelectedTool,
        tone, 
        setTone,
        grade, 
        setGrade,
        storeChatData, 
        getChatData,
        language,
        setLanguage,
        copyToClipboard



    }

  return (
    <ChatContext.Provider value={value}>
        {children}
    </ChatContext.Provider>
  )
}
