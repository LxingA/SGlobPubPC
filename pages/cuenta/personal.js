/*
@author LxingA [SUDesign]
@project PrintCards
@date 16/Dic/22 13:58
@description Página Principal para mostrar el Panel de Cliente [Configuración|Ajustes] del Proyecto
*/
import {Fragment,useState,useContext,useEffect} from 'react';
import {FormAccountConfig} from '../../addons/Form';
import {deleteUser} from 'firebase/auth';
import {updateDoc,doc,collection,deleteDoc} from 'firebase/firestore';
import {AuthContext} from '../../util/context';
import {useRouter} from 'next/router';
import Head from 'next/head';
import ViewAuth from '../../view/auth';
import ViewAccount from "../../view/account";

const AccountIndex = ({global,firebase,authentic,user}) => {
    const {ACState,ACAction:{ARActUpdateCurrentActionRequest,ARActUpdateCurrentReAuthState},ACDispatch} = useContext(AuthContext.Context);
    const {pathname,push,query} = useRouter();
    const [btUpdate,setBtUpdate] = useState(true);
    const [updated,setUpdated] = useState(false);
    const [infoUpdated,setInfoUpdated] = useState(null);
    const {siteName} = global;
    const HandlerUpdate = async e => {
        e.preventDefault();setUpdated(true);let __=[];
        const {FirebaseDatabase} = firebase;
        await Promise.all(
            infoUpdated.map(async ({name,value}) => {
                const stRefDoc = doc(collection(FirebaseDatabase,"user"),user.id);
                try{
                    switch(name){
                        case "scfCDGen":
                            await updateDoc(stRefDoc,{uGenre:value});
                        break;
                        case "scfCDBirth":
                            await updateDoc(stRefDoc,{uBirtD:value});
                        break;
                        case "scfCNftnames":
                            const [uFName,uSName] = value.split(" ");
                            await updateDoc(stRefDoc,{uFName,uSName});
                        break;
                        case "scfCNltnames":
                            const [uLName,uEName] = value.split(" ");
                            await updateDoc(stRefDoc,{uLName,uEName});
                        break;
                    }
                }catch(error){
                    
                }
            })
        );setUpdated(false);setBtUpdate(true);if(__.length>0){

        }else setInfoUpdated(null);
    };
    const HandlerEvent = values => {
        const stRefObjWithUpdateInfo = Object.values(values).filter(({validated,value,initialValue})=>(validated&&value!==initialValue));
        if(stRefObjWithUpdateInfo.length > 0){
            setInfoUpdated(stRefObjWithUpdateInfo.map(info=>({name:info.name,value:info.value})));
            setBtUpdate(false);
        }else setBtUpdate(true);
    };
    const HandlerDelete = async _ => {
        setUpdated(true);if(ACState["reauthentic"] === false){
            ACDispatch(ARActUpdateCurrentActionRequest("delete"));
            push({pathname:"/cuenta/reauth",query:{continue:encodeURI(`${pathname}`)}});
        }else{
            ACDispatch(ARActUpdateCurrentActionRequest(null));
            ACDispatch(ARActUpdateCurrentReAuthState(false));
            await deleteDoc(doc(collection(firebase["FirebaseDatabase"],"user"),user.id));
            await deleteUser(firebase["FirebaseAuth"].currentUser);
        }
    };
    useEffect(_ => {
        if(query.exec && query.exec === "delete") HandlerDelete();
    },[]);
    return (
        <ViewAuth authentic={authentic}>
            <Fragment>
                <Head>
                    <title>Datos Personales - {siteName}</title>
                </Head>
                <ViewAccount global={[firebase,global,authentic,user]} style="datosMain">
                    {user && (
                        <Fragment>
                            <h3 className="main">
                                <span>Datos Personales</span>
                                <div className="ctn-ediciones">
                                    <button disabled={btUpdate||updated} onClick={HandlerUpdate}>
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                        {updated?"Actualizando":"Actualizar"}
                                    </button>
                                </div>
                            </h3>
                            <FormAccountConfig user={user} callback={HandlerEvent} updating={updated} completed={infoUpdated}/>
                            <div className="more-options-container">
                                <div className="a-option">
                                    <div className="container-op">
                                        <h3>Eliminar cuenta</h3>
                                        <p>Elimina permanentemente tu cuenta en el sitio</p>
                                    </div>
                                    <div className="ctn-btn">
                                        <button className="btn-Principal" disabled={updated} onClick={HandlerDelete}>{updated?"Borrando":"Borrar Cuenta"}</button>
                                    </div>
                                </div>
                                <div className="a-option">
                                    <div className="container-op">
                                        <h3>Notificaciones</h3>
                                        <p>Recibe descuentos, novedades, estatus de tus pedidos en tú correo electrónico</p>
                                    </div>
                                    <div className="ctn-btn">
                                        <button className="btn-Principal" disabled={updated||!user.verified}>Permitir</button>
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

export default AccountIndex;