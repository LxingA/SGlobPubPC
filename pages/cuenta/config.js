/*
@author LxingA [SUDesign]
@project PrintCards
@date 16/Dic/22 13:58
@description Página Principal para mostrar el Panel de Cliente [Configuración|Ajustes] del Proyecto
*/
import {Fragment} from 'react';
import Head from 'next/head';
import ViewAuth from '../../view/auth';
import ViewAccount from "../../view/account";

const AccountIndex = ({global,firebase,authentic,user}) => {
    const {siteName} = global;
    const HandlerDeleteUser = async e => {
        e.preventDefault();
    };
    return (
        <ViewAuth authentic={authentic}>
            <Fragment>
                <Head>
                    <title>Administración de la Cuenta - {siteName}</title>
                </Head>
                <ViewAccount global={[firebase,global,authentic,user]} style="datosMain">
                    <h3 className="main">
                        <span>Administrar Cuenta</span>
                        <div className="ctn-ediciones">
                            <button>
                                <i className="fa fa-pencil" aria-hidden="true"></i>
                                Actualizar
                            </button>
                        </div>
                    </h3>
                    <form className="dts names">
                        <div className="form-1">
                            <div className="ctn-form">
                                <label htmlFor="scinpftnames">Nombres</label>
                                <input type="text" name="scinpftnames" placeholder={`${user&&user["info"].uFName} ${user&&user["info"].uSName}`}/>
                            </div>
                        </div>
                        <div className="form-1">
                            <div className="ctn-form">
                                <label htmlFor="scinpltnames">Apellidos</label>
                                <input type="text" name="scinpltnames" placeholder={`${user&&user["info"].uLName} ${user&&user["info"].uEName}`}/>
                            </div>
                        </div>
                    </form>
                    <form className="dts nacimiento">
                        <div className="form-1 genero">
                            <label htmlFor="username">Fecha de Nacimiento</label>
                            <input type="date" value={user&&user["info"].uBDate?user["info"].uBDate:""}/>
                        </div>
                        <div className="form-1 genero">
                            <label htmlFor="username">Género</label>
                            <select name="genero" value={user&&user["info"].uGenre}>
                                <option value="m">Masculino</option>
                                <option value="f">Femenino</option>
                                <option value="s">No Especificar</option>
                            </select>
                        </div>
                    </form>
                    <form className="dts email-telephone">
                        <div className="form-1">
                            <div className="ctn-form">
                                <label htmlFor="username">Correo Electrónico</label>
                                <input type="email" placeholder={user&&user.mail}/>
                            </div>
                        </div>
                        <div className="form-1">
                            <div className="ctn-form">
                                <label htmlFor="username">Número de Teléfono</label>
                                <input type="number" placeholder={user&&user.tel?user.tel:"Formato +8100000000 sin el +"}/>
                            </div>
                        </div>
                    </form>
                    <form className="dts passwordctn">
                        <div className="form-1">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" placeholder="Ingresa una nueva contraseña"/>
                        </div>
                    </form>
                    <div className="more-options-container">
                        <div className="a-option">
                            <div className="container-op">
                                <h3>Eliminar cuenta</h3>
                                <p>Elimina permanentemente tu cuenta en el sitio</p>
                            </div>
                            <div className="ctn-btn">
                                <button className="btn-Principal" onClick={HandlerDeleteUser}>Borrar cuenta</button>
                            </div>
                        </div>
                        <div className="a-option">
                            <div className="container-op">
                                <h3>Notificaciones</h3>
                                <p>Recibe descuentos, novedades, estatus de tus pedidos en tú correo electrónico</p>
                            </div>
                            <div className="ctn-btn">
                                <button className="btn-Principal">Permitido</button>
                            </div>
                        </div>
                    </div>
                </ViewAccount>
            </Fragment>
        </ViewAuth>
    )
};

export default AccountIndex;