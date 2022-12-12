/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 10:13
@description Complemento con Algunos Componentes para ser usados en Footer del Proyecto
*/
import {useContext,Fragment} from 'react';
import {AuthContext} from '../util/context';
import Enlace from 'next/link';

export const FooterShopLinks = () => {
    const {ACState:{authentic}} = useContext(AuthContext.Context);
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