/*
@author LxingA [SUDesign]
@project PrintCards
@date 13/Dic/22 09:19
@description Complemento con los Formularios para el Proyecto
*/
import {useState,useMemo,Fragment,useContext} from 'react';
import {createUserWithEmailAndPassword,updateProfile,signOut,sendEmailVerification,signInWithEmailAndPassword,sendPasswordResetEmail} from 'firebase/auth';
import {reauthenticateWithCredential,EmailAuthProvider} from 'firebase/auth';
import {doc,setDoc,collection} from 'firebase/firestore';
import {useRouter} from 'next/router';
import {AuthContext} from '../util/context';
import Enlace from 'next/link';
import $ from 'jquery';
const initStateValidated = {validated:false,message:null,value:null,initialValue:null,name:null};
const monthOnStr = {
    "01": "Enero",
    "02": "Febrero",
    "03": "Marzo",
    "04": "Abril",
    "05": "Mayo",
    "06": "Junio",
    "07": "Julio",
    "08": "Agosto",
    "09": "Septiembre",
    "10": "Octubre",
    "11": "Noviembre",
    "12": "Diciembre"
};

const FormCheckerValues = (stateFnRef = () => {}, regExpID = "", refEvent = {}) => {
    const {target:{value,minLength,name,defaultValue}} = refEvent;
    const stRefRegExp = {
        rxLQgtUqxI: /^([A-Za-z0-9]+)$/,
        rxoMADXhJc: /^([A-Z]){1}([a-zÀ-ÿ\u00f1\u00d1]+) ([A-Z]){1}([a-zÀ-ÿ\u00f1\u00d1]+)$/,
        rxsNkFoWyn: /^([a-zA-Z0-9\_\-\+À-ÿ\u00f1\u00d1]+)\@([a-z0-9\-]+)\.([a-z]+)(\.[a-z]+)?$/,
        rxaBReLXnH: /^([\S\d\W]+)$/,
        rxaQUDqFhf: /^([a-z]){1}$/,
        rxSjLuKztg: /^([0-9]){4}\-([0-9]){2}\-([0-9]){2}$/,
        rxXkmrShwZ: /^([0-9]){10}$/
    };stateFnRef(bkState => {
            const response = {
            error: message => {
                bkState[name] = {...initStateValidated,message}
            },
            ok: _ => {
                bkState[name] = {...initStateValidated,validated:true,value,initialValue:defaultValue,name}
            }
        };
        if(value.length === 0) response["error"]("No haz introducido nada");
        else if(value.length < minLength) response["error"](`La longitud no ha superado los ${minLength} carácteres`);
        else if(!stRefRegExp[regExpID].test(value)) response["error"]("El valor introducido no es valído");
        else response["ok"]();
        return {...bkState}
    });
};

export const FormAuthRecovery = ({FAuth,Callback,Site}) => {
    const stateValuesInit = {
        sipceuname: initStateValidated
    };
    const [values,setValues] = useState(stateValuesInit);
    const [loading,setLoading] = useState(false);
    const HandlerSubmit = async e => {
        e.preventDefault();setLoading(true);
        if(Object.values(values).filter(({validated})=>!validated).length === 0){
            try{
                await sendPasswordResetEmail(FAuth,values["sipceuname"].value);
                Callback({text:`Se le ha envíado un correo para restablecer la contraseña a ${values["sipceuname"].value}. Favor de ir a su búzon de su correo y seguir las instrucciones para restablecer su cuenta`,redirect:true});
            }catch({code}){
                setLoading(false);let __;switch(code){
                    case "auth/user-not-found":
                        __ = `El correo proporcionado no le pertenece a ningún cliente de ${Site}. Favor de crear una nueva cuenta`;
                    break;
                    default:
                        __ = "Hubo un error a intentar enviar el correo de restablecimiento, Intentelo más tarde";
                    break;
                }Callback({text:__,redirect:false});
            }
        }
    };
    return (
        <form onSubmit={HandlerSubmit}>
            <h3>Recuperación</h3>
            <div className="form-1">
                <label htmlFor="sipceuname">Correo Electrónico</label>
                <input disabled={loading} required onChange={e=>FormCheckerValues(setValues,"rxsNkFoWyn",e)} minLength={6} type="email" name="sipceuname" placeholder="Tecleé su correo electrónico"/>
                {values["sipceuname"]["message"] && (
                    <p>{values["sipceuname"].message}</p>
                )}
            </div>
            <div className="buttons-container">
                <button disabled={loading} className="btn-Principal">{loading?"Restableciendo":"Restablecer"}</button>
            </div>
        </form>
    )
};

