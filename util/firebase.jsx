/*
@author LxingA [SUDesign]
@project PrintCards
@date 11/Dic/22 07:30
@description Utilidad Esencial para Retornar todas las Funciones Esenciales para el uso de Firebase en el Proyecto
*/
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
import {getStorage} from 'firebase/storage';
import {getMessaging} from 'firebase/messaging';
import App from '../inc/firebase';
import Checker from './checker';

const Firebase = () => {
    Checker(App);
    const Database = getFirestore(App);
    const Auth = getAuth(App);
    const Socket = getDatabase(App);
    const Storage = getStorage(App);
    const Messaging = getMessaging(App);
    return {
        Auth,
        Database,
        Storage,
        Socket,
        Messaging
    };
};

export default Firebase;