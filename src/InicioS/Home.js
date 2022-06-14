import React from 'react';
import UserView from "../Components/desp";
import Drad from "../Components/drad";
import app from '../firebase/credenciales';
import { getAuth, signOut, sendPasswordResetEmail } from "firebase/auth";


const auth = getAuth(app);

function Home({ user }) {

    function cambiarContra() {
        const email = "luisf3462@gmail.com"
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("se a enviado un mensaje para cambiar la contraseña");
            })
            .catch((error) => {
                //const errorCode = error.code;
                //onst errorMessage = error.message;
                // ..
            });

    }
    return (
        <div  >
            
            <div style={{ backgroundImage: `url(${'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZtPWzCgiKs-UrpCZBLUPdXuMN3IYPp-vjg&usqp=CAU'})` }}>
                <br></br>
                <div className="container">
                    <div class="row">
                        <div class="col">
                            <h3>Bienvenido</h3>
                        </div>
                        <div class="col-9">

                        </div>
                        <div class="col">
                            <button type="button" className='btn btn-primary' onClick={() => signOut(auth)}>Cerrar sesión</button>
                        </div>
                    </div>
                </div>
                <br></br>
            </div>

            {user.rol === "admi" ? <Drad cambiarContra={cambiarContra} /> : <UserView />}


        </div>
    )
}
export default Home;
