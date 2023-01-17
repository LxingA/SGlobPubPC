/*
@author LxingA [SUDesign]
@project PrintCards
@date 19/Dic/22 11:40
@description Página para Mostrar el Formulario de ReAutenticación para el Proyecto
*/
import {Fragment,useContext,useState} from 'react';
import {FormAccountReauth} from '../../addons/Form';
import {AuthContext} from '../../util/context';
import {useRouter} from 'next/router';
import {BoxMessage} from '../../addons/Box';
import Head from 'next/head';
import ViewAuth from '../../view/auth';
import ViewAccount from '../../view/account';

const ReAuth = ({global,firebase,authentic,user}) => {
    const [message,setMessage] = useState(null);
    const {replace,query} = useRouter();
    const {ACState:{reauthentic,action}} = useContext(AuthContext.Context);
    const {siteName} = global;
    if(user){
        if(reauthentic || !query.continue || !action) (query.continue) && action === "delete" ? replace({pathname:decodeURI(query.continue),query:{exec:action}}) : replace({pathname:decodeURI(query.continue)})
    }
    return (
        <ViewAuth authentic={authentic}>
            <Fragment>
                <Head>
                    <title>Identificador de Cuentas - {siteName}</title>
                </Head>
                <ViewAccount global={[firebase,global,authentic,user]}>
                    {user && (
                        <div className="login-container reauth-box">
                            {message && (
                                <BoxMessage>
                                    <p>{message}</p>
                                    <a className="btn-beige" style={{cursor:"pointer"}} onClick={_=>setMessage(null)}>
                                        Entendido
                                    </a>
                                </BoxMessage>
                            )}
                            <div className="formulario-conexion" style={{paddingLeft:"46px"}}>
                                <div className="conectarse">
                                    <FormAccountReauth FirebaseAuth={firebase["FirebaseAuth"]} Mail={user.mail} Callback={setMessage}/>
                                </div>
                            </div>
                        </div>
                    )}
                </ViewAccount>
            </Fragment>
        </ViewAuth>
    )
};

export default ReAuth;