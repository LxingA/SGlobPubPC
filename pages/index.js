/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 04:16
@description Página Principal para mostrar el Contenido Inicial del Proyecto
*/
import {Fragment,useEffect,useState} from 'react';
import {doc,collection,onSnapshot} from 'firebase/firestore';
import {ref,getDownloadURL} from 'firebase/storage';
import Head from 'next/head';
import Enlace from 'next/link';
import Loader from 'react-content-loader';
import Image from 'next/image';
import ViewShop from "../view/shop";

const Index = ({global,firebase,authentic}) => {
    const [data,setData] = useState(null);
    const {siteName,siteSlogan} = global;
    useEffect(_ => {
        const stRefDoc = doc(collection(firebase["FirebaseDatabase"],"page"),"eXyOlQ1QTAugP6OmjDB9");
        const stRefSocket = onSnapshot(stRefDoc,async T52o4=>{
            let {secBigTemplate,uniqKey,secMidTemplate,secPromoTemplate} = T52o4.data();let __={};let ___=[];
            secBigTemplate["imgURL"] = await getDownloadURL(ref(firebase["FirebaseStorage"],`p/${T52o4.id}/${secBigTemplate["imgURL"].replace("$UniqKey$",uniqKey)}`));
            __["iX08x7Nj"] = secBigTemplate;
            await Promise.all(
                secMidTemplate.map(async aB867 => {
                    aB867["imgURL"] = await getDownloadURL(ref(firebase["FirebaseStorage"],`p/${T52o4.id}/${aB867["imgURL"].replace("$UniqKey$",uniqKey)}`));
                    ___.push(aB867);
                })
            );
            __["F46z1PL3"] = ___;
            secPromoTemplate["imgURL"] = await getDownloadURL(ref(firebase["FirebaseStorage"],`p/${T52o4.id}/${secPromoTemplate["imgURL"].replace("$UniqKey$",uniqKey)}`));
            __["vH7ymR47"] = secPromoTemplate;
            setData(__);
        });
        return _ => stRefSocket();
    },[]);
    return (
        <Fragment>
            <Head>
                <title>{siteSlogan} - {siteName}</title>
            </Head>
            <ViewShop global={global} firebase={firebase} slider authentic={authentic}>
                <Image src="/70319757-f08a-45a2-b9cb-7d056b6517f6.png" alt="Articulos Personalizados" height={80} width={1111} className="img-Logo"/>
                {!data ? (
                    <Fragment>
                        <div className="Seccion-Grande" data-aos="fade-up" data-aos-duration="3000">
                            <div className="sccion-txt">
                                <span>
                                    <Loader width={100} height={20}>
                                        <rect x={0} y={0} rx={0} ry={0} width={100} height={20}/>
                                    </Loader>
                                </span>
                                <h3>
                                    <Loader width={250} height={40}>
                                        <rect x={0} y={0} rx={0} ry={0} width={250} height={40}/>
                                    </Loader>
                                </h3>
                                <p>
                                    <Loader width={350} height={100}>
                                        <rect x={0} y={0} rx={0} ry={0} width={350} height={100}/>
                                    </Loader> 
                                </p>
                            </div>
                        </div>
                        <div className="Seccion-Medium">
                            <div className="Sc-Med" data-aos="fade-up" data-aos-duration="3000">
                                <div className="sccion-txt">
                                    <span>
                                        <Loader width={100} height={20}>
                                            <rect x={0} y={0} rx={0} ry={0} width={100} height={20}/>
                                        </Loader>
                                    </span>
                                    <h3>
                                        <Loader width={250} height={40}>
                                            <rect x={0} y={0} rx={0} ry={0} width={250} height={40}/>
                                        </Loader>
                                    </h3>
                                    <p>
                                        <Loader width={350} height={100}>
                                            <rect x={0} y={0} rx={0} ry={0} width={350} height={100}/>
                                        </Loader> 
                                    </p>
                                </div>
                            </div>
                            <div className="Sc-Med" data-aos="fade-up" data-aos-duration="3000">
                                <div className="sccion-txt">
                                    <span>
                                        <Loader width={100} height={20}>
                                            <rect x={0} y={0} rx={0} ry={0} width={100} height={20}/>
                                        </Loader>
                                    </span>
                                    <h3>
                                        <Loader width={250} height={40}>
                                            <rect x={0} y={0} rx={0} ry={0} width={250} height={40}/>
                                        </Loader>
                                    </h3>
                                    <p>
                                        <Loader width={350} height={100}>
                                            <rect x={0} y={0} rx={0} ry={0} width={350} height={100}/>
                                        </Loader> 
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="promodiv" data-aos="fade-up" data-aos-duration="3000">
                            <div className="promo-Txt">
                                <span>
                                    <Loader width={100} height={20} backgroundColor="#000000">
                                        <rect x={0} y={0} rx={0} ry={0} width={100} height={20}/>
                                    </Loader>
                                </span>
                                <h3>
                                    <Loader width={250} height={40} backgroundColor="#000000">
                                        <rect x={0} y={0} rx={0} ry={0} width={250} height={40}/>
                                    </Loader>
                                </h3>
                                <p>
                                    <Loader width={300} height={50} backgroundColor="#000000">
                                        <rect x={0} y={0} rx={0} ry={0} width={300} height={50}/>
                                    </Loader> 
                                </p>
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div className="Seccion-Grande" data-aos="fade-up" data-aos-duration="3000">
                            <img src={data["iX08x7Nj"]["imgURL"]} alt={data["iX08x7Nj"]["imgAlt"]}/>
                            <div className="sccion-txt">
                                <span>
                                    {data["iX08x7Nj"]["message"]}
                                </span>
                                <h3>
                                    {data["iX08x7Nj"]["title"]}
                                </h3>
                                <p>
                                    {data["iX08x7Nj"]["description"]}
                                </p>
                                <Enlace href={data["iX08x7Nj"]["to"]}>
                                    {data["iX08x7Nj"]["btTitle"]}
                                </Enlace>
                            </div>
                        </div>
                        <div className="Seccion-Medium">
                            {data["F46z1PL3"].map(({button,description,title,to,message,imgAlt,imgURL},i)=>(
                                <div className="Sc-Med" data-aos="fade-up" data-aos-duration="3000" key={i}>
                                    <img src={imgURL} alt={imgAlt}/>
                                    <div className="sccion-txt">
                                        <span>{message}</span>
                                        <h3>{title}</h3>
                                        <p>{description}</p>
                                        <Enlace href={to}>
                                            {button}
                                        </Enlace>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="promodiv" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                            <img src={data["vH7ymR47"]["imgURL"]} alt={data["vH7ymR47"]["imgAlt"]}/>
                            <div className="promo-Txt">
                                <span>{data["vH7ymR47"]["message"]}</span>
                                <h3>{data["vH7ymR47"]["title"]}</h3>
                                <p>{data["vH7ymR47"]["description"]}</p>
                            </div>
                        </div>
                    </Fragment>
                )}
                <ul className="listado-beneficios">
                    <div className="liss" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                        <li>
                            <Image src="/d7194a73-1f81-4d62-ab52-b4944ab45fae.png" alt="Pago Seguro [Ícono]" width={50} height={50}/>
                            <h3>Pago Seguro</h3>
                            <p>Todas tus compras son 100% seguras y protegidas. No guardamos ningún dato de tarjetas.</p>
                        </li>
                        <li>
                            <Image src="/3cd08558-aa13-4fa3-9039-d68440f554a2.png" alt="Alta Calidad [Ícono]" width={50} height={50}/>
                            <h3>Alta Calidad</h3>
                            <p>Seleccionamos cuidadosamente la calidad en todos nuestros productos.</p>
                        </li>
                        <li>
                            <Image src="/54270e38-ab07-437a-b43c-b5b739955728.png" alt="Envios a Toda la Área Metropolitana [Ícono]" width={50} height={50}/>
                            <h3>Envios a Toda la Área Metropolitana</h3>
                            <p>Realizamos entregas sin costo dentro de la área metropolitana, seguro y rápido.</p>
                        </li>
                        <li>
                            <Image src="/d3a7470a-9939-499d-b369-d6e82ac199fe.png" alt="Servicio 100% Personalizado [Ícono]" width={50} height={50}/>
                            <h3>Servicio 100% Personalizado</h3>
                            <p>Puedes elegir plantillas de diseños ya echas para cualquier ocasión.</p>
                        </li>
                    </div>
                </ul>
            </ViewShop>
        </Fragment>
    )
};

export default Index;