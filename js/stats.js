// Alta, baja, modificacion, top3

class Player {
    constructor(name, mail, age, score) {
        this.name=name;
        this.mail=mail;
        this.age=age;
        this.score=score;
    }
}

let arrayStats = []; //mi base de dato, donde se guardan los players

// Cargar y push algunos players
const playerChris = new Player("Chris", "ccabrera@info.com.ar", 32, 1024);
arrayStats.push(playerChris);

const playerAlex = new Player("Alex22", "jlopez.22@sodimac.com", 18, 840);
arrayStats.push(playerAlex);

const playerJota = new Player("JotaFx", "jota.elcrack@gmail.com", 17, 780);
arrayStats.push(playerJota);

const playerLaura = new Player("Lauras", "lau.la_linda@hotmail.com", 25, 220);
arrayStats.push(playerLaura);

const playerManolo = new Player("Manolo", "manu22@hotmail.com", 22, 420);
arrayStats.push(playerManolo);

const playerAbigail = new Player("Abigail", "abieche@gmail.com", 29, 980);
arrayStats.push(playerAbigail);

const playerAbril = new Player("Abril", "abieche@gmail.com", 29, 980);
arrayStats.push(playerAbril);

const playerZoe = new Player("Zoe", "abieche@gmail.com", 29, 980);
arrayStats.push(playerZoe);

const playerMateo = new Player("Mateo", "abieche@gmail.com", 29, 980);
arrayStats.push(playerMateo);

const playerMaria = new Player("Maria", "abieche@gmail.com", 29, 980);
arrayStats.push(playerMaria);

const playerEduu = new Player("Eduu", "abieche@gmail.com", 29, 980);
arrayStats.push(playerEduu);

const playerAle = new Player("Ale", "abieche@gmail.com", 29, 980);
arrayStats.push(playerAle);





 if(localStorage.getItem("arrayStats")){
    arrayStats = JSON.parse(localStorage.getItem("arrayStats"));
}

//Alta Jugador nuevo
function altaPlayer(name,mail,age,score) {

    let player=new Player(name, mail, age, score);
    arrayStats.push(player);
    console.log("nuevo ingreso:");
    console.log(player);
    localStorage.setItem("arrayStats", JSON.stringify(arrayStats));
}

function test(){
    alert("hola!!");
}
//Baja Jugador
function bajaPlayer(name) {
    let player=arrayStats.find(Player => Player.name.toLowerCase() == name.toLowerCase());
    console.log("jugador Eliminado: "+player.name);
    let indice=arrayStats.indexOf(player);
    arrayStats.splice(indice, 1);
    document.getElementById("borrar"+name).style.opacity=0.2;
    localStorage.setItem("arrayStats", JSON.stringify(arrayStats));
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
const contenedorLista = document.getElementById("statsList");
function listaPlayer() {
    console.log(arrayStats);

    contenedorLista.innerHTML = "";
    if(arrayStats!=0){
        arrayStats.forEach( player => {
        const card = document.createElement("li");
        card.classList.add("list-group-item","d-flex","justify-content-between","align-items-start");
        card.setAttribute("id",`borrar${player.name}`)
        card.innerHTML = `
        <div class="ms-2 me-auto">
        <div class="fw-bold"><a href="mailto:${player.mail}">${player.name}</a><small class="mx-4">Edad: ${player.age}</small></div>
        Puntaje: ${player.score}
        </div><a onclick="bajaPlayer('${player.name}')" class="badge bg-primary rounded-pill mt-2" >BORRAR</a>`;
        document.querySelector(".lista").appendChild(card);

    });
    }else{
        const card = document.createElement("li");
        card.classList.add("list-group-item","d-flex","justify-content-between","align-items-start");
        card.innerHTML = `
        <div class="ms-2 me-auto">
        <div class="fw-bold"><p href="">No hay jugadores registrados</p><small class="mx-4"></small></div>
        </div>`;
        document.querySelector(".lista").appendChild(card);
    }
    top3();
}

//top3List
const contenedorTop3Lista = document.getElementById("top3List");
function top3() {
    contenedorTop3Lista.innerHTML = "";
    if(arrayStats!=0){
        let arrayTop3 = [...arrayStats];
        arrayTop3.sort((a,b) => b.score - a.score);
        contenedorTop3Lista.innerHTML = "";

        for (let i=0;i<3; i++) {
            let player=arrayTop3[i];

            const card = document.createElement("div");
            card.classList.add("col-md-4", "mb-3", "mb-md-0");
            card.innerHTML = `
                <div class="card py-4 h-100">
                <div class="card-body text-center">
                    <h3 class="text-uppercase m-0">TOP ${i+1}</h3>
                    <h4 class="text-uppercase m-0">${player.name}</h4>
                    <hr class="my-4 mx-auto" />
                    <div class="small text-black-50">Puntaje: ${player.score}</div>
                </div>
            </div>`;
            document.querySelector(".top3List").appendChild(card);
        }
        } else {
            const card = document.createElement("div");
            card.classList.add("col-md-4", "mb-3", "mb-md-0");
            card.innerHTML = `
                <div class="card py-4 h-100">
                <div class="card-body text-center">
                    <h3 class="text-uppercase m-0">SIN TOP</h3>
                    <h4 class="text-uppercase m-0">Sin jugadores</h4>
                    <hr class="my-4 mx-auto" />
                    <div class="small text-black-50"></div>
                </div>
            </div>`;
            document.querySelector(".top3List").appendChild(card);
        }
}

listaPlayer();
top3();

