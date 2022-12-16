/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 10:13
@description Complemento con Algunos Componentes para ser usados en Footer del Proyecto
*/
import {Fragment} from 'react';
import Enlace from 'next/link';

export const FooterShopLinks = ({authentic}) => {
    return (
        <Fragment>
            {authentic && (
                <li>
                    <Enlace href="/">
                        Mís pedidos
                    </Enlace>
                </li>
            )}
            <li>
                <Enlace href={authentic?"/cuenta":"/auth?m=login"}>Mí cuenta</Enlace>
            </li>
        </Fragment>
    )
};