/*
@author LxingA [SUDesign]
@project PrintCards
@date 10/Dic/22 18:21
@description Diseño Global para ser usada en la Aplicación del Proyecto
*/
import 'aos/dist/aos.css';
import '../asset/3d0ba9b3-dc6e-4a73-85ee-8f1b6b74abe4.css';
import '../asset/96517d18-f81c-43d2-ac47-3e96d1230c7f.scss';

const Layout = ({children}) => {
    return (
        <html author="LxingA" version="5.2.1" lang="es">
            <head>
                <meta charset="utf8"/>
                <meta name="viewport" content="initial-scale=1,width=device-width,user-scalable=0"/>
                <link rel="apple-touch-icon" href="/b2bfd931-601f-479c-826a-4fb7d0aba8af.png" sizes="180x180" type="image/png"/>
                <link rel="icon" href="/de8fc166-8c02-4a4a-8d98-00203cf4c5ed.png" sizes="16x16" type="image/png"/>
                <link rel="icon" href="/1340026a-c8f2-4fa0-9683-69e4bc51848c.png" sizes="32x32" type="image/png"/>
                <link rel="favicon" href="/428f70d3-aff1-4d12-9178-8728cb5161f7.ico" type="image/x-icon"/>
                <link rel="manifest" href="/025d50df-26f5-4132-be41-9ab28b65f177.webmanifest"/>
            </head>
            <body>
                {children}
            </body>
        </html>
    )
};

export default Layout;