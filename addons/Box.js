/*
@author LxingA [SUDesign]
@project PrintCards
@date 18/Dic/22 21:39
@description Complemento para Contener los Contenedores Globales para el Proyecto
*/
import Loader from 'react-content-loader';
import Enlace from 'next/link';

export const BoxMessage = ({children}) => {
    return (
        <div className="floatingCaja">
            <i className="fa fa-heart-o" aria-hidden="true"></i>
            {children}
        </div>
    )
};

export const AddonBoxBannerGlobal = ({full,subtitle,title,text,to,image,uniqKey,description,loading}) => {
    const stRefClassNameWithFullType = `Med-Div${full?"-large":""}`;
    const stRefWidthLoaderMode = full ? 1024 : 500;
    const stRefHeightLoaderMode = full ? 512 : 500;
    return loading ? (
        <div className={stRefClassNameWithFullType}>
            <Loader width={stRefWidthLoaderMode} height={stRefHeightLoaderMode}>
                <rect x={0} y={0} rx={0} ry={0} width={stRefWidthLoaderMode} height={stRefHeightLoaderMode}/>
            </Loader>
        </div>
    ) : (
        <div className={stRefClassNameWithFullType}>
            <div className="sccion-txt">
                {subtitle && <span>{subtitle}</span>}
                {title && <h3>{title}</h3>}
                {description && <p>{description}</p>}
                <Enlace href={to}>
                    {text}
                </Enlace>
            </div>
            <img src={image}/>
        </div>
    )
};