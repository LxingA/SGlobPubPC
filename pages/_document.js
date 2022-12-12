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
                <link rel="apple-touch-icon" href="/b2bfd931-601f-479c-826a-4fb7d0aba8af.png" type="image/png" sizes="180x180"/>
                <link rel="icon" href="/de8fc166-8c02-4a4a-8d98-00203cf4c5ed.png" type="image/png" sizes="16x16"/>
                <link rel="icon" href="/1340026a-c8f2-4fa0-9683-69e4bc51848c.png" type="image/png" sizes="32x32"/>
                <link rel="favicon" href="/428f70d3-aff1-4d12-9178-8728cb5161f7.ico" type="image/x-icon"/>
                <link rel="manifest" href="/025d50df-26f5-4132-be41-9ab28b65f177.webmanifest"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.css" integrity="sha512-Mo79lrQ4UecW8OCcRUZzf0ntfMNgpOFR46Acj2ZtWO8vKhBvD79VCp3VOKSzk6TovLg5evL3Xi3u475Q/jMu4g==" crossorigin="anonymous" referrerpolicy="no-referrer"/>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
};

export default Document;