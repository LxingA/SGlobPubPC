/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 06:10
@description Utilidad con la Implementación de los Reducer's en el Proyecto
*/
import {AuthContext} from './context';

export const AuthReducer = {
    Action: {},
    Reducer: (state = AuthContext.State, action) => {
        const {payload,type} = action;
        return state
    }
};