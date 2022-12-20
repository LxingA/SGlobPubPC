/*
@author LxingA [SUDesign]
@project PrintCards
@date 13/Dic/22 07:45
@description Página para mostrar la Autenticación del Proyecto
*/
import {Fragment,useState} from 'react';
import {useRouter} from 'next/router';
import {FormAuthLogin,FormAuthRegister,FormAuthRecovery} from '../addons/Form';
import {BoxMessage} from '../addons/Box';
import Head from 'next/head';
import Enlace from 'next/link';
import ViewAuth from '../view/auth';
import ViewShop from '../view/shop';

const Auth = ({firebase,global,authentic}) => {
    const [refresh,setRefresh] = useState(false);
    const [message,setMessage] = useState(null);
    const {FirebaseAuth,FirebaseDatabase} = firebase;
    const {query,pathname,push} = useRouter();
    const {siteName} = global;
    let __={};switch(query.m){
        case "login":
            __["title"] = "Autenticación";
            __["form"] = <FormAuthLogin FAuth={FirebaseAuth} Callback={setMessage} FDatabase={FirebaseDatabase}/>;
            __["box"] = true;
            __["style"] = false;
        break;
        case "register":
            __["title"] = "Registro";
            __["form"] = <FormAuthRegister FAuth={FirebaseAuth} FDatabase={FirebaseDatabase} Callback={setMessage} AuthCallback={setRefresh}/>;
            __["box"] = false;
            __["style"] = true;
        break;
        case "recovery":
            __["title"] = "Recuperación";
            __["form"] = <FormAuthRecovery FAuth={FirebaseAuth} Callback={setMessage} Site={siteName}/>;
            __["box"] = false;
            __["style"] = true;
        break;
        default:
            push("/");
        break;
    }
    return (
        <ViewAuth authentic={authentic} login notRefresh={refresh} redirect={query.to}>
            <Fragment>
                <Head>
                    <title>{__["title"]} - {siteName}</title>
                </Head>
                <ViewShop global={global} firebase={firebase} authentic={authentic}>
                    <div className={`login-container${__["style"]?" Register":""}`}>
                        {message && (
                            <BoxMessage>
                                <p>{message["text"]}</p>
                                {message["redirect"] ? (
                                    <Enlace className="btn-beige" href={{pathname,query:{m:"login"}}} onClick={_=>setMessage(null)}>
                                        Entendido
                                    </Enlace>
                                ) : (
                                    <a className="btn-beige" style={{cursor:"pointer"}} onClick={_=>setMessage(null)}>
                                        Entendido
                                    </a>
                                )}
                            </BoxMessage>
                        )}
                        <div className="formulario-conexion" data-aos="zoom-in-right">
                            <div className={`conectarse${__["style"]?" FormRegister":""}`}>
                                {__["form"]}
                            </div>
                        </div>
                        <div className="abrir-cuenta">
                            {__["box"] ? (
                                <Fragment>
                                    <div className="ctn-newCuenta">
                                        <h3>¿Nuevo Aquí?</h3>
                                        <p>Abre una cuenta para mantener un control de tus pedidos</p>
                                    </div>
                                    <Enlace className="btn-border" href={{query:{m:"register"},pathname}}>
                                        Registrarse
                                    </Enlace>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <div className="ctn-newCuenta">
                                        <h3>¿Ya tienes cuenta?</h3>
                                        <p>Logueate con una cuenta existente</p>
                                    </div>
                                    <Enlace className="btn-border" href={{query:{m:"login"},pathname}}>
                                        Autenticate
                                    </Enlace>
                                </Fragment>
                            )}
                        </div>
                    </div>
                </ViewShop>
            </Fragment>
        </ViewAuth>
    )
};

export default Auth;