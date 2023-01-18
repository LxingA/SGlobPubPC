/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 08:21
@description Componente con la Cabecera para el Proyecto
*/
import {HeaderShopOptions} from '../addons/Header';
import {FnUpper} from '../util/crypto';
import Logotipo from "../addons/Logo";
import Enlace from 'next/link';

export const HeaderShop = ({global}) => {
    const [{FirebaseStorage},{siteName,siteLogo,siteBuilder},authentic] = global;
    return (
        <nav data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            <div className="logotipo">
                <Logotipo path={siteLogo} name={siteName} storage={FirebaseStorage} color="#fff"/>
            </div>
            <ul className="mainmenu">
                <li>
                    <Enlace href="/products">
                        Productos
                    </Enlace>
                </li>
                <li className="HoverMenu">
                    <span>Artículos Personalizados</span>
                    <ul className="submenuPA">
                        {Object.keys(siteBuilder).sort().map((eV074,C41d7)=>(
                            eV074 !== "font" && <Enlace key={C41d7} href={`/create?product=${eV074}`}>
                                {FnUpper(eV074)}
                            </Enlace>
                        ))}
                    </ul>
                </li>
                <li>
                    <Enlace href="/news">
                        Novedades
                    </Enlace>
                </li>
            </ul>
            <HeaderShopOptions authentic={authentic}/>
        </nav>
    )
};