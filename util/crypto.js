/*
@author LxingA [SUDesign]
@project PrintCards
@date 22/Dic/22 21:12
@description Utilidad con Algunas Funciones relacionadas en Criptografía para el Proyecto
*/
import {BannerGlobalTitle} from '../components/ComponentBox';
const stNumberStr = "01234567899876543210";
const stWordUpper = "POLLOPIKMMKIUJNNJUYHBBHYTGVVGTRFCCFREDXXDEWSZZSWQAQA";
const stWordLower = "qazzaqwsxxswedccderfvvfrtgbbgtyhnnhyujmmjuikkilolopp";

export const RandomHash = len => {
    let _="";for(let x=0;x<=(len-1);x++){
        var y=(stNumberStr.concat(stWordUpper)).concat(stWordLower);
        _+=y.charAt(Math.round(Math.random()*y.length));
    }return _
};

export const FnUpper = str => str.charAt(0).toUpperCase() + str.substring(1);

export const FnGetObjTitleBanner = (key,global,promotion=false) => {
    const {body:{subtitle:bT512,title:mU044},uniqKey:J3x37} = global.filter(({uniqKey})=>uniqKey===key)[0];
    return <BannerGlobalTitle title={mU044} subtitle={bT512} promotion={promotion} viewID={J3x37}/>
};

export const FnDefVariableOnText = J85r4 => {
    let _;if(/\$([A-Z]+)\$/.test(J85r4)){
        const gtCurrentVariable = J85r4.split(/\$/);
        let _savedCurrentMutateData_;
        switch(gtCurrentVariable[1]){
            case "YEAR":
                _savedCurrentMutateData_ = new Date().getFullYear();
            break;
        }_ = J85r4.replace(`$${gtCurrentVariable[1]}$`,_savedCurrentMutateData_);
    }else _ = J85r4;
    return _
};