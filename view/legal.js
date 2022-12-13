/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 18:47
@description Vista Global para lo Legal en el Proyecto
*/
import {Fragment} from 'react';
import {HeaderShop} from '../components/ComponentHeader';
import {FooterShop} from '../components/ComponentFooter';
import Message from '../components/ComponentMessage';

const ViewLegal = ({children,global,firebase,title,description}) => {
    return (
        <Fragment>
            <Message global={global}/>
            <HeaderShop global={[firebase,global]}/>
            <header data-aos="fade-up" data-aos-duration="3000" className="error Politica">
                <div className="content-txt" data-aos="fade-right">
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </header>
            <div className="content-Wrapper">
                <div className="Prrafo">
                    {children}
                </div>
            </div>
            <FooterShop global={[firebase,global]}/>
        </Fragment>
    )
};

export default ViewLegal;