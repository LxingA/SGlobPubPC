/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 06:53
@description Vista Global para la Tienda en el Proyecto
*/
import {Fragment,useEffect,useRef} from 'react';
import {HeaderShop} from '../components/ComponentHeader';
import {FooterShop} from '../components/ComponentFooter';
import {SliderShop} from '../components/ComponentSlider';
import Message from '../components/ComponentMessage';
import $ from 'jquery';

const ViewShop = ({children,firebase,global,slider,authentic}) => {
    const cookies = useRef(null);
    useEffect(_ => {
        const $uniq$ = $("#scUniqBoxCookiesM");
        if(localStorage.getItem("scRememberCookiesAccepted")) $uniq$.hide();
        else $uniq$.show();
        if(cookies.current) cookies.current.addEventListener("click",e=>{
            e.preventDefault();localStorage.setItem("scRememberCookiesAccepted",true);$uniq$.hide();
        });
    },[]);
    return (
        <Fragment>
            <Message global={global}/>
            <div className="advertencia" id="scUniqBoxCookiesM">
                <div className="pText">
                    <h3>Permiso para el Uso de Cookies</h3>
                    <p>Para una navegación óptima, este sitio ocupa que su navegador permita el uso de las cookies.</p>
                </div>
                <button style={{cursor:"pointer"}} ref={cookies}>Entendído</button>
            </div>
            <HeaderShop global={[firebase,global,authentic]}/>
            {slider && (
                <SliderShop global={[firebase]}/>
            )}
            {children}
            <FooterShop global={[firebase,global,authentic]}/>
        </Fragment>
    )
};

export default ViewShop;