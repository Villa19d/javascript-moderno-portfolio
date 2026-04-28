const carrito =  document.querySelector('#carrito'); 
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaDeCursos = document.querySelector('#lista-cursos'); //Es el contenedor que contiene a todos los elementos de cuando pasamos el mouse sobre el carrito y aparace 

let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners(){
    listaDeCursos.addEventListener('click',agregarCurso);

    //EliminaCursos del Carrito
    carrito.addEventListener('click',eliminarCurso)

    //Vaciar Carrito
    vaciarCarrito.addEventListener('click',()=>{
        articulosCarrito=[];
        limpiarHTML();
    })
}

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
        guardarCarritoLS()
    }
}

//Eliminar curso función 
function eliminarCurso(e){
    console.log("Solo para checar que Esto funciona")
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //Elimia el arreglo por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        carritoHTML();
        guardarCarritoLS()
    }

}

//Lee el contenido del html al que le das click y extrae la información del curso
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span')?.textContent || curso.querySelector('.precio')?.textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //Revisa si un elemento ya existe
    const existe = articulosCarrito.some(curso=>curso.id === infoCurso.id);
    //Actualizamos la cantidad
    if(existe){
        /*Recordemos que .map es */
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso
            }
        })
        articulosCarrito=[...cursos]
    }else{
        //Agregar elementos al arreglo 
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
    console.log(articulosCarrito)
    carritoHTML();
}

function carritoHTML(){
    limpiarHTML()
   articulosCarrito.forEach((curso)=>{
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
          <img src="${curso.imagen}" style="width:100px">
        </td>
          ${curso.titulo}
        </td>
        <td style="text-align:center">
          ${curso.precio}
        </td>
        <td style="text-align:center">${curso.cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${curso.id}"> X </a></td>
        `
        //Agrega la info al carrito 
        contenedorCarrito.appendChild(row)
    })
}
//limpia el html para no tener repetidos los cursos seleccionados 
function limpiarHTML(){
while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
}
}


// Guardar en localStorage cuando cambia el carrito
function guardarCarritoLS() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Cargar carrito al iniciar
function cargarCarritoLS() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        articulosCarrito = JSON.parse(carritoGuardado);
        carritoHTML();
    }
}

// Llama esta función al inicio
cargarCarritoLS();

