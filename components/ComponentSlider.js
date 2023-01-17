/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 11:18
@description Componente con el Slider para el Proyecto
*/
import {useEffect,useState,useReducer,useRef,useMemo} from 'react';
import {collection,where,query,onSnapshot,orderBy} from 'firebase/firestore';
import {getDownloadURL,ref} from 'firebase/storage';
import {SliderReducer} from '../util/reducer';
import Enlace from 'next/link';

export const SliderShop = ({global}) => {
    const {Action:{SRActUpdateSetMaxItems,SRActUpdateInitLower,SRActUpdateInitUpper,SRActUpdateSetInitialNumber},Reducer} = SliderReducer;
    const [sliderData,setSliderData] = useState(null);
    const [{FirebaseDatabase,FirebaseStorage}] = global;
    const [currentCount,dispatch] = useReducer(Reducer,{init:0,max:0});
    const stRefInitialStateStats = {press:false,xOffset:0,translateX:currentCount.init};
    const [stats,setStats] = useState(stRefInitialStateStats);
    const stRefDivContainer = useRef(null);
    useEffect(_ => {
        const sRefDoc = query(collection(FirebaseDatabase,"slider"),where("active","==",true),orderBy("order"));
        const sRefSocket = onSnapshot(sRefDoc,async baVxB=>{
            let __refState__ = [];
            await Promise.all(baVxB.docs.map(async PgEyp=>{
                const {cover,description,title,to,button} = PgEyp.data();
                const url = await getDownloadURL(ref(FirebaseStorage,`s/${cover}`));
                __refState__.push({description,title,to,button,url,id:PgEyp.id});
            }));
            dispatch(SRActUpdateSetMaxItems(__refState__.length));
            setSliderData(__refState__.sort((h1U99,eW870)=>h1U99-eW870));
        });
        return _ => sRefSocket();
    },[]);
    const HandlerMousePressEvent = N8n70 => setStats(cJ135=>({...cJ135,press:true,xOffset:N8n70.pageX}));
    const HandlerMouseUpEvent = _ => {
        const stRefCalcCurrentTranslateX = stats["translateX"] - currentCount.init;let __terminated__ = 0;
        if(currentCount.init === 0){
            __terminated__ = stRefCalcCurrentTranslateX >= 50 ? currentCount.init + 100 : currentCount.init;
        }else if(currentCount.init === (currentCount.max - 100)){
            __terminated__ = Math.abs(stRefCalcCurrentTranslateX) >= 50 ? currentCount.init - 100 : currentCount.init;
        }else{
            __terminated__ = (stRefCalcCurrentTranslateX < 0 && Math.abs(stRefCalcCurrentTranslateX) >= 50) ? currentCount.init - 100 : (stRefCalcCurrentTranslateX > 0 && stRefCalcCurrentTranslateX >= 50) ? currentCount.init + 100 : currentCount.init;
        }dispatch(SRActUpdateSetInitialNumber(__terminated__));
        setStats(stRefInitialStateStats);
    };
    const HandlerMouseMoveEvent = i3V30 => {
        i3V30.preventDefault();if(!stats["press"])return;let __;
        const stCalcWithParentAndxOffset = i3V30.pageX - stats["xOffset"];
        __ = currentCount.init + stCalcWithParentAndxOffset;
        if(__ <= 0 || __ >= (currentCount.max - 100)) return;
        setStats(d8K07=>({...d8K07,translateX:__}));
    };
    useMemo(_=>setStats(k87X7=>({...k87X7,translateX:currentCount.init})),[currentCount]);
    return (
        <header data-aos="fade-up" data-aos-duration="3000">
            <div className="nave-slider">
                <i className="btn-circle f-left" onClick={_=>dispatch(SRActUpdateInitLower())}> {"<"} </i>
                <i className="btn-circle f-right" onClick={_=>dispatch(SRActUpdateInitUpper())}> {">"} </i>
            </div>
            <div onMouseMove={HandlerMouseMoveEvent} onMouseUp={HandlerMouseUpEvent} onMouseDown={HandlerMousePressEvent} className="sliderMain" style={{transform:`translateX(-${stats["press"]?stats["translateX"]:currentCount.init}%)`,cursor:stats["press"]?"move":"default"}} ref={stRefDivContainer}>
                <div className="colum-slider">
                    {sliderData && sliderData.map(({id,title,description,to,button,url},i)=>(
                        <div className={`slider-content ctn-${(i+1)}`} key={id}>
                            <div className="content-txt" data-aos={i===0?"fade-right":undefined}>
                                <p>{description}</p>
                                <h3>{title}</h3>
                                <Enlace href={to} className="btn-white">
                                    {button}
                                </Enlace>
                            </div>
                            <img src={url}/>
                        </div>
                    ))}
                </div>
            </div>
        </header>
    )
};