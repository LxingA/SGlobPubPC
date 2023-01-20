/*
@author LxingA [SUDesign]
@project PrintCards
@date 18/Ene/23 06:58
@description Página para mostrar Todos los Productos del Proyecto
*/
import {Fragment,useEffect,useState,useMemo} from 'react';
import {useRouter} from 'next/router';
import {getDownloadURL,ref} from 'firebase/storage';
import {AddonBoxBannerGlobal} from '../addons/Box';
import {BannerGlobalTitle,BannerGlobalProduct} from '../components/ComponentBox';
import {FnUpper} from '../util/crypto';
import Head from 'next/head';
import Image from 'next/image';
import ViewShop from '../view/shop';

const Products = ({global,firebase,authentic}) => {
    const {query,pathname,back,push} = useRouter();
    const [images,setImages] = useState(null);
    const [info,setInfo] = useState(null);
    let {siteName,siteBuilder:E290b} = global;
    const stSavedObjProducts = {
        values: Object.values(E290b),
        keys: Object.keys(E290b)
    };
    let _savedRefObjContentLoader_ = [];
    for(let r94C4=0;r94C4<=(stSavedObjProducts.keys.length-1);r94C4++) _savedRefObjContentLoader_.push(
        <AddonBoxBannerGlobal key={r94C4} full={r94C4===0} loading/>
    );
    useEffect(_ => {
        (async _ => {
            let _savedRefObjSetImages_ = {};
            const HandlerURLCoverFn = async (kE291,tX419) => await getDownloadURL(ref(firebase["FirebaseStorage"],`g/${kE291+tX419}`));
            await Promise.all(
                stSavedObjProducts["values"].map(async (xY923,kX334) => {
                    let __={};if(stSavedObjProducts["keys"][kX334] !== "font"){
                        const {images,uniqKey} = xY923["_default"];
                        await Promise.all(Object.keys(images).map(async(g7O70,y5V31)=>{
                            __[g7O70] = await HandlerURLCoverFn(uniqKey,Object.values(images)[y5V31]);
                        }));if(Object.keys(xY923).length >= 3) await Promise.all(
                            Object.values(xY923).map(async ({uniqKey,cover}) => {
                                if(cover) __[uniqKey] = await HandlerURLCoverFn(uniqKey,cover);
                            })
                        );_savedRefObjSetImages_[uniqKey] = __
                    }
                })
            );setImages(_savedRefObjSetImages_)
        })(); 
    },[]);
    useMemo(_ => {
        if(images && query.article && stSavedObjProducts["keys"].includes(query.article) && Object.keys(E290b[query.article]).length > 2) setInfo(E290b[query.article]);
        else setInfo(null);
    },[query,images]);
    return (
        <Fragment>
            <Head>
                <title>Productos - {siteName}</title>
            </Head>
            <ViewShop firebase={firebase} global={global} authentic={authentic}>
                {images ? query.article ? (
                    (info && query.type) ? (
                        <Fragment>
                            <BannerGlobalProduct title={info[query.type].title} description="" image={images[info["_default"].uniqKey].full}/>
                            <div className="CateContainer">
                                <div className="Categorias-Box">
                                    <ul>
                                        <h3>Lo más buscado</h3>
                                    </ul>
                                </div>
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div className="My-Account HeaderCategoria">
                                <Image className="TipoImage" src="/213260a5-35a6-45e0-9e95-9da440c741d2.png" alt="Fondo de los Tipos" width={768} height={1024}/>
                                <div className="EscogeTipo">
                                    {info ? (
                                        <Fragment>
                                            <h3>Escoge el Tipo de {FnUpper(query.article)}
                                                <p>Haz click sobre la imagen</p>
                                            </h3>
                                            <div className="FlexieDiv">
                                                {Object.values(info).map((Wn569,fX486)=>{
                                                    if(Object.keys(info)[fX486] !== "_default"){
                                                        const savedRefPushObj = {pathname,query:{...query,type:Object.keys(info)[fX486]}};
                                                        return (
                                                            <div className="CajaBoxTipo" key={Wn569["uniqKey"]}>
                                                                <div className="TipoBox" onClick={_=>push(savedRefPushObj)}>
                                                                    <img src={images[info["_default"]["uniqKey"]][Wn569["uniqKey"]]}/>
                                                                </div>
                                                                <button onClick={_=>push(savedRefPushObj)}>{Wn569["title"]}</button>
                                                            </div>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <div className="NoneProductosTipo">
                                            <p>Lo sentimos, todavía no hay productos para este tipo de artículo. Favor de elegir otro artículo.</p>
                                            <button onClick={_=>back()}>Regresar</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Fragment>
                    )
                ) : (
                    <div className="CateContainer CatesDefault">
                        <BannerGlobalTitle title="Productos" subtitle="Escoge el tipo de producto que quieras empezar a comprar ó personalizador"/>
                        {
                            stSavedObjProducts["values"].map((aR691,X1q70)=>{
                                if(stSavedObjProducts["keys"][X1q70] !== "font"){
                                    const {uniqKey,title} = aR691["_default"];
                                    const stRefObjImage = images && X1q70 === 0 ? images[uniqKey].full : images[uniqKey].cover;
                                    return <AddonBoxBannerGlobal full={X1q70===0} key={uniqKey} uniqKey={uniqKey} text={title} to={`${pathname}?article=${stSavedObjProducts["keys"][X1q70]}`} image={stRefObjImage}/>
                                }
                            })
                        } 
                    </div>
                ) : (
                    <div className="CateContainer CatesDefault">
                        <BannerGlobalTitle loading/>
                        {_savedRefObjContentLoader_}
                    </div>
                )}
            </ViewShop>
        </Fragment>
    )
};

export default Products;