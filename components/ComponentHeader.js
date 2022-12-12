/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 08:21
@description Componente con la Cabecera para el Proyecto
*/
import {AuthContext} from '../util/context';
import {HeaderShopOptions} from '../addons/Header';
import Logotipo from "../addons/Logo";
import Enlace from 'next/link';

export const HeaderShop = ({global}) => {
    const [{FirebaseStorage},{siteName,siteLogo}] = global;
    return (
        <nav data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            <div className="logotipo">
                <Logotipo path={siteLogo} name={siteName} storage={FirebaseStorage} color="#fff"/>
            </div>
            <ul className="mainmenu">
                <li>
                    <Enlace href="/">
                        Playeras
                    </Enlace>
                </li>
                <li>
                    <Enlace href="/">
                        Tazas
                    </Enlace>
                </li>
                <li>
                    <Enlace href="/">
                        Canvas
                    </Enlace>
                </li>
            </ul>
            <AuthContext.Provider>
                <HeaderShopOptions />
            </AuthContext.Provider>
        </nav>
    )
};