/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 04:16
@description Página Principal para mostrar el Contenido Inicial del Proyecto
*/
import {Fragment} from 'react';
import Head from 'next/head';
import ViewShop from "../view/shop";
import Image from 'next/image';

const Index = ({global,firebase}) => {
    const {siteName,siteSlogan} = global;
    return (
        <Fragment>
            <Head>
                <title>{siteSlogan} - {siteName}</title>
            </Head>
            <ViewShop global={global} firebase={firebase}>
                <div className="Nuestras-Garantias">
                    <ul className="listado-beneficios">
                        <li>
                            <Image src="/d7194a73-1f81-4d62-ab52-b4944ab45fae.png" alt="Pago Seguro" width={50} height={50}/>
                            <h3>Pago Seguro</h3>
                        </li>
                        <li>
                            <Image src="/3cd08558-aa13-4fa3-9039-d68440f554a2.png" alt="Alta Calidad" width={50} height={50}/>
                            <h3>Alta Calidad</h3>
                        </li>
                        <li>
                            <Image src="/54270e38-ab07-437a-b43c-b5b739955728.png" alt="Envíos a todo México" width={50} height={50}/>
                            <h3>Envíos a todo México</h3>
                        </li>
                        <li>
                            <Image src="/d3a7470a-9939-499d-b369-d6e82ac199fe.png" alt="Servicio 100% Personalizado" width={50} height={50}/>
                            <h3>Servicio 100% Personalizado</h3>
                        </li>
                    </ul>
                </div>
            </ViewShop>
        </Fragment>
    )
};

export default Index;