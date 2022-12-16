/*
@author LxingA [SUDesign]
@project PrintCards
@date 13/Dic/22 07:45
@description Página para mostrar la Autenticación del Proyecto
*/
import {Fragment,useState} from 'react';
import {useRouter} from 'next/router';
import {FormAuthLogin,FormAuthRegister,FormAuthRecovery} from '../addons/Form';
import Head from 'next/head';
import Enlace from 'next/link';
import ViewAuth from '../view/auth';
import ViewShop from '../view/shop';

const Auth = ({firebase,global,authentic}) => {
    const [message,setMessage] = useState(null);
    const {FirebaseAuth,FirebaseDatabase} = firebase;
    const {query,pathname} = useRouter();
    const {siteName} = global;
    const isLogin = query.m === "login";
    return (
        <ViewAuth authentic={authentic} login>
            <Fragment>
                <Head>
                    <title>{isLogin ? "Autenticación" : query.m === "register" ? "Registro" : "Recuperación"} - {siteName}</title>
                </Head>
                <ViewShop global={global} firebase={firebase} authentic={authentic}>
                    <div className={`login-container${!isLogin?" Register":""}`}>
                        {message && (
                            <div className="floatingCaja">
                                <i className="fa fa-heart-o" aria-hidden="true"></i>
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
                            </div>
                        )}
                        <div className="formulario-conexion" data-aos="zoom-in-right">
                            <div className={`conectarse${!isLogin?" FormRegister":""}`}>
                                {isLogin ? (
                                    <FormAuthLogin FAuth={FirebaseAuth} Callback={setMessage} FDatabase={FirebaseDatabase}/>
                                ) : query.m === "register" ? (
                                    <FormAuthRegister FAuth={FirebaseAuth} FDatabase={FirebaseDatabase} Callback={setMessage}/>                                    
                                ) : (
                                    <FormAuthRecovery FAuth={FirebaseAuth} Callback={setMessage} Site={siteName}/>
                                )}
                            </div>
                        </div>
                        <div className="abrir-cuenta">
                            {isLogin ? (
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