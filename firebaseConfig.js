// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'
import {getFirestore, Timestamp, FieldValue} from 'firebase/firestore'

import { getDatabase} from 'firebase/database'




const firebaseConfig = {
    apiKey: "AIzaSyBaW2FyoxrGHsDhNQuFrg1M0j9x1xXu0Bw",
    authDomain: "ignition-dev-5bf02.firebaseapp.com",
    projectId: "ignition-dev-5bf02",
    storageBucket: "ignition-dev-5bf02.appspot.com",
    messagingSenderId: "260558466476",
    databaseURL: "https://ignition-dev-5bf02-default-rtdb.firebaseio.com",
    appId: "1:260558466476:web:5eee23a7d093ac301ade09",

  };
  


export const app = initializeApp(firebaseConfig)




export default app