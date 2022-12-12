/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 08:21
@description Complemento para Retornar la Imagén con el Logo del Proyecto
*/
import {memo,useEffect,useState} from 'react';
import {ref,getDownloadURL} from 'firebase/storage';
import Loader from 'react-content-loader';
import Enlace from 'next/link';

const Logotipo = memo(({storage,name,path,color}) => {
    const [url,setUrl] = useState(null);
    const HandlerURL = async _ => {
        const gtURLCurrentRequest = await getDownloadURL(ref(storage,`g/${path}`));
        setUrl(gtURLCurrentRequest);
    };
    useEffect(_ => {
        HandlerURL();
    },[]);
    return url ? (
        <Enlace href="/">
            <img src={url} alt={`Logo de ${name}`}/>
        </Enlace>
    ) : (
        <Loader width={250} height={50} foregroundColor="#cbb9b9" backgroundColor={color}>
            <rect x={0} y={0} rx={0} ry={0} width={250} height={50}/>
        </Loader>
    )
});

Logotipo.displayName = "Logotipo";

export default Logotipo;