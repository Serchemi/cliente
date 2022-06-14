import React from 'react'
import app from '../firebase/credenciales';
import Nav from './navegacion/Nav';
import Usuarios from './paginas/Usuarios';
import Productos from './paginas/Productos';


import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import {getAuth,onAuthStateChanged,sendPasswordResetEmail} from "firebase/auth";
import {gql,useQuery} from "@apollo/client"
import ListaProductos from './carrito/ListaProductos';
import Carrito from './paginas/Carrito';
const auth = getAuth();

export const getProductos=gql `
  query{
    getProductos{
      _id
      nombre
      precio
      descripcion
    }
  }
`
function Drad({cambiarContra}) {

    //const {data,error,loading}=useQuery(getCourses);
    const {data,error,loading}=useQuery(getProductos);
    return (
        <div>
            
          
        
            <Router>
                <Nav></Nav>
                    
                    <Route path='/Productos'  component={Productos}/>
                    <Route path='/Carrito'  component={Carrito}/>
                    
                    
                           
            </Router>
           
            
        </div>
    )
}

export default Drad;
