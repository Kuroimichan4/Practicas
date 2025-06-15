let contenidomain = "";
let click = 0;
let contador = 0;

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
    console.log(`Gracias, ${nombre}! Hemos recibido tu mensaje:\n"${mensaje}"\nTe responderemos lo antes posible a ${email}`)

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
        })      // para dar  un array con todos los resultados finales
    
        .then(pokemons => {             // cuando están las promesas recibe el array de detalles y le llamamos pokemons
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

function bottOpen() {

    window.open("https://www3.animeflv.net", "_blank");

    // "_blank"	Abre en una nueva pestaña o ventana. ✅
    // "_self"	Abre en la misma pestaña (es el valor por defecto).
    // "_parent"	Abre en el marco padre, si estás usando frames.
    // "_top"	Abre en toda la ventana, saliendo de los frames..
    // <a href="https://openai.com" target="_blank">Ir a OpenAI</a>

}

function bottInput() {
    const campos = document.querySelectorAll('#formNom input, #formNom textarea');
    console.log(`Hay ${campos.length} campos`);
    alert(`Hay ${campos.length} campos`);

    let mensaje = "";
    
    campos.forEach(campo => {
        console.log(`${campo.name}: ${campo.value}`);
        mensaje += `${campo.name}: ${campo.value}\n`;
    });
    alert(mensaje);
    

    // TAMBIén se puede hacer así:
    // const formulario = document.getElementById('formNom');
    // const campos = formulario.querySelectorAll('input, textarea');
}

function bottCampos(){
    const formulario = document.getElementById('formNom');
    const inputs = formulario.querySelectorAll('input, textarea');

    inputs.forEach(campo => {
        console.log(`${campo.name}: ${campo.value}`);
    })
}

function bottBG(){
    //Math.floor(x) redondea hacia abajo al número entero más cercano.
    //Math.random() Genera un número decimal aleatorio entre 0 (inclusive) y 1 (exclusivo)

    const colores = ["#444", "red", "#9b220d", "#222", "#aaaaff", "#aaffaa", "black"];
    document.body.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
}

function formValidar() {
    const seleccion = document.querySelectorAll('#formulario2 input, #formulario2 textarea');
        for (let campo of seleccion) {
            if (campo.value == "") {
                console.log(`Hay campos vacíos`);
                alert(`Hay campos vacíos`);
                return;
            }
        }
    console.log(`Todo OK`);
    alert('Todo OK');
}

function bottImg() {
    document.getElementById('pikachu').style.display = "block";
}

function añadirCampo() {
    const newInput = document.createElement('input');
    newInput.type = "text";
    newInput.name = "extra";
    newInput.placeholder = "escriba aquí"
    document.getElementById('rellenables').appendChild(newInput);
}


function bottClick() {
    click++;
    document.getElementById('contador').textContent = `Click: ${click}`;
}

function bottMostrar() {
    let texto = document.getElementById('textOculto');
    texto.textContent = '¡Me encontraste! jajaja';
    texto.style.display = "block"
}

function botMas() {
    contador++
    document.getElementById('contadorMasMenos').textContent = contador;
}

function botMenos() {
    contador--
    document.getElementById('contadorMasMenos').textContent = contador;
}

function mostrarFecha() {
    let ahora = new Date();
    // let horas = ahora.getHours().toString().padStart(2, '0');
    // let minutos = ahora.getMinutes().toString().padStart(2, '0');
    // document.getElementById('hora').textContent = `Hora actual: ${horas}:${minutos}`;
    document.getElementById('hora').textContent = ahora.toLocaleString();

//     | Método                 | Devuelve                                 |
// | ---------------------- | ---------------------------------------- |
// | `getHours()`           | Solo la hora (número)                    |
// | `getMinutes()`         | Solo los minutos (número)                |
// | `toLocaleString()`     | Fecha y hora completa, con formato local |
// | `toLocaleDateString()` | Solo la fecha formateada localmente      |
// | `toLocaleTimeString()` | Solo la hora formateada localmente       |

// los getHours yminutoes dan la hora del tipo 5:7 en vez de las 05:07 para formatear la hora se ha de poner padStart y deci los digitos y qué poner delante
// const horas = ahora.getHours().toString().padStart(2, '0');

}

function verificarEdad() {
    const edad = parseInt(document.getElementById("edad").value);
    const mensaje = edad >= 18 ? 'Eres mayor de edad' : 'Eres menor de edad'; //a esto se le llama operador ternario y es un if else
    document.getElementById('respuesta').textContent = mensaje;
}

function generador() {
    const num = Math.floor(Math.random()*10) +1;
    document.getElementById('num').textContent = num;

}

function cargarFetch() {
   
    listaPok("https://pokeapi.co/api/v2/pokemon?limit=9");
}

function listaPok(url) {
    const contenedor = document.getElementById('pokemon-container');

    fetch(url)
        .then(res => res.json())
        .then(datos => {
            const listaP = datos.results;
            const pokemons = listaP.map(poke =>
                fetch(poke.url)
                    .then(resL => resL.json())
            );
            return Promise.all(pokemons);
        })
        .then(pokemons => {
            let html = "";

            pokemons.forEach(pokemon => {
                const nomP = pokemon.name.toUpperCase();
                const idP = pokemon.id;
                const img = pokemon.sprites.front_default;
                html += `
                    <div class="pokemon-card">
                        <h3>${nomP}</h3>
                        <p>${idP}</p>
                        <img src="${img}" alt="${nomP}">
                    </div>
                `;
            });
            contenedor.innerHTML = html;
        })
        .catch(error => {
            contenedor.innerHTML = "<p>Error al cargar Pokémon.</p>";
            console.error(error);
    });
}

function cargarFetch2(url2 = "https://pokeapi.co/api/v2/pokemon?limit=9"){
    const conten = document.getElementById('pokemon-container2');

    fetch(url2)
        .then(resp => resp.json())
        .then(data => {
            const listPok = data.results;
            const pkmns = listPok.map(pkm => 
                fetch(pkm.url)
                    .then(respPok => respPok.json())
            );
            return Promise.all(pkmns);
        })
        .then(pkmnsR => {
            let contenidoHTML = "";

            pkmnsR.forEach(pokemn => {
                let namePok = pokemn.name.toUpperCase();
                let idPok = pokemn.id;
                let imgPok = pokemn.sprites.front_default;
                contenidoHTML += `
                    <div class="pokemon-card">
                        <h3>${namePok}</h3>
                        <p>${idPok}</p>
                        <img src="${imgPok}" alt="${namePok}">
                    </div>
                `;
            });
            conten.innerHTML = contenidoHTML;
        })
        .catch(error => {
            conten.innerHTML = '<p>Error al cargar tarjetas</p>';
            console.error(error);
        });
}

// ¿Qué son async y await?
// async convierte una función normal en una función asíncrona, lo que permite usar await dentro.
// await espera a que una promesa se resuelva antes de continuar.
// Diferencias clave frente a .then():
// Aspecto	.then()	async/await
// Forma	en cadena	como si fuera código sincrónico
// Legibilidad	más difícil cuando hay .then anidados	más clara y ordenada
// Control de errores	.catch(...)	try { ... } catch { ... }

// async function cargarPokemons() {
//   const contenedor = document.getElementById("pokemon-container");
//   contenedor.innerHTML = ""; // vaciar el contenedor por si acaso

//   try {
//     const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=9");
//     const datos = await res.json();

//     // Creamos array de promesas para obtener el detalle de cada Pokémon
//     const detalles = datos.results.map(pokemon => fetch(pokemon.url));

//     // Esperamos a que se resuelvan todas las promesas
//     const respuestas = await Promise.all(detalles);

//     // Convertimos todas las respuestas a JSON
//     const pokemons = await Promise.all(respuestas.map(r => r.json()));

//     // Recorremos y pintamos cada Pokémon
//     pokemons.forEach(pokemon => {
//       const nombre = pokemon.name.toUpperCase();
//       const id = pokemon.id;
//       const imagen = pokemon.sprites.front_default;

//       contenedor.innerHTML += `
//         <div class="pokemon-card">
//           <h3>${nombre}</h3>
//           <p>ID: ${id}</p>
//           <img src="${imagen}" alt="${nombre}">
//         </div>
//       `;
//     });

//   } catch (error) {
//     contenedor.innerHTML = "<p>Error al cargar Pokémon.</p>";
//     console.error(error);
//   }
// }