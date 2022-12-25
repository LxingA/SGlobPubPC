/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 04:16
@description Página Principal para mostrar el Contenido Inicial del Proyecto
*/
import {Fragment} from 'react';
import Head from 'next/head';
import Enlace from 'next/link';
import Image from 'next/image';
import ViewShop from "../view/shop";

const Index = ({global,firebase,authentic}) => {
    const {siteName,siteSlogan} = global;
    return (
        <Fragment>
            <Head>
                <title>{siteSlogan} - {siteName}</title>
            </Head>
            <ViewShop global={global} firebase={firebase} slider authentic={authentic}>
                <Image src="/70319757-f08a-45a2-b9cb-7d056b6517f6.png" alt="Articulos Personalizados" height={80} width={1111} className="img-Logo"/>
                <div className="Seccion-Grande"  data-aos="fade-up" data-aos-duration="3000">
                    <Image src="/5ff7f59c-9965-4cc4-99d8-fc7dfcabbc01.webp" alt="Fondo de Sección Grande" height={680} width={3400}/>
                    <div className="sccion-txt">
                        <span>Puedes regalar</span>
                        <h3>Fotolienzos</h3>
                        <p>Imprime tu mejor momento en un bello cuadro para darle ese toque especial a tus paredes. Se imprimime en alta calidad sobre bastidores de madera.</p>
                        <Enlace href="/">
                            Diseñar Ahora
                        </Enlace>
                    </div>
                </div>
                <div className="Seccion-Medium">
                    <div className="Sc-Med" data-aos="fade-up" data-aos-duration="3000">
                        <Image src="/eb620fb0-188d-4eed-af0b-ffc0e7d25cd5.png" alt="Personalizar Tazas" height={477} width={821}/>
                        <div className="sccion-txt">
                            <span>Puedes regalar</span>
                            <h3>Tazas</h3>
                            <p>Añádale un toque especial y mágico, a tu taza favorita con una imagen de ese recuerdo tan especial.</p>
                            <Enlace href="/">
                                Diseñar Ahora
                            </Enlace>
                        </div>
                    </div>
                    <div className="Sc-Med" data-aos="fade-up" data-aos-duration="3000">
                        <Image src="/1a55ca95-59e1-4537-9df1-91ab3ede0589.png" alt="Personalizar Playeras" height={477} width={821}/>
                        <div className="sccion-txt">
                            <span>Puedes regalar</span>
                            <h3>Playeras</h3>
                            <p>Añádale un toque especial y mágico, a tu taza favorita con una imagen de ese recuerdo tan especial.</p>
                            <Enlace href="/">
                                Diseñar Ahora
                            </Enlace>
                        </div>
                    </div>
                </div>
                <div className="promodiv" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                    <Image src="/851bc384-c8e6-4835-bf1e-d6cc8927f245.webp" alt="Promoción" height={1260} width={1260}/>
                    <div className="promo-Txt">
                        <span>Promoción</span>
                        <h3>15%</h3>
                        <p>Impresión de Tabloides, Papel Couché 300gms</p>
                    </div>
                </div>
            </ViewShop>
        </Fragment>
    )
};

export default Index;