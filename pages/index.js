/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 04:16
@description Página Principal para mostrar el Contenido Inicial del Proyecto
*/
import {Fragment,useEffect,useState} from 'react';
import {doc,collection,onSnapshot} from 'firebase/firestore';
import {ref,getDownloadURL} from 'firebase/storage';
import {BannerGlobal} from '../components/ComponentBox';
import {FnGetObjTitleBanner} from '../util/crypto';
import Head from 'next/head';
import Image from 'next/image';
import ViewShop from "../view/shop";

const Index = ({global,firebase,authentic}) => {
    const {siteName,siteSlogan,siteTitles} = global;
    const [data,setData] = useState(null);
    useEffect(_ => {
        const stRefDoc = doc(collection(firebase["FirebaseDatabase"],"page"),"eXyOlQ1QTAugP6OmjDB9");
        const stRefSocket = onSnapshot(stRefDoc,async r0A90=>{
            if(r0A90.exists()){
                let _savedCurrentDataObj_ = r0A90.data();
                let _savedRefStructureCurrentPage_ = {main:{},promo:{title:FnGetObjTitleBanner("j32T2",siteTitles,true),element:[]}};
                await Promise.all(Object.keys(_savedCurrentDataObj_["content"]).map(async (Tw898,F477j) => {
                    let _savedCurrentContentObj_ = Object.values(_savedCurrentDataObj_["content"])[F477j];
                    _savedCurrentContentObj_["image"] = await getDownloadURL(ref(firebase["FirebaseStorage"],`p/${r0A90.id}/${Tw898}${_savedCurrentContentObj_["image"]}`));
                    let __savedObjCurrentParamsSet_ = {viewID:Tw898,pageID:r0A90.id,text:_savedCurrentContentObj_["textButton"],href:_savedCurrentContentObj_["to"],title:_savedCurrentContentObj_["title"],description:_savedCurrentContentObj_["description"],image:_savedCurrentContentObj_["image"],subtitle:_savedCurrentContentObj_["subtitle"]};
                    if(_savedCurrentContentObj_["promotion"]) _savedRefStructureCurrentPage_["promo"]["element"].push(<BannerGlobal promotion {...__savedObjCurrentParamsSet_}/>);
                    else _savedRefStructureCurrentPage_["main"] = <BannerGlobal {...__savedObjCurrentParamsSet_}/>;
                }));
                _savedCurrentDataObj_["content"] = _savedRefStructureCurrentPage_;
                _savedCurrentDataObj_["idPage"] = r0A90.id;
                setData(_savedCurrentDataObj_);
            }else setData(null)
        });return _ => stRefSocket();
    },[]);
    return (
        <Fragment>
            <Head>
                <title>{data ? data["title"] : siteSlogan} - {siteName}</title>
            </Head>
            <ViewShop global={global} firebase={firebase} slider authentic={authentic}>
                {data && data["content"]["main"]}
                {data && data["content"]["promo"]["title"]}
                {data && data["content"]["promo"]["element"]}
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