export const FormAuthResetPassword = ({Callback}) => {
    const stateValuesInit = {
        sippwr: initStateValidated
    };
    const [values,setValues] = useState(stateValuesInit);
    const HandlerSubmit = e => {
        e.preventDefault();
        values["sippwr"].validated && Callback({show:false,password:values["sippwr"].value});
    };
    return (
        <form onSubmit={HandlerSubmit} className="FormRegister">
            <h3>Nueva Contraseña</h3>
            <div className="form-1">
                <input required onChange={e=>FormCheckerValues(setValues,"rxaBReLXnH",e)} minLength={6} type="password" name="sippwr" placeholder="Tecleé su nueva contraseña"/>
                {values["sippwr"]["message"] && (
                    <p>{values["sippwr"].message}</p>
                )}
            </div>
            <div className="buttons-container">
                <button className="btn-Principal">Confirmar</button>
            </div>
        </form>
    )
};

export const FormAuthLogin = ({FAuth,Callback}) => {
    const {pathname} = useRouter();
    const stateValuesInit = {
        sipnkname: initStateValidated,
        sipnpsw: initStateValidated
    };
    const [values,setValues] = useState(stateValuesInit);
    const [loading,setLoading] = useState(false);
    const HandlerSubmit = async e => {
        e.preventDefault();setLoading(true);
        if(Object.values(values).filter(({validated})=>!validated).length === 0){
            try{
                await signInWithEmailAndPassword(FAuth,values["sipnkname"].value,values["sipnpsw"].value);
            }catch({code}){
                setLoading(false);let __;switch(code){
                    case "auth/user-not-found":
                        __ = "El correo electrónico proporcionado, no está registrado. Favor de proceder a registrarse para acceder con una cuenta";
                    break;
                    case "auth/wrong-password":
                        __ = "La contraseña proporcionada no es la correcta";
                    break;
                    default:
                        __ = "Hubo un error a autenticar, Intentelo más tarde"; 
                    break;
                }Callback({text:__,redirect:false});
            }
        }
    };
    return (
        <form onSubmit={HandlerSubmit}>
            <div className="form-1">
                <label htmlFor="sipnkname">Correo Electrónico</label>
                <input disabled={loading} required onChange={e=>FormCheckerValues(setValues,"rxsNkFoWyn",e)} minLength={6} type="email" name="sipnkname" placeholder="Tecleé su correo electrónico"/>
                {values["sipnkname"].message && (
                    <p>{values["sipnkname"].message}</p>
                )}
            </div>
            <div className="form-2">
                <label htmlFor="sipnpsw">Contraseña</label>
                <input disabled={loading} required onChange={e=>FormCheckerValues(setValues,"rxaBReLXnH",e)} minLength={8} type="password" name="sipnpsw" placeholder="Tecleé su contraseña"/>
                {values["sipnpsw"].message && (
                    <p>{values["sipnpsw"].message}</p>
                )}
                <Enlace href={{pathname,query:{m:"recovery"}}}>
                    ólvide la contraseña
                </Enlace>
            </div>
            <div className="buttons-container">
                <button disabled={loading} className="btn-Principal">{loading?"Autenticando":"Autenticar"}</button>
                <button disabled={loading} className="btn-border">Conectése con <strong><i className="fa fa-facebook-official" aria-hidden="true"></i></strong></button>
                <button disabled={loading} className="btn-border">Conectése con <strong><i className="fa fa-google" aria-hidden="true"></i></strong></button>
            </div>
        </form>
    )
};

