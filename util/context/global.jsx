/*
@author LxingA [SUDesign]
@project PrintCards
@date 11/Dic/22 04:53
@description Contexto Global para ser Implementada en el Proyecto
*/
import {createContext} from 'react';

const CGlobal = createContext({
    siteName: "PrintCards",
    siteSlogan: "Tús articulos personalizados",
    siteColor: "8f8e8e"
});

export default CGlobal;