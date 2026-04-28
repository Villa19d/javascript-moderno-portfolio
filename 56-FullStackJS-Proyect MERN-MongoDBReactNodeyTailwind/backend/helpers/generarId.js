const generarId= ()=>{
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
} // Math.random().toString(36).substring(2) genera una cadena aleatoria y Date.now().toString(36) agrega un componente de tiempo para asegurar la unicidad.

export default generarId;