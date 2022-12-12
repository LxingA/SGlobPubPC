/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 11:18
@description Componente con el Slider para el Proyecto
*/
import {useEffect,useState} from 'react';
import {collection,where,query,onSnapshot} from 'firebase/firestore';
import {getDownloadURL,ref} from 'firebase/storage';
import Enlace from 'next/link';

export const SliderShop = ({global}) => {
    const [sliderData,setSliderData] = useState(null);
    const [{FirebaseDatabase,FirebaseStorage}] = global;
    useEffect(_ => {
        const sRefDoc = query(collection(FirebaseDatabase,"slider"),where("active","==",true));
        const sRefSocket = onSnapshot(sRefDoc,async baVxB=>{
            let __refState__ = [];
            await Promise.all(baVxB.docs.map(async PgEyp=>{
                const {cover,description,title,to,button} = PgEyp.data();
                const url = await getDownloadURL(ref(FirebaseStorage,`s/${cover}`));
                __refState__.push({description,title,to,button,url,id:PgEyp.id});
            }));
            setSliderData(__refState__);
        });
        return _ => sRefSocket();
    },[]);
    return (
        <header data-aos="fade-up" data-aos-duration="3000">
            <div className="nave-slider">
                <i className="btn-circle f-left"> {"<"} </i>
                <i className="btn-circle f-right"> {">"} </i>
            </div>
            <div className="sliderMain">
                <div className="colum-slider">
                    {sliderData && sliderData.map(({id,title,description,to,button,url},i)=>(
                        <div className={`slider-content ctn-${(i+1)}`} key={id}>
                            <div className="content-txt" data-aos={i===0?"fade-right":undefined}>
                                <h3>{title}</h3>
                                <p>{description}</p>
                                <Enlace href={to}>
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