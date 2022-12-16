/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 06:53
@description Vista Global para la Tienda en el Proyecto
*/
import {Fragment} from 'react';
import {HeaderShop} from '../components/ComponentHeader';
import {FooterShop} from '../components/ComponentFooter';
import {SliderShop} from '../components/ComponentSlider';
import Message from '../components/ComponentMessage';

const ViewShop = ({children,firebase,global,slider,authentic}) => {
    return (
        <Fragment>
            <Message global={global}/>
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