/*
@author LxingA [SUDesign]
@project PrintCards
@date 20/Ene/23 23:02
@description Complemento para Contener los Complementos de los Productos del Proyecto
*/
import {Fragment} from 'react';
import {FnUpper,FnDefVariableOnText} from '../util/crypto';
import {useRouter} from 'next/router';
import Loader from 'react-content-loader';
import Image from 'next/image';

export const AddonProductCategoryContainer = ({iterator,counter,title,queryName,filter,mini,tagID}) => {
    const [c7L86,KeI5ByyXvQta24Rx,Rg682] = filter;
    const stRefObjWithKeys = Object.keys(c7L86);
    const HandlerUpgradeCurrentState = eQ189 => KeI5ByyXvQta24Rx(gA444=>{
        gA444[queryName] = {value:eQ189,tagID:tagID};return {...gA444}
    });let _setRefStringClassNameBox = "BoxCateCtn";
    if(counter) _setRefStringClassNameBox = _setRefStringClassNameBox + " TagsDiv";
    if(mini) _setRefStringClassNameBox = _setRefStringClassNameBox + " MiniBtn";
    return (
        <Fragment>
            <h3>
                {title}
            </h3>
            <div className={_setRefStringClassNameBox}>
                {iterator.sort().map(({uniqKey,name},gQ944) => {
                    const stRefObjWithSaved=c7L86[queryName];
                    return (
                        <button className={stRefObjWithKeys.includes(queryName)&&stRefObjWithSaved?stRefObjWithSaved["value"]===uniqKey?"active":undefined:undefined} onClick={_=>HandlerUpgradeCurrentState(uniqKey)} key={gQ944} disabled={Rg682["global"]||stRefObjWithKeys.includes(queryName)&&stRefObjWithSaved&&stRefObjWithSaved["value"]===uniqKey}>
                            {FnUpper(name)}
                        </button>
                    )
                })}
            </div>
        </Fragment>
    )
};

export const AddonProductCategoryErrorContainer = ({message,text,callback}) => {
    const {back} = useRouter();
    return (
        <div className="Advertencia-producto">
            <div className="Boxadventencia">
                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                <p>{message}</p>
                <button onClick={_=>callback?callback():back()}>{text}</button>
            </div>
        </div>
    )
};

export const AddonProductProductContainer = ({loading,title,price,_id,image,mutate}) => {
    const {push} = useRouter();
    return loading ? (
        <div className="productoPC">
            <div className="ImgProductoPC">
                <Image src="/26d20ad5-edf2-4060-9893-cef7466c3b9d.webp" alt="Obteniendo..." width={250} height={250}/>
                <Loader width={15} height={15}>
                    <rect x={0} y={0} rx={0} ry={0} width={15} height={15}/>
                </Loader>
            </div>
            <div className="InfoProductoPC">
                <button>
                    <Loader width={50} height={20}>
                        <rect x={0} y={0} rx={0} ry={0} width={50} height={20}/>
                    </Loader>
                </button>
                <p className="precio">
                    <Loader width={15} height={15}>
                        <rect x={0} y={0} rx={0} ry={0} width={15} height={15}/>
                    </Loader>
                </p>
            </div>
        </div>
    ) : (
        <div className="productoPC">
            <div className="ImgProductoPC">
                <button className="uninvisible" onClick={_=>push({pathname:"/view",query:{product:_id}})}></button>
                <img src={image}/>
                {mutate ? (
                    <button>Personalizar</button>
                ) : (
                    <button>Añadir a Carrito</button>
                )}
            </div>
            <div className="InfoProductoPC">
                <button onClick={_=>push({pathname:"/view",query:{product:_id}})}>
                    <span>
                        {FnDefVariableOnText(title)}
                    </span>
                </button>
                <p className="precio">
                    ${price}
                </p>
            </div>
        </div>
    )
};