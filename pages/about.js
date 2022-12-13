/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 19:12
@description Página para mostrar Sobre Nosotros en el Proyecto
*/
import {Fragment} from 'react';
import Head from 'next/head';
import ViewLegal from "../view/legal";

const About = ({global,firebase}) => {
    const {siteName} = global;
    return (
        <Fragment>
            <Head>
                <title>Sobre Nosotros - {siteName}</title>
            </Head>
            <ViewLegal title="Sobre Nosotros" global={global} firebase={firebase} description="Información acerca de nuestro equipo.">
                dsadsad
            </ViewLegal>
        </Fragment>
    )
};

export default About;