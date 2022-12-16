/*
@author LxingA [SUDesign]
@project PrintCards
@date 15/Dic/22 09:39
@description Vista Global para verificar la Autenticación del Proyecto
*/
import {useRouter} from 'next/router';

const ViewAuth = ({children,login,authentic,notRefresh}) => {
    const {replace} = useRouter();
    if(notRefresh) return children;
    switch(authentic){
        case true:
            if(login) replace("/cuenta");
            else return children;
        break;
        case false:
            if(login) return children;
            else replace("/auth?m=login");
        break;
    }
};

export default ViewAuth;