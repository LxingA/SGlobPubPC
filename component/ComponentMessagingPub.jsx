/*
@author LxingA [SUDesign]
@project PrintCards
@date 10/Dic/22 22:01
@description Componente con el Mensaje Global para el Proyecto
*/
import {useState,useEffect,useContext} from 'react';
import {getDoc,collection,doc,onSnapshot} from 'firebase/firestore';
import Firebase from '../util/firebase';
import ContextGlobal from '../util/context/global';
import Loader from 'react-content-loader';

const MessagingPub = () => {
    const [data,setData] = useState(null);
    const {siteColor} = useContext(ContextGlobal);
    const queryHandler = async doc => {
        const {message} = (await getDoc(doc)).data();
        setData({message});
    };
    useEffect(_=>{
        const {Database} = Firebase();
        const refDoc = doc(collection(Database,"global"),"sOg9EK2kwmYzAYjWQWx1");
        const refSocket = onSnapshot(refDoc,dD=>setData(dD.data()));
        queryHandler(refDoc);
        return _ => refSocket();
    },[]);
    return (
        <div className="pop-up-anuncios" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            {data ? (
                <p>{data["message"]}</p>
            ) : (
                <Loader width={300} height={20} backgroundColor={`#${siteColor}`} foregroundColor="#cbb9b9">
                    <rect x={0} y={0} rx={0} ry={0} width={300} height={20}/>
                </Loader>
            )}
        </div>
    )
};

export default MessagingPub;