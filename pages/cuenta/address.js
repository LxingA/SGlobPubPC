/*
@author LxingA [SUDesign]
@project PrintCards
@date 21/Dic/22 19:27
@description Página para Administrar las Direcciones del Cliente en el Proyecto
*/
import {Fragment,useEffect,useState} from 'react';
import {useRouter} from 'next/router';
import {FormAccountAddressCreate} from '../../addons/Form';
import {getDoc,doc,collection,updateDoc,deleteDoc,setDoc} from 'firebase/firestore';
import Head from 'next/head';
import Enlace from 'next/link';
import ViewAuth from '../../view/auth';
import ViewAccount from "../../view/account";

const AccountIndex = ({global,firebase,authentic,user}) => {
    const {pathname,query,push,replace} = useRouter();
    const {siteName} = global;
    const [address,setAddress] = useState(null);
    const [refresh,setRefresh] = useState(null);
    const [loader,setLoader] = useState({stEventDefault:{active:false,refID:null},stEventDelete:false});
    const stRefDoc = user && doc(collection(firebase["FirebaseDatabase"],"address"),user.id);
    const HandlerGetAddress = async _ => {
        const gtRefObj = (await getDoc(stRefDoc)).data();
        const stRefObjWithMap = Object.keys(gtRefObj).map((attr,i)=>{
            let gtCurrentObj=Object.values(gtRefObj)[i];
            gtCurrentObj["uniqKey"]=attr;return gtCurrentObj
        });return stRefObjWithMap
    };
    const HandlerEventAddress = async _ => {
        const gtRefDocCurrent = await HandlerGetAddress();
        setAddress(gtRefDocCurrent);
    };
    const HandlerSetDefault = async uniqKey => {
        setLoader(bk=>({...bk,stEventDefault:{active:true,refID:uniqKey}}));let _obj_={};
        const gtRefObjCurrent = await HandlerGetAddress();gtRefObjCurrent.forEach(Mf475=>{
            const cUniqKey=Mf475["uniqKey"];let __=Mf475;delete __["uniqKey"];
            if(cUniqKey===uniqKey) __["active"] = true;
            else __["active"] = false;_obj_[cUniqKey]=__;return __
        });await updateDoc(stRefDoc,_obj_);const currentTime=new Date().toISOString();setRefresh(currentTime);setLoader(bk=>({...bk,stEventDefault:{active:false,refID:null}}));
    };
    const HandlerDelete = async uniqKey => {
        setLoader(bk=>({...bk,stEventDelete:true}));let _obj_={};
        const gtObjCurrentDel = await HandlerGetAddress();gtObjCurrentDel.forEach(lN908=>{
            const cUniqKey=lN908["uniqKey"];let __=lN908;delete __["uniqKey"];
            if(cUniqKey!==uniqKey) _obj_[cUniqKey]=__;
        });await deleteDoc(stRefDoc);await setDoc(stRefDoc,_obj_);
        await updateDoc(doc(collection(firebase["FirebaseDatabase"],"user"),user.id),{uLengthAddress:(user["info"].uLengthAddress-1)});
        const currentTime=new Date().toISOString();setRefresh(currentTime);setLoader(bk=>({...bk,stEventDelete:false}));
    };
    useEffect(_ => {
        !query.view && push({pathname,query:{view:"all"}});
        if(user) query.view === "all" && user["info"].uLengthAddress > 0 && HandlerEventAddress();
        if(user) query.view === "add" && user["info"].uLengthAddress >= 4 && replace({pathname,query:{view:"all"}});
    },[user,query,refresh]);
    return (
        <ViewAuth authentic={authentic}>
            <Fragment>
                <Head>
                    <title>Direcciones - {siteName}</title>
                </Head>
                <ViewAccount global={[firebase,global,authentic,user]} style="datosMain">
                    {user && query.view === "all" ? (
                        <Fragment>
                            <h3 className="main">
                                <span>Direcciones</span>
                                <div className="ctn-ediciones">
                                    {user["info"].uLengthAddress >= 4 ? (
                                        <button disabled style={{pointerEvents:"none"}}>
                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                            Nueva Dirección
                                        </button>
                                    ) : (
                                        <Enlace href={{pathname,query:{view:"add"}}}>
                                            <button>
                                                <i className="fa fa-plus" aria-hidden="true"></i>
                                                Nueva Dirección
                                            </button>
                                        </Enlace>
                                    )}
                                </div>
                            </h3>
                            <div className="container-maincoin direcciones">
                                {user["info"].uLengthAddress === 0 ? (
                                    <p>Sni</p>
                                ) : address ? address.map(({uniqKey,name,addr,ext,street,colony,cp,state,city,ref,active})=>(
                                    <div className="Caja-Direccion" key={uniqKey}>
                                        <h3 className="main-title-D">
                                            <span>{name}</span>
                                            <div className="ctn-ediciones">
                                                <button onClick={_=>HandlerDelete(uniqKey)} disabled={loader["stEventDelete"]}>
                                                    <i className="fa fa-times" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </h3>
                                        <div className="content-direc">
                                            <p className="calles">
                                                {addr} 
                                                <span className="nexterior">
                                                    #{ext}
                                                </span>
                                                <span className="entrecalles">
                                                    {street}
                                                </span>
                                            </p>
                                            <p className="colonia">
                                                {colony}
                                                <span className="codigoPostal">
                                                    {cp}
                                                </span>
                                            </p>
                                            <p className="estados">
                                                <span>{city}</span>
                                                <span>{state}</span>
                                            </p>
                                            <p className="referencias">
                                                Referencía: {ref}
                                            </p>
                                        </div>
                                        <div className="ctn-ediciones">
                                            <button onClick={_=>push({pathname,query:{view:"edit",id:uniqKey}})}>
                                                <i className="fa fa-pencil" aria-hidden="true"></i> Modificar
                                            </button>
                                            {active ? (
                                                <button className="preder" style={{pointerEvents:"none"}} disabled>Predeterminado</button>
                                            ) : (
                                                <button disabled={loader["stEventDefault"].active} onClick={_=>HandlerSetDefault(uniqKey)}>
                                                    {loader["stEventDefault"].refID ? loader["stEventDefault"].refID === uniqKey ? loader["stEventDefault"].active ? "Estableciendo" : "Establecer cómo Predeterminado" : "Establecer cómo Predeterminado" : "Establecer cómo Predeterminado"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )) : (
                                    <p>Cargando</p>
                                )}
                            </div>
                        </Fragment>
                    ) : query.view === "add" ? (
                        <FormAccountAddressCreate user={user} fDatabase={firebase["FirebaseDatabase"]}/>
                    ) : query.view === "edit" && (
                        <FormAccountAddressCreate user={user} fDatabase={firebase["FirebaseDatabase"]} Updated handler={HandlerGetAddress}/>
                    )}
                </ViewAccount>
            </Fragment>
        </ViewAuth>
    )
};

export default AccountIndex;