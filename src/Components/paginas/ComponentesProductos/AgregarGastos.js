import React, { useEffect,useState } from 'react'
import app from '../../../firebase/credenciales';
import {getFirestore,doc,collection,getDoc,addDoc,updateDoc} from "firebase/firestore";
import { async } from '@firebase/util';
const firestore = getFirestore(app);

const valoresI={
	id:"",
	descripcion:"",
    cantidad:""
}

const AgregarGastos = ({editarGasto,gastos,setGastos}) => {

    const [valoresFormulario,setValoresFormulario]=useState(valoresI);
    const {id,descripcion,cantidad}=valoresFormulario;
    const [error,setError]=useState(null);

    useEffect(()=>{
        if(editarGasto){
            console.log("inicio editar",editarGasto);
            //setValoresFormulario(valoresI);
      
            setValoresFormulario(editarGasto);
        }

    },[editarGasto]);

    const cambioFormulario=(e)=>{
        e.preventDefault();
		var cambio={};
		
			 cambio={
				...valoresFormulario,
				[e.target.name]:e.target.value
			}			
		setValoresFormulario(cambio); 
	}
    async function agregarGasto(e){

        e.preventDefault();
        //condiciones para campos vacios
		if (descripcion==="") {
			setError("Debes indicar un nombre");
			return
		}
		if (cantidad==="") {
			setError("Debes indicar un salario");
			return
		}
        // se obtienen los datos del form
        const nombrePro=e.target.descripcionGasto.value;
        const cantidadPro=e.target.cantidadGasto.value;
  
       
        //Actualizar base de datos
        if(editarGasto){
            var arrayActualizado=[];
            console.log("actualizando",editarGasto.id)
            const productoRef = doc(firestore, "gastos", editarGasto.id);
            // asignando nuevos valores
            await updateDoc(productoRef, {
                descripcion:nombrePro,
                cantidad:cantidadPro,
                 
            });
            gastos.forEach(gasto => {
                if(gasto.id==editarGasto.id){
                    arrayActualizado=[{
                        id:editarGasto.id,
                        descripcion:nombrePro,
                        cantidad:cantidadPro
                    },...arrayActualizado]; 
                }else{
                    arrayActualizado=[{
                        id:gasto.id,
                        descripcion:gasto.descripcion,
                        cantidad:gasto.cantidad
                    },...arrayActualizado];                    
                }

                    
            });
            console.log("actualizado ",arrayActualizado);
            setGastos(arrayActualizado);
        }else{
            //Agregar base de datos
            try {
                var id="";
                const docRef = await addDoc(collection(firestore, "gastos"), {
                    descripcion:nombrePro,
                    cantidad:cantidadPro
                });
                console.log("Document written with ID: ", docRef.id);
                id=docRef.id;
            } catch (e) {
                console.error("Error adding document: ", e);
            }
                    // nuevo array para actualizar la lista
            const nuevoArray = [...gastos,{
                descripcion:nombrePro,
                cantidad:cantidadPro,
                id:id
            }];
            //Actualizar estado  
            setGastos(nuevoArray);        
        }
         //limpiar estado setValores formulario
         setValoresFormulario(valoresI);
      
        //Limpiar form
        e.target.descripcionGasto.value="";
        e.target.cantidadGasto.value="";
        //limpiar error
        setError(null);
       

    }

    return (
        <div>
            <form onSubmit={agregarGasto}>
                <label>
                    Descripción del gasto:
                    <input type="text" id='descripcionGasto' name='descripcion' value={descripcion} onChange={cambioFormulario}className="form-control"></input>
                </label>
                <label>
                    Cantidad del gastos $:
                    <input type="number" id='cantidadGasto' name='cantidad' value={cantidad} onChange={cambioFormulario} className="form-control"></input>
                </label>
                <br></br>
                <button type='submit' className="btn btn-primary m-2">Agregar Gasto</button>
            </form>
        </div>
    )
}

export default AgregarGastos;
