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

const cargaPlayers = async () => {
    const resp= await fetch("json/players.json")
    arrayStats = await resp.json();
}

 if(localStorage.getItem("arrayStats")){
    arrayStats = JSON.parse(localStorage.getItem("arrayStats"));
    console.log("JSON existentes, cargados");
} else {
    cargaPlayers();
}

//Alta Jugador nuevo
function altaPlayer(name,mail,age,score) {

    let player=new Player(name, mail, age, score);
    arrayStats.push(player);
    console.log("nuevo ingreso:");
    console.log(player);
    localStorage.setItem("arrayStats", JSON.stringify(arrayStats));
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
        <div class="fw-bold"><p href="">No hay jugadores registrados ó recarge por favor</p><small class="mx-4"></small></div>
        </div>`;
        document.querySelector(".lista").appendChild(card);
    }
    top3();
}
let m=false;
function ordenar() {
    if (m==false) { 
        arrayStats.sort((a,b) => b.score - a.score);
        m=true;
        listaPlayer();
    } else {
        arrayStats.sort((b,a) => b.score - a.score);
        m=false;
        listaPlayer();
    }
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

