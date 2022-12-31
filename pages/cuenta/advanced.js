/*
@author LxingA [SUDesign]
@project PrintCards
@date 29/Dic/22 17:32
@description Página para Mostrar la Administración de los Datos de Acceso del Cliente en el Proyecto
*/
import {Fragment, useState} from 'react';
import {useRouter} from 'next/router';
import {FormAccountAdminNickAndMail,FormAccountAdminPassword} from '../../addons/Form';
import {sendEmailVerification} from 'firebase/auth';
import Head from 'next/head';
import ViewAuth from '../../view/auth';
import ViewAccount from "../../view/account";

const AccountAdmin = ({global,firebase,authentic,user}) => {
    const {siteName} = global;
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState(null);
    const HandlerSendVerified = async e => {
        e.preventDefault();setLoading(true);
        await sendEmailVerification(firebase["FirebaseAuth"].currentUser);
        setMessage("Se le ha envíado un correo de verificación. Favor de checarlo en su buzón preferido");
        setLoading(false);
    };
    return (
        <ViewAuth authentic={authentic}>
            <Fragment>
                <Head>
                    <title>Administración de Cuentas - {siteName}</title>
                </Head>
                <ViewAccount global={[firebase,global,authentic,user]} style="datosMain">
                    {user && (
                        <Fragment>
                            <h3 className="main">
                                <span>Administrar la Cuenta</span>
                            </h3>
                            <FormAccountAdminNickAndMail user={user} fAuth={firebase["FirebaseAuth"]}/>
                            <FormAccountAdminPassword fAuth={firebase["FirebaseAuth"]}/>
                            <div className="more-options-container">
                                <div className="a-option">
                                    <div className="container-op">
                                        <h3>Verificación del Correo</h3>
                                        <p>En está zona podrás verificar el correo electrónico actual</p>
                                    </div>
                                    <div className="ctn-btn">
                                        {message ? (
                                            <p>{message}</p>
                                        ) : user["verified"] ? (
                                            <button className="btn-Principal" disabled>Veríficado</button>
                                        ) : (
                                            <button disabled={loading} className="btn-Principal" onClick={HandlerSendVerified}>{loading ? "Verificando" : "Verificar"}</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )}
                </ViewAccount>
            </Fragment>
        </ViewAuth>
    )
};

export default AccountAdmin;