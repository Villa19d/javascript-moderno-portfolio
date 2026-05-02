import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";


const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true, 
        trim: true
    },
    password: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        trim: true
    },  
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,   
        default: null,
        trim: true
    },
    token: {    
        type: String,
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});


veterinarioSchema.pre("save", async function(next){
    if(!this.isModified("password")){ // Si la contraseña no ha sido modificada, simplemente continuamos con el siguiente middleware o guardado.
         return 
         //next(); // next es una funcion que se llama para pasar al siguiente middleware. Un middleware es una función que se ejecuta durante el ciclo de vida de una solicitud HTTP en Express. En este caso, si la contraseña no ha sido modificada, llamamos a next() para continuar con el proceso de guardado sin realizar ningún cambio en la contraseña. osea sin que se ejecute el c´´odigo de abajo de este middleware.
    }else{
        const salt = await bcrypt.genSalt(10); //Esto genera rondas de hasheo para aumentar la seguridad de la contraseña. Cuantas más rondas, más seguro pero también más lento será el proceso de hash.
        this.password = await bcrypt.hash(this.password, salt); // Aquí se toma la contraseña del veterinario (this.password) y se hashea utilizando el salt generado. El resultado se asigna nuevamente a this.password, reemplazando la contraseña original con su versión hasheada.
        //next(); // Después de hashear la contraseña, se llama a next() para continuar con el proceso de guardado del veterinario en la base de datos.
    }
});

veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password); // bcrypt.compare() es una función que compara una contraseña sin hash (passwordFormulario) con una contraseña hasheada (this.password). Devuelve true si coinciden y false si no.
}


const  Veterinario = mongoose.model("Veterinario", veterinarioSchema);
export default Veterinario;