import { formulario } from '../selectores.js'

type NotificacionType = {
    texto: string;
    tipo: 'error' | 'exito' |'';
}

export default class Notificacion {
    notificacion: NotificacionType = {
        texto: '',
        tipo: ''
    }

    constructor({texto, tipo} : NotificacionType) { //Primitive Types: string, number, boolean, null, undefined, symbol. En este caso, texto es string y tipo es string (error o exito)
        this.notificacion.texto = texto
        this.notificacion.tipo = tipo
        this.mostrar()
    }

    mostrar() {
        // Crear la notificacion
        const alerta = document.createElement('DIV')
        alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm')

        // Eliminar alertas duplicadas
        const alertaPrevia = document.querySelector('.alert')
        alertaPrevia?.remove()

        // Si es de tipo error, agrega una clase
        this.notificacion.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500')

        // Mensaje de error
        alerta.textContent = this.notificacion.texto

        // Insertar en el DOM
        formulario?.parentElement?.insertBefore(alerta, formulario)

        // Quitar después de 5 segundos
        setTimeout(() => {
            alerta.remove()
        }, 3000);
    }
}
