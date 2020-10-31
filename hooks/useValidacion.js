import React, { useState, useEffect } from 'react';

const useValidacion = ( stateInicial, validar, fn ) => {

    const [ valores, guardarValores ] = useState(stateInicial);
    const [ errores, guardarErrores ] = useState({});
    const [ submitform, guardarSubmitForm ] = useState(false);

    useEffect(() =>{
        if(submitform){
            const noErrores = Object.keys(errores).length === 0;

            if(noErrores){
                fn(); // Fn = funcion que se ejecuta en el componente
            }

            guardarSubmitForm(false);
        }
    },[errores]);

    // Funcion que se ejecuta cada que el usuario este escribiendo algo
    const handleChange = e =>{
        guardarValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    }    

    //Función que se ejecuta cuando el usuario hace sumbit
    const handleSubmit = e =>{
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarSubmitForm(true);
    }

    const habdleBlur = () =>{
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
    }

    return {
        valores,
        errores,
        handleChange,
        handleSubmit,
        habdleBlur
    };
}
 
export default useValidacion;