/*
@author LxingA [SUDesign]
@project PrintCards
@date 03/Ene/23 05:05
@description Componente con los Componentes del Constructor Global
*/
import {useContext,Fragment} from 'react';
import {ConstructContext} from '../util/context';
import {AddonBoxPrice,AddonIconDesign,AddonConstructBoxMessage,AddonConstructBoxUploadImage,AddonConstructBoxFontContainerView} from '../addons/Construct';
import {AddonLayersView,AddonConstructBox,AddonConstructorTextLayout,AddonConstructViewUploadFile} from '../addons/Construct';
import {FnUpper} from '../util/crypto';
import Image from 'next/image';

export const FontsView = ({visible,fonts}) => {
    const [y33L6,ysF07rz2sQVqrcz7] = visible;
    return y33L6["fontListView"] && (
        <div className="Pop-Up-Fuentes">
            <i className="fa fa-times" aria-hidden="true" id="Closeet" onClick={_=>ysF07rz2sQVqrcz7(zS679=>({...zS679,fontListView:false}))}></i>
            <div className="cajitaFuentes">
                <h3>Fuentes</h3>
                <div className="inputSearch">
                    <input type="search" />
                    <i className="fa fa-search" aria-hidden="true"></i>
                </div>
                <div className="Fuentes-Div">
                    {fonts.map(({uniqKey,title,name})=>(
                        <AddonConstructBoxFontContainerView key={uniqKey} title={title} name={name}/>
                    ))}
                </div>
            </div>
        </div>
    )
};

