/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 04:14
@description Definición de la Aplicación para ser Implementado en el Proyecto
*/
import {useEffect,useState} from 'react';
import {collection,doc,onSnapshot} from 'firebase/firestore';
import Firebase from '../util/firebase';
import Animation from 'aos';
import '../assets/96517d18-f81c-43d2-ac47-3e96d1230c7f.scss';
import '../assets/3d0ba9b3-dc6e-4a73-85ee-8f1b6b74abe4.css';
import 'aos/dist/aos.css';

const App = ({Component,pageProps}) => {
    const [{state,value,global},setStatus] = useState({state:false,value:null,global:null});
    const HandlerFirebase = async () => {
        const {status,value} = await Firebase();
        if(status){
            const sRefDoc = doc(collection(value["FirebaseDatabase"],"global"),"ZKQuAiYhLwjg5g7zySE9");
            const sRefObj = {state:status,value,global};
            onSnapshot(sRefDoc,ySqem=>setStatus({...sRefObj,global:ySqem.data()}));
        }else setStatus({state:status,value,global});
    };
    useEffect(_ => {
        HandlerFirebase();
        Animation.init();
    },[]);
    return state ? (
        <Component {...pageProps} firebase={value} global={global}/>
    ) : (
        <p>Error</p>
    )
};

export default App;