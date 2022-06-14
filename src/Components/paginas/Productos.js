import React, { useEffect,useState } from 'react'
import AgregarProducto from './ComponentesProductos/AgregarProducto';
import ListaProductos from './ComponentesProductos/ListaProductos';
import app from '../../firebase/credenciales';
import {getFirestore,doc,collection,getDocs,deleteDoc} from "firebase/firestore";
//import { async } from '@firebase/util';
const firestore = getFirestore(app);



const arrayListaTarea =[];
const Productos = () => {
  

    const [productos,setProductos]=useState(arrayListaTarea);
    const [editarProducto,setEditarProducto]=useState(null);

    useEffect(()=>{
        //console.log("se ejecuto el efecto");

        const obtenerDatos=async()=>{
          const datos= await getDocs(collection(firestore,'productos'));
        const arregloDatos=[];
          datos.forEach((documento)=>{
              arregloDatos.push({
              id:documento.id,...documento.data()
            });
            //console.log("data",documento.data());
          });
          
          //setProductos(arrayListaTarea);
          setProductos(arregloDatos);  
        }
        obtenerDatos();
        //console.log(productos);
    },[]);

    /*const eliminarTarea=async(idProducto)=>{
        await deleteDoc(doc(firestore, "productos",idProducto));
        var arrayConElementoEliminado=[];
        productos.forEach(producto=>{
            if(producto.id !== idProducto){
                arrayConElementoEliminado=[{
                    id:producto.id,
                    nombre:producto.nombre,
                    cantidad:producto.cantidad,
                    precio:producto.precio
                },...arrayConElementoEliminado];
            }
        });
        setProductos(arrayConElementoEliminado);
    }
*/
    return (
        <div>
           
            <AgregarProducto 
                productos={productos}
                setProductos={setProductos}
                editarProducto={editarProducto}
            />
            
        
        </div>
    )
}

export default Productos;
