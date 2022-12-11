/*
@author LxingA [SUDesign]
@project PrintCards
@date 10/Dic/22 22:08
@description Página Principal en el Cliente para mostrar el Índice del Proyecto
*/
'use client';
import {useEffect,Fragment,useContext} from 'react';
import Animation from 'aos';
import GlobalContext from '../util/context/global';
import Header from '../component/ComponentHeader';
import MessagingPub from '../component/ComponentMessagingPub';

const IndexC = () => {
    const {siteName,siteSlogan} = useContext(GlobalContext);
    useEffect(_=>{
        Animation.init();
        document.title = `${siteSlogan} - ${siteName}`;
    },[]);
    return (
        <Fragment>
            <MessagingPub />
            <Header />
        </Fragment>
    )
};

export default IndexC;