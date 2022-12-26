//Primera Pre-Entrega Christian Cabrera.. 
let vida=5; //Cantidad de intentos
let alerVida=false; //Alerta sobre ultima vida
let letrasIngresadas =""; //va concatenando las letras ingresadas



palabra="MASCOTA"; //Palabra ganadora, por ahora 1 sola.. con array podria poner más



let palabra2="";
let palabraTemporal=""; //concatena las letras ingresadas
let conGanador=0;
let faltantes=""; //auxilar1 faltantes ej: _A__S_T_
//let auxFaltantes=""; //auxiliar2 para guardar los mostrados
let palabrasAcertadas=""; //Muestra aciertos
let win=false; //ganador o perdedor
let auxFaltantes=""; //cantidad de ______ para ir mostrando
for (let i = 0; i< palabra.length; i++) {
    auxFaltantes=auxFaltantes+"_";
}
function pushLetra(letra) {
if (vida==0) {
    document.getElementById("vidas").remove();
    const v = document.createElement("p");
    v.setAttribute("id", "vidas");
    v.setAttribute("class", "text-danger");
    v.innerText = "Lo siento, perdiste La palabra era: "+palabra;
    document.body.appendChild(v);
    document.querySelector(".vidas").appendChild(v);
    document.getElementById("hombresito").remove();
    const c = document.createElement("img");
    c.setAttribute("id", "hombresito");
    c.setAttribute("src", "/img/muerto.png");
    document.body.appendChild(c);
    document.querySelector(".monigote").appendChild(c);




    return
}
acerto=CompararLetra(letra); //ver si acerto o no
tem=agregarLetraPT(letra); // agregar letra acertada
letrasIngresadas=letrasIngresadas+letra+" - ";
if (acerto==0) {
    vida--;
} else {    
    palabraTemporal=palabraTemporal+letra;
    conGanador=conGanador+acerto;
    palabra2=palabrasAcertadas;
    if (conGanador==palabra.length){
        win=true;
    }
}

document.getElementById("hombresito").remove();
const c = document.createElement("img");
c.setAttribute("id", "hombresito");
c.setAttribute("src", `/img/${vida}.png`);
document.body.appendChild(c);
document.querySelector(".monigote").appendChild(c);





document.getElementById("acertadas").remove();
const p = document.createElement("p");
p.setAttribute("id", "acertadas");
p.innerText = palabrasAcertadas;
document.body.appendChild(p);
document.querySelector(".letrasusadas").appendChild(p);

document.getElementById("vidas").remove();
const v = document.createElement("p");
v.setAttribute("id", "vidas");
if (vida<=2) {
    v.setAttribute("class", "text-danger");
}
v.innerText = "Vidas: "+(vida+1);
document.body.appendChild(v);
document.querySelector(".vidas").appendChild(v);

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