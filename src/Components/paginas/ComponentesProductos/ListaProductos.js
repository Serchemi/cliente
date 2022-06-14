import React from 'react'
import app from '../../../firebase/credenciales';
import {getFirestore,doc,collection,getDoc} from "firebase/firestore";


const ListaProductos = ({producto,setEditarProducto,eliminarTarea}) => {
    
    return (
        <div className='container'>
            <div className='col'>
                <div className='row'>
                    <div className="card" style={{width: 225}}>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Producto: {producto.nombre}</li>
                            <li className="list-group-item">precio: {producto.precio}</li>
                            <li className="list-group-item">cantidad: {producto.cantidad}</li>
                        </ul>
                        <a href="#" className="btn btn-primary m-2" onClick={()=>setEditarProducto(producto)} >Editar</a>
                        <a href="#" className="btn btn-outline-warning" onClick={()=>eliminarTarea(producto.id)} >Eliminar</a>
                    </div>                     
                </div>
            </div>
           
        </div>
    )
}

export default ListaProductos;