export const FormAuthRegister = ({FAuth,FDatabase,Callback,AuthCallback}) => {
    const stateValuesInit = {
        sinpnkname: initStateValidated,
        sinpfnames: initStateValidated,
        sinplnames: initStateValidated,
        sinpemail: initStateValidated,
        sinppw: initStateValidated
    };
    const [values,setValues] = useState(stateValuesInit);
    const [loading,setLoading] = useState(false);
    const HandlerSubmit = async e => {
        e.preventDefault();setLoading(true);
        if(Object.values(values).filter(({validated})=>!validated).length === 0){
            const getGenreCurrent = $('select[name="sinpgren"]').val();
            try{
                AuthCallback(true);
                const sRefUser = await createUserWithEmailAndPassword(FAuth,values["sinpemail"].value,values["sinppw"].value);
                await updateProfile(sRefUser.user,{displayName:values["sinpnkname"].value});
                const [uFName,uSName] = values["sinpfnames"]["value"].split(" ");
                const [uLName,uEName] = values["sinplnames"]["value"].split(" ");
                await setDoc(doc(collection(FDatabase,"user"),sRefUser.user.uid),{uFName,uSName,uLName,uEName,uGenre:getGenreCurrent});
                await sendEmailVerification(sRefUser.user);
                await signOut(FAuth);
                AuthCallback(false);
                Callback({text:`Se le ha envíado un correo de confirmación a ${values["sinpemail"].value}. Favor de verificarlo para acceder a su cuenta`,redirect:true});
            }catch({code}){
                let __;switch(code){
                    case "auth/email-already-in-use":
                        __ = "El correo electrónico proporcionado ya existe. Favor de usar otro";
                    break;
                    default:
                        __ = "Hubo un error a crear su cuenta, Favor de intentarlo de nuevo";
                    break; 
                }
                setLoading(false);
                Callback({text:__,redirect:false});
            }
        }else{
            setLoading(false);
            Callback({text:"Favor de corregir lo solicitado",redirect:false});
        }
    };
    return (
        <form onSubmit={HandlerSubmit}><br/>
            <div className="form-1">
                <label htmlFor="sinpnkname">Nombre de Usuario</label>
                <input disabled={loading} minLength={6} type="text" name="sinpnkname" placeholder="Tecleé su nombre de usuario" onChange={e=>FormCheckerValues(setValues,"rxLQgtUqxI",e)} required/>
                {values["sinpnkname"]["message"] && (
                    <p>{values["sinpnkname"]["message"]}</p>
                )}
            </div>
            <div className="form-1">
                <label htmlFor="sinpfnames">Primeros Nombres</label>
                <input disabled={loading} minLength={6} type="text" name="sinpfnames" placeholder="Tecleé sus primeros nombres" onChange={e=>FormCheckerValues(setValues,"rxoMADXhJc",e)} required/>
                {values["sinpfnames"]["message"] && (
                    <p>{values["sinpfnames"]["message"]}</p>
                )}
            </div>
            <div className="form-1">
                <label htmlFor="sinplnames">Apellidos</label>
                <input disabled={loading} minLength={6} type="text" name="sinplnames" placeholder="Tecleé sus apellidos" onChange={e=>FormCheckerValues(setValues,"rxoMADXhJc",e)} required/>
                {values["sinplnames"]["message"] && (
                    <p>{values["sinplnames"]["message"]}</p>
                )}
            </div>
            <div className="form-1">
                <label htmlFor="sinpemail">Correo Electrónico</label>
                <input disabled={loading} minLength={6} type="email" name="sinpemail" placeholder="Tecleé su correo electrónico" onChange={e=>FormCheckerValues(setValues,"rxsNkFoWyn",e)} required/>
                {values["sinpemail"]["message"] && (
                    <p>{values["sinpemail"]["message"]}</p>
                )}
            </div>
            <div className="form-1 genero">
                <label htmlFor="sinpgren">Género</label>
                <select disabled={loading} name="sinpgren">
                    <option value="m">Masculino</option>
                    <option value="f">Femenino</option>
                    <option value="s">No Especificar</option>
                </select>
            </div>
            <div className="form-1">
                <label htmlFor="sinppw">Contraseña</label>
                <input disabled={loading} minLength={8} type="password" name="sinppw" placeholder="Tecleé su contraseña" onChange={e=>FormCheckerValues(setValues,"rxaBReLXnH",e)} required/>
                {values["sinppw"]["message"] && (
                    <p>{values["sinppw"]["message"]}</p>
                )}
            </div>
            <div className="buttons-container">
                <button className="btn-Principal" disabled={loading}>{loading?"Registrando":"Registrarse"}</button>
            </div>
        </form>
    )
};

