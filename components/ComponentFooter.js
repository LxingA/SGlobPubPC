/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 09:56
@description Componente con el Píe de Página para el Proyecto
*/
import {AuthContext} from '../util/context';
import {FooterShopLinks} from '../addons/Footer';
import Logotipo from '../addons/Logo';
import Enlace from 'next/link';

export const FooterShop = ({global}) => {
    const [{FirebaseStorage},{siteName,siteLogo,siteDescription,siteCalendar,siteTel,siteMail,siteAddress,siteSocial}] = global;
    return (
        <footer data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            <div className="main-footer-content">
                <div className="newsletter"></div>
                <div className="column-footer">
                    <div className="column-1">
                        <Logotipo name={siteName} path={siteLogo} storage={FirebaseStorage} color="#af9b82"/>
                        <p>{siteDescription}</p>
                        <ul>
                            <AuthContext.Provider>
                                <FooterShopLinks />
                            </AuthContext.Provider>
                            <li>
                                <Enlace href="/faq">
                                    Preguntas frecuentes
                                </Enlace>
                            </li>
                            <li>
                                <Enlace href="/about">
                                    Sobre nosotros
                                </Enlace>
                            </li>
                        </ul>
                    </div>
                    <div className="column-2">
                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                        <h3>Horario de Atención</h3>
                        {siteCalendar.map(({day,hour},i)=>(
                            <p key={i}>
                                <span>
                                    {day}: <b>{hour}</b>
                                </span>
                            </p>
                        ))}
                    </div>
                    <div className="column-3">
                        <i className="fa fa-phone" aria-hidden="true"></i>
                        <h3>Atención teléfonica<br/> del mostrador</h3>
                        <p>
                            {siteTel.map((tel,i)=>(
                                <span key={i}>
                                    <a href={`tel:+52${tel}`}>(+52) {tel.substring(0,2)} {tel.substring(2,6)} {tel.substring(6,10)}</a>
                                </span>
                            ))}
                        </p>
                    </div>
                    <div className="column-4">
                        <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        <p>Envía tus archivos a: {siteMail}</p>
                        <p className="parrafo">No se imprimen trabajos enviados por correo electrónico que no hayan sido previamente confirmados vía telefónica.</p>
                    </div>
                    <div className="column-3">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                        <h3>Ubicación</h3>
                        <p>
                            {siteAddress["street"]} {siteAddress["int"]}, Col. {siteAddress["colony"]}, C.P {siteAddress["postal"]}, {siteAddress["city"]}, {siteAddress["state"]}, {siteAddress["country"]}.
                        </p>
                    </div>
                </div>
            </div>
            <div className="main-enlaces">
                <ul className="terminos">
                    <li>
                        <Enlace href="/privacy">
                            Política de Privacidad
                        </Enlace>
                    </li>
                </ul>
                <ul className="redes">
                    <p>Síguenos en nuestras redes:</p>
                    {siteSocial.map(({url,type},i)=>(
                        <li key={i}>
                            <a href={url} target="_blank" rel="noreferrer noopener">
                                <i className={`fa fa-${type}`} aria-hidden="true"></i>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    )
};