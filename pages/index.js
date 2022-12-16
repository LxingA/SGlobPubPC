/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 04:16
@description Página Principal para mostrar el Contenido Inicial del Proyecto
*/
import {Fragment} from 'react';
import Head from 'next/head';
import ViewShop from "../view/shop";

const Index = ({global,firebase,authentic}) => {
    const {siteName,siteSlogan} = global;
    return (
        <Fragment>
            <Head>
                <title>{siteSlogan} - {siteName}</title>
            </Head>
            <ViewShop global={global} firebase={firebase} slider authentic={authentic}>

            </ViewShop>
        </Fragment>
    )
};

export default Index;