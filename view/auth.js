/*
@author LxingA [SUDesign]
@project PrintCards
@date 15/Dic/22 09:39
@description Vista Global para verificar la Autenticación del Proyecto
*/
import {useRouter} from 'next/router';

const ViewAuth = ({children,login,authentic,notRefresh,redirect}) => {
    const {push,asPath} = useRouter();
    if(notRefresh) return children;
    switch(authentic){
        case true:
            if(login) push(typeof redirect !== "undefined" && redirect ? decodeURI(redirect) : "/cuenta");
            else return children;
        break;
        case false:
            if(login) return children;
            else push({pathname:"/auth",query:{m:"login",to:encodeURI(asPath)}});
        break;
    }
};

export default ViewAuth;