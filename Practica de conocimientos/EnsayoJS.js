let contenidomain = "";

document.addEventListener("DOMContentLoaded", () => {
    ajustarPaddingContenido();
    const main = document.getElementById("contenido");
    contenidomain = main.innerHTML;

    inicioForm();
    inicioBotones();
    
});

//esto hace que el navbar y el contenido de la páguna se auto ajusten y no se cubran
function ajustarPaddingContenido() {
  const navbar = document.querySelector(".navbar");
  const contenido = document.getElementById("contenido");

  if (navbar && contenido) {
    const altoNavbar = navbar.offsetHeight;
    contenido.style.paddingTop = `${altoNavbar + 5}px`; // +20px para un poco de margen
  }
}


function inicioForm() {
    const formulario = document.getElementById("formNom");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault(); //evita la recerga de la página

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const mensaje = document.getElementById("mensaje").value;

        mensajeForm(nombre, email, mensaje);
    });
}

function mensajeForm(nombre, email, mensaje) {
    alert(`Gracias, ${nombre}! Hemos recibido tu mensaje:\n"${mensaje}"\nTe responderemos lo antes posible a ${email}`);
}

function palindromos() {
    const texto = document.getElementById("palabra").value.toLowerCase();
    const invert = texto.split("").reverse().join("");
    const resultado = texto === invert ? "Es palíndromo" : "No es palíndromo";
    document.getElementById("resultado").textContent = resultado;
}


function inicioBotones() {
    document.getElementById("a").addEventListener("click", verA);
    document.getElementById("b").addEventListener("click", verB);
    document.getElementById("c").addEventListener("click", verC);
    document.getElementById("d").addEventListener("click", verD);

}

function verA() {
    document.getElementById("contenido").innerHTML = `
    <div class="fade-in">
        ${contenidomain}
    </div>
    `;
}

function verB() {
    document.getElementById("contenido").innerHTML = `
    <div class="fade-in">
      <h1>Holiiiiiiii soy la letra B</h1>
      <p>Ahora aparezco con una animación suave ✨</p>
    </div>
    `;
}

function verC() {
  document.body.innerHTML = `
    <h1>Has pulsado la letra c</h1>
    <p>Ahora todo el contenido se ha reemplazado.</p>
    <button onclick="location.reload()">Volver a cargar la página</button>
  `;
}

function verD() {
    document.getElementById("contenido").innerHTML = `
        <main id="pokedex">
            <h1>Pokédex</h1>
            <div id="pokemon-container">
            <p>Cargando Pokémons...</p>
            </div> 
        </main>
  `; // creamos el contenedor pokemon-container

    cargarPokedex("https://pokeapi.co/api/v2/pokemon?limit=151"); //pasamos la url como parámetro
}

function cargarPokedex(url) { 
    const contenedor = document.getElementById("pokemon-container"); // el contenedor que creamos al pulsar d

    fetch(url)                          // solicitud
        .then(res => res.json())        // al responder traducir a json
        .then(datos => {                
            const lista = datos.results;    // guarda en data en nom y una url x cada uno
            const detalles = lista.map(pokemon =>       //recorres cada pok con map y transforma la lista de url en promesas de datos completos (array de promesas)
                fetch(pokemon.url).then(resL => resL.json())    //se usa la url de cada pokemon para mas info y se traduce
            );
            return Promise.all(detalles);   // espera a que todas las promesas estén resueltas para continuar
        })
    
    .then(pokemons => {             // cuando están las promesas...
        let contenidoHTML = "";     //vaciamos el contenido del HTML
        

        pokemons.forEach(pokemon => {   //recorre cada pokemon con el foreach y para cada uno se hace la siguiente card
            const nombre = pokemon.name.toUpperCase();
            const id = pokemon.id;
            const imagen = pokemon.sprites.front_default;
            // vamos sumando cada carta pokemon al contenido total
            contenidoHTML += `
                <div class="pokemon-card">
                    <h3>${nombre}</h3>
                    <p>ID: ${id}</p>
                    <img src="${imagen}" alt="${nombre}">
                </div>
            `;            
        });
        contenedor.innerHTML = contenidoHTML;   //el contenido del html ahora son las tarjetas pokemon
    })
    .catch(error => {
        contenedor.innerHTML = "<p>Error al cargar Pokémon.</p>";
        console.error(error);
    });

}