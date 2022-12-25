/*
@author LxingA [SUDesign]
@project PrintCards
@date 16/Dic/22 13:39
@description Complemento con Algunos Enlaces Personalizados para el Proyecto
*/
import {useRouter} from 'next/router';
import Enlace from 'next/link';

export const NavLink = ({to,icon,text}) => {
    const {pathname} = useRouter();
    const removeQueryURL = to.indexOf("?") === -1 ? to : to.substring(0,to.indexOf("?"));
    return (
        <li className={pathname===removeQueryURL?"active":""}>
            {icon && (
                <i className={`fa fa-${icon}`}></i>
            )}
            <Enlace href={to}>
                {text}
            </Enlace>
        </li>
    )
};