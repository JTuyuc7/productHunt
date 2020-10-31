import React, { Fragment, useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import Layout from '../components/layouts/Layout';
import { Formulario, Campo, InputSubmit, Error } from '../components/UI/Formulario';

import firebase from '../firebase';

// Validaciones
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

const STATE_INICIAL = {
  email: "",
  password: ""
}

const Login = () => {

  // Mostrar error si ya se esta usando el correo
  const [ error, guardarError ] = useState(false);
    

  const { valores, errores, handleChange, handleSubmit, habdleBlur } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion );

  const { email, password } = valores;

  async function iniciarSesion(){

    try {
      await firebase.login( email, password );
      Router.push('/')

    } catch (error) {
      console.error("Hubo un error al iniciar sesion " , error );
      guardarError(error.message);
  
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
              >Iniciar Sesíon</h1>
              <Formulario
                onSubmit={handleSubmit}
                noValidate
              >
                <Campo>
                  <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      placeholder="Tu email"
                      id="email"
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
                  value="Iniciar Sesíon"
                />
              </Formulario>
            </Fragment>
      </Layout>
    </div>
  )
}

export default Login;
