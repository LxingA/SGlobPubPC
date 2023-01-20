/*
@author LxingA [SUDesign]
@project PrintCards
@date 16/Dic/22 15:34
@description Componentes Globales con Cajas (box) para el Proyecto
*/
import {AddonBoxBannerGlobal} from '../addons/Box';
import Loader from 'react-content-loader';
import Enlace from 'next/link';

export const AccountBoxLink = ({to,title,description,icon,arrow}) => {
    return (
        <Enlace href={to}>
            <div className="a-box">
                <div className="icon-box">
                    <i className={`fa fa-${icon}`} aria-hidden="true"></i>
                </div>
                <div className="txt-info">
                    <h3>{title}</h3>
                    {description && (
                        <p>{description}</p>
                    )}
                </div>
                {arrow && (
                    <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                )}
            </div>
        </Enlace>
    )
};

export const BannerGlobal = ({image,subtitle,title,description,href,text,promotion,pageID,viewID}) => {
    return (
        <div className={`Seccion-Grande${promotion?" Promocion":""}`} data-aos="fade-up" data-aos-duration="3000">
            <img src={image} alt={title}/>
            <div className="sccion-txt">
                <span>{subtitle}</span>
                <h3>{title}</h3>
                <p dangerouslySetInnerHTML={{__html:description}}></p>
                <Enlace href={href}>{text}</Enlace>
            </div>
        </div>
    )
};

export const BannerGlobalProduct = ({title,description,text,to,image}) => {
    return (
        <div className="CategoriaDiv">
            <div className="content-txt" data-aos="fade-right">
                <h3>{title}</h3>
                <p>{description}</p>
                {(text && to) && (
                    <Enlace href={to}>
                        {text}
                    </Enlace>)
                }
            </div>
            <img className="FondoCategoria" src={image} alt={`Fondo del Producto ${title}`}/>
        </div>
    )
};

export const BannerGlobalTitle = ({title,subtitle,promotion,viewID,loading}) => {
    const stRefClassNameWithFullType = `MainTitlePa${promotion?" PromosTItle":""}`;
    return loading ? (
        <div className={stRefClassNameWithFullType} data-aos="fade-up" data-aos-duration="3000">
            <div className="TitleContentPa">
                <span>
                    <Loader width={60} height={30}>
                        <rect x={0} y={0} rx={0} ry={0} width={60} height={30}/>
                    </Loader>
                </span>
            </div>
        </div>
    ) : (
        <div className={stRefClassNameWithFullType} data-aos="fade-up" data-aos-duration="3000">
            <div className="TitleContentPa">
                <span>{title}</span>
                <p>{subtitle}</p>
            </div>
        </div>
    )
};


export const BannerGlobalMultiple = ({double,iterator,reverse}) => {
    let _stRefObjCreated_=[];for(let R2p01=0;R2p01<=(iterator.length-1);R2p01++){
        if(double){
            if(!reverse) _stRefObjCreated_.push(<AddonBoxBannerGlobal key={R2p01} full={(R2p01 / 2) % 1 !== 0} {...iterator[R2p01]}/>);
        }else _stRefObjCreated_.push(<AddonBoxBannerGlobal key={R2p01} {...iterator[R2p01]}/>);
    }return _stRefObjCreated_
};