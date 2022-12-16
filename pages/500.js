/*
@author LxingA [SUDesign]
@project PrintCards
@date 13/Dic/22 07:18
@description Plantilla para mostrar el Error 404 Personalizado en el Proyecto
*/
import {Fragment} from 'react';
import Head from 'next/head';
import ViewShop from '../view/shop';

const Error500 = ({global,firebase,authentic}) => {
    const {siteName} = global;
    return (
        <Fragment>
            <Head>
                <title>[500] Error Interno - {siteName}</title>
            </Head>
            <ViewShop global={global} firebase={firebase} authentic={authentic}>
                <header data-aos="fade-up" data-aos-duration="3000" className="error">
                    <div className="content-txt" data-aos="fade-right">
                        <h3>Error 500</h3>
                        <p>Hubo un error interno y no se puede responder a su solicitud por el momento</p>
                        <a className="btn-white" onClick={_=>window.location.reload()}>
                            Intentar de nuevo
                        </a>
                    </div>
                </header>
            </ViewShop>
        </Fragment>
    )
};

export default Error500;