/*
@author LxingA [SUDesign]
@project PrintCards
@date 23/Ene/23 05:36
@description Página para mostrar El Visor Global del Proyecto
*/
import {Fragment,useState} from 'react';
import {BannerGlobalProduct} from '../components/ComponentBox';
import Head from 'next/head';
import ViewShop from '../view/shop';

const View = ({global,firebase,authentic}) => {
    const {siteName} = global;
    const [loading,setLoading] = useState(true);
    return (
        <Fragment>
            <Head>
                <title>Visor - {siteName}</title>
            </Head>
            <ViewShop firebase={firebase} global={global} authentic={authentic}>
                <div className="My-Account HeaderCategoria CateProductos">
                    <BannerGlobalProduct full title="Mirando" image="https://view.lxinga.dev/_next/static/media/213260a5-35a6-45e0-9e95-9da440c741d2.65e161e8.png"/>
                </div>
                <div className="ContainerProductoAdicional">
                    <div className="MenuOptionsProducto">
                        <button>Descripción</button>
                        <button className="active">Información adicional</button>
                        <button>Opiniones</button>
                    </div>
                    <div className="contentInfoProducto">
                        <div class="container-Redaccion">
                            <div class="P-Parrafo">
                                <h2>Lleva tus apuntos contigo a dónde sea que estés.
                                    <p>Escribe y prioriza tus objetivos semanales y lista de tareas para lograr las metas con nuestras agendas personalizadas</p>
                                </h2>
                                <img src="https://img.freepik.com/psd-premium/endecha-gorda-cuaderno-boda-telefono-inteligente-plantas_23-2148530331.jpg?w=1380" />
                            </div>
                            <div class="P-Parrafo Reves">
                                <h2>Diseño minimalista,<br/>tamaño perfecto. <p>Nuestras Agendas cuentan con diseños en tendencia, modernos y a tu gusto. Acostumbrate al hábito de vida saludable y llevar un registro de todo y lograr tus objetivos.
                                    <span><br/><br/>
                                        Agenda diaria con días festivos oficiales<br/>
                                        Seguimiento de nuevos hábitos<br/>
                                        Planeador de proyectos<br/>
                                        Presupuesto de gastos<br/>
                                        Organizador de tarea<br/>
                                        Planeador 2023<br/> y más
                                    </span></p>
                                </h2>
                                <img src="https://img.freepik.com/psd-premium/concepto-escritorio-maqueta-mesa-madera_23-2148496649.jpg?w=826" />
                            </div>
                        </div>
                    </div>
                </div>
            </ViewShop>
        </Fragment>
    )
};

export default View;