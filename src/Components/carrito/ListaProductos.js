import React, { Fragment, useState } from 'react'
import { getCourses } from '../drad';
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { getProductos } from '../drad';
import { Modal, Input, Button, FormGroup, Label, ModalFooter, Form, ModalHeader, ModalBody } from 'reactstrap';
const DELATE_COURCE = gql`
    query delateCource($_id: ID!){
      delateCource(_id:$_id){
        _id
        title
      }
  }
`
const DELATE_PRODUCTO = gql`
mutation delateProducto($_id:ID!){
  delateProducto(_id:$_id)
}      
  `
const UPDATE_PRODUCTO = gql`
    mutation updateProducto($_id:ID!,$nombre:String!,$precio:String!,$descripcion:String){
      updateProducto(_id:$_id,nombre:$nombre,precio:$precio,descripcion:$descripcion){
        _id
        nombre
        precio
        descripcion
      }
    }
  `

const valoresI = {
  nombre: "",
  precio: "",
  descripcion: ""
}
var valor = valoresI;
function ListaProductos({ data }) {
  //const {datap,error,loading}=useQuery(DELATE_COURCE);
  //console.log("data ",data);

  const [delateProducto, err] = useMutation(DELATE_PRODUCTO, { refetchQueries: [{ query: getProductos }] });
  const [updateProducto, errr] = useMutation(UPDATE_PRODUCTO, { refetchQueries: [{ query: getProductos }] });
  const [abierto, setAbierto] = useState(false);
  const [visualizarUsuario, setVizualizarUsuario] = useState(valoresI);
  if (data === null) return null;



  function vizualizar(_id) {
    //datap({variables:_id});
    console.log("se preciono eliminar ", _id);
    delateProducto({ variables: { _id } })
  }


  function editarPro(producto) {
    //datap({variables:_id});
    //console.log("data producto ",producto._id);
    setVizualizarUsuario(producto);
    setAbierto(!abierto);
    //valor=producto;

    //console.log("data vizualizar ",valor);

  }
  function cambioFormulario(e) {
    var cambio = {};
    cambio = {
      ...visualizarUsuario,
      [e.target.id]: e.target.value

    }
    setVizualizarUsuario(cambio);
  }
  function obtenerDatosModal(e) {
    e.preventDefault();
    updateProducto({ variables: { _id: visualizarUsuario._id, nombre: visualizarUsuario.nombre, precio: visualizarUsuario.precio, descripcion: visualizarUsuario.descripcion } })
  }

  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">nombre</th>
            <th scope="col">precio</th>
            <th scope="col">descripcion</th>
            <th scope="col">opciones</th>
            <th scope="col">Aciones</th>

          </tr>
        </thead>
        <tbody>

          {
            data.map(producto => (
              <Fragment>
                <tr key={producto._id}>
                  <th>{producto.nombre}</th>
                  <td key={producto.precio}>$ {producto.precio}</td>
                  <td key={producto.descripcion}>{producto.descripcion}</td>
                  <td>
                    <a href="#" className="btn btn-outline-danger border-2 me-2" style={{ borderColor: "black", color: "black" }}
                      onClick={() => vizualizar(producto._id)}>Eliminar</a>
                    <a href="#" className="btn btn-outline-info border-2" style={{ borderColor: "black", color: "black" }}
                      onClick={() => editarPro(producto)}>Editar</a>
                  </td>
                  <td>
                    <a href="#" className="btn btn-success" onClick={() => vizualizar(producto._id)}>Comprar</a>

                  </td>
                </tr>
              </Fragment>
            ))
          }

          <tr>

          </tr>

        </tbody>
      </table>
      <Modal isOpen={abierto}>
        <Form onSubmit={obtenerDatosModal}>
          <ModalHeader>
            Editar Producto
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for='nombreP'>Nombre</Label>
              <Input type='text' value={visualizarUsuario.nombre} onChange={cambioFormulario} id='nombre'></Input>
            </FormGroup>
            <FormGroup>
              <Label for='precioP'>Precio</Label>
              <Input type='text' value={visualizarUsuario.precio} onChange={cambioFormulario} id='precio' placeholder='asistente/recepcionista'></Input>
            </FormGroup>
            <FormGroup>
              <Label for='Descripción'>Descripción</Label>
              <Input type='text' value={visualizarUsuario.descripcion} onChange={cambioFormulario} id='descripcion' placeholder='asistente/recepcionista'></Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' >Guardar</Button>
            <Button color='secondary' onClick={editarPro}>Cerrar</Button>
          </ModalFooter>

        </Form>
      </Modal>
    </Fragment>
  )
}

export default ListaProductos;
