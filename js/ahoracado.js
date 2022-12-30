//creamos el abcdario con javascript
let abc = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
let puntaje=0;
let victorias=0; //cuenta las victorias seguidas
const agregarABC = () => {
for (let i=0; i<abc.length; i++) {
    const a = document.createElement('a');
    a.setAttribute("href", `#letra"${abc.charAt(i)}"`);
    a.setAttribute("onclick", `pushLetra("${abc.charAt(i)}")`);
    a.setAttribute("class","badge bg-primary rounded-pill px-2 mt-1 mx-1");
    //a.textContent = "" +abc.charAt(i);
    a.innerHTML=`${abc.charAt(i)}`;
    document.querySelector(".abcdario").appendChild(a);
}
}
agregarABC(); //agrega el abcdario por primera vez

document.getElementById("formulario").style.display = 'none';


let vida=6; //Cantidad de intentos
let letrasIngresadas =""; //va concatenando las letras ingresadas


pRamdom = ()=> {
    //const arrayPalabras=["A"];
    const arrayPalabras=["CASA","AUTO","BICICLETA","SEMAFORO","SILLON","LIVIANO","PESADO","ORDEN"];
    let palabra = arrayPalabras[Math.floor(Math.random() * arrayPalabras.length)];
    return palabra
}

palabra=pRamdom();

let palabra2="";
let palabraTemporal=""; //concatena las letras ingresadas
let conGanador=0;
let faltantes=""; //auxilar1 faltantes ej: _A__S_T_
let palabrasAcertadas=""; //Muestra aciertos
let win=false; //ganador o perdedor
let auxFaltantes=""; //cantidad de ______ para ir mostrando


for (let i = 0; i< palabra.length; i++) {
    auxFaltantes=auxFaltantes+"_";
}
function pushLetra(letra) {

    for (let i = 0; i< letrasIngresadas.length; i++) {
        let caracter = letrasIngresadas.charAt(i);
        if(caracter == letra) return;
    }

    acerto=CompararLetra(letra); //ver si acerto o no
    agregarLetraPT(letra); // agregar letra acertada
    letrasIngresadas=letrasIngresadas+letra+" - ";
    if (acerto==0) {
        vida--;
    } else {    
        palabraTemporal=palabraTemporal+letra;
        conGanador=conGanador+acerto;
        palabra2=palabrasAcertadas;
        if (conGanador==palabra.length){
            win=true; //Gano
            
            //muestra palabra acertada:
            acertadas();
            //cambia Vidas: por GANASTE!
            ganaste();
            //Borra abcdario
            document.getElementById("abc").remove();
            const gg = document.createElement('div');
            gg.setAttribute("id", "abc");
            gg.setAttribute("class", "abcdario");
            document.querySelector(".reset").appendChild(gg);
            //Muestra puntaje
            puntaje=puntaje+(vida*80);
            victorias++;
            const bbb = document.createElement("p");
            bbb.setAttribute("id", "abc");
            bbb.setAttribute("class", "mt=2");
            bbb.innerHTML = `
            <br><h3>Puntaje: ${puntaje}</h3>
            <boton class="btn btn-danger" id="retry">Otra vez!</boton>
            <br>`;
            document.body.appendChild(bbb);
            document.querySelector(".letras").appendChild(bbb);
            const retry=document.getElementById("retry");
            retry.addEventListener("click", () => {
                document.getElementById("abc").remove(); //borra el mensaje de puntaje y btn retry
                agregarABC();
                //realiza reset
                vida=6; //Cantidad de intentos
                letrasIngresadas="";
                palabra=pRamdom();
                palabra2="";
                palabraTemporal="";
                conGanador=0;
                faltantes="";
                palabrasAcertadas="";
                win=false; //ganador o perdedor
                auxFaltantes=""; //cantidad de ______ para ir mostrando
                for (let i = 0; i< palabra.length; i++) {
                    auxFaltantes=auxFaltantes+"_";
                }
                men();
                acertadas();
                vidas();
            });
            return
        }
    }

    men();
    acertadas();
    vidas();


    auxFaltantes=palabrasAcertadas;
    faltantes=""; //resetea faltantes
    palabrasAcertadas="";
}




