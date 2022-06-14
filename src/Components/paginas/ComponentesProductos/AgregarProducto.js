import React, { useEffect, useState } from 'react'
import app from '../../../firebase/credenciales';
import { getFirestore, doc, collection, getDoc, addDoc, updateDoc } from "firebase/firestore";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import ListaProductos from '../../carrito/ListaProductos';

//import { getCourses } from '../../drad';
//import { async } from '@firebase/util';
import { getProductos } from '../../drad';
import Carrito from '../Carrito';
import { right } from '@popperjs/core';
const firestore = getFirestore(app);


const valoresI = {
    id: "",
    nombre: "",
    cantidad: "",
    precio: ""
}

const CREATE_PRODUCTO = gql`
    mutation createProducto($nombre: String!, $precio: String!, $descripcion: String){
        createProducto(nombre: $nombre,precio: $precio, descripcion:$descripcion){
            _id
            nombre
            precio
            descripcion
    }
  }
`
const AgregarProducto = ({ productos, setProductos, editarProducto }) => {

    const { data, error1, loading } = useQuery(getProductos);
    const [valoresFormulario, setValoresFormulario] = useState(valoresI);
    const { id, nombrep, cantidadp, preciop, descripcionp } = valoresFormulario;
    const [error, setError] = useState(null);
    //const [createCourse]= useMutation(CREATE_COURCE,{refetchQueries:[{query:getCourses}]});
    const [createProducto] = useMutation(CREATE_PRODUCTO, { refetchQueries: [{ query: getProductos }] });
    useEffect(() => {
        if (editarProducto) {
            console.log("inicio editar", editarProducto);
            setValoresFormulario(valoresI);

            setValoresFormulario(editarProducto);
        }

    }, [editarProducto])

    async function agregarProducto(e) {


        e.preventDefault();
        //condiciones para campos vacios
        if (nombrep === "") {
            setError("Debes indicar un nombre");
            return
        }
        if (cantidadp === "") {
            setError("Debes indicar una cantidad de stock");
            return
        }
        if (preciop === "") {
            setError("Debes indicar un precio");
            return
        }
        // se obtienen los datos del form
        //const title=e.target.nombreProducto.value;
        //const teacher=e.target.cantidadProducto.value;
        //const description=e.target.precioProducto.value;
        //const topic="";
        const nombre = e.target.nombreProducto.value;
        const precio = e.target.precioProducto.value;
        const descripcion = e.target.descripcionp.value;
        //createCourse({variables:{title,teacher,description,topic}});
        createProducto({ variables: { nombre, precio, descripcion } })
        //Actualizar base de datos
        if (editarProducto) {

        } else {
            //Agregar base de datos

            // nuevo array para actualizar la lista
            const nuevoArray = [...productos, {

            }];
            //Actualizar estado  
            setProductos(nuevoArray);
        }
        //limpiar estado setValores formulario
        setValoresFormulario(valoresI);

        //Limpiar form
        e.target.nombreProducto.value = "";
        e.target.precioProducto.value = "";
        e.target.descripcionp.value = "";
        //limpiar error
        setError(null);


    }
    const cambioFormulario = (e) => {
        e.preventDefault();
        var cambio = {};

        cambio = {
            ...valoresFormulario,
            [e.target.name]: e.target.value
        }
        setValoresFormulario(cambio);


    }

    return (
        <div className='container'>
            <div clas="row">

                <div class="col">
                    <div style={{ backgroundColor: '#F5EFFB' }}>
                        <br></br>
                        <h5>Agregar nuevo producto</h5>
                        <br></br>
                        <form onSubmit={agregarProducto}>
                            <label>
                                Nombre del producto: <br />
                                <input id="nombreProducto" type="text" name='nombrep' value={nombrep} onChange={cambioFormulario} className="form-control"></input>
                            </label>
                            <br />
                            <label>
                                Precio del producto: <br />
                                <input id="precioProducto" type="number" name='preciop' value={preciop} onChange={cambioFormulario} className="form-control" ></input>
                            </label><br />
                            <label>
                                Descripción del producto: <br />
                                <input id="descripcionp" type="text" name='descripcionp' value={descripcionp} onChange={cambioFormulario} className="form-control"></input>
                            </label><br />
                            <button type='submit' className="btn btn-primary m-2">Agregar Producto</button>
                        </form>
                        {
                            error ? (
                                <div className="alert alert-danger mt-2">{error}</div>
                            ) : null
                        }
                    </div>
                </div>

                <div >
                    <div class="col">
                        {
                            data ? <ListaProductos data={data?.getProductos}></ListaProductos> : ""
                        }
                    </div>
                </div>



            </div>
        </div>
    )
}

export default AgregarProducto;
