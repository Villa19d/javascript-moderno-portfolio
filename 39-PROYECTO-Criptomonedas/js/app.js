const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');

const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const objetoBusqueda = {
    moneda: '',
    criptomoneda: ''
}

// CoinGecko ofrece una API pública sin clave.
// Antes se usaba CryptoCompare, pero ahora exige API key y responde 401,
// por eso la lista de criptomonedas nunca cargaba.
const COINGECKO_URL = 'https://api.coingecko.com/api/v3';

document.addEventListener('DOMContentLoaded', ()=>{
    consultarCriptoMonedas()

    formulario.addEventListener('submit', submitFormulario)

    criptomonedasSelect.addEventListener('change', leerValor);
    monedaSelect.addEventListener('change', leerValor);
})

async function consultarCriptoMonedas(){
    const url = `${COINGECKO_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`;

    try{
        const respuesta = await fetch(url);
        if(!respuesta.ok){
            throw new Error(`Error al consultar la API: ${respuesta.status}`);
        }
        const criptomonedas = await respuesta.json();
        selectCripto(criptomonedas);
   }catch(error){
        console.log(error);
        mostrarAlerta('No se pudieron cargar las criptomonedas, intenta de nuevo');
   }
}

function selectCripto(criptomonedas){
    criptomonedas.forEach(cripto =>{
        const {name, id} = cripto;
        const option = document.createElement('OPTION');
        option.value = id;
        option.textContent = name;
        criptomonedasSelect.appendChild(option);
    })
}

function leerValor(e){
    objetoBusqueda[e.target.name] = e.target.value;
}

function submitFormulario(e){
    e.preventDefault();

    const {moneda, criptomoneda} = objetoBusqueda;
    if(moneda == '' || criptomoneda == ''){
        mostrarAlerta('Ambos campos deben estar seleccionados')
        return;
    }
    //Consultar la API con los resultados
    consultarAPI();
}

async function consultarAPI(){
    const {moneda, criptomoneda} = objetoBusqueda;
    const url = `${COINGECKO_URL}/coins/markets?vs_currency=${moneda.toLowerCase()}&ids=${criptomoneda}&price_change_percentage=24h`;

    mostrarSpinner();
    try{
        const respuesta = await fetch(url);
        if(!respuesta.ok){
            throw new Error(`Error al consultar la API: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        if(!datos.length){
            throw new Error('Sin datos para esa criptomoneda');
        }
        mostrarHTML(datos[0], moneda);
    }catch(error){
        console.log(error);
        limpiarHTML(resultado);
        mostrarAlerta('No se pudo obtener la cotización, intenta de nuevo');
    }
}

function mostrarHTML(cripto, moneda){
    limpiarHTML(resultado);
    const {current_price, high_24h, low_24h, price_change_percentage_24h, last_updated} = cripto;

    const formatoPrecio = (valor) => `${moneda} ${valor.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `El Precio es: <span>${formatoPrecio(current_price)}</span>`;

    const precioAlto = document.createElement('p');
    precioAlto.innerHTML = `<p>Precio mas alto del día <span>${formatoPrecio(high_24h)}</span></p>`

    const precioBajo = document.createElement('p');
    precioBajo.innerHTML = `<p>Precio mas bajo del día <span>${formatoPrecio(low_24h)}</span></p>`

    const ultimasHoras = document.createElement('p');
    ultimasHoras.innerHTML = `<p>Variación en ultimas 24 hrs. <span>${price_change_percentage_24h.toFixed(2)}%</span></p>`

    const lastUpdate = document.createElement('p');
    lastUpdate.innerHTML = `<p>Última actualización: <span>${new Date(last_updated).toLocaleString('es-MX')}</span></p>`

    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(ultimasHoras);
    resultado.appendChild(lastUpdate);
}

function mostrarAlerta(mensaje){
    const divMensaje = document.createElement('DIV');
    divMensaje.classList.add('error');
    divMensaje.textContent= mensaje;
    formulario.appendChild(divMensaje);

    setTimeout(()=>{
        divMensaje.remove()
    },3000);
}

function limpiarHTML(contenedor){
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild)
    }
}

function mostrarSpinner(){
    limpiarHTML(resultado);

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = `
    <div class="sk-chase">
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
  </div>
    `

    resultado.appendChild(spinner)
}
