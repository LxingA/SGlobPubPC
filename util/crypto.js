/*
@author LxingA [SUDesign]
@project PrintCards
@date 22/Dic/22 21:12
@description Utilidad con Algunas Funciones relacionadas en Criptografía para el Proyecto
*/
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