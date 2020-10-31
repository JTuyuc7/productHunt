import React, { Fragment, useState, useContext } from 'react';
import { css } from '@emotion/core';
import Router, { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import Layout from '../components/layouts/Layout';
import { Formulario, Campo, InputSubmit, Error } from '../components/UI/Formulario';
import Error404 from '../components/layouts/404';

import { FirebaseContext }from '../firebase';

// Validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';

const STATE_INICIAL = {
  nombre: "",
  empresa: "",
  //imagen: "",
  url: "",
  descripcion: ""

}

const NuevoProducto = () => {

  //State para las imagenes
  const [ nombreimagen, guardarNombreImagen ] = useState("");
  const [ subiendo, guardarSubiendo ] = useState(false);
  const [ progreso, guardarProgreso ] = useState(0);
  const [ urlimagen, guardarUrlImagen ] = useState("");


  // Mostrar error si ya se esta usando el correo
  const [ error, guardarError ] = useState(false);

  const { valores, errores, handleChange, handleSubmit, habdleBlur } = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto );

  const { nombre, empresa, imagen, url, descripcion } = valores;

  // hook de routing para redireccionar
  const router = useRouter();

  // Context con las operaciones crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  //console.log(usuario);

  async function crearProducto(){
    if(!usuario){
      return router.push('/login');
    }

    // Crear el nuevo objeto del producto
    const producto = {
      nombre,
      empresa,
      url,
      urlimagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName
      },
      haVotado: []
    }

    // Insertar en la base de datos
    firebase.db.collection('productos').add(producto);

    return router.push('/');

  } 

  const handleUploadStart = () =>{
    guardarProgreso(0);
    guardarSubiendo(true);
  }

  const handleProgress = progreso => guardarProgreso({ progreso });

  const handleUploadError = error => {
    guardarSubiendo(error);
    console.log(error);
  }

  const handleUploadSuccess = nombre =>{
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombreImagen(nombre)
    firebase
    .storage
    .ref("productos")
    .child(nombre)
    .getDownloadURL()
    .then(url => {
      console.log(url)
      guardarUrlImagen(url)
    });
  }


return ( 
    <div>
      <Layout>
        { !usuario ? <Error404  /> : 
      (
          <Fragment>
          <h1
              css={css`
                  text-align: center;
                  margin-top: 5rem;
                  font-family: 'PT Sans', sans-serif;
              `}
          >Nuevo Producto </h1>
              <Formulario
                  onSubmit={handleSubmit}
                  noValidate
              >
                <fieldset>

                  <legend>Información General</legend>
                
                    <Campo>
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            placeholder="Nombre del Producto"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            onChange={handleChange}
                            onBlur={habdleBlur}
                        />
                    </Campo>
                    {errores.nombre && <Error>{errores.nombre}</Error>}

                    <Campo>
                        <label htmlFor="empresa">Empresa</label>
                        <input
                            type="text"
                            placeholder="Nombre Empresa o compañia"
                            id="empresa"
                            name="empresa"
                            value={empresa}
                            onChange={handleChange}
                            onBlur={habdleBlur}
                        />
                    </Campo>
                    {errores.empresa && <Error>{errores.empresa}</Error>}

                    
                    <Campo>
                        <label htmlFor="imagen">Imagen</label>
                        <FileUploader
                            accept="image/*"
                            id="imagen"
                            name="imagen"
                            randomizeFilename
                            storageRef={firebase.storage.ref("productos")}
                            onUploadStart={handleUploadStart}
                            onUploadError={handleUploadError}
                            onUploadSuccess={handleUploadSuccess}
                            onProgress={handleProgress}

                        />
                    </Campo>
                    
                    <Campo>
                        <label htmlFor="url">URL</label>
                        <input
                            type="url"
                            id="url"
                            name="url"
                            placeholder="Url del producto"
                            value={url}
                            onChange={handleChange}
                            onBlur={habdleBlur}
                        />
                    </Campo>
                    {errores.url && <Error>{errores.url}</Error>}
                  </fieldset>

                  <fieldset>
                    <legend>Sobre tu Producto</legend>
                    <Campo>
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            placeholder="Escribe una pequeña descripcion"
                            value={descripcion}
                            onChange={handleChange}
                            onBlur={habdleBlur}
                        />
                    </Campo>
                    {errores.descripcion && <Error>{errores.descripcion}</Error>}

                  </fieldset>

                    {error && <Error>{error}</Error>}
                    <InputSubmit
                        type="submit"
                        value="Crear Crear Producto"
                  />
              </Formulario>
      </Fragment>

        )}
      </Layout>
    </div>
)
}

export default NuevoProducto;
