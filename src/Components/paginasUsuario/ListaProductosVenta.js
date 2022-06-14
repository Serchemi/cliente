import React,{Fragment, useState} from 'react'

const ListaProductosVenta = ({data, setAgregarProducto}) => {  
    return (
                <Fragment>
                  <div className='container' >

                    <div className="row">
                    {
                        <div className="card  m-2 " style={{backgroundColor: '#F5EFFB',width: 225, height:370, display:'flex', alignItems: 'center',justifyContent: 'center'}}>
                            <ul className="card-body" key={data._id}>
                                <li className="list-group-item">Nombre: {data.nombre}</li>
                                <li className="list-group-item">Descripcion: <img src={data.descripcion} style={{width: "80%",height: "80%"}}/></li>
                                <li className="list-group-item">Precio $: {data.precio}</li>
                            </ul>
                            <a  href="#"  onClick={()=>
                            setAgregarProducto(data)
                            } className="btn btn-success m-2"> <img src="anadir-al-carrito.png"></img></a>
                        </div>                     
                    }
                    </div>
                    </div>
                </Fragment>  
        
        
        //<tr key={producto._id}>
        //<th>{producto.nombre}</th>
        //<td key={producto.precio}>$ {producto.precio}</td>
        //<td key={producto.descripcion}>{producto.descripcion}</td>
        //</tr>
   //     <div className='container'>
        
     //           <div className="card border-success m-4 " style={{width: 225}}>
       //             <ul className="card-body">
         //               <li className="list-group-item">Descripción: {producto}</li>
           //             <li className="list-group-item">cantidad: </li>
             //           <li className="list-group-item">Precio $: </li>
               //     </ul>
                 //   <a href="#" className="btn btn-success m-2">Agregar</a>
                //</div>                     
       
    //</div>
    )
}

export default ListaProductosVenta;
