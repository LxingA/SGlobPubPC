/*
@author LxingA [SUDesign]
@project PrintCards
@date 18/Dic/22 21:39
@description Complemento para Contener los Contenedores Globales para el Proyecto
*/

export const BoxMessage = ({children}) => {
    return (
        <div className="floatingCaja">
            <i className="fa fa-heart-o" aria-hidden="true"></i>
            {children}
        </div>
    )
};