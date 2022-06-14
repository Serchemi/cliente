import React,{useEffect, useState} from 'react'

const valoresI={
	nombre:"",
    descripcion:"",
    precio:"",
    
}

var arregloA=[];
var cantidad=1;
const CarritoVenta = ({agregarProducto,setAgregarProducto}) => {
    var totalVenta=0;
    const [datosTabla,setDatosTabla]=useState(valoresI);

    useEffect(()=>{
        if(agregarProducto){
            console.log("se compro producto",agregarProducto);
            //setDatosTabla(valoresI);
            //arrayVenta.push(agregarProducto);
            //arrayVenta=[...arrayVenta,agregarProducto];
           var cambio=false;
           var cambioDos=true;
            if(arregloA.length>0){
                arregloA.forEach(element => {
                    cambio = false;
                    if(element._id == agregarProducto._id){
                        var entero=parseInt(element.cantidad);
                        entero = entero+1;
                       
                        var precio = parseInt(element.precio);
                        element.cantidad=entero;
                        var multiplicar=precio*entero
                        
                        element.importe=multiplicar;
                        cambio = false;
                        cambioDos = false;
                        
                    }else{
                        if(cambioDos){   
                            cambio=true;                           
                        }
                    }
                });                
            }else{
               
                arregloA=[{importe:agregarProducto.precio,...agregarProducto,cantidad},...arregloA];
            }
            if(cambio){
                
                arregloA=[{importe:agregarProducto.precio,...agregarProducto,cantidad},...arregloA];
                cambio = false;
            }
            setAgregarProducto(null);
            setDatosTabla({arregloA});  
        }        
    },[agregarProducto]);

    function aumentar(_id){
        arregloA.forEach(datoA => {
            if(datoA._id==_id){
                //console.log("encontroDato ",datoA.nombre)
                var entero=parseInt(datoA.cantidad);
                var precio = parseInt(datoA.precio);
                entero = entero+1;
                var multiplicar=precio*entero
                datoA.cantidad=entero;
                datoA.importe=multiplicar;
            }
        });
        //console.log("arregloA",arregloA);
        setDatosTabla({...arregloA});
    }
   
     
    function disminuir(_id){
        console.log("decrementado",_id);
        var arrayActualizado=arregloA;
       var arregloFinal=[];
       var tamArreglo=arrayActualizado.length;
       var eliminarTodo=false;
        arregloA.forEach(datoA => {
            if(datoA._id==_id){
               // console.log("encontroDato ",datoA.nombre)
                var entero=parseInt(datoA.cantidad);
                    entero = entero-1;
                   // console.log("valor entero",entero);
                    if(entero>0){
                        var enteroImporte=parseInt(datoA.importe);
                        
                        var nuevoImporte=parseInt(datoA.precio);

                        var asignarImporte=enteroImporte-nuevoImporte;
                        datoA.importe=asignarImporte;
                        datoA.cantidad=entero; 
                    }else{
                        //console.log("entro a else");
                        if(arrayActualizado.length>0){
                            //console.log("entro segundo for");
                            arrayActualizado.forEach(elemento=>{
                                if(elemento._id==_id){
                                    //console.log("elemento eliminado ");
                                    //console.log("tam arreglo ",tamArreglo);
                                    if(tamArreglo==1){
                                        eliminarTodo=true;
                                    }
                                }else{
                                    arregloFinal=[{
                                        _id:elemento._id,
                                        nombre:elemento.nombre,
                                        cantidad:elemento.cantidad,
                                        precio:elemento.precio,
                                        importe:elemento.importe
                                    },...arregloFinal];  
                                }
                            });
                        }
                           // console.log("arreglo final ",arregloFinal);
                    }      
            }
        });
        //console.log("arreglo final",arregloFinal);
        //console.log("arreglo final",arregloFinal.length);
        if(arregloFinal.length>0){
            arregloA=[];
            arregloA=arregloFinal;
        }
        if(eliminarTodo){
           // console.log("eliminando todo");
            arregloA=[];
        }
       // console.log("datos ArregloA ",arregloA);
        setDatosTabla({...arregloA});
    }
    //console.log(arrayVenta);
    return (
        <div>
            <table className="table">
                <thead style={{backgroundColor: '#E0FFFF'}}>
                    <tr>
                    <th scope="col">Descripción</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Importe</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arregloA.map(datoA=>
                            <tr>
                                <td>{datoA.nombre}</td>
                                <td>{datoA.precio}</td>
                                <td>{datoA.cantidad}</td>
                                <td>{datoA.importe}</td>
                                <td><button className="btn btn-primary m-2" onClick={()=>aumentar(datoA._id)}>Agregar</button></td>
                                <td><button className="btn btn-primary m-2" onClick={()=>disminuir(datoA._id)}>Quitar</button></td>
                            </tr>  
                                                 
                        )
                               
                    }
                        
                    
                </tbody>
            </table>
            <div>
                Total venta: <br></br>
               
                {
                    arregloA.map(datoA=>{
                        totalVenta = totalVenta+(parseInt(datoA.importe));
                    })
                }
                 {totalVenta}
                 <br></br>
                <button className="btn btn-primary m-2" >Cobrar</button>
            </div>
            
        </div>
    )
}

export default CarritoVenta;
