/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 06:10
@description Utilidad con la Implementación de los Context's en el Proyecto
*/
import {createContext,useReducer} from 'react';
import {AuthReducer,ConstructReducer} from './reducer';

export const AuthContext = {
    Context: createContext(),
    Provider: ({children}) => {
        const {Action,Reducer} = AuthReducer;
        const [State,Dispatch] = useReducer(Reducer,AuthContext.State);
        return (
            <AuthContext.Context.Provider value={{ACAction:Action,ACDispatch:Dispatch,ACState:State}}>
                {children}
            </AuthContext.Context.Provider>
        )
    },
    State: {reauthentic:false,action:null,value:null}
};

export const ConstructContext = {
    Context: createContext(),
    Provider: ({children}) => {
        const {Action,Reducer} = ConstructReducer;
        const [State,Dispatch] = useReducer(Reducer,ConstructContext.State);
        return (
            <ConstructContext.Context.Provider value={{CCAction:Action,CCDispatch:Dispatch,CCState:State}}>
                {children}
            </ConstructContext.Context.Provider>
        )
    },
    State: {
        products: {
            taza: [],
            playera: [],
            canva: [],
            cojin: [],
            rompecabeza: [],
            agenda: [],
            chipbag: []
        },
        total: 0,
        params: {
            taza: "blanca",
            playera: "credondo",
            canva: "horizontal",
            cojin: "cuadrada",
            rompecabeza: "",
            agenda: "diaria",
            chipbag: "papita"
        },
        off: false
    }
};