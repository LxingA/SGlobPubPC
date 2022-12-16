/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 18:57
@description Página para mostrar la Política de Privacidad en el Proyecto
*/
import {Fragment} from 'react';
import Head from 'next/head';
import ViewLegal from "../view/legal";

const Privacy = ({global,firebase,authentic}) => {
    const {siteName} = global;
    return (
        <Fragment>
            <Head>
                <title>Política de Privacidad - {siteName}</title>
            </Head>
            <ViewLegal title="Política de Privacidad" authentic={authentic} global={global} firebase={firebase} description="Términos y condiciones de uso de Printcards, información acerca de la Política de privacidad de datos privados y más.">
                dsadsad
            </ViewLegal>
        </Fragment>
    )
};

export default Privacy;