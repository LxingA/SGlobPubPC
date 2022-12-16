/*
@author LxingA [SUDesign]
@project PrintCards
@date 13/Dic/22 09:19
@description Complemento con los Formularios para el Proyecto
*/
import {useState} from 'react';
import {createUserWithEmailAndPassword,updateProfile,signOut,sendEmailVerification,signInWithEmailAndPassword,sendPasswordResetEmail} from 'firebase/auth';
import {doc,setDoc,collection} from 'firebase/firestore';
import {useRouter} from 'next/router';
import Enlace from 'next/link';
import $ from 'jquery';
const initStateValidated = {validated:false,message:null,value:null};

const FormCheckerValues = (stateFnRef = () => {}, regExpID = "", refEvent = {}) => {
    const {target:{value,minLength,name}} = refEvent;
    const stRefRegExp = {
        rxLQgtUqxI: /^([A-Za-z0-9]+)$/,
        rxoMADXhJc: /^([A-Z]){1}([a-zÀ-ÿ\u00f1\u00d1]+) ([A-Z]){1}([a-zÀ-ÿ\u00f1\u00d1]+)$/,
        rxsNkFoWyn: /^([a-zA-Z0-9\_\-\+À-ÿ\u00f1\u00d1]+)\@([a-z0-9\-]+)\.([a-z]+)(\.[a-z]+)?$/,
        rxaBReLXnH: /^([\S\d\W]+)$/
    };stateFnRef(bkState => {
            const response = {
            error: message => {
                bkState[name] = {...initStateValidated,message}
            },
            ok: _ => {
                bkState[name] = {...initStateValidated,validated:true,value}
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
                <button disabled={loading} className="btn-principal">{loading?"Restableciendo":"Restablecer"}</button>
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
                <button disabled={loading} className="btn-principal">{loading?"Autenticando":"Autenticar"}</button>
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
            const getGenreCurrent = $('select[name="sinpgren"]').val() === "m" ? "Masculino" : "Femenino";
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
                <button className="btn-principal" disabled={loading}>{loading?"Registrando":"Registrarse"}</button>
            </div>
        </form>
    )
};