export const FormAccountConfig = ({user,callback,updating,completed}) => {
    const {info:{uFName,uSName,uLName,uEName,uBirtD,uGenre}} = user;
    const getBirthday = uBirtD && uBirtD.split("-");
    const stateValuesInit = {
        scfCNftnames: initStateValidated,
        scfCNltnames: initStateValidated,
        scfCDBirth: initStateValidated,
        scfCDGen: initStateValidated
    };
    const [values,setValues] = useState(stateValuesInit);
    useMemo(_=>callback(values),[values]);
    useMemo(_=>{!completed&&setValues(stateValuesInit)},[completed]);
    return Object.keys(user.info).length > 0 && (
        <Fragment>
            <form className="dts names">
                <div className="form-1">
                    <div className="ctn-form">
                        <label htmlFor="scfCNftnames">Nombres {`[${uFName} ${uSName}]`}</label>
                        <input defaultValue={`${uFName} ${uSName}`} disabled={updating} onChange={e=>FormCheckerValues(setValues,"rxoMADXhJc",e)} minLength={6} type="text" name="scfCNftnames" placeholder="Ingrese sus nombres iniciales"/>
                    </div>
                </div>
                <div className="form-1">
                    <div className="ctn-form">
                        <label htmlFor="scfCNltnames">Apellidos {`[${uLName} ${uEName}]`}</label>
                        <input defaultValue={`${uLName} ${uEName}`} disabled={updating} onChange={e=>FormCheckerValues(setValues,"rxoMADXhJc",e)} minLength={6} type="text" name="scfCNltnames" placeholder="Ingrese sus últimos nombres"/>
                    </div>
                </div>
            </form>
            <form className="dts nacimiento">
                <div className="form-1 genero">
                    <label htmlFor="scfCDBirth">Fecha de Nacimiento{uBirtD&&` [${getBirthday[2]} de ${monthOnStr[getBirthday[1]]} de ${getBirthday[0]}]`}</label>
                    <input disabled={updating} onChange={e=>FormCheckerValues(setValues,"rxSjLuKztg",e)} minLength={10} name="scfCDBirth" type="date" defaultValue={uBirtD}/>
                </div>
                <div className="form-1 genero">
                    <label htmlFor="scfCDGen">Género {`[${uGenre==="m"?"Masculino":uGenre==="f"?"Femenino":"No Especificado"}]`}</label>
                    <select disabled={updating} onChange={e=>FormCheckerValues(setValues,"rxaQUDqFhf",e)} minLength={1} name="scfCDGen" defaultValue={uGenre}>
                        <option value="m">Masculino</option>
                        <option value="f">Femenino</option>
                        <option value="s">No Especificar</option>
                    </select>
                </div>
            </form>
        </Fragment>
    )
};

export const FormAccountReauth = ({FirebaseAuth,Mail,Callback}) => {
    const {ACAction:{ARActUpdateCurrentReAuthState},ACDispatch,ACState:{action}} = useContext(AuthContext.Context);
    const stateValuesInit = {
        scfRAuthPW: initStateValidated
    };
    const [values,setValues] = useState(stateValuesInit);
    const [loading,setLoading] = useState(false);
    const HandlerSubmit = async e => {
        e.preventDefault();setLoading(true);
        if(values["scfRAuthPW"].validated){
            try{
                await reauthenticateWithCredential(FirebaseAuth.currentUser,EmailAuthProvider.credential(Mail,values["scfRAuthPW"].value));
                ACDispatch(ARActUpdateCurrentReAuthState(true));
            }catch({code}){
                let __;setLoading(false);switch(code){
                    case "auth/user-mismatch":
                        __ = "Las credenciales actuales no son iguales a la sesión actual";
                    break;
                    case "auth/wrong-password":
                        __ = "La contraseña no es la correcta";
                    break;
                    case "auth/invalid-credential":
                        __ = "La creación de la sesión actual es inválida, Intentelo de nuevo";
                    break;
                    default:
                        __ = "Hubo un error a realizar la autenticación, Intentelo más tarde";
                    break;
                }Callback(__);
            }
        }
    };let __TXT_ACTION__;
    switch(action){
        case "delete":
            __TXT_ACTION__ = "Eliminación de Cuenta";
        break;
    }
    return (
        <form onSubmit={HandlerSubmit}>
            <div className="form-1">
                <div className="ctn-form">
                    <h3 style={{width:"250px"}}>{__TXT_ACTION__}</h3>
                    <label htmlFor="scfRAuthPW">Se requiere autenticación</label>
                    <input autoFocus required disabled={loading} minLength={8} onChange={e=>FormCheckerValues(setValues,"rxaBReLXnH",e)} type="password" name="scfRAuthPW" placeholder="Favor de volver a teclear su contraseña"/>
                    {values["scfRAuthPW"]["message"] && (
                        <p>{values["scfRAuthPW"].message}</p>
                    )}
                    <div className="buttons-container">
                        <button className="btn-Principal" disabled={loading}>{loading?"Confirmando":"Confirmar"}</button>
                    </div>
                </div>
            </div>
        </form>
    )
};