/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 04:37
@description Utilidad con la Implementación de Firebase en el Proyecto
*/
import {initializeApp} from 'firebase/app';
import {initializeAppCheck,ReCaptchaV3Provider} from 'firebase/app-check';
import {getFirestore,initializeFirestore,CACHE_SIZE_UNLIMITED,enableMultiTabIndexedDbPersistence} from 'firebase/firestore';
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
import {getStorage} from 'firebase/storage';

export const Config = initializeApp({
    apiKey: "AIzaSyClWIoP_YWCUoJJsHFqcm6WG13sLEZO7b4",
    authDomain: "scglobproj0.firebaseapp.com",
    databaseURL: "https://scglobproj0-default-rtdb.firebaseio.com",
    projectId: "scglobproj0",
    storageBucket: "scglobproj0.appspot.com",
    messagingSenderId: "102400467389",
    appId: "1:102400467389:web:a123b5cdba09af06be32d4",
    measurementId: "G-EF1EXS0CEN"
});

const Firebase = async() => {
    let response = {status:true,value:{}};
    const App = Config;
    try{
        initializeAppCheck(App,{
            provider: new ReCaptchaV3Provider("6LdSj0sjAAAAAM8qnmKvnUU-QplRoCrSrOYEBfJX"),
            isTokenAutoRefreshEnabled: true
        });
        await enableMultiTabIndexedDbPersistence(
            initializeFirestore(App,{cacheSizeBytes:CACHE_SIZE_UNLIMITED})
        )
        response["value"] = {
            FirebaseAnalytic: getAnalytics(App),
            FirebaseAuth: getAuth(App),
            FirebaseDatabase: getFirestore(App),
            FirebaseSocket: getDatabase(App),
            FirebaseStorage: getStorage(App)
        }
    }catch(error){
        response["status"] = false;
        response["value"] = error;
    }return response
};

export default Firebase;