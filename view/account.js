/*
@author LxingA [SUDesign]
@project PrintCards
@date 15/Dic/22 09:39
@description Vista Global para la Cuenta del Cliente para el Proyecto
*/
import {Fragment} from 'react';
import {HeaderShop} from '../components/ComponentHeader';
import {FooterShop} from '../components/ComponentFooter';
import {signOut} from 'firebase/auth';
import Message from '../components/ComponentMessage';

const ViewAccount = ({children,global}) => {
    const [Firebase,Global,Authentic,User] = global;
    return (
        <Fragment>
            <Message global={Global}/>
            <HeaderShop global={[Firebase,Global,Authentic]}/>
            <div className="My-Account" data-aos="fade-left" data-aos-duration="9000">
                <div className="container-maincoin">
                    <div className="mainmenu-Account">
                        <div className="ctn-user">
                            <div className="info-Usuario">
                                <div className="icon-user"></div>
                                <span>{User["nick"]}</span>
                                <button className="btn-Principal" onClick={_=>signOut(Firebase["FirebaseAuth"])}>Desconectarse</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterShop global={[Firebase,Global,Authentic]}/>
        </Fragment>
    )
};

export default ViewAccount;