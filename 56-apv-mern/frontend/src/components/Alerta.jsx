import { Fragment } from 'react';

function Alert ({ alert }) { // Recibe 'alert'
    
    // Si no hay alerta o no hay mensaje, no renderizamos nada
    if (!alert || !alert.msg) return null;

    // Determinamos el color basado en si es error o no
    const color = alert.error ? 'red' : 'green';

    return (
        <div className={`p-4 text-${color}-800 border-${color}-500 border-4 bg-${color}-50 mb-5 rounded-xl`} role="alert">
            <div className="flex items-center">
                <svg className="flex-shrink-0 w-4 h-4 me-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <h3 className="text-lg font-medium">Aviso</h3>
            </div>
            <div className="mt-2 mb-4 text-sm">
                {alert.msg}
            </div>
        </div>
    );
}

export default Alert;