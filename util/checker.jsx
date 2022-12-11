/*
@author LxingA [SUDesign]
@project PrintCards
@date 11/Dic/22 05:48
@description Utilidad Esencial para verificar la Instancía de Firebase para el Acceso a los Servicios de Firebase en el Proyecto
*/
import {initializeAppCheck,ReCaptchaV3Provider} from 'firebase/app-check';

const Firebase = App => initializeAppCheck(App,{
    provider: new ReCaptchaV3Provider("6LdSj0sjAAAAAM8qnmKvnUU-QplRoCrSrOYEBfJX"),
    isTokenAutoRefreshEnabled: true
});

export default Firebase;