/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 06:10
@description Utilidad con la Implementación de los Reducer's en el Proyecto
*/
import {AuthContext} from './context';

export const SliderReducer = {
    Action: {
        SRActUpdateInitUpper: _ => ({
            type: "SRActUpdateInitUpper"
        }),
        SRActUpdateInitLower: _ => ({
            type: "SRActUpdateInitLower"
        }),
        SRActUpdateSetMaxItems: DtPOY => ({
            type: "SRActUpdateSetMaxItems",
            payload: {
                setInitialMax: DtPOY
            }
        })
    },
    Reducer: (state, action) => {
        const {payload,type} = action;let __;
        switch(type){
            case "SRActUpdateSetMaxItems":
                return {...state,max:(payload.setInitialMax * 100)}
            case "SRActUpdateInitUpper":
                __ = (state.init + 100);if(__ >= state.max) __ = 0;
                return {...state,init:__}
            case "SRActUpdateInitLower":
                __ = (state.init - 100);if(__ < 0) __ = (state.max - 100);
                return {...state,init:__}
        }
        return state
    }
};

export const AuthReducer = {
    Action: {
        ARActUpdateCurrentActionRequest: KIBfm => ({
            type: "ARActUpdateCurrentActionRequest",
            payload: {
                newActionRequest: KIBfm
            }
        }),
        ARActUpdateCurrentReAuthState: DFQgU => ({
            type: "ARActUpdateCurrentReAuthState",
            payload: {
                newReAuthState: DFQgU
            }
        }),
        ARActUpdateCurrentDataRequest: AvOcg => ({
            type: "ARActUpdateCurrentDataRequest",
            payload: {
                newDataRequest: AvOcg
            }
        })
    },
    Reducer: (state = AuthContext.State, action) => {
        const {payload,type} = action;
        switch(type){
            case "ARActUpdateCurrentActionRequest":
                return {...state,action:payload.newActionRequest}
            case "ARActUpdateCurrentReAuthState":
                return {...state,reauthentic:payload.newReAuthState}
            case "ARActUpdateCurrentDataRequest":
                return {...state,value:payload.newDataRequest}
        }
        return state
    }
};