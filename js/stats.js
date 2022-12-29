// Alta, baja, modificacion, top3

class Player {
    constructor(name, mail, age, score) {
        this.name=name;
        this.mail=mail;
        this.age=age;
        this.score=score;
    }
}

const arrayStats = []; //mi base de dato, donde se guardan los players

// Cargar y push algunos players
const playerChris = new Player("Chris", "ccabrera@info.com.ar", 32, 1024);
arrayStats.push(playerChris);

const playerAle = new Player("Alex22", "jlopez.22@sodimac.com", 18, 840);
arrayStats.push(playerAle);

const playerJota = new Player("JotaFx", "jota.elcrack@gmail.com", 17, 780);
arrayStats.push(playerJota);

const playerLaura = new Player("Lauras", "lau.la_linda@hotmail.com", 25, 220);
arrayStats.push(playerLaura);


//Alta Jugador nuevo
function altaPlayer(name,mail,age,score) {

    let player=new Player(name, mail, age, score);
    arrayStats.push(player);
    alert("jugador nuevo ingresado: "+player);
}

function test(){
    alert("hola!!");
}
//Baja Jugador
function bajaPlayer(name) {
    let player=arrayStats.find(Player => Player.name.toLowerCase() == name.toLowerCase());
    alert("jugador Eliminado: "+player.name);
    console.log(player);
    let indice=arrayStats.indexOf(player);
    arrayStats.splice(indice, 1);
}


//Modificar Jugador
function modificarPlayer(name,nameNew,mailNew,ageNew,scoreNew) {
    let player = arrayStats.find(Player => Player.name.toLowerCase() == name.toLowerCase());
    let id = arrayStats.indexOf(player);
    let playerModificado = new Player(nameNew, mailNew, ageNew, scoreNew);
    arrayStats.splice(id, 1, playerModificado);
    console.log("Jugador Modificado: ");
    console.log(playerModificado);
}

//Lista jugadores

function listaPlayer() {
console.log(arrayStats);

    arrayStats.forEach( player => {
        
        const card = document.createElement("li");
        card.classList.add("list-group-item","d-flex","justify-content-between","align-items-start");
        card.innerHTML = `
        <div class="ms-2 me-auto">
        <div class="fw-bold"><a href="mailto:${player.mail}">${player.name}</a><small class="mx-4">Edad: ${player.age}</small></div>
        Puntaje: ${player.score}
        </div><a class="badge bg-primary rounded-pill mt-2" id="borrar${player.name}">BORRAR</a>`;
        document.querySelector(".lista").appendChild(card);

        //Agregar productos al carrito: 
/*         const boton = document.getElementById(`boton${player.name}`);
        boton.addEventListener("click", () => {
            alert("borrado");
        }); */
    });
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


listaPlayer();
