/*
@author LxingA [SUDesign]
@project PrintCards
@date 13/Dic/22 07:18
@description Plantilla para mostrar el Error 404 Personalizado en el Proyecto
*/
import {Fragment} from 'react';
import Head from 'next/head';
import Enlace from 'next/link';
import ViewShop from '../view/shop';

const Error404 = ({global,firebase,authentic}) => {
    const {siteName} = global;
    return (
        <Fragment>
            <Head>
                <title>[404] No Encontrado - {siteName}</title>
            </Head>
            <ViewShop global={global} firebase={firebase} authentic={authentic}>
                <header data-aos="fade-up" data-aos-duration="3000" className="error">
                    <div className="content-txt" data-aos="fade-right">
                        <h3>Error 404</h3>
                        <p>La página que está intentando acceder no existe en {siteName}</p>
                        <Enlace href="/" className="btn-white">
                            Regresar a Inicio
                        </Enlace>
                    </div>
                </header>
            </ViewShop>
        </Fragment>
    )
};

export default Error404;