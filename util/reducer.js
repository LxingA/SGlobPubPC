/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 06:10
@description Utilidad con la Implementación de los Reducer's en el Proyecto
*/
import {RandomHash,FnUpper} from './crypto';
import {AuthContext,ConstructContext} from './context';

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

export const ConstructReducer = {
    Action: {
        CRActSetNewProductLayer: Rd663 => ({
            type: "CRActSetNewProductLayer",
            payload: {
                stTypeCreate: Rd663
            }
        }),
        CRActDeleteCurrentProductLayer: (s00W2,y8M64) => ({
            type: "CRActDeleteCurrentProductLayer",
            payload: {
                idProductDelete: s00W2,
                typeProductDelete: y8M64
            }
        }),
        CRActActiveCurrentProductLayer: (R789o,oY772) => ({
            type: "CRActActiveCurrentProductLayer",
            payload: {
                idProductActive: R789o,
                typeProductActive: oY772
            }
        }),
        CRActCloneCurrentProductLayer: (a22L6,d832W) => ({
            type: "CRActCloneCurrentProductLayer",
            payload: {
                idProductClone: a22L6,
                typeProductClone: d832W
            }
        }),
        CRActUpdateCurrentNameProductLayer: (gB677,kZ064,aN001) => ({
            type: "CRActUpdateCurrentNameProductLayer",
            payload: {
                idProductUpdateN: gB677,
                typeProductUpdateN: kZ064,
                newValueUpdateN: aN001
            }
        }),
        CRActUpdateCurrentParamsConstruct: (fN496,F14j3,r928I,v0B67) => ({
            type: "CRActUpdateCurrentParamsConstruct",
            payload: {
                idParam: fN496,
                valueParam: F14j3,
                typeProduct: r928I,
                idProductCurrentUpdate: v0B67
            }
        })
    },
    Reducer: (state = ConstructContext.State, action) => {
        const {payload,type} = action;let _savedRefCurrentState_;const initialElementObj={text:[],image:[]};
        switch(type){
            case "CRActUpdateCurrentParamsConstruct":
                _savedRefCurrentState_ = state["products"];
                let _savedCurrentRefObjUpdated_ = _savedRefCurrentState_[payload.typeProduct];
                _savedCurrentRefObjUpdated_ = _savedCurrentRefObjUpdated_.map(kD510=>{
                    if(kD510["uniqKey"]===payload.idProductCurrentUpdate){
                        let __ = kD510["variant"];
                        __[payload.idParam] = payload.valueParam;
                        if(payload.idParam === "type"){
                            __["view"] = null;
                            __["element"] = initialElementObj;
                            switch(payload.typeProduct){
                                case "taza":
                                    __["color"] = null;
                                break;
                            }
                        };
                        kD510["variant"] = __;
                    }return kD510
                });_savedRefCurrentState_[payload.typeProduct] = _savedCurrentRefObjUpdated_;
                return {...state,products:_savedRefCurrentState_}
            case "CRActSetNewProductLayer":
                _savedRefCurrentState_ = state["products"];
                const stObjInitialStructure = {
                    uniqKey: RandomHash(16),
                    name: `${FnUpper(payload.stTypeCreate)} sin nombre`,
                    active: true,
                    id: _savedRefCurrentState_[payload.stTypeCreate].length > 0 ? _savedRefCurrentState_[payload.stTypeCreate][0]["id"] + 1 : 1,
                    variant: {
                        type: null,
                        view: null,
                        element: initialElementObj
                    }
                };let _objInitMutate_ = {...stObjInitialStructure};
                switch(payload.stTypeCreate){
                    case "taza":
                        _objInitMutate_["variant"]["type"] = "blanca";
                        _objInitMutate_["variant"]["color"] = null;
                    break;
                    case "playera":
                    break;
                    case "canva":
                    break;
                }let _objRefMutate_ = state["products"][payload.stTypeCreate];
                _objRefMutate_.unshift(_objInitMutate_);
                if(_savedRefCurrentState_[payload.stTypeCreate].length > 1){
                    _objRefMutate_ = _objRefMutate_.map((mH761,i)=>{
                        if(i === 0) mH761["active"] = true;
                        else mH761["active"] = false;
                        return mH761
                    });
                }_savedRefCurrentState_[payload.stTypeCreate] = _objRefMutate_;
                return {...state,products:_savedRefCurrentState_}
            case "CRActDeleteCurrentProductLayer":
                _savedRefCurrentState_ = state["products"];
                let _objDeleteRef_ = _savedRefCurrentState_[payload.typeProductDelete];
                _objDeleteRef_.splice(_objDeleteRef_.findIndex(({uniqKey})=>uniqKey===payload.idProductDelete),1);
                _savedRefCurrentState_[payload.typeProductDelete] = _objDeleteRef_;
                return {...state,products:_savedRefCurrentState_}
            case "CRActActiveCurrentProductLayer":
                _savedRefCurrentState_ = state["products"];
                let _objActiveRef_ = _savedRefCurrentState_[payload.typeProductActive];
                _objActiveRef_ = _objActiveRef_.map(zA964=>{
                    if(zA964["uniqKey"] === payload.idProductActive) zA964["active"] = true;
                    else zA964["active"] = false;
                    return zA964
                });_savedRefCurrentState_[payload.typeProductActive] = _objActiveRef_;
                return {...state,products:_savedRefCurrentState_}
            case "CRActCloneCurrentProductLayer":
                _savedRefCurrentState_ = state["products"];
                let _objCloneRefParentState_ = _savedRefCurrentState_[payload.typeProductClone];
                let _objCopyRefCurrentCloneRequest_ = _objCloneRefParentState_[_objCloneRefParentState_.findIndex(({uniqKey})=>uniqKey===payload.idProductClone)];
                let _objInitializateNewInstanceForCloneRequest_ = {..._objCopyRefCurrentCloneRequest_};
                _objInitializateNewInstanceForCloneRequest_["uniqKey"] = RandomHash(16);
                _objInitializateNewInstanceForCloneRequest_["id"] = _objCloneRefParentState_.length + 1;
                _objCloneRefParentState_.unshift(_objInitializateNewInstanceForCloneRequest_);
                _savedRefCurrentState_[payload.typeProductClone] = _objCloneRefParentState_;
                return {...state,products:_savedRefCurrentState_}
            case "CRActUpdateCurrentNameProductLayer":
                _savedRefCurrentState_ = state["products"];
                let _objUpdateNRef_ = _savedRefCurrentState_[payload.typeProductUpdateN];
                _objUpdateNRef_ = _objUpdateNRef_.map(Mf999=>{
                    if(Mf999["uniqKey"] === payload.idProductUpdateN) Mf999["name"] = payload.newValueUpdateN;
                    return Mf999
                });_savedRefCurrentState_[payload.typeProductUpdateN] = _objUpdateNRef_;
                return {...state,products:_savedRefCurrentState_}
        }
        return state
    }
};