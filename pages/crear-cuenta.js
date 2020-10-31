import React, { Fragment, useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import Layout from '../components/layouts/Layout';
import { Formulario, Campo, InputSubmit, Error } from '../components/UI/Formulario';

import firebase from '../firebase';

// Validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';

const STATE_INICIAL = {
    nombre: "",
    email: "",
    password: ""
}

const CrearCuenta = () => {

    // Mostrar error si ya se esta usando el correo
    const [ error, guardarError ] = useState(false);
    

    const { valores, errores, handleChange, handleSubmit, habdleBlur } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta );

    const { nombre, email, password } = valores;

    async function crearCuenta(){
        try {
            await firebase.registrar(nombre, email, password);
            console.log("Usuario creado correctamente");
            Router.push('/')
        } catch (error) {
            console.error("Hubo un error al crear el usuario", error);
            guardarError(error.message)
        }
    } 


  return (
    <div>
      <Layout>
        <Fragment>
            <h1
                css={css`
                    text-align: center;
                    margin-top: 5rem;
                    font-family: 'PT Sans', sans-serif;
                `}
            >Crear Cuenta </h1>
                <Formulario
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <Campo>
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            placeholder="Tu nombre"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            onChange={handleChange}
                            onBlur={habdleBlur}
                        />
                    </Campo>
                    {errores.nombre && <Error>{errores.nombre}</Error>}

                    <Campo>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Tu Email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            onBlur={habdleBlur}
                        />
                    </Campo>
                    {errores.email && <Error>{errores.email}</Error>}
                    <Campo>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Tu password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            onBlur={habdleBlur}
                        />
                    </Campo>
                    {errores.password && <Error>{errores.password}</Error>}
                    {error && <Error>{error}</Error>}
                    <InputSubmit
                        type="submit"
                        value="Crear Cuenta"
                    />
                </Formulario>
        </Fragment>
      </Layout>
    </div>
  )
}

export default CrearCuenta;
