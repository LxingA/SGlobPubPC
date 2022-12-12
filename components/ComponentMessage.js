/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 07:36
@description Componente con el Mensaje Publicitario para el Proyecto
*/

const Message = ({global}) => {
    const {siteMessage} = global;
    return (
        <div className="pop-up-anuncios" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            <p>{siteMessage}</p>
        </div>
    )
};

export default Message;