export const ProductListView = ({visible,type}) => {
    const [wYxwI,HLQiNXVB] = visible;
    const {CCState:{products},CCAction:{CRActDeleteCurrentProductLayer,CRActActiveCurrentProductLayer,CRActCloneCurrentProductLayer},CCDispatch} = useContext(ConstructContext.Context);
    const gtCurrentActiveLayout = products[type].filter(({active})=>!active);
    const HandlerDeleteProduct = key => {
        CCDispatch(CRActDeleteCurrentProductLayer(key,type));
        if(gtCurrentActiveLayout.length <= 1) HLQiNXVB(dP376=>({...dP376,productListView:false}));
    };
    const HandlerActiveProduct = key => {
        CCDispatch(CRActActiveCurrentProductLayer(key,type));
        HLQiNXVB(o9C23=>({...o9C23,productListView:false}));
    };
    const HandlerCloneProduct = key => CCDispatch(CRActCloneCurrentProductLayer(key,type));
    return wYxwI["productListView"] && (
        <div className="Pop-Up-Changes">
            <div className="ctn-boxFloating">
                <h3>Aquí podrás visualizar las otras {type}s creadas para poder editarlas</h3>
                <div className="Lista-Productos-Creados">
                    {gtCurrentActiveLayout.map(({uniqKey,id,name})=>(
                        <div className="Producto-Creado" key={uniqKey}>
                            <div className="NumeroProducto">{id}#</div>
                            <div className="NombreProducto">{name}</div>
                            <div className="btn-more-options-p">
                                <div className="circle-edit-pa" onClick={_=>HandlerCloneProduct(uniqKey)}>
                                    <i className="fa fa-file-o" aria-hidden="true"></i>
                                </div>
                                <div className="circle-edit-pa" onClick={_=>HandlerDeleteProduct(uniqKey)}>
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                </div>
                                <div className="circle-edit-pa" onClick={_=>HandlerActiveProduct(uniqKey)}>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="FloatingCerrar" onClick={_=>HLQiNXVB(WjXyH=>({...WjXyH,productListView:false}))}>
                    Cerrar Ventana
                </button>
            </div>
        </div>
    )
};

export const PriceBoxView = ({type,info}) => {
    const {CCState:{products}} = useContext(ConstructContext.Context);let _TXT_=[];let _TOTAL_ =0;let _SUM_=0;
    const gtCurrentActiveLayout = products[type].filter(({active})=>active);
    if(gtCurrentActiveLayout.length > 0) _TXT_ = [info[type][gtCurrentActiveLayout[0]["variant"].type].price,gtCurrentActiveLayout[0]["variant"].type];
    else _TXT_ = ["0","sin Especificar"];
    for(let _ = 0;_ <= (products[type].length - 1); _++){
        _SUM_ += Number(parseInt(info[type][products[type][_]["variant"].type].price));
        if(_ === (products[type].length - 1)) _TOTAL_ = _SUM_;
    }return (
        <div className="caja-info-costo">
            <AddonBoxPrice price={_TXT_[0]} style="costo-total" title={`${FnUpper(type)} ${FnUpper(_TXT_[1])}`}/>
            <AddonBoxPrice price={_TOTAL_} style="total-PedidoCompleto" title="Total"/>
            <button className="btn-more-options-p-d" disabled={_TOTAL_===0}>Pagar</button>
        </div>
    )
};

export const BoxConstructView = ({type,visible,info,storage}) => {
    const {CCState:{products,params},CCAction:{CRActUpdateCurrentParamsConstruct,CRActElementsFnCurrentProductLayer},CCDispatch} = useContext(ConstructContext.Context);
    const gtCurrentActiveLayout = products[type].filter(({active})=>active);let ___;
    if(gtCurrentActiveLayout.length === 0) ___ = params[type];
    else ___ = gtCurrentActiveLayout[0]["variant"].type;
    const details = info[type][___];
    const HandlerCheckerType = _ => {
        let prefix;switch(type){
            case "taza":
                prefix=gtCurrentActiveLayout[0]["variant"].color;if(!gtCurrentActiveLayout[0]["variant"].view) return <AddonConstructBoxMessage message={`Favor de seleccionar un lado de la ${type} ${gtCurrentActiveLayout[0]["variant"].type} para comenzar`}/>;
                else if(!gtCurrentActiveLayout[0]["variant"].color) return <AddonConstructBoxMessage message={`Favor de seleccionar un color de la ${type} ${gtCurrentActiveLayout[0]["variant"].type} para comenzar`}/>;
            break;
        }const gtCurrentViewObj = details["views"].filter(({uniqKey})=>uniqKey===gtCurrentActiveLayout[0]["variant"].view)[0];
        return <AddonConstructBox storageClient={storage} viewID={gtCurrentViewObj["uniqKey"]} variantID={details["uniqKey"]} variantPrefix={prefix}/>
    };
    const HandlerClickEvent = (property,value) => CCDispatch(CRActUpdateCurrentParamsConstruct(property,value,type,gtCurrentActiveLayout[0]["uniqKey"]));
    const HandlerCallback = fn => {
        if(fn === "design"){

        }else CCDispatch(CRActElementsFnCurrentProductLayer(fn,"add",type,gtCurrentActiveLayout[0]["uniqKey"],gtCurrentActiveLayout[0]["variant"].view))
    };
    const HandlerClickActiveElement = (elementID,elementType) => CCDispatch(CRActElementsFnCurrentProductLayer(elementType,"update",type,gtCurrentActiveLayout[0]["uniqKey"],gtCurrentActiveLayout[0]["variant"].view,{id:elementID,active:true}));
    return (
        <div className="My-Account" data-aos="fade-left" data-aos-duration="9000">
            <div id="Constructor">
                <AddonLayersView type={type} dialog={visible}/>
                <div className="Flexie-Constructor">
                    <div className="datos-Cambiantes">
                        {type === "taza" ? (
                           <Fragment>
                                <div className="Dato-Camb Taza-Variables">
                                    <h3>Tipo de Taza</h3>
                                    {Object.keys(info[type]).map((pN695,i)=>(
                                        <button onClick={_=>HandlerClickEvent("type",pN695)} disabled={gtCurrentActiveLayout.length===0} key={i} className={`btn-Basico${gtCurrentActiveLayout.length>0?gtCurrentActiveLayout[0]["variant"].type===pN695?" Active":"":""}`}>{FnUpper(pN695)}</button>
                                    ))}
                                </div>
                                <div className="Dato-Camb">
                                    <h3>Lado de la Taza</h3>
                                    {details["views"].map(({uniqKey,name})=>(
                                        <button onClick={_=>HandlerClickEvent("view",uniqKey)} disabled={gtCurrentActiveLayout.length===0} key={uniqKey} className={`btn-Basico${gtCurrentActiveLayout.length>0?gtCurrentActiveLayout[0]["variant"].view===uniqKey?" Active":"":""}`}>{name}</button>
                                    ))}
                                </div>
                                <div className="Dato-Camb">
                                    <h3>Colores</h3>
                                    {details["colors"].map(({uniqKey,name})=>(
                                        <button onClick={_=>HandlerClickEvent("color",uniqKey)} disabled={gtCurrentActiveLayout.length===0} key={uniqKey} className={`btn-Circle-Color ${name}${gtCurrentActiveLayout.length>0?gtCurrentActiveLayout[0]["variant"].color===uniqKey?" active":"":""}`}></button>
                                    ))}
                                    {(gtCurrentActiveLayout.length > 0 && gtCurrentActiveLayout[0]["variant"].type === "magica") && (
                                        <div className="Info-Extra">
                                            <Image src="/06dffa3d-d791-486e-82eb-f61f24c7a955.jpeg" alt="Demostración de la Taza Mágica" width={600} height={225}/>
                                            <p>
                                                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                                Advertencia: El diseño impreso sobre la talla, no se notará sobre lo negro hasta agregarle líquido muy caliente a la taza, y este se tornará al color blanco básico, así revelando el diseño, como se muestra en la imagen de ejemplo.
                                            </p>
                                        </div>
                                    )}
                                </div>
                           </Fragment>
                        ) : type === "playera" ? (
                            <p></p>
                        ) : (
                            <p></p>
                        )}
                    </div>
                    <div className="Producto-Changes">
                        <div className="MainChanges">
                            {products[type].length === 0 ? <AddonConstructBoxMessage message={`Haz click en el "+" para crear tú ${type}`}/> : HandlerCheckerType()}
                            <div className={`EditorCapas Taza-Especificacion${gtCurrentActiveLayout.length > 0 ? ` ${gtCurrentActiveLayout[0]["variant"].type}${gtCurrentActiveLayout[0]["variant"].view}` : undefined}`}>
                                {gtCurrentActiveLayout.length > 0 && gtCurrentActiveLayout[0]["variant"]["element"]["text"].filter(({view})=>view===gtCurrentActiveLayout[0]["variant"].view).map(({uniqKey,content,color,active,axis,size})=>(
                                    <AddonConstructorTextLayout visible={visible} axis={axis} viewID={gtCurrentActiveLayout[0]["variant"].view} callback={[HandlerClickActiveElement]} active={active} colorHex={color} key={uniqKey} productID={gtCurrentActiveLayout[0]["uniqKey"]} content={content} type={type} textID={uniqKey} fontSize={size}/>
                                ))}
                                {gtCurrentActiveLayout.length > 0 && gtCurrentActiveLayout[0]["variant"]["element"]["image"].filter(({view})=>view===gtCurrentActiveLayout[0]["variant"].view).map(({uniqKey,url,width,active,axis})=>(
                                    <AddonConstructViewUploadFile callback={[HandlerClickActiveElement]} active={active} key={uniqKey} url={url} width={width} type={type} productID={gtCurrentActiveLayout[0]["uniqKey"]} imageID={uniqKey} viewID={gtCurrentActiveLayout[0]["variant"].view} axis={axis}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="Btn-Personalizar">
                        <div className="barra-left">
                            <AddonIconDesign callback={HandlerCallback} type={type} style="AddText" url="/6f2b809a-be47-4cdf-9be7-03123392ff3a.png"/>
                            <AddonIconDesign visible={[visible[1],"uploadImageView"]} callback={HandlerCallback} type={type} style="AddImage" url="/92986322-fec4-4883-aa7e-a5b57eb302c2.png"/>
                            <AddonIconDesign visible={[visible[1],"designListView"]} callback={HandlerCallback} type={type} style="AddDesign" url="/e78af129-f827-46c5-bf77-be62acb5bfaf.png"/>
                        </div>
                    </div>
                </div>
                <button className="viewProduct" style={products[type].length === 0 || (gtCurrentActiveLayout.length > 0 && Object.values(gtCurrentActiveLayout[0]["variant"]).includes(null)) ? {background:"#c3bbb1",pointerEvents:"none"} : undefined} disabled={products[type].length === 0 || (gtCurrentActiveLayout.length > 0 && Object.values(gtCurrentActiveLayout[0]["variant"]).includes(null))}>
                    <i className="fa fa-search" aria-hidden="true"></i> Vista Prevía
                </button>
            </div>
        </div>
    )
};

export const PreviewBoxView = () => {
    return (
        <div className="VistaPrevia">

        </div>
    )
};

export const DesignListView = ({visible}) => {
    const [wD314,Jp58BTe3w9Q4G26t] = visible;
    return wD314["designListView"] && (
        <div className="Pop-UPDisenios">

        </div>
    )
};

export const UploadImageView = ({visible,type}) => {
    const [Jk045,Rhxm4AXP9HC3xq1n] = visible;
    return Jk045["uploadImageView"] && (
        <div className="Pop-UPDisenios Images">
            <div className="box-Grande">
                <i className="fa fa-times" aria-hidden="true" onClick={_=>Rhxm4AXP9HC3xq1n(H0e48=>({...H0e48,uploadImageView:false}))} id="Closeet"></i>
                <AddonConstructBoxUploadImage callback={Rhxm4AXP9HC3xq1n} type={type}/>
            </div>
        </div>
    )
};

export const ButtonAddProduct = ({type}) => {
    const {CCAction:{CRActSetNewProductLayer},CCDispatch,CCState:{products,params}} = useContext(ConstructContext.Context);
    return products[type].length >= 1 && (
        <div className="agregar-Producto-perso" onClick={_=>CCDispatch(CRActSetNewProductLayer(type))}>
            +
        </div>
    )
};