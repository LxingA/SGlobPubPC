/*
@author LxingA [SUDesign]
@project PrintCards
@date 11/Dic/22 16:59
@description Definición de la Base HTML para ser Implementado en el Proyecto
*/
import {Head,Html,Main,NextScript} from 'next/document';

const Document = () => {
    return (
        <Html>
            <Head>
                <meta name="theme-color" content="#8f8e8e"/>
                <link rel="apple-touch-icon" href="/b2bfd931-601f-479c-826a-4fb7d0aba8af.png" type="image/png" sizes="180x180"/>
                <link rel="icon" href="/de8fc166-8c02-4a4a-8d98-00203cf4c5ed.png" type="image/png" sizes="16x16"/>
                <link rel="icon" href="/1340026a-c8f2-4fa0-9683-69e4bc51848c.png" type="image/png" sizes="32x32"/>
                <link rel="favicon" href="/428f70d3-aff1-4d12-9178-8728cb5161f7.ico" type="image/x-icon"/>
                <link rel="manifest" href="/025d50df-26f5-4132-be41-9ab28b65f177.webmanifest"/>
                <link rel="stylesheet" href="/02181719-de5c-4586-adda-e45641acd048.css"/>
            </Head>
            <body>
                <Main />
                <NextScript />
                <script src="/7762ee49-9906-432d-8a38-45529b237e01.js"></script>
                <script src="/c504e1f2-5bdc-409c-b832-ca7c2e2a7f19.js"></script>
                <script src="/bf591569-b38b-43de-8db6-df7526df0e44.js"></script>
            </body>
        </Html>
    )
};

export default Document;