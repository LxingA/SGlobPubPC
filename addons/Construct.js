/*
@author LxingA [SUDesign]
@project PrintCards
@date 03/Ene/23 10:49
@description Complemento para Contener todos los Complementos Adicionales para el Componente Constructor del Proyecto
*/
import {useContext,useState,useEffect,useRef} from 'react';
import {ref,getDownloadURL} from 'firebase/storage';
import {ConstructContext} from '../util/context';
import Image from 'next/image';

export const AddonBoxPrice = ({style,title,price}) => {
    const defPrefixCount = price === 1 ? "peso" : "pesos";
    return (
        <div className={style}>
            <p>{title}</p>
            $<span>{price}</span> {defPrefixCount} 
        </div>
    )
};

export const AddonLayersView = ({type,dialog}) => {
    const {CCAction:{CRActUpdateCurrentNameProductLayer,CRActSetNewProductLayer,CRActDeleteCurrentProductLayer},CCDispatch} = useContext(ConstructContext.Context);
    const stRefElInput = useRef(null);
    const [,YFKHaMKn] = dialog;
    const [show,setShow] = useState(false);
    const [output,setOutput] = useState({created:false,refFn:null,autoRemoveEvent:false});
    const {CCState:{products}} = useContext(ConstructContext.Context);
    useEffect(_ => {
        if(output["created"] && output["autoRemoveEvent"]){
            document.removeEventListener("click",output["refFn"],true);
            setOutput({created:false,refFn:null,autoRemoveEvent:false});
        }if(output["created"] && stRefElInput.current) document.addEventListener("click",output["refFn"],true);
        return _ => (output["created"] && stRefElInput.current) && document.removeEventListener("click",output["refFn"],true);
    },[output]);
    if(products[type].length > 0){
        const {name,uniqKey,id} = products[type].filter(({active})=>active)[0];
        const HandlerOutputEvent = e => {
            if(!stRefElInput.current.contains(e.target) && (stRefElInput.current.value !== "" && stRefElInput.current.value !== name && /^([A-Za-z0-9À-ÿ\u00f1\u00d1 ]+)$/.test(stRefElInput.current.value))){
                CCDispatch(CRActUpdateCurrentNameProductLayer(uniqKey,type,stRefElInput.current.value));
                setOutput(uV168=>({...uV168,autoRemoveEvent:true}));
                setShow(false);
            }else{
                setOutput(tP123=>({...tP123,autoRemoveEvent:true}));
                setShow(false);
            }
        };
        const HandlerChangeEvent = _ => setOutput({created:true,refFn:HandlerOutputEvent});
        return (
            <div className="Options-Constructor-Capas" key={uniqKey}>
                <div className="NumeroProducto">{id}#</div>
                {show ? (
                    <div className="NombreProducto">
                        <input type="text" onBlur={HandlerChangeEvent} defaultValue={name} ref={stRefElInput} autoFocus/>
                    </div>
                ) : (
                    <div className="NombreProducto" style={{cursor:"pointer"}} onClick={_=>setShow(true)}>{name}</div>
                )}
                {products[type].length > 1 ? (
                    <div className="btn-Circle" onClick={_=>YFKHaMKn(zPDFW=>({...zPDFW,productListView:true}))}> {">"} </div>
                ) : (
                    <div className="btn-Circle" onClick={_=>CCDispatch(CRActDeleteCurrentProductLayer(uniqKey,type))}> x </div>
                )}
            </div>
        )
    }else return (
        <div className="Options-Constructor-Capas">
            <div className="NumeroProducto">#</div>
            <div className="NombreProducto">crea una capa para empezar</div>
            <div className="btn-Circle" onClick={_=>CCDispatch(CRActSetNewProductLayer(type))}> + </div>
        </div>
    )
};

export const AddonIconDesign = ({style,url,type}) => {
    const {CCState:{products}} = useContext(ConstructContext.Context);
    const gtCurrentActiveLayout = products[type].filter(({active})=>active);let __ = null;
    if(gtCurrentActiveLayout.length > 0) __ = !Object.values(gtCurrentActiveLayout[0]["variant"]).includes(null);
    return (
        <div className={`btn-edit-circle ${style}`} style={products[type].length === 0 || !__ ? {background:"#c3bbb1",pointerEvents:"none"} : undefined}>
            <Image src={url} alt="Icono del Editor" width={44} height={26}/>
        </div>
    )
};

export const AddonConstructBox = ({storageClient,variantID,viewID,variantPrefix}) => {
    const [url,setURL] = useState(null);
    const HandlerHandler = async _ => {
        const stRefCurrentBackgroundRequest = ref(storageClient,`b/${variantID}_${viewID}[${variantPrefix}].png`);
        const gtRefURLCurrentBackgroundRequest = await getDownloadURL(stRefCurrentBackgroundRequest);
        setURL(gtRefURLCurrentBackgroundRequest);
    };
    useEffect(_ => {
        HandlerHandler()
    },[viewID,variantPrefix]);
    return url ? <img src={url}/> : (
        <div className="CrearPrdt">
            Cargando...
        </div>
    )
};

export const AddonConstructBoxMessage = ({message}) => {
    return (
        <div className="CrearPrdt">
           {message}
        </div>
    )
};