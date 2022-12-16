/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 19:16
@description Página para mostrar las Preguntas Frecuentes en el Proyecto
*/
import {Fragment} from 'react';
import Head from 'next/head';
import ViewLegal from "../view/legal";

const Faq = ({global,firebase,authentic}) => {
    const {siteName} = global;
    return (
        <Fragment>
            <Head>
                <title>Preguntas Frecuentes - {siteName}</title>
            </Head>
            <ViewLegal title="Preguntas Frecuentes" global={global} firebase={firebase} description="Resumen de las respuestas de las preguntas." authentic={authentic}>
                dsadsad
            </ViewLegal>
        </Fragment>
    )
};

export default Faq;