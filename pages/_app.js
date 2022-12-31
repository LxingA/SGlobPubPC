/*
@author LxingA [SUDesign]
@project PrintCards
@date 12/Dic/22 04:14
@description Definición de la Aplicación para ser Implementado en el Proyecto
*/
import {useEffect,useState,Fragment} from 'react';
import {collection,doc,onSnapshot} from 'firebase/firestore';
import {onAuthStateChanged,onIdTokenChanged,signOut} from 'firebase/auth';
import {AuthContext} from '../util/context';
import Firebase from '../util/firebase';
import Animation from 'aos';
import Loader from 'react-content-loader';
import '../assets/96517d18-f81c-43d2-ac47-3e96d1230c7f.scss';
import '../assets/3d0ba9b3-dc6e-4a73-85ee-8f1b6b74abe4.css';
import 'aos/dist/aos.css';

const App = ({Component,pageProps}) => {
    const [{state,value,global,error,auth,user},setStatus] = useState({state:false,value:null,global:null,error:false,auth:undefined,user:null});
    const HandlerFirebase = async () => {
        const {status,value} = await Firebase();
        if(status){
            const sRefDoc = doc(collection(value["FirebaseDatabase"],"global"),"ZKQuAiYhLwjg5g7zySE9");
            const sRefObj = {state:status,value,global};
            onSnapshot(sRefDoc,ySqem=>setStatus({...sRefObj,global:ySqem.data()}));
        }else setStatus({state:status,value,global,error:true,auth});
    };
    useEffect(_ => {
        HandlerFirebase();
        Animation.init();
    },[]);
    useEffect(_ => {
        let _tkEv_,_usInfEv_=null;
        global && onAuthStateChanged(value["FirebaseAuth"],RxQFu=>{
            if(RxQFu){
                _tkEv_ = onIdTokenChanged(value["FirebaseAuth"],scfXu=>{
                    _usInfEv_ = onSnapshot(doc(collection(value["FirebaseDatabase"],"user"),RxQFu.uid),NRulK=>{
                        if(NRulK.exists()) setStatus(LDdSn=>({...LDdSn,auth:true,user:{nick:scfXu.displayName,id:RxQFu.uid,tel:scfXu.phoneNumber,photo:scfXu.photoURL,mail:scfXu.email,verified:scfXu.emailVerified,info:NRulK.data()}}));
                        else signOut(value["FirebaseAuth"])
                    });
                });
            }else{
                if(_tkEv_ && _usInfEv_){
                    _tkEv_();
                    _usInfEv_();                    
                }setStatus(zYiCt=>({...zYiCt,auth:false,user:null}));
            }
        });
    },[global]);
    return state && typeof auth !== "undefined" ? (
        <AuthContext.Provider>
            <Component {...pageProps} firebase={value} global={global} authentic={auth} user={user}/>
        </AuthContext.Provider>
    ) : (!state || error) && (
        <Fragment>
            <div className="pop-up-anuncios">
                <p>
                    <Loader width={500} height={25} foregroundColor="#ab9a9a" backgroundColor="#8f8e8e">
                        <rect x={0} y={0} rx={0} ry={0} width={500} height={25}/>
                    </Loader>
                </p>
            </div>
            <nav>
                <div className="logotipo">
                    <Loader width={200} height={30} foregroundColor="#ab9a9a" backgroundColor="#fff0">
                        <rect x={0} y={0} rx={0} ry={0} width={200} height={30}/>
                    </Loader>
                </div>
                <ul className="mainmenu">
                    <li>
                        <Loader width={100} height={30} foregroundColor="#ab9a9a" backgroundColor="#fff0">
                            <rect x={0} y={0} rx={0} ry={0} width={100} height={30}/>
                        </Loader>
                    </li>
                    <li>
                        <Loader width={100} height={30} foregroundColor="#ab9a9a" backgroundColor="#fff0">
                            <rect x={0} y={0} rx={0} ry={0} width={100} height={30}/>
                        </Loader>
                    </li>
                    <li>
                        <Loader width={100} height={30} foregroundColor="#ab9a9a" backgroundColor="#fff0">
                            <rect x={0} y={0} rx={0} ry={0} width={100} height={30}/>
                        </Loader>
                    </li>
                </ul>
                <div className="user-options">
                    <div className="user-icon">
                        <Loader width={150} height={25} foregroundColor="#ab9a9a" backgroundColor="#fff0">
                            <rect x={0} y={0} rx={0} ry={0} width={150} height={25}/>
                        </Loader>
                    </div>
                    <div className="user-pedidos">
                        <Loader width={150} height={25} foregroundColor="#ab9a9a" backgroundColor="#fff0">
                            <rect x={0} y={0} rx={0} ry={0} width={150} height={25}/>
                        </Loader>
                    </div>
                </div>
            </nav>
            <header className="error">
                <div className="content-txt">
                    <h3>{error ? "Tienda no Disponible" : "Cargando..."}</h3>
                    <p>{error ? "Hubo un error a inicializar la Tienda" : "Porfavor espere"}</p>
                    {error && (
                        <a className="btn-white" style={{cursor:"pointer"}} onClick={_=>window.location.reload()}>Reintentar</a>
                    )}
                </div>
            </header>
            <footer>
                <div className="main-footer-content">
                    <div className="column-footer">
                        <div className="column-1">
                            <Loader width={300} height={200} foregroundColor="#d2bca1" backgroundColor="#af9b82">
                                <rect x={0} y={0} rx={0} ry={0} width={300} height={200}/>
                            </Loader>
                        </div>
                        <div className="column-2">
                            <Loader width={300} height={200} foregroundColor="#d2bca1" backgroundColor="#af9b82">
                                <rect x={0} y={0} rx={0} ry={0} width={300} height={200}/>
                            </Loader>
                        </div>
                        <div className="column-3">
                            <Loader width={300} height={200} foregroundColor="#d2bca1" backgroundColor="#af9b82">
                                <rect x={0} y={0} rx={0} ry={0} width={300} height={200}/>
                            </Loader>
                        </div>
                        <div className="column-4">
                            <Loader width={300} height={200} foregroundColor="#d2bca1" backgroundColor="#af9b82">
                                <rect x={0} y={0} rx={0} ry={0} width={300} height={200}/>
                            </Loader>
                        </div>
                        <div className="column-3">
                            <Loader width={300} height={200} foregroundColor="#d2bca1" backgroundColor="#af9b82">
                                <rect x={0} y={0} rx={0} ry={0} width={300} height={200}/>
                            </Loader>
                        </div>
                    </div>
                </div>
                <div className="main-enlaces">
                    <ul className="terminos">
                        <Loader width={300} height={30} foregroundColor="#d2bca1" backgroundColor="#af9b82">
                            <rect x={0} y={0} rx={0} ry={0} width={300} height={30}/>
                        </Loader>
                    </ul>
                    <ul className="redes">
                        <Loader width={300} height={30} foregroundColor="#d2bca1" backgroundColor="#af9b82">
                            <rect x={0} y={0} rx={0} ry={0} width={300} height={30}/>
                        </Loader>
                    </ul>
                </div>
            </footer>
        </Fragment>
    )
};

export default App;