/*
@author LxingA [SUDesign]
@project PrintCards
@date 03/Ene/23 04:46
@description Página para mostrar El Constructor Global del Proyecto
*/
import {Fragment,useState} from 'react';
import {FontsView,ProductListView,BoxConstructView,PriceBoxView,PreviewBoxView,DesignListView,UploadImageView,ButtonAddProduct} from '../components/ComponentConstruct';
import {ConstructContext} from '../util/context';
import {useRouter} from 'next/router';
import {FnUpper} from '../util/crypto';
import Cabecera from 'next/head';
import ViewShop from "../view/shop";

const Constructor = ({firebase,global,authentic}) => {
    const Allow = ["taza","playera","canva"];
    const {siteName,siteBuilder:{font:P68t9}} = global;
    const {query,replace} = useRouter();
    const visible = useState({productListView:false,uploadImageView:false,designListView:false,fontListView:false});
    !query.product && replace("/");
    !Allow.includes(query.product) && replace("/");
    return Allow.includes(query.product) && (
        <Fragment>
            <Cabecera>
                <title>Constructor de {FnUpper(query.product)}s - {siteName}</title>
            </Cabecera>
            <ViewShop firebase={firebase} global={global} authentic={authentic}>
                <ConstructContext.Provider>
                    <ButtonAddProduct type={query.product}/>
                    <FontsView visible={visible} fonts={P68t9}/>
                    <ProductListView visible={visible} type={query.product}/>
                    <BoxConstructView type={query.product} visible={visible} info={global["siteBuilder"]} storage={firebase["FirebaseStorage"]}/>
                    <PriceBoxView type={query.product} info={global["siteBuilder"]}/>
                    <PreviewBoxView />
                    <DesignListView visible={visible}/>
                    <UploadImageView visible={visible} type={query.product}/>
                </ConstructContext.Provider>
            </ViewShop>
        </Fragment>
    )
};

export default Constructor;