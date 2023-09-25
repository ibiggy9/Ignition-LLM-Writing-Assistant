import React, {createContext, useContext, useEffect, useState} from 'react'
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
 } from 'firebase/auth'

 import {ref, set, get, child, update} from "firebase/database"
 
import app from '../firebaseConfig'
import { AppContext } from '../App'

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}   

export function AuthProvider({children}) {
    
    const [firstLogin, setFirstLogin] = useState(false)
    const [user, setUser] = useState()
    const [loginError, setLoginError] = useState()
    
    
    const auth = getAuth(app)

    async function login(email, password){
        //await setPersistence(auth, browserSessionPersistence);
        setLoginError()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCreds)=> {
            if(auth.currentUser.email){
                console.log("successful")  
                
            }
        
        }).catch((error)=>{
            console.log(error.message)
            const errorCode = error.code
            if(errorCode == "auth/wrong-password"){
                setLoginError("Incorrect username or password");
            } else if(errorCode == "auth/too-many-requests"){
                setLoginError("This account has been temporarily disabled due to many failed login attempts. Please try again later.")
            } else if (errorCode == "auth/user-not-found"){
                setLoginError("Incorrect username or password")
            } else if(errorCode=="auth/user-disabled"){
                setLoginError("Account Disabled, Please Contact Us")
            }
            else if(errorCode=="auth/invalid-email"){
                setLoginError("Please enter a properly formatted email.")
            }
            else if(errorCode=="auth/internal-error"){
                setLoginError("Please ensure you entered both your email and password")
            }
            
        })}
    
    async function logout(){
        signOut(auth).then(() => {
        console.log("Signout successful")})
        
        
        .catch((error) => {
            console.log(error)
        })}

    

    const value = {
        logout, 
        login,
        firstLogin, 
        user,
        loginError,
        setLoginError
    }
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
