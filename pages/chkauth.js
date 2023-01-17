/*
@author LxingA [SUDesign]
@project PrintCards
@date 17/Dic/22 00:20
@description Página para realizar las Acciones de la Autenticación del Proyecto
*/
import {Fragment,useEffect,useState} from 'react';
import {applyActionCode,confirmPasswordReset,verifyPasswordResetCode} from 'firebase/auth';
import {useRouter} from 'next/router';
import {FormAuthResetPassword} from '../addons/Form';
import Head from 'next/head';
import Enlace from 'next/link';
import ViewShop from '../view/shop';

const AuthCheck = ({firebase,global,authentic}) => {
    const [text,setText] = useState({title:"Procesando...",desc:"Espere porfavor",status:false});
    const {query,replace} = useRouter();
    const [screenPassword,setScreenPassword] = useState({show:query.mode==="resetPassword",password:null});
    const {siteName} = global;
    const Handler = async _ => {
        const {FirebaseAuth} = firebase;let __=text;
        try{ 
            switch(query.mode){
                case "verifyEmail":
                    await applyActionCode(FirebaseAuth,query.oobCode);
                    if(authentic){
                        await FirebaseAuth.currentUser.reload();
                        await FirebaseAuth.updateCurrentUser(fAuth.currentUser);
                    }setText({...text,status:true,desc:"Se ha verificado con éxito su correo electrónico",title:"Verificación Exitosa"});
                break;
                case "resetPassword":
                    if(screenPassword["password"]){
                        await verifyPasswordResetCode(FirebaseAuth,query.oobCode);
                        await confirmPasswordReset(FirebaseAuth,query.oobCode,screenPassword.password);
                        setText({...text,status:true,desc:"Se ha cambiado con éxito la contraseña",title:"Contraseña Cambiada"});
                    }
                break;
                case "recoverEmail":
                    await applyActionCode(FirebaseAuth,query.oobCode);
                break;
                default:
                    replace("/");
                break;
            }
        }catch({code}){
            switch(code){
                case "auth/expired-action-code":
                    __["title"] = "Código Expirado";
                break;
                case "auth/invalid-action-code":
                    __["title"] = "Código Invalído";
                break;
                case "auth/user-disabled":
                    __["title"] = "Cliente Desactivado"; 
                break;
                case "auth/user-not-found":
                    __["title"] = "Cliente no Existente"; 
                break;
                case "auth/weak-password":
                    __["title"] = "Contraseña no Segura";
                break;
                default:
                    __["title"] = "Error Desconocido";
                break;
            }setText({...__,desc:`Hubo un error a ${query.mode==="verifyEmail"?"verificar su correo electrónico":query.mode==="resetPassword"?"restablecer su contraseña":"cambiar su correo electrónico"}, Intentelo de nuevo`});
        }
    };useEffect(_=>{Handler()},[screenPassword]);
    return (
        <Fragment>
            <Head>
                <title>Verificación de Cuentas - {siteName}</title>
            </Head>
            <ViewShop firebase={firebase} global={global} authentic={authentic}>
                <header data-aos="fade-up" data-aos-duration="3000" className="error">
                    {<div className="content-txt" data-aos="fade-right">
                        {!screenPassword["show"] ? (
                            <Fragment>
                                <h3>
                                    {text["title"]}
                                </h3>
                                <p>
                                    {text["desc"]}
                                </p>
                                {text["status"] && (
                                    authentic ? (
                                        <Enlace href="/cuenta" className="btn-Principal">
                                            Ir a la Cuenta
                                        </Enlace>
                                    ) : (
                                        <Enlace href="/auth?m=login" className="btn-Principal">
                                            Iniciar Sesión
                                        </Enlace>
                                    )
                                )}
                            </Fragment>
                        ) : (
                            <FormAuthResetPassword Callback={setScreenPassword}/>
                        )}
                    </div>}
                </header>
            </ViewShop>
        </Fragment>
    )
}

export default AuthCheck;