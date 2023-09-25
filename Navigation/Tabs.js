import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Image, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'; 
import Settings from '../Screens/Settings';
import EntryScreen from '../Screens/EntryScreen'
import { Entypo } from '@expo/vector-icons';
import { useChat } from '../Context/ChatContext';
import { getAuth } from 'firebase/auth';
import Chat from '../Screens/Chat';

const Tab = createBottomTabNavigator()

export default function Tabs() {
    const { chatMenuShow } = useChat()
    const auth = getAuth()
/*
This is the screen for the chatbot. 
<Tab.Screen 
            name="Fleur"f
            component={Fleur}
            options={{   
                tabBarIcon: ({focused, size}) => (
                        <View>
                            
                            <FontAwesome5 name="brain" size={28} color={focused ? "orange" : "white"} />
                        </View>
                    ),
                    tabBarActiveTintColor: "orange",
                    tabBarInactiveTintColor: "white",  
                    tabBarLabelStyle:{fontSize:14},      
            }}
            />
  */      



  return (
    <Tab.Navigator
    screenOptions={{
        
        headerTitle: "",
        headerTitleAlign: 'left',     
        headerTransparent:true,
        headerShadowVisible: false,
        
    tabBarStyle:{
        height:65,
        marginVertical:chatMenuShow ? 35 : -200,
        
        //backgroundColor:"transparent",
        backgroundColor:'#484950',
        opacity:0.95,
        shadowOpacity:0.5,
        shadowRadius:5,
        shadowOffset:{width:5, height:10},
        
        marginHorizontal:30,
        borderRadius:30,
        borderTopWidth:0,
        borderTopColor:"#030B27",
        position:'absolute',
        
    },
    tabBarItemStyle:{
        height:60,
        
        
    }
    
      
}}
>
  
    
    
      <>
    <Tab.Screen 
        name="Home" 
        component={EntryScreen}
        options={{   
            tabBarIcon: ({focused, size}) => (
              
                <>
                {chatMenuShow ? 
                    <View>
                        <MaterialIcons name="home" size={28} color={focused ? "orange" : "white"} />
                    </View>
                    :
                    <></>
                }
                </>
                ),
                tabBarActiveTintColor: "orange",
                tabBarInactiveTintColor: "white",  
                tabBarLabelStyle:{fontSize:14},      
        }}
        />

    <Tab.Screen 
        name="Assistant"
        component={Chat}
        options={{
            tabBarIcon: ({focused, size}) => (
                <View>
                    <Entypo name="chat" size={28} color={focused ? "orange" : "white"} />
                </View>

            ),
            tabBarActiveTintColor: "orange",
                tabBarInactiveTintColor: "white",  
                tabBarLabelStyle:{fontSize:14},      
        
        }}
        />


    <Tab.Screen 
        name="Settings" 
        component={Settings}
        options={{   
            tabBarIcon: ({focused, size}) => (
                    <View>
                        <MaterialIcons name="settings" size={28} color={focused ? "orange" : "white"} />
                    </View>
                ),
                tabBarActiveTintColor: "orange",
                tabBarInactiveTintColor: "white",  
                tabBarLabelStyle:{fontSize:14},      
        }}
        />
 
 </>
 
</Tab.Navigator>
  )
}
