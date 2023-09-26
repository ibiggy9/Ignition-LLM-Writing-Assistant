// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'
import {getFirestore, Timestamp, FieldValue} from 'firebase/firestore'

import { getDatabase} from 'firebase/database'




const firebaseConfig = {
        <Your Config>

  };
  


export const app = initializeApp(firebaseConfig)




export default app
