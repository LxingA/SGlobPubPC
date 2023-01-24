/*
@author LxingA [SUDesign]
@project PrintCards
@date 03/Ene/23 10:49
@description Complemento para Contener todos los Complementos Adicionales para el Componente Constructor del Proyecto
*/
import {useContext,useState,useEffect,useRef,Fragment} from 'react';
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

export const AddonLayersView = ({type,dialog,callback,globalDisabled}) => {
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
                callback[3](callback[0](uniqKey,type,stRefElInput.current.value));
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
                    <div style={globalDisabled?{background:"#c3bbb1",pointerEvents:"none"}:undefined} className="btn-Circle" onClick={_=>YFKHaMKn(zPDFW=>({...zPDFW,productListView:true}))}> {">"} </div>
                ) : (
                    <div style={globalDisabled?{background:"#c3bbb1",pointerEvents:"none"}:undefined} className="btn-Circle" onClick={_=>callback[3](callback[2](uniqKey,type))}> x </div>
                )}
            </div>
        )
    }else return (
        <div className="Options-Constructor-Capas">
            <div className="NumeroProducto">#</div>
            <div className="NombreProducto">crea una capa para empezar</div>
            <div className="btn-Circle" style={globalDisabled?{background:"#c3bbb1",pointerEvents:"none"}:undefined} onClick={_=>callback[3](callback[1](type))}> + </div>
        </div>
    )
};

export const AddonIconDesign = ({style,url,callback,visible,globalDisabled,currentProduct}) => {
    let __ = null;if(currentProduct.length > 0) __ = !Object.values(currentProduct[0]["variant"]).includes(null);
    const HandlerClickEvent = e => {
        e.preventDefault();
        if(visible) visible[0](h2G42=>{
            let _ = h2G42;
            _[visible[1]] = true;
            return {..._}
        });
        else callback(style.substring(3).toLowerCase())
    };return (
        <div onClick={HandlerClickEvent} className={`btn-edit-circle ${style}`} style={!__ || globalDisabled ? {background:"#c3bbb1",pointerEvents:"none"} : undefined}>
            <Image src={url} alt="Icono del Editor" width={44} height={26}/>
        </div>
    )
};

