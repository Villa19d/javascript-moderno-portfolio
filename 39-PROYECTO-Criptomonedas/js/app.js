const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');

const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const objetoBusqueda = {
    moneda: '',
    criptomoneda: ''
}

//first of all lets create a Promise
const obtenerCriptomonedas = criptomonedas => new Promise(resolve =>{
    resolve(criptomonedas)
});


document.addEventListener('DOMContentLoaded', ()=>{
    consultarCriptoMonedas()

    formulario.addEventListener('submit', submitFormulario)

    criptomonedasSelect.addEventListener('change', leerValor);
    monedaSelect.addEventListener('change', leerValor);
})

async function consultarCriptoMonedas(){
    const url ='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    try{
    const getFetch = await fetch(url)
    const getJson = await getFetch.json()
    const getCriptomonedas = await obtenerCriptomonedas(getJson.Data)
    
        selectCripto(getCriptomonedas) 
   }catch(error){
    console.log(error)
   }
}

function selectCripto(criptomonedas){
    criptomonedas.forEach(cripto =>{
        
        const {FullName, Name} = cripto.CoinInfo;
        const option = document.createElement('OPTION');
        option.value = Name
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option)
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
    //Consultar la API con los reusltados
    consultarAPI();
}

async function consultarAPI(){
    const {moneda, criptomoneda} = objetoBusqueda;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

    mostrarSpinner();
    try{
        const getFetch = await fetch(url);
        const getFetchJson = await getFetch.json();
        mostrarHTML(getFetchJson.DISPLAY[criptomoneda][moneda])
        
    }catch(error){
      console.log(error)
    }
}

function mostrarHTML(infoCotizando){
    limpiarHTML(resultado)
    const {PRICE, HIGHDAY,LOWDAY,CHANGEPCT24HOUR,LASTUPDATE}=infoCotizando;
    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `El Precio es: <span>${PRICE}</span>`;

    const precioAlto = document.createElement('p');
    precioAlto.innerHTML = `<p>Precio mas alto del día <span>${HIGHDAY}</span></p>`
    
    const precioBajo = document.createElement('p');
    precioBajo.innerHTML = `<p>Precio mas bajo del día <span>${LOWDAY}</span></p>`
    
    const ultimasHoras = document.createElement('p');
    ultimasHoras.innerHTML = `<p>Variación en ultimas 24 hrs. <span>${CHANGEPCT24HOUR}</span></p>`
    
    const lastUpdate = document.createElement('p');
    lastUpdate.innerHTML = `<p>Última actualización: <span>${LASTUPDATE}</span></p>`

    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(ultimasHoras);
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