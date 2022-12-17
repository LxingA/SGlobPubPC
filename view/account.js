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
import {NavLink} from '../addons/Link';
import Message from '../components/ComponentMessage';
import Imagen from 'next/image';

const ViewAccount = ({children,global,style}) => {
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
                                <div className="icon-user">
                                    <Imagen src="/be1d5ae3-b858-482b-ad6a-14734b50af1f.png" width={200} height={200} alt="Textp"/>
                                </div>
                                <span>{User["nick"]}</span>
                                <button className="btn-Principal" onClick={_=>signOut(Firebase["FirebaseAuth"])}>Desconectarse</button>
                                <ul className="menu-account">
                                    <NavLink to="/cuenta" icon="home" text="Tablero"/>
                                    <NavLink to="/cuenta/config" icon="gear" text="Administrar"/>
                                    <NavLink to="/cuenta/orders" icon="list" text="Pedidos"/>
                                    <NavLink to="/cuenta/address" icon="map" text="Direcciones"/>
                                    <NavLink to="/cuenta/chat" icon="comments" text="Chat"/>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`dashboard-cuenta${style?` ${style}`:""}`}>
                        {children}
                    </div>
                </div>
            </div>
            <FooterShop global={[Firebase,Global,Authentic]}/>
        </Fragment>
    )
};

export default ViewAccount;