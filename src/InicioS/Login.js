import React from 'react';
import app from '../firebase/credenciales';
import {getAuth,signInWithEmailAndPassword} from "firebase/auth";
//import {getFirestore,doc,collection} from "firebase/firestore";
const auth= getAuth(app);

function Login() {

    function submitHandler(e){
        e.preventDefault();
        const correo = e.target.elements.email.value;
        const contra = e.target.elements.password.value;
        console.log(correo,contra);
        signInWithEmailAndPassword(auth,correo,contra);
 
    }

    return(
        <div className='container'>
               Inicia sesion
            <div className='row align-items-center'>
                <div className='col'> 
                    <form onSubmit={submitHandler}>
                        <label>
                            Correo electrónico:
                            <input type="email" className="form-control" id="email"></input>
                        </label>
                        <br/>
                        <br/>
                        <label>
                            Contraseña:
                            <input type="password" className="form-control" id="password"></input>
                        </label>
                        <br/>
                        <br/>
                        <input type="submit" className="btn btn-primary m-2" value="Iniciar sesión"/>
                    </form>
                </div>

            </div>            
        </div>

        );
    
}

export default Login;