export const AddonConstructBox = ({storageClient,variantID,viewID,colorID}) => {
    const [url,setURL] = useState(null);
    useEffect(_ => {
        (async _ => {
            const stRefImageURLCurrentProduct = await getDownloadURL(ref(storageClient,`b/${variantID}_${viewID}[${colorID}].png`));
            setURL(stRefImageURLCurrentProduct);
        })()
    },[colorID,variantID,viewID]);
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

const AddonButtonTextTool = ({icon,style,text,callback,color,size,globalDisabled}) => {
    const stRefInputColor=useRef(null);let __={currentNumber:6,currentArray:[]};
    for(let x=__["currentNumber"];x<=64;x++){
        __["currentNumber"] += 2;__["currentArray"].push(__["currentNumber"]);
        x = __["currentNumber"];
    }return (
        <button onClick={_=>(!color&&!size)?callback(text.toLowerCase()):undefined} className="NavBtn" disabled={globalDisabled}>
            {(text === "Color" && color) ? (
                <Fragment>
                    <input ref={stRefInputColor} onChange={e=>callback(text.toLowerCase(),e)} type="color" defaultValue={color}/>
                    <span onClick={_=>stRefInputColor.current&&$(stRefInputColor.current).click()}>{text}</span>
                </Fragment>
            ) : (text === "Tamaño" && size) ? (
                <Fragment>
                    <select defaultValue={size} onChange={e=>callback(text.toLowerCase(),e)}>
                        {__["currentArray"].map((tG285,i)=>(
                            <option key={i} value={tG285}>{tG285}px</option>
                        ))}
                    </select>
                    <span>{text}</span>
                </Fragment>
            ) : (
                <Fragment>
                    <i className={icon?`fa fa-${icon}`:style} aria-hidden="true"></i>
                    <span>{text}</span>
                </Fragment>
            )}
        </button>
    )
};

const AddonConstructToolView = ({type,productID,elementID,colorHex,viewID,elementType,options={},visible,fontSize,globalDisabled,callback}) => {
    const HandlerCallback = (fnAction,refEvent=null) => {
        switch(fnAction){
            case "borrar":
                let _objMutate_ = elementType === "image" ? {id:elementID,currentURL:options["url"]} : {id:elementID};
                callback[2](callback[1](elementType,"delete",type,productID,viewID,_objMutate_));
            break;
            case "duplicar":
                callback[2](callback[1](elementType,"clone",type,productID,viewID,{id:elementID}));
            break;
            case "color":
                callback[2](callback[1](elementType,"update",type,productID,viewID,{id:elementID,color:refEvent.target.value}));
            break;
            case "tamaño":
                callback[2](callback[1](elementType,"update",type,productID,viewID,{id:elementID,size:refEvent.target.value}));
            break;
            case "fuente":
                const [,tN042GbPL9olXpwF] = visible;
                tN042GbPL9olXpwF(Ai073=>({...Ai073,fontListView:{show:true,current:{productID,elementID,viewID,elementType}}}));
            break;
        }
    };
    return (
        <div className="NavEditorTextos">
            {elementType === "text" && <AddonButtonTextTool globalDisabled={globalDisabled} callback={HandlerCallback} icon="font" text="Fuente"/>}
            {(colorHex && elementType === "text") && <AddonButtonTextTool globalDisabled={globalDisabled} callback={HandlerCallback} color={colorHex} style="btn-coloristo" text="Color"/>}
            {(fontSize && elementType === "text") && <AddonButtonTextTool globalDisabled={globalDisabled} callback={HandlerCallback} size={fontSize} text="Tamaño"/>}
            <AddonButtonTextTool globalDisabled={globalDisabled} callback={HandlerCallback} icon="trash" text="Borrar"/>
            <AddonButtonTextTool globalDisabled={globalDisabled} callback={HandlerCallback} icon="files-o" text="Duplicar"/>
        </div>
    )
};

export const AddonConstructorTextLayout = ({productID,type,textID,colorHex,callback,content,active,viewID,axis,visible,fontSize,fontName,fontStyled,globalDisabled}) => {
    const stRefContentDiv = useRef(null);
    const [text,setText] = useState(content);
    const HandlerClickOutsideEvent = e => {
        if(stRefContentDiv.current && (!stRefContentDiv.current.contains(e.target) && text !== "")) callback[2](callback[1]("text","update",type,productID,viewID,{id:textID,active:false,content:text}));
        else setText(content)
    };
    useEffect(_ => {
        (stRefContentDiv.current && active) ? document.addEventListener("click",HandlerClickOutsideEvent,true) : document.removeEventListener("click",HandlerClickOutsideEvent,true);
        if(stRefContentDiv.current) $(stRefContentDiv.current).draggable({
            containment: "parent",
            stop: E25s4 => callback[2](callback[1]("text","update",type,productID,viewID,{id:textID,axis:{x:E25s4.target.style.left,y:E25s4.target.style.top}})),
        });
        return _ => document.removeEventListener("click",HandlerClickOutsideEvent,true);
    },[active,text,fontSize]);
    return (
        <div className="Capa" ref={stRefContentDiv} style={{left:axis["x"],top:axis["y"]}}>
            {active && <AddonConstructToolView callback={callback} globalDisabled={globalDisabled} visible={visible} type={type} productID={productID} elementID={textID} colorHex={colorHex} viewID={viewID} elementType="text" fontSize={fontSize}/>}
            <div onClick={_=>callback[0](textID,"text")} className="gtexto">
                {active ? <textarea cols={10} autoFocus onChange={e=>setText(e.target.value)} style={{color:colorHex,fontSize:`${fontSize}px`,fontFamily:`${fontName},${fontStyled}`}}>{content}</textarea> : (
                    <span style={{cursor:"move",color:colorHex,fontSize:`${fontSize}px`,fontFamily:`${fontName},${fontStyled}`}}>{content}</span>
                )}
            </div>
        </div>
    )
};

export const AddonConstructBoxUploadImage = ({callback,type}) => {
    const {CCState:{products},CCDispatch,CCAction:{CRActElementsFnCurrentProductLayer}} = useContext(ConstructContext.Context);
    const {variant:{view:J231z},uniqKey:cC183} = products[type].filter(({active})=>active)[0];
    const stRefContentDraggable = useRef(null);
    const HandlerEventUploadFile = e => {
        e.preventDefault();const image=e.target.files[0];
        if(image.size >= 2097152) return;
        CCDispatch(CRActElementsFnCurrentProductLayer("image","add",type,cC183,J231z,{uri:URL.createObjectURL(image)}));
        callback(T1j01=>({...T1j01,uploadImageView:false}));
    };
    const HandlerFocusEvent = entry => stRefContentDraggable.current && entry ? $(stRefContentDraggable.current).addClass("draggable-input-focus") : $(stRefContentDraggable.current).removeClass("draggable-input-focus");
    return (
        <div className="box-Dagrabble">
            <div className="draggable-input" ref={stRefContentDraggable}>
                <div className="info-dgg">
                    <i className="fa fa-file-image-o" aria-hidden="true"></i>
                    <p>Puede arrastrar su imagen hasta aquí <span>ó</span></p>
                </div>
                <input onDragLeave={_=>HandlerFocusEvent(false)} onDragEnd={_=>HandlerFocusEvent(false)} onDragExit={_=>HandlerFocusEvent(false)} onDragStart={_=>HandlerFocusEvent(true)} onDragOver={_=>HandlerFocusEvent(true)} onDragEnter={_=>HandlerFocusEvent(true)} type="file" accept="image/*" onChange={HandlerEventUploadFile}/>
            </div>
            <button onClick={_=>$(stRefContentDraggable.current).find("input").click()} className="viewProduct"><i className="fa fa-search" aria-hidden="true"></i> Seleccione manualmente la imagen</button>
        </div>
    )
};

export const AddonConstructViewUploadFile = ({url,width,type,productID,imageID,viewID,active,callback,axis,globalDisabled}) => {
    const stRefContentDiv = useRef(null);
    const HandlerOutsideEvent = e => {
        if(!stRefContentDiv.current.contains(e.target)) callback[2](callback[1]("image","update",type,productID,viewID,{id:imageID,active:false}));
    };
    useEffect(_ => {
        (stRefContentDiv.current && globalDisabled !== true) ? document.addEventListener("click",HandlerOutsideEvent,true) : document.removeEventListener("click",HandlerOutsideEvent,true);
        if(stRefContentDiv.current && globalDisabled !== true) $(stRefContentDiv.current).draggable({
            containment: "parent",
            stop: Rh164 => callback[2](callback[1]("image","update",type,productID,viewID,{id:imageID,axis:{x:Rh164.target.style.left,y:Rh164.target.style.top}}))
        });return _ => document.removeEventListener("click",HandlerOutsideEvent,true);
    },[]);
    return globalDisabled ? (
        <div className="Capa" ref={stRefContentDiv} style={{left:axis["x"],top:axis["y"]}}>
            <img src={url} width={`${width}px`}/>
        </div>
    ) : (
        <div className="Capa" ref={stRefContentDiv} style={{left:axis["x"],top:axis["y"]}}>
            {active && <AddonConstructToolView globalDisabled={globalDisabled} callback={callback} type={type} productID={productID} elementID={imageID} viewID={viewID} options={{url}} elementType="image"/>}
            <div className="gtexto" onClick={_=>callback[0](imageID,"image")}>
                <img style={{cursor:"move"}} src={url} width={`${width}px`}/>
            </div>
        </div>
    )
};

export const AddonConstructBoxFontContainerView = ({title,name,style,type,container,callback}) => {
    const {CCState:{products},CCDispatch,CCAction:{CRActElementsFnCurrentProductLayer,CRActUpdateCurrentDisabledConstruct}} = useContext(ConstructContext.Context);
    const {font:gW676} = products[type].filter(({uniqKey})=>uniqKey===container["productID"])[0]["variant"]["element"][container["elementType"]].filter(({uniqKey})=>uniqKey===container["elementID"])[0];
    const stRefFontParam = {fontFamily:`${name},${style}`};
    const HandlerUpdateFont = _ => {
        CCDispatch(CRActElementsFnCurrentProductLayer(container["elementType"],"update",type,container["productID"],container["viewID"],{id:container["elementID"],font:name,style}));
        callback(eP899=>({...eP899,fontListView:{show:false,current:null}}));
    };
    useEffect(_ => {
        CCDispatch(CRActUpdateCurrentDisabledConstruct(true));
        return _ => CCDispatch(CRActUpdateCurrentDisabledConstruct(false))
    },[]);
    return (
        <div className="fontBox-Container">
            <span style={stRefFontParam}>{title}</span>
            <input style={stRefFontParam} type="text" placeholder="Escribe aquí para probar"/>
            <button onClick={HandlerUpdateFont} className="btn-Principal" disabled={gW676===name}>{gW676===name?"Aplicado":"Aplicar"}</button>
        </div>
    )
};