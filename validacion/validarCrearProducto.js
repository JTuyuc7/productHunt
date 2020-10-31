

export default function validarCrearProducto(valores){

    let errores = {};

    // Validar el nombre del usuario
    if(!valores.nombre){
        errores.nombre = "El Nombre es obligatorio"
    }

    // Validar la empresa
    if(!valores.empresa){
        errores.empresa = "El nombre de la empresa es obligatorio"
    }


    // Validar la url 
    if(!valores.url){
        errores.url = "La url es obligatoria"
    }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = "La url debe tener un formato valido"
    }

    // Validar que se agregue una descripcion
    if(!valores.descripcion){
        errores.descripcion = "La descripcion es obligatoria"
    }
    return errores;
}