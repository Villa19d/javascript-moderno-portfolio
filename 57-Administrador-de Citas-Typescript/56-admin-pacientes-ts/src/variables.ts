import { generarId } from "./funciones.ts"
import type {Cita} from '../src/types.ts'

let editando = {
    value: false
}


// Objeto de Cita
const citaObj : Cita= {
    id: generarId(),
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}

export {
    editando,
    citaObj
}


//Primitive types  (Aprender a usar tipos primitivos en TypeScript)
// let precio : number 
// let producto : string
// let disponible : boolean 

// interface Producto { //Interfaces sirven para definir la estructura de un objeto, es decir, qué propiedades tiene y qué tipo de datos son. En este caso, el objeto Producto tiene tres propiedades: precio, producto y disponible.
//     precio : number;
//     producto:string;
//     disponible:boolean;
// }

// const producto : Producto = {
//     precio:50, 
//     producto : "monitor ",
//     disponible: false 
// }