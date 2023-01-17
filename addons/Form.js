/*
@author LxingA [SUDesign]
@project PrintCards
@date 13/Dic/22 09:19
@description Complemento con los Formularios para el Proyecto
*/
import {useState,useMemo,Fragment,useContext,useEffect} from 'react';
import {createUserWithEmailAndPassword,updateProfile,signOut,sendEmailVerification,signInWithEmailAndPassword,sendPasswordResetEmail} from 'firebase/auth';
import {reauthenticateWithCredential,EmailAuthProvider,updateEmail,updatePassword} from 'firebase/auth';
import {doc,setDoc,collection,updateDoc,getDoc} from 'firebase/firestore';
import {useRouter} from 'next/router';
import {AuthContext} from '../util/context';
import {RandomHash} from '../util/crypto';
import Loader from 'react-content-loader';
import Enlace from 'next/link';
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
        rxXkmrShwZ: /^([0-9]){10}$/,
        rxU26S0nZA: /^([A-Za-z0-9 À-ÿ\u00f1\u00d1 ]+)$/,
        rxzDc43135: /^([0-9]+)$/
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
    const {pathname,query} = useRouter();
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
                <Enlace href={{pathname,query:query.to?{m:"recovery",to:query.to}:{m:"recovery"}}}>
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
                await setDoc(doc(collection(FDatabase,"user"),sRefUser.user.uid),{uFName,uSName,uLName,uEName,uGenre:getGenreCurrent,uAllowEmailSender:false,uLengthAddress:0});
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
        case "email":
            __TXT_ACTION__ = "Actualizar el Correo Electrónico";
        break;
        case "password":
            __TXT_ACTION__ = "Actualizar la Contraseña";
        break;
    }
    return (
        <form onSubmit={HandlerSubmit}>
            <div className="form-1">
                <div className="ctn-form">
                    <h3 style={{width:"310px"}}>{__TXT_ACTION__}</h3>
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

export const FormAccountAddressCreate = ({user,fDatabase,Updated,handler}) => {
    const {push,pathname,query,replace} = useRouter();
    const {info:{uLengthAddress}} = user;
    const stateValuesInit = {
        scfCAddressSavedT: initStateValidated,
        scfCAddressAdd: initStateValidated,
        scfCAddressExt: initStateValidated,
        scfCAddressInt: initStateValidated,
        scfCAddressStr: initStateValidated,
        scfCAddressCol: initStateValidated,
        scfCAddressCP: initStateValidated,
        scfCAddressState: initStateValidated,
        scfCAddressCity: initStateValidated,
        scfCAddressRef: initStateValidated
    };
    if(Updated) delete stateValuesInit["scfCAddressSavedT"];
    const [values,setValues] = useState(stateValuesInit);
    const [loading,setLoading] = useState(false);
    const [allowed,setAllowed] = useState(false);
    const [data,setData] = useState(null);
    const [update,setUpdate] = useState(null);
    const HandlerSaved = async e => {
        e.preventDefault();setLoading(true);let __={};
        const stRefDoc = doc(collection(fDatabase,"address"),user.id);
        const stRefUser = doc(collection(fDatabase,"user"),user.id);
        const gtRefRandomH = RandomHash(16);
        try{
            __[gtRefRandomH] = {
                name: values["scfCAddressSavedT"].value,
                cp: values["scfCAddressCP"].value,
                int: values["scfCAddressInt"].value,
                ext: values["scfCAddressExt"].value,
                addr: values["scfCAddressAdd"].value,
                state: values["scfCAddressState"].value,
                city: values["scfCAddressCity"].value,
                ref: values["scfCAddressRef"].value,
                street: values["scfCAddressStr"].value,
                colony: values["scfCAddressCol"].value,
                active: false
            };if(uLengthAddress === 0){
                __[gtRefRandomH]["active"] = true;
                await setDoc(stRefDoc,__);
                await updateDoc(stRefUser,{uLengthAddress:1});
            }else{
                const gtCurrentVLAddress = (await getDoc(stRefDoc)).data();
                await updateDoc(stRefDoc,{...gtCurrentVLAddress,...__});
                await updateDoc(stRefUser,{uLengthAddress:(uLengthAddress+1)});
            }push({pathname,query:{view:"all"}});
        }catch(error){}
    };
    const HandlerUpdated = async e => {
        let __=data;e.preventDefault();setLoading(true);
        const stRefObjWithDatabaseName = {
            scfCAddressCP: "cp",
            scfCAddressInt: "int",
            scfCAddressExt: "ext",
            scfCAddressAdd: "addr",
            scfCAddressState: "state",
            scfCAddressCity: "city",
            scfCAddressRef: "ref",
            scfCAddressStr: "street",
            scfCAddressCol: "colony"
        };delete __["uniqKey"];update.forEach(({key,value})=>{
            __[stRefObjWithDatabaseName[key]] = value;
        });let __stRefSaved__={};__stRefSaved__[query.id]=__;
        await updateDoc(doc(collection(fDatabase,"address"),user.id),__stRefSaved__);
        replace({pathname,query:{view:"all"}});
    };
    const HandlerEvent = async _ => {
        if(Updated){
            const stRefFilterAddress = Object.values(values).filter(({validated,initialValue,value})=>validated&&value!==initialValue);
            if(stRefFilterAddress.length > 0){
                const stRefObjWithNewContent = stRefFilterAddress.map(({value,name})=>({key:name,value}));
                setUpdate(stRefObjWithNewContent);
                setAllowed(true);
            }else setAllowed(false);
        }else{
            if(Object.values(values).filter(({validated})=>validated).length === Object.keys(stateValuesInit).length) setAllowed(true);
            else setAllowed(false);
        }
    };
    useMemo(_=>HandlerEvent(),[values]);
    const HandlerGetData = async _ => {
        const gtObjDataWithCurrentAddress = (await handler()).filter(({uniqKey})=>uniqKey===query.id);
        if(gtObjDataWithCurrentAddress.length === 0) replace({pathname,query:{view:"all"}});
        else setData(gtObjDataWithCurrentAddress[0]);
    };
    useEffect(_ => {
        if(Updated) HandlerGetData();
    },[]);
    return (
        <Fragment>
            <h3 className="main NameDireccion">
                {!Updated ? (
                    <span>
                        Guardar cómo: 
                        <form>
                            <input onChange={e=>FormCheckerValues(setValues,"rxLQgtUqxI",e)} disabled={loading} required minLength={4} name="scfCAddressSavedT" type="text" placeholder="Ejemplo: Casa, Trabajo, Tienda (Min 4 de L)"/>
                        </form>
                    </span>
                ) : (
                    data ? (
                        <span>
                            Editando la Dirección "{data["name"]}"
                        </span>
                    ) : (
                        <Loader width={350} height={35}>
                            <rect width={350} height={35} x={0} y={0} rx={0} ry={0}/>
                        </Loader>
                    )
                )}
                <div className="ctn-ediciones">
                    {!Updated ? (
                        <button disabled={loading||!allowed} onClick={HandlerSaved}>
                            <i className="fa fa-cloud" aria-hidden="true"></i>
                            {loading ? "Guardando" : "Guardar Dirección"}
                        </button>
                    ) : (
                        <button disabled={loading||!allowed} onClick={HandlerUpdated}>
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                            {loading ? "Actualizando" : "Actualizar Dirección"}
                        </button>
                    )}
                </div>
            </h3>
            <form className="dts names-calle">
                <div className="form-1">
                    <div className="ctn-form">
                        <label htmlFor="scfCAddressAdd">Dirección*</label>
                        <input defaultValue={Updated?data&&data["addr"]:undefined} disabled={loading} onChange={e=>FormCheckerValues(setValues,"rxU26S0nZA",e)} required minLength={6} type="text" name="scfCAddressAdd" placeholder={Updated?!data?"Obteniendo...":"":"Tecleé su dirección actual"}/>
                        {values["scfCAddressAdd"]["message"] && (
                            <p>{values["scfCAddressAdd"].message}</p>
                        )}
                    </div>
                </div>
                <div className="form-1 ext">
                    <div className="ctn-form">
                        <label htmlFor="scfCAddressExt">N° Exterior*</label>
                        <input defaultValue={Updated?data&&data["ext"]:undefined} disabled={loading} onChange={e=>FormCheckerValues(setValues,"rxzDc43135",e)} minLength={1} required type="number" name="scfCAddressExt" min={0} placeholder={Updated?!data?"Obteniendo...":"":"Tecleé su número exterior"}/>
                        {values["scfCAddressExt"]["message"] && (
                            <p>{values["scfCAddressExt"].message}</p>
                        )}
                    </div>
                </div>
                <div className="form-1 ext">
                    <div className="ctn-form">
                        <label htmlFor="scfCAddressInt">N° Interior {`(Definelo en 0 en caso de no)`}</label>
                        <input defaultValue={Updated?data&&data["int"]:undefined} disabled={loading} onChange={e=>FormCheckerValues(setValues,"rxzDc43135",e)} minLength={1} required type="number" name="scfCAddressInt" min={0} placeholder={Updated?!data?"Obteniendo...":"":"Tecleé su número interior"}/>
                        {values["scfCAddressInt"]["message"] && (
                            <p>{values["scfCAddressInt"].message}</p>
                        )}
                    </div>
                </div>
            </form>
            <form className="dts colonia-calles">
                <div className="form-1">
                    <div className="ctn-form">
                        <label htmlFor="scfCAddressStr">Entre calle{`(s)*`}</label>
                        <input defaultValue={Updated?data&&data["street"]:undefined} disabled={loading} onChange={e=>FormCheckerValues(setValues,"rxU26S0nZA",e)} minLength={6} required type="text" name="scfCAddressStr" placeholder={Updated?!data?"Obteniendo...":"":"Tecleé el nombre de sus calles"}/>
                        {values["scfCAddressStr"]["message"] && (
                            <p>{values["scfCAddressStr"].message}</p>
                        )}
                    </div>
                </div>
                <div className="form-1">
                    <div className="ctn-form">
                        <label htmlFor="scfCAddressCol">Colonía*</label>
                        <input defaultValue={Updated?data&&data["colony"]:undefined} disabled={loading} onChange={e=>FormCheckerValues(setValues,"rxU26S0nZA",e)} minLength={2} required type="text" name="scfCAddressCol" placeholder={Updated?!data?"Obteniendo...":"":"Tecleé el nombre de su colonía"}/>
                        {values["scfCAddressCol"]["message"] && (
                            <p>{values["scfCAddressCol"].message}</p>
                        )}
                    </div>
                </div>
                <div className="form-1">
                    <div className="ctn-form">
                        <label htmlFor="scfCAddressCP">Código Postal*</label>
                        <input defaultValue={Updated?data&&data["cp"]:undefined} disabled={loading} onChange={e=>FormCheckerValues(setValues,"rxzDc43135",e)} minLength={1} required min={0} type="number" name="scfCAddressCP" placeholder={Updated?!data?"Obteniendo...":"":"Tecleé su código postal"}/>
                        {values["scfCAddressCP"]["message"] && (
                            <p>{values["scfCAddressCP"].message}</p>
                        )}
                    </div>
                </div>
            </form>
            <form className="dts passwordctn">
                <div className="form-1">
                    <label htmlFor="scfCAddressState">Estado*</label>
                    <input defaultValue={Updated?data&&data["state"]:undefined} disabled={loading} onChange={e=>FormCheckerValues(setValues,"rxU26S0nZA",e)} minLength={4} required type="text" name="scfCAddressState" placeholder={Updated?!data?"Obteniendo...":"":"Tecleé el nombre de su estado"}/>
                    {values["scfCAddressState"]["message"] && (
                        <p>{values["scfCAddressState"].message}</p>
                    )}
                </div>
                <div className="form-1">
                    <label htmlFor="scfCAddressCity">Municipio*</label>
                    <input defaultValue={Updated?data&&data["city"]:undefined} disabled={loading} onChange={e=>FormCheckerValues(setValues,"rxU26S0nZA",e)} minLength={4} required type="text" name="scfCAddressCity" placeholder={Updated?!data?"Obteniendo...":"":"Tecleé el nombre de su municipio"}/>
                    {values["scfCAddressCity"]["message"] && (
                        <p>{values["scfCAddressCity"].message}</p>
                    )}
                </div>
                <div className="form-1" style={{position:"relative",left:"15px"}}>
                    <label htmlFor="scfCAddressRef">Referencía*</label>
                    <input defaultValue={Updated?data&&data["ref"]:undefined} disabled={loading} onChange={e=>FormCheckerValues(setValues,"rxU26S0nZA",e)} minLength={4} required type="text" name="scfCAddressRef" placeholder={Updated?!data?"Obteniendo...":"":"Tecleé una referencía de su localidad"}/>
                    {values["scfCAddressRef"]["message"] && (
                        <p>{values["scfCAddressRef"].message}</p>
                    )}
                </div>
            </form>
        </Fragment>
    )
};

export const FormAccountAdminNickAndMail = ({user,fAuth}) => {
    const {ACAction:{ARActUpdateCurrentActionRequest,ARActUpdateCurrentDataRequest,ARActUpdateCurrentReAuthState},ACState:{reauthentic,action,value:WJbXw},ACDispatch} = useContext(AuthContext.Context);
    const {pathname,push} = useRouter();
    const {nick,mail} = user;
    const stateValuesInit = {
        scfUNickC: initStateValidated,
        scfUMailC: initStateValidated
    };
    const [values,setValues] = useState(stateValuesInit);
    const [loading,setLoading] = useState({scfUNickC:false,scfUMailC:false});
    const [message,setMessage] = useState(null);
    const stRefCurrentPath = {pathname:"/cuenta/reauth",query:{continue:encodeURI(pathname)}};
    const HandlerUpdateNick = async _ => {
        setLoading(p9E59=>({...p9E59,scfUNickC:true}));
        await updateProfile(fAuth.currentUser,{displayName:values["scfUNickC"]["value"]});
        await fAuth.currentUser.reload();
        await fAuth.updateCurrentUser(fAuth.currentUser);
        setValues(stateValuesInit);
        setLoading(lP103=>({...lP103,scfUNickC:false}));
    };
    const HandlerUpdateEmail = async (withReauth = false) => {
        setLoading(h8Z39=>({...h8Z39,scfUMailC:true}));
        if(withReauth){
            ACDispatch(ARActUpdateCurrentActionRequest(null));
            ACDispatch(ARActUpdateCurrentDataRequest(null));
            ACDispatch(ARActUpdateCurrentReAuthState(false));
        }
        let __=null;try{
            await updateEmail(fAuth.currentUser,WJbXw?WJbXw:values["scfUMailC"]["value"]);
        }catch({code}){
            switch(code){
                case "auth/invalid-email":
                    __ = "El correo proporcionado es inválido";
                break;
                case "auth/email-already-in-use":
                    __ = "El correo proporcionado ya está en uso";
                break;
                case "auth/requires-recent-login":
                    __ = "reauthentic";
                break;
            }
        }if(__ === "reauthentic"){
            ACDispatch(ARActUpdateCurrentActionRequest("email"));
            ACDispatch(ARActUpdateCurrentDataRequest(values["scfUMailC"]["value"]));
            push(stRefCurrentPath);
        }else{
            if(__) setMessage(__);
            else{
                await fAuth.currentUser.reload();
                await fAuth.updateCurrentUser(fAuth.currentUser);
            }setValues(stateValuesInit);
            setLoading(IotFH=>({...IotFH,scfUMailC:false}));
        }
    };
    useEffect(_ => {
        if(reauthentic && action === "email") HandlerUpdateEmail(true);
    },[]);
    return (
        <form className="dts names">
            <div className="form-1" style={{marginRight:"0px",width:"42%"}}>
                <div className="ctn-form">
                    <label htmlFor="scfUNickC">Nombre de Usuario</label>
                    <div className="flexie-D">
                        <input required minLength={2} onChange={e=>FormCheckerValues(setValues,"rxLQgtUqxI",e)} disabled={loading["scfUNickC"]} defaultValue={nick} type="text" name="scfUNickC"/>
                        <button onClick={HandlerUpdateNick} className="btn-Principal" disabled={loading["scfUNickC"]||!values["scfUNickC"]["validated"]||values["scfUNickC"]["initialValue"]===values["scfUNickC"]["value"]}>{loading["scfUNickC"]?"Actualizando":"Actualizar"}</button>
                    </div>
                </div>
            </div>
            <div className="form-1" style={{marginRight:"0px",width:"42%"}}>
                <div className="ctn-form">
                    <label htmlFor="scfUMailC">{message ? `Error: ${message}` : "Correo Electrónico"}</label>
                    <div className="flexie-D">
                        <input required minLength={6} onChange={e=>FormCheckerValues(setValues,"rxsNkFoWyn",e)} disabled={loading["scfUMailC"]} defaultValue={mail} type="email" name="scfUMailC"/>
                        <button onClick={HandlerUpdateEmail} className="btn-Principal" disabled={loading["scfUMailC"]||!values["scfUMailC"]["validated"]||values["scfUMailC"]["initialValue"]===values["scfUMailC"]["value"]}>{loading["scfUMailC"]?"Actualizando":"Actualizar"}</button>
                    </div>
                </div>
            </div>
        </form>
    )
};

export const FormAccountAdminPassword = ({fAuth}) => {
    const {ACAction:{ARActUpdateCurrentActionRequest,ARActUpdateCurrentReAuthState,ARActUpdateCurrentDataRequest},ACDispatch,ACState:{action:Gb733,value:gL848,reauthentic:s758R}} = useContext(AuthContext.Context);
    const {pathname,push} = useRouter();
    const stateValuesInit = {
        scfUPassF: initStateValidated,
        scfUPassL: initStateValidated
    };
    const [values,setValues] = useState(stateValuesInit);
    const [loading,setLoading] = useState(false);
    const [isEqual,setIsEqual] = useState(false);
    const [message,setMessage] = useState(null);
    const HandlerChecker = _ => {
        if(values["scfUPassF"]["validated"] && values["scfUPassL"]["validated"]) values["scfUPassF"]["value"] === values["scfUPassL"]["value"] ? setIsEqual(true) : setIsEqual(false);
        else setIsEqual(false);
    };
    const HandlerUpdatePass = async (withReauth = false) => {
        let __=null;setLoading(true);if(withReauth){
            ACDispatch(ARActUpdateCurrentDataRequest(null));
            ACDispatch(ARActUpdateCurrentActionRequest(null));
            ACDispatch(ARActUpdateCurrentReAuthState(false));
        }try{
            await updatePassword(fAuth.currentUser,gL848?gL848:values["scfUPassF"]["value"]);
        }catch({code}){
            switch(code){
                case "auth/weak-password":
                    __ = "La contraseña proporcionada no es muy segura, Intente con otra";
                break;
                case "auth/requires-recent-login":
                    __ = "reauthentic";
                break;
            }
        }if(__==="reauthentic"){
            ACDispatch(ARActUpdateCurrentActionRequest("password"));
            ACDispatch(ARActUpdateCurrentDataRequest(values["scfUPassF"]["value"]));
            push({pathname:"/cuenta/reauth",query:{continue:encodeURI(pathname)}});
        }else{
            if(__) setMessage(__);
            else{
                await fAuth.currentUser.reload();
                await fAuth.updateCurrentUser(fAuth.currentUser);
            }setMessage("Se ha Actualizado la Contraseña");
            setValues(stateValuesInit);
            setLoading(false);
        }
    };
    useMemo(_=>HandlerChecker(),[values]);
    useEffect(_=>{
        if(s758R && Gb733 === "password") HandlerUpdatePass(true);
    },[]);
    return (
        <Fragment>
            <h3 className="main">
                <span>{message ? message : "Actualizar la Contraseña"}</span>
                <div className="ctn-ediciones">
                    <button disabled={loading||!isEqual} onClick={HandlerUpdatePass}>
                        <i className="fa fa-pencil" aria-hidden="true"></i> {loading ? "Actualizando" : "Actualizar"}
                    </button>
                </div>
            </h3>
            <form className="dts names">
                <div className="form-1" style={{marginRight:"0px",width:"42%"}}>
                    <div className="ctn-form">
                        <label htmlFor="scfUPassF">{values["scfUPassF"]["message"] ? values["scfUPassF"]["message"] : "Tecleé la Nueva Contraseña"}</label>
                        <div className="flexie-D">
                            <input onChange={e=>FormCheckerValues(setValues,"rxaBReLXnH",e)} required minLength={8} type="password" name="scfUPassF" disabled={loading}/>
                        </div>
                    </div>
                </div>
                <div className="form-1" style={{marginRight:"0px",width:"42%"}}>
                    <div className="ctn-form">
                        <label htmlFor="scfUPassL">{values["scfUPassL"]["message"] ? values["scfUPassL"]["message"] : "Vuelva a Teclear la Contraseña"}</label>
                        <div className="flexie-D">
                            <input onChange={e=>FormCheckerValues(setValues,"rxaBReLXnH",e)} required minLength={8} type="password" name="scfUPassL" disabled={loading}/>
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    )
};