//funciones:
const men=(muerto)=>{
    document.getElementById("hombresito").remove();
    const c = document.createElement("img");
    c.setAttribute("id", "hombresito");
    if (muerto) {
        c.setAttribute("src", "./img/muerto.png");
    } else {
        c.setAttribute("src", `./img/${vida}.png`);
    }
    document.body.appendChild(c);
    document.querySelector(".monigote").appendChild(c);
}

const ganaste=()=>{
    document.getElementById("vidas").remove();
    document.getElementById("letrasIngresadas").remove();
    const v = document.createElement("p");
    v.setAttribute("id", "vidas");
    v.innerHTML = "<h3>Ganaste!!</h3>";
    document.body.appendChild(v);
    document.querySelector(".vidas").appendChild(v);
}

const acertadas=()=>{
    document.getElementById("acertadas").remove();
    const p = document.createElement("p");
    p.setAttribute("id", "acertadas");
    p.innerHTML =`<p>${palabrasAcertadas}</p>
    <p class="mt-2" id="letrasIngresadas">${letrasIngresadas}</p>`; //
    document.body.appendChild(p);
    document.querySelector(".letrasusadas").appendChild(p);
}

const vidas=()=>{
    document.getElementById("vidas").remove();
    const v = document.createElement("p");
    v.setAttribute("id", "vidas");
    if (vida<=2) {
        v.setAttribute("class", "text-danger");
    }
    if (vida==0){
        men(true);
        document.getElementById("acertadas").remove();
        document.getElementById("palabras").remove();
        document.getElementById("formulario").style.display = 'block';
        //v.innerText = "Lo siento, perdiste La palabra era: "+palabra;
        if (puntaje>0 && victorias>0){
            v.innerHTML= `
                <h4>Lo siento, perdiste la palabra era: ${palabra}</h4>
                <p class="text-white">Puntaje total: ${puntaje}</p>
                `;
                document.getElementById("formulario").style.display = 'block';
                const formulario = document.getElementById("formulario");
                formulario.addEventListener("submit", (e) => {
                    e.preventDefault();
                    //formulario.reset();
                    document.getElementById("formulario").style.display = 'none';
                    document.getElementById("showStats").style.display = 'block';
                    altaPlayer(document.getElementById("name").value,document.getElementById("mail").value,document.getElementById("edad").value,puntaje);
                
                });

        } else {
            v.innerHTML= `
                <h4>Lo siento, perdiste la palabra era: ${palabra}</h4>
                <p class="text-white">No obtuviste puntos</p>
                <a class="btn btn-primary" href="index.html">Retry</a>
                `;
        }

        document.getElementById("abc").remove();
    } else {
        v.innerText = "Vidas: "+(vida);
    }
    document.body.appendChild(v);
    document.querySelector(".vidas").appendChild(v);
}

function agregarLetraPT(letra) {
    for (let i = 0; i< palabra.length; i++) { //0 al 6
        if (palabra.charAt(i)==letra){
            faltantes=faltantes+letra;
        } else {
            faltantes=faltantes+"_";
        }
    }
    for (let i = 0; i< palabra.length; i++) {
        if(auxFaltantes.charAt(i)=="_" && faltantes.charAt(i)=="_") {
            palabrasAcertadas=palabrasAcertadas+"_";
        } else if (faltantes.charAt(i)=="_") {
            palabrasAcertadas=palabrasAcertadas+auxFaltantes.charAt(i);
        } else {
            palabrasAcertadas=palabrasAcertadas+faltantes.charAt(i);
        }
    }
}

function CompararLetra(letra){
    let b=0;
    for (let i = 0; i< palabra.length; i++) {
        let caracter = palabra.charAt(i);
        if(caracter == letra) {b++;}
    }
   return b;
}
