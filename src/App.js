import React,{useState} from 'react';
import './App.css';
import Home from './InicioS/Home';
import Login from './InicioS/Login';
import app from './firebase/credenciales';
import {getAuth,onAuthStateChanged} from "firebase/auth";
import {getFirestore,doc,getDoc} from "firebase/firestore";
import 'bootstrap';

const auth= getAuth(app);
const firestore = getFirestore(app);

function App() {

  const [user, setUser] = useState(null);

  async function getRol(uid){
    const documentRef = doc(firestore,`usuarios/${uid}`);
    const docuCifrada = await getDoc(documentRef);
    const infoFinale=docuCifrada.data().rol;
    return infoFinale;
  }

  function obtenerYasignarRoll(usuarioFirebase){
    getRol(usuarioFirebase.uid).then((rol)=>{
      const userData={
        uid:usuarioFirebase.uid,
        correo:usuarioFirebase.email,
        rol:rol
      };
      setUser(userData);
      //console.log("data usuario ",userData);
    });

  }

    onAuthStateChanged(auth,(usuarioFirebase)=>{
      if(usuarioFirebase){
        if(!user){
          obtenerYasignarRoll(usuarioFirebase);
        }

          
      }else{
         
          setUser(null);
      }
    });

  return (
    <div className="App">
     {user ? <Home user={user}/> : <Login/>}
    </div>
  );
}

export default App;
