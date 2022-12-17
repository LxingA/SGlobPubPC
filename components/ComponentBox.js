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