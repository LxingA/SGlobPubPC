/*
@author LxingA [SUDesign]
@project PrintCards
@date 11/Dic/22 08:00
@description Componente con la Cabecera del Proyecto
*/
import {useContext} from 'react';
import GlobalContext from '../util/context/global';
import Imagen from 'next/image';

const Header = () => {
    const {siteName} = useContext(GlobalContext);
    return (
        <nav data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            <div className="logotipo" style={{cursor:"pointer"}}>
                <Imagen src="/cc63b371-d9d2-46fd-9082-1c901f514d83.png" alt={`Logo ${siteName}`} width={100} height={20}/>
            </div>
        </nav>
    )
};

export default Header;