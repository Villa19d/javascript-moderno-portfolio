import mongoose from "mongoose";

const pacienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true  
    },
    propietario: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now()
    },
    sintomas: {
        type: String,
        required: true,
    },
    veterinario: {
        type: mongoose.Schema.Types.ObjectId, // Aquí se define una referencia a otro documento en la base de datos. En este caso, se refiere a un documento del modelo "Veterinario". Esto permite establecer una relación entre el paciente y el veterinario que lo atiende.
        ref: "Veterinario" // Aquí se especifica el nombre del modelo al que se hace referencia. En este caso, se refiere al modelo "Veterinario", lo que indica que el campo "veterinario" en el esquema de paciente es una referencia a un documento del modelo "Veterinario".
    }
}, {
    timestamps: true // Esto agrega automáticamente campos de marca de tiempo (createdAt y updatedAt) a cada documento creado con este esquema. Estos campos se actualizan automáticamente cuando se crea o se actualiza un documento, lo que facilita el seguimiento de cuándo se creó o modificó un paciente.
});

const Paciente = mongoose.model("Paciente", pacienteSchema);
export default Paciente;

