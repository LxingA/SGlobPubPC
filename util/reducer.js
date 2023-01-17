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
        }),
        SRActUpdateSetInitialNumber: fN632 => ({
            type: "SRActUpdateSetInitialNumber",
            payload: {
                setInitialNumber: fN632
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
            case "SRActUpdateSetInitialNumber":
                return {...state,init:payload.setInitialNumber}
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
        }),
        CRActElementsFnCurrentProductLayer: (Wo848,aT911,dC510,j96Q1,d6N06,C3y80={}) => ({
            type: "CRActElementsFnCurrentProductLayer",
            payload: {
                elementType: Wo848,
                actionParam: aT911,
                valueParam: C3y80,
                typeProduct: dC510,
                idProductCurrent: j96Q1,
                idViewCurrent: d6N06
            }
        })
    },
    Reducer: (state = ConstructContext.State, action) => {
        const {payload,type} = action;let _savedRefCurrentState_;const initialElementObj={text:[],image:[]};
        switch(type){
            case "CRActElementsFnCurrentProductLayer":
                _savedRefCurrentState_ = state["products"];
                let _savedRefCurrentObjWithType_ = _savedRefCurrentState_[payload.typeProduct];
                _savedRefCurrentObjWithType_ = _savedRefCurrentObjWithType_.map(R119g=>{
                    if(R119g["uniqKey"]===payload.idProductCurrent){
                        let _savedRefObjMap_ = R119g["variant"]["element"][payload.elementType];
                        switch(payload.actionParam){
                            case "add":
                                let _initialObjState_={uniqKey:RandomHash(16),active:false,view:payload.idViewCurrent,axis:{y:"150px",x:"100px"}};
                                switch(payload.elementType){
                                    case "text":
                                        _initialObjState_["content"] = "Texto de Ejemplo";
                                        _initialObjState_["font"] = "Roboto";
                                        _initialObjState_["color"] = "#fffff";
                                        _initialObjState_["size"] = 12;
                                        _initialObjState_["style"] = "sans-serif";
                                    break;
                                    case "image":
                                        _initialObjState_["url"] = payload.valueParam["uri"];
                                        _initialObjState_["width"] = 200;
                                    break;
                                }_savedRefObjMap_.unshift(_initialObjState_);
                            break;
                            case "delete":
                                _savedRefObjMap_.splice(_savedRefObjMap_.findIndex(({uniqKey})=>uniqKey===payload.valueParam["id"]),1);
                                if(payload.elementType==="image") (_savedRefObjMap_.filter(({url})=>url===payload.valueParam["currentURL"]).length === 0 && payload.valueParam["currentURL"].indexOf("blob") !== -1) && URL.revokeObjectURL(payload.valueParam["currentURL"]);
                            break;
                            case "clone":
                                let _savedRefCloneTextElement_ = _savedRefObjMap_[_savedRefObjMap_.findIndex(({uniqKey})=>uniqKey===payload.valueParam["id"])];
                                let _instanceNewRefTextElement_ = {..._savedRefCloneTextElement_};
                                let _savedRefNewIDUniq = RandomHash(16);
                                _instanceNewRefTextElement_["uniqKey"] = _savedRefNewIDUniq;
                                _savedRefObjMap_.unshift(_instanceNewRefTextElement_);
                                _savedRefObjMap_ = _savedRefObjMap_.map(hB588=>{
                                    if(hB588["uniqKey"] !== _savedRefNewIDUniq) hB588["active"] = false;
                                    return hB588
                                });
                            break;
                            case "update":
                                let _savedRefCurrentValues_ = payload.valueParam;
                                _savedRefObjMap_ = _savedRefObjMap_.map(lB351=>{
                                    if(lB351["uniqKey"]===_savedRefCurrentValues_["id"]){
                                        Object.keys(_savedRefCurrentValues_).forEach((j19J5,i)=>{
                                            if(j19J5 !== "id") lB351[j19J5] = Object.values(_savedRefCurrentValues_)[i]
                                        })
                                    }if(_savedRefCurrentValues_["active"] && lB351["uniqKey"] !== _savedRefCurrentValues_["id"]) lB351["active"] = false;
                                    return lB351
                                });
                            break;
                        }R119g["variant"]["element"][payload.elementType]=_savedRefObjMap_
                    }return R119g
                });_savedRefCurrentState_[payload.typeProduct] = _savedRefCurrentObjWithType_;
                return {...state,products:_savedRefCurrentState_}
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
                let _objRefIDCurrentDeleteProduct_ = _objDeleteRef_.findIndex(({uniqKey})=>uniqKey===payload.idProductDelete);
                _objDeleteRef_[_objRefIDCurrentDeleteProduct_]["variant"]["element"]["image"].forEach(({url})=>URL.revokeObjectURL(url));
                _objDeleteRef_.splice(_objRefIDCurrentDeleteProduct_,1);
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