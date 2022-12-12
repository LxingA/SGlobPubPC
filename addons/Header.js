/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 09:31
@description Complemento con Algunos Componentes para ser usados en Header del Proyecto
*/
import {useContext} from 'react';
import {AuthContext} from '../util/context';
import Enlace from 'next/link';
import Imagen from 'next/image';

export const HeaderShopOptions = () => {
    const {ACState:{authentic}} = useContext(AuthContext.Context);
    return (
        <div className="user-options">
            <div className="user-icon">
                <Enlace href={authentic?"/cuenta":"/auth?m=login"}>
                    <Imagen src="/1d000574-359b-47ab-b40b-0e41aedfd190.png" alt="Mí cuenta" width={15} height={18}/>
                </Enlace>
            </div>
            {authentic && (
                <div className="user-pedidos">
                    <Enlace href="/">
                        <Imagen src="/348e9adf-5e93-48ce-a436-6a88924de1cf.png" alt="Mís pedidos" width={15} height={18}/>
                    </Enlace>
                </div>
            )}
        </div>
    )
 };