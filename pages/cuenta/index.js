/*
@author LxingA [SUDesign]
@project PrintCards
@date 15/Dic/22 13:46
@description Página Principal para mostrar el Panel de Cliente del Proyecto
*/
import {Fragment} from 'react';
import Head from 'next/head';
import ViewAuth from '../../view/auth';
import ViewAccount from "../../view/account";

const AccountIndex = ({global,firebase,authentic,user}) => {
    const {siteName} = global;
    return (
        <ViewAuth authentic={authentic}>
            <Fragment>
                <Head>
                    <title>Mí cuenta - {siteName}</title>
                </Head>
                <ViewAccount global={[firebase,global,authentic,user]}>
                    dsad
                </ViewAccount>
            </Fragment>
        </ViewAuth>
    )
};

export default AccountIndex;