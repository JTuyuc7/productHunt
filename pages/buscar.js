import React, { useEffect, useState } from 'react';

import Layout from '../components/layouts/Layout';
import { useRouter } from 'next/router';
import useProductos from '../hooks/useProductos';
import { css } from '@emotion/core';
import DetallesProducto from '../components/layouts/DetalleProducto';


const Buscar = () => {

  const router = useRouter();
  const { query: { q  }} = router;

  const { productos } = useProductos('creado');
  const [ resultado, guardarResultado ] = useState([]);

  useEffect(() => {
    const busqueda = q.toLowerCase();
    //console.log(busqueda);
    const filtro = productos.filter( producto => {
      return(
        producto.nombre.toLowerCase().includes(busqueda) || producto.descripcion.toLowerCase().includes(busqueda)
      )
    })
    guardarResultado(filtro);
    
  }, [ q, productos ]);


  return (
    <div>
      <Layout>
        <div className="listado-productos">
            <div className="contenedor">
              {resultado.length === 0 ? (
                <h1
                  css={css`
                    font-size: 2.5rem;
                    margin-top: 6rem;
                    text-align: center;
                  `}
                >No hay resultados para esta busqueda</h1>
              ): (
                <ul className="bg-white">
                {resultado.map( producto => (
                  <DetallesProducto  
                    key={producto.id}
                    producto={producto}
                  />
                ))}
              </ul>
              )}
              
            </div>
          </div>
      </Layout>
    </div>
  )
}

export default Buscar;

//    #ZelikaArmy