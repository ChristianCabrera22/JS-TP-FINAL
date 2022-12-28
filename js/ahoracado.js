//creamos el abcdario con javascript
let abc = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
let puntaje=0;
let victorias=0; //cuenta las victorias seguidas
const agregarABC = () => {
for (let i=0; i<abc.length; i++) {
    const a = document.createElement('a');
    a.setAttribute("href", `#letra"${abc.charAt(i)}"`);
    a.setAttribute("onclick", `pushLetra("${abc.charAt(i)}")`);
    a.textContent = "  " +abc.charAt(i);
    document.querySelector(".abcdario").appendChild(a);
}
}
agregarABC(); //agrega el abcdario por primera vez




let vida=6; //Cantidad de intentos
let letrasIngresadas =""; //va concatenando las letras ingresadas


pRamdom = ()=> {
    //const arrayPalabras=["AUTO", "CASA", "BICI", "GATO", "SOFA"];
    const arrayPalabras=["CASA","AUTOMOVIL","BICICLETA","SEMAFORO","SILLON","LIVIANO","PESADO","ORDEN"];
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
        puntaje=puntaje+(vida*20);
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



//A M S
//M A S C O T A //palabra


//A C T         //palabraTemporal
// ________     //aciertos
// ___             //faltantes
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
    p.innerText = palabrasAcertadas;
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
    //v.innerText = "Lo siento, perdiste La palabra era: "+palabra;
    if (puntaje>0){
        v.innerHTML= `
            <h4>Lo siento, perdiste la palabra era: ${palabra}</h4>
            <p class="text-white">Puntaje total: ${puntaje}</p>
            <form class="mt-3" id="formulario" action=#stats>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Escriba aqui su nombre">
                </div>
                <button type="submit" class="btn mt-3 btn-primary">GUARDAR</button>
            </form>
            `;
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


function borrar(id){
    document.getElementById(id).remove();
}

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
