/*
@author LxingA [SUDesign]
@project PrintCards
@date 15/Dic/22 09:39
@description Vista Global para la Cuenta del Cliente para el Proyecto
*/
import {Fragment,useState} from 'react';
import {updateProfile} from 'firebase/auth';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import {HeaderShop} from '../components/ComponentHeader';
import {FooterShop} from '../components/ComponentFooter';
import {signOut} from 'firebase/auth';
import {NavLink} from '../addons/Link';
import Image from 'next/image';
import Message from '../components/ComponentMessage';

const ViewAccount = ({children,global,style}) => {
    const [Firebase,Global,Authentic,User] = global;
    const [loading,setLoading] = useState(false);
    const HandlerImage = e => {
        e.preventDefault();const el=document.getElementById("scInGlobImagePhotoUploader");
        el.click();el.addEventListener("change",e2=>{
            setLoading(true);const file=e2.target.files[0];const image=ref(Firebase["FirebaseStorage"],`u/${User["id"]}`);
            uploadBytes(image,file,{contentType:file.type}).then(_=>{
                getDownloadURL(image).then(async tJ834=>{
                    await updateProfile(Firebase["FirebaseAuth"].currentUser,{photoURL:tJ834});
                    await Firebase["FirebaseAuth"].currentUser.reload();
                    await Firebase["FirebaseAuth"].updateCurrentUser(Firebase["FirebaseAuth"].currentUser);
                    setLoading(false);
                });
            }).catch();
        });
    };
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
                                    {!loading && <button className="btn-Principal" onClick={HandlerImage}>Cambiar</button>}
                                    {User && loading ? (
                                        <Image alt="Actualizando..." width={60} height={60} src="/26d20ad5-edf2-4060-9893-cef7466c3b9d.webp"/>
                                    ) : User["photo"] ? (
                                        <img alt={`Foto de ${User["nick"]}`} src={User["photo"]}/>
                                    ) : (
                                        <Image alt={`Foto de ${User["nick"]}`} width={160} height={160} src="/948b844c-6b03-42af-9eec-917cc1c130ce.png"/>
                                    )}
                                    <input id="scInGlobImagePhotoUploader" accept="image/webp,image/jpeg,image/png" type="file" style={{display:"none"}}/>
                                </div>
                                <span>{User["nick"]}</span>
                                <button className="btn-Principal" onClick={_=>signOut(Firebase["FirebaseAuth"])}>Desconectarse</button>
                                <ul className="menu-account">
                                    <NavLink to="/cuenta" icon="home" text="Tablero"/>
                                    <NavLink to="/cuenta/personal" icon="user" text="Datos Personales"/>
                                    <NavLink to="/cuenta/orders" icon="list" text="Pedidos"/>
                                    <NavLink to="/cuenta/address?view=all" icon="map" text="Direcciones"/>
                                    <NavLink to="/cuenta/chat" icon="comments" text="Chat"/>
                                    <NavLink to="/cuenta/advanced" icon="gear" text="Administrar"/>
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