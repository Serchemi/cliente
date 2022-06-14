import React, { useEffect, useState } from 'react'
import app from '../../firebase/credenciales';
import { getFirestore, doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import ListaProductosVenta from './ListaProductosVenta';
import CarritoVenta from './CarritoVenta';
import { gql, useQuery } from "@apollo/client"

//const firestore = getFirestore(app);
//const arrayListaTarea =[];
const getProductos = gql`
  query{
    getProductos{
      _id
      nombre
      precio
      descripcion
    }
  }
`
const Venta = () => {
  const { data, error, loading } = useQuery(getProductos);
  const [agregarProducto, setAgregarProducto] = useState(null);
  //  const [productos,setProductos]=useState(arrayListaTarea);
  //const [agregarProducto,setAgregarProducto] =useState(null);
  //console.log("agregarProducto",agregarProducto);
  //useEffect(()=>{
  //console.log("se ejecuto el efecto");
  //  const obtenerDatos=async()=>{
  //  const datos= await getDocs(collection(firestore,'productos'));
  // const arregloDatos=[];
  //datos.forEach((documento)=>{
  //  arregloDatos.push({
  // id:documento.id,...documento.data()
  // });
  //console.log("data",documento.data());
  //});

  //setProductos(arrayListaTarea);
  // setProductos(arregloDatos);  
  //}
  //obtenerDatos();

  //},[]);

  return (
    <div style={{ backgroundImage: `url(${'https://img.freepik.com/psd-gratis/fondo-diseno-artesania-papel-geometrico_53876-150999.jpg?w=2000'})` }}>


      <div className='container'>
        <div className='col-12'>
          <div className='row'>
            {
              data ? (
                data.getProductos.map(productos => (

                  <div className='col-3'>
                    <ListaProductosVenta data={productos} setAgregarProducto={setAgregarProducto} />
                  </div>
                ))
              ) : ""
            }
          </div>
        </div>

        <br></br>

        <CarritoVenta agregarProducto={agregarProducto} setAgregarProducto={setAgregarProducto} />

      </div>
    </div>

  )
}

export default Venta;
