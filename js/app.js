//Variables
const formulario = document.getElementById('formulario');
const listaAnotaciones = document.getElementById('lista-anotaciones')
let anotaciones = [];

eventListener();

function eventListener(){

    //Se agrega una nueva anotacion
    formulario.addEventListener('submit', agregarAnotacion);

    //Se guardan las anotaciones aunque se recargue la pagina

    document.addEventListener('DOMContentLoaded',()=>{
        anotaciones = JSON.parse(localStorage.getItem('anotaciones')) || [];

        crearHTML();
    });
    
}



//Funciones

function agregarAnotacion(e){
    e.preventDefault();

    //Textarea

    const anotacion = document.getElementById('anotacion').value;
    if(anotacion === ''){
        mostrarError('Anotacion invalida');
        return;
    }

    const anotacionObj = {
        id: Date.now(),
        anotacion
    }

    //Añadir al arreglo de anotaciones

    anotaciones = [...anotaciones,anotacionObj];

    //HTML

    crearHTML();

    //reiniciar formulario

    formulario.reset();

};

//Mensaje de error

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenidoError = document.getElementById('contenido');
    contenidoError.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 4000);
};

function crearHTML(){
    limpiarHTML()
    if(anotaciones.length > 0){
        anotaciones.forEach( anotacion =>{
            //HTML

            const botonEliminar = document.createElement('a');

            botonEliminar.classList.add('borrar-anotacion');
            botonEliminar.textContent = 'X';

            //Eliminar anotacion

            botonEliminar.onclick = ()=>{
                borrarAnotacion(anotacion.id);
            }


            const li = document.createElement('li');

            //añadir texto
            li.textContent = anotacion.anotacion;
            li.appendChild(botonEliminar);

            //Insertar en html

            listaAnotaciones.appendChild(li);
        });
    }

    vincularLocalStorage();
}

//Agrega las anotaciones a local storage
function vincularLocalStorage(){
    localStorage.setItem('anotaciones', JSON.stringify(anotaciones));
}

//Elimina anotacion
function borrarAnotacion(id){
    anotaciones = anotaciones.filter(anotacion => anotacion.id !== id);
    crearHTML();
}

//limpiar html

function limpiarHTML(){
    while(listaAnotaciones.firstChild){
        listaAnotaciones.removeChild(listaAnotaciones.firstChild);
    }
}