/*
@author LxingA [SUDesign]
@project PrintCards
@date 15/Dic/22 13:46
@description Página Principal para mostrar el Panel de Cliente del Proyecto
*/
import {Fragment} from 'react';
import {useRouter} from 'next/router';
import {AccountBoxLink} from '../../components/ComponentBox';
import Head from 'next/head';
import ViewAuth from '../../view/auth';
import ViewAccount from "../../view/account";

const AccountIndex = ({global,firebase,authentic,user}) => {
    const {pathname} = useRouter();
    const {siteName} = global;
    return (
        <ViewAuth authentic={authentic}>
            <Fragment>
                <Head>
                    <title>Tablero - {siteName}</title>
                </Head>
                <ViewAccount global={[firebase,global,authentic,user]}>
                    <div className="Options-Fast">
                        <AccountBoxLink arrow to={`${pathname}/config`} title="Administrar" description="Edita tu nombre, cambia tu contraseña o otros datos más." icon="user"/>
                        <AccountBoxLink arrow to={`${pathname}/address`} title="Direcciones" description="Administra tu lista de direcciones de entrega e facturación." icon="map"/>
                    </div>
                    <div className="Productos">
                        <h3>Pedidos</h3>
                        <div className="lista-Categorias">
                            <AccountBoxLink to={`${pathname}?sort=t`} title="Tazas" icon="home"/>
                            <AccountBoxLink to={`${pathname}?sort=t`} title="Playeras" icon="home"/>
                            <AccountBoxLink to={`${pathname}?sort=t`} title="Canvas" icon="home"/>
                            <AccountBoxLink to={`${pathname}?sort=t`} title="Todos" icon="home"/>
                        </div>
                    </div>
                </ViewAccount>
            </Fragment>
        </ViewAuth>
    )
};

export default AccountIndex;