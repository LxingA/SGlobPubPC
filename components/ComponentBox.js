/*
@author LxingA [SUDesign]
@project PrintCards
@date 16/Dic/22 15:34
@description Componentes Globales con Cajas (box) para el Proyecto
*/
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

export const BannerGlobalTitle = ({title,subtitle,promotion,viewID}) => {
    return (
        <div className={`MainTitlePa${promotion?" PromosTItle":""}`} data-aos="fade-up" data-aos-duration="3000">
            <div className="TitleContentPa">
                <span>{title}</span>
                <p>{subtitle}</p>
            </div>
        </div>
    )
};