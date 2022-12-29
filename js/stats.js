// Alta, baja, modificacion, top3

class Player {
    constructor(name, mail, age, score) {
        this.name=name;
        this.mail=mail;
        this.age=age;
        this.score=score;
    }
}
const patron = new RegExp('^[A-Z]+$', 'i'); //patron para que se ingrese solo NUMEROS - en el menu -
const arrayStats = []; //mi base de dato, donde se guardan los players

// Cargar y push algunos players
const playerChris = new Player("Chris", "ccabrera@info.com.ar", 32, 1950);
arrayStats.push(playerChris);
const playerAle = new Player("Alex22", "jlopez.22@sodimac.com", 18, 2546);
arrayStats.push(playerAle);
const playerJota = new Player("JotaFx", "jota.elcrack@gmail.com", 17, 4584);
arrayStats.push(playerJota);
const playerLaura = new Player("Lauras", "lau.la_linda@hotmail.com", 25, 7495);
arrayStats.push(playerLaura);

console.log("Los jugadores son:");
console.log(arrayStats); //muestra jugadores por consola
alert("Bienvenido a las Estadisticas de los jugadores"); //Bienvenida


//Menu
function menu() {
    let op="";
    do {
    op = prompt("Ingrese una opción: \n 1) Alta nuevo jugador \n 2) Baja jugador \n 3) Modificación jugador \n 4) Lista jugadores \n 5) Top3 \n\n 0) Salir");
    } while (op == null || op == "" || patron.test(op) || op<0 || op>5);
    return op;
}
let salir=false;

do {
    let seleccion=parseInt(menu());
    if (seleccion==1) {
        altaPlayer();
    }
    if (seleccion==2) {
        bajaPlayer();
    }
    if (seleccion==3) {
        modificarPlayer();
    }
    if (seleccion==4) {
        listaPlayer();
    }
    if (seleccion==5) {
        top3();
    }
    if (seleccion==0) {
        console.log("opcion0");
        salir=true
    }
} while (salir==false);
alert("Hasta Luego :)");
//Opciones:

//Alta Jugador nuevo
function altaPlayer() {
    let name=prompt("Ingrese el nombre del jugador: ");
    let mail=prompt("Ingrese mail del jugador: ");
    let age,score=""; //validaciones
    do {
        age=prompt("Ingrese edad: ");
    } while (age == null || age == "" || patron.test(age));

    do {
        score=prompt("Ingrese puntaje:");
    } while (score == null || score == "" || patron.test(score));
    let player=new Player(name, mail, age, score);
    arrayStats.push(player);
    console.log("jugador nuevo ingresado: ");
    console.log(player);
}


//Baja Jugador
function bajaPlayer() {
    let name=prompt("Ingrese el nombre: ");
    let player=arrayStats.find(Player => Player.name.toLowerCase() == name.toLowerCase());
    if (player==undefined){
        alert("Jugador no encontrado, ingrese a la lista para verificar el nombre (Opcion 4)");
    } else {
        console.log("Jugador Eliminado: ");
        alert("jugador Eliminado: "+player.name);
        console.log(player);
        let indice=arrayStats.indexOf(player);
        arrayStats.splice(indice, 1);
    }
}

//Modificar Jugador
function modificarPlayer() {
    let name = prompt("Ingrese el nombre: ");
    let player = arrayStats.find(Player => Player.name.toLowerCase() == name.toLowerCase());
    let id = arrayStats.indexOf(player);
    let nameNew, mail,age,score=""; //validaciones
    if (player==undefined){
        alert("Jugador no encontrado, ingrese a la lista para verificar el nombre (Opcion 4)");
    } else {
        do {
            nameNew=prompt("Jugador Seleccionado: "+player.name+"\n\nIngrese nuevo nombre:");
        } while (nameNew == null || nameNew == "" || nameNew == " ");
        do {
            mail=prompt("Mail actual: "+player.mail+"\n\nIngrese nuevo mail:");
        } while (mail == null || mail == ""|| mail == " ");
        do {
            age=prompt("Edad actual: "+player.age+"\n\nIngrese nueva edad:");
        } while (age == null || age == "" || patron.test(age));
        do {
            score=prompt("Score actual: "+player.score+"\n\nIngrese nuevo score:");
        } while (score == null || score == "" || patron.test(score));
    
        let playerModificado = new Player(nameNew, mail, age, score);
        arrayStats.splice(id, 1, playerModificado);
        console.log("Jugador Modificado: ");
        console.log(playerModificado);
    }
}

//Lista jugadores
function listaPlayer() {
    let mensaje="";
    let mensaje2="";
    for (let i=0;i<arrayStats.length; i++) {
        player=arrayStats[i];
        mensaje=("Jugador: "+player.name+"         Score: "+player.score+"\n");
        mensaje2=mensaje2+mensaje;
    }
    alert("Cantidad de jugadores: "+arrayStats.length+"\n\n"+mensaje2);
}
function top3() {
    let arrayTop3 = [...arrayStats];
    arrayTop3.sort((a,b) => b.score - a.score);
    let mensaje="";
    let mensaje2="";
    for (let i=0;i<3; i++) {
        player=arrayTop3[i];
        mensaje=("Top "+(i+1)+":  "+player.name+"         Score: "+player.score+"\n");
        mensaje2=mensaje2+mensaje;
    }
    alert("Top3:\n\n"+mensaje2);
}