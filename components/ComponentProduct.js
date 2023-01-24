/*
@author LxingA [SUDesign]
@project PrintCards
@date 20/Ene/23 23:41
@description Componente con los Componentes para los Productos del Proyecto
*/
import {useState,useEffect,useMemo,useRef} from 'react';
import {AddonProductCategoryContainer,AddonProductCategoryErrorContainer,AddonProductProductContainer} from '../addons/Product';
import {getDocs,collection,query,orderBy,limit,where} from 'firebase/firestore';
import {ref,getDownloadURL} from 'firebase/storage';
import {useRouter} from 'next/router';
import {FnDefVariableOnText} from '../util/crypto';

export const ComponentProductList = ({category,database,storage}) => {
    const stInitialStateFilter = {limit:{value:18}};
    const stRefCurrentDOMInput = useRef(null);
    const [aF633,G8yIUWS5qX4uhu45] = useState(stInitialStateFilter);
    const [o3R66,oX188RS9r399buvz] = useState(null);
    const [qW795,JgB4F4A9gamEuP2U] = useState([]);
    const [P06i7,rkN8KY134g432X72] = useState({global:true,filter:false,loading:false});
    const [nT747,W4NesI3Mj0PB6uSL] = useState([]);
    const [x5I11,tFDb5r499JYvK3ZD] = useState(stInitialStateFilter["limit"]);
    const [n1R98,r9lxoy88NC90iBkl] = useState({active:false,products:[],text:null});
    const {query:wG371} = useRouter();
    const stRefObjContainCategoryWithType = category.filter(wH241=>{
        if(wH241["exclude"].length === 0 && wH241["display"].category) return wH241;
        else if(!wH241["exclude"].includes(wG371.article) && wH241["display"].category) return wH241;
    });
    let _savedObjLoaderProducts_ = [];
    useEffect(_ => {
        (async _ => {
            rkN8KY134g432X72(kP919=>({...kP919,loading:true}));
            let _savedRefObjCurrentObjs_ = {_pt:null,_img:{}};
            let _savedCurrentObjMutated_ = qW795;
            if(nT747.length > 0) _savedCurrentObjMutated_ = [where("variant","array-contains-any",nT747),...qW795];
            const stRefInstanceQueryInitiate = query(collection(database,"product"),where("proto","==",`_${wG371.article}!$${wG371.type}:`),..._savedCurrentObjMutated_);
            const gtDataCurrentProductsRequest = await getDocs(stRefInstanceQueryInitiate);
            _savedRefObjCurrentObjs_["_tt"] = gtDataCurrentProductsRequest.size;
            tFDb5r499JYvK3ZD(_savedRefObjCurrentObjs_);
            _savedRefObjCurrentObjs_["_pt"] = gtDataCurrentProductsRequest.docs.map(nH159=>{
                let __ = nH159.data();
                delete __["images"];
                __["_id"] = nH159.id;
                return __
            });await Promise.all(gtDataCurrentProductsRequest.docs.map(async z6K98 => {
                const gtCurrentDataProductImage = z6K98.data();
                const gtURLCurrentImageRequest = await getDownloadURL(ref(storage,`pt/${z6K98.id+gtCurrentDataProductImage["images"].cover}`));
                _savedRefObjCurrentObjs_["_img"][z6K98.id] = gtURLCurrentImageRequest
            }));
            rkN8KY134g432X72(tY369=>({...tY369,loading:false}));
            oX188RS9r399buvz(_savedRefObjCurrentObjs_)
        })()
    },[qW795,nT747]);
    useMemo(_ => {
        let __=[];const stRefObjValuesCurrentFilter = Object.values(aF633);
        Object.keys(aF633).forEach((i42J5,j3I82)=>{
            switch(i42J5){
                case "limit":
                    __.push(limit(stRefObjValuesCurrentFilter[j3I82]["value"]));
                break;
                case "by":
                    switch(stRefObjValuesCurrentFilter[j3I82]["value"]){
                        case "vL958":
                            __.push(orderBy("created","desc"));
                        break;
                        case "G7q15":
                            __.push(where("mutate","==",true));
                        break;
                    }
                break;
                default:
                    let ___ = nT747;
                    if(___.filter(({tagID})=>stRefObjValuesCurrentFilter[j3I82]["tagID"]===tagID).length > 0){
                        ___[___.findIndex(({tagID})=>tagID===stRefObjValuesCurrentFilter[j3I82]["tagID"])]["elementID"] = stRefObjValuesCurrentFilter[j3I82]["value"];
                    }else ___.push({tagID:stRefObjValuesCurrentFilter[j3I82]["tagID"],elementID:stRefObjValuesCurrentFilter[j3I82]["value"]});
                    W4NesI3Mj0PB6uSL(___);
                break;
            }
        });JgB4F4A9gamEuP2U(__)
    },[aF633]);
    useMemo(_ => {
        if(o3R66){
            const stRefCurrentLengthKey = [Object.keys(aF633).length,Object.keys(stInitialStateFilter).length];
            if(o3R66["_tt"] === 0 && stRefCurrentLengthKey[0] === stRefCurrentLengthKey[1]) rkN8KY134g432X72(zR617=>({...zR617,global:true}));
            else rkN8KY134g432X72(St743=>({...St743,global:false}));
            if(o3R66["_tt"] === 0 && stRefCurrentLengthKey[0] > stRefCurrentLengthKey[1]) rkN8KY134g432X72(wV958=>({...wV958,filter:true}));
            else rkN8KY134g432X72(v4K79=>({...v4K79,filter:false}));
        }
    },[o3R66]);
    for(let F91w5=0;F91w5<=(x5I11-1);F91w5++) _savedObjLoaderProducts_.push(<AddonProductProductContainer key={F91w5} loading/>);
    const HandlerEmptyFilter = _ => {
        W4NesI3Mj0PB6uSL([]);
        G8yIUWS5qX4uhu45(stInitialStateFilter);
    };
    const HandlerChangeEventSearchInput = y31E6 => {
        y31E6.preventDefault();if(y31E6.target.value.length === 0) r9lxoy88NC90iBkl({active:false,products:[],text:null});
        else{
            const _stRefSavedCurrentValueOnInput_ = y31E6.target.value;
            const _gtObjsWithContainerCurrentFilter_ = o3R66["_pt"].filter(({name,sku})=>_stRefSavedCurrentValueOnInput_ === sku || _stRefSavedCurrentValueOnInput_ === FnDefVariableOnText(name) || FnDefVariableOnText(name).includes(_stRefSavedCurrentValueOnInput_.split('')) || FnDefVariableOnText(name).includes(_stRefSavedCurrentValueOnInput_.split(' ')));
            r9lxoy88NC90iBkl({active:true,products:_gtObjsWithContainerCurrentFilter_,text:_stRefSavedCurrentValueOnInput_});
        }
    };
    const HandlerUpdateRenderViewProducts = _ => {
        let _savedCurrentObjRefPointer_ = n1R98["active"] ? n1R98["products"].length > 0 ? n1R98["products"] : [] : o3R66["_pt"];
        return _savedCurrentObjRefPointer_.map(({_id,name,price,mutate})=>(
            <AddonProductProductContainer _id={_id} title={name} mutate={mutate} image={o3R66["_img"][_id]} key={_id} price={price}/>
        ));
    };
    const HandlerClearInputCurrentSearch = _ => {
        stRefCurrentDOMInput.current.value = null;
        r9lxoy88NC90iBkl({active:false,products:[],text:null});
    };
    return (
        <div className="CateContainer">
            <div className="Categorias-Box">
                <ul>
                    <h3>Temática</h3>
                    {stRefObjContainCategoryWithType.filter(({uniqKey})=>uniqKey==="vG562").map(({query,content,uniqKey:gX426})=>{
                        const HandlerMutateFilter = xS899 => G8yIUWS5qX4uhu45(z06R7=>{
                            z06R7[query] = {value:xS899,tagID:gX426};return {...z06R7}
                        });return content.map(({uniqKey,name})=>{
                            const stRefObjCurrentRead = aF633[query];
                            return <li key={uniqKey}>
                                <button className={stRefObjCurrentRead?stRefObjCurrentRead["value"]===uniqKey?"active":undefined:undefined} onClick={_=>HandlerMutateFilter(uniqKey)} disabled={P06i7["global"]||stRefObjCurrentRead&&stRefObjCurrentRead["value"]===uniqKey}>
                                    {name}
                                </button>
                            </li>
                        });
                    })}
                </ul>
                <div className="NavCate">
                    {Object.keys(aF633).length > Object.keys(stInitialStateFilter).length ? (
                        <div className="filterContainerText" style={{cursor:"pointer"}} onClick={HandlerEmptyFilter}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                            <span>Eliminar Filtro</span>
                        </div>
                    ) : (
                        <div className="filterContainerText Disabled">
                            <i className="fa fa-filter" aria-hidden="true"></i>
                            <span>Sin Filtrar</span>
                        </div>
                    )}
                    <label className="SearchInput">
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <input ref={stRefCurrentDOMInput} type="search" onChange={HandlerChangeEventSearchInput} placeholder="Ingrese el SKU ó el nombre del producto" disabled={P06i7["global"]||P06i7["filter"]}/>
                    </label>
                </div>
                <div className="CategoriasProductosFilters">
                    <div className="MenuCategoriasFilter">
                        <div className="MainMenuCate">
                            {stRefObjContainCategoryWithType.filter(({uniqKey})=>uniqKey==="zP547").map(({query,content,title,uniqKey})=>(
                                <AddonProductCategoryContainer key={uniqKey} tagID={uniqKey} queryName={query} title={title} iterator={content} filter={[aF633,G8yIUWS5qX4uhu45,P06i7]}/>
                            ))}
                            {stRefObjContainCategoryWithType.map(({uniqKey,title,content,query})=>{
                                let _s_ = o3R66 ? o3R66["_pt"] : [];
                                return (uniqKey !== "zP547" && uniqKey !== "vG562") && <AddonProductCategoryContainer counter tagID={uniqKey} key={uniqKey} mini queryName={query} title={title} iterator={content} filter={[aF633,G8yIUWS5qX4uhu45,P06i7,_s_]}/>
                            })}
                        </div>
                    </div>
                    <div className="ContentProductosCate">
                        {P06i7["global"] && (
                            <AddonProductCategoryErrorContainer text="Regresar" message="Lo sentimos, todavía no contamos con productos de esta categoría. Favor de seleccionar otro tipo de artículo o regresa a la página de Inicio"/>
                        )}
                        {P06i7["filter"] && (
                            <AddonProductCategoryErrorContainer callback={HandlerEmptyFilter} message="Lo sentimos, no se encontró ningún producto con el filtro especificado. Favor de seleccionar otro tipo de filtro" text="Limpiar Filtro"/>
                        )}
                        {(n1R98["active"] && n1R98["products"].length === 0) && (
                            <AddonProductCategoryErrorContainer callback={HandlerClearInputCurrentSearch} message={`Lo sentimos, no se encontró ningún producto con el término "${n1R98["text"]}". Favor de verificar correctamente lo que está buscando`} text="Limpiar Busqueda"/>
                        )}
                        <div className="listProductos">
                            {o3R66 && (
                                P06i7["loading"] ? _savedObjLoaderProducts_ : HandlerUpdateRenderViewProducts()
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};