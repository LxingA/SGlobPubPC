/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 06:10
@description Utilidad con la Implementación de los Context's en el Proyecto
*/
import {createContext,useReducer} from 'react';
import {AuthReducer} from './reducer';

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