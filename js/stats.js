// Alta, baja, modificacion, top3
let log="";
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
    console.log("Players cargados de Json");
    console.log(arrayStats);
    localStorage.setItem("arrayStats", JSON.stringify(arrayStats));

}


if(localStorage.getItem("arrayStats")){
    arrayStats = JSON.parse(localStorage.getItem("arrayStats"));
    console.log("JSON Players existentes, cargados");
} else {
    cargaPlayers();
}

if(localStorage.getItem("login")){
    log = JSON.parse(localStorage.getItem("login"));
    console.log("JSON Admin cargado");
} else {
    log=false;
    console.log("no hay JSON admin...");
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
    localStorage.setItem("arrayStats", JSON.stringify(arrayStats));
}
function modPlayer(jugador){
    //document.getElementById("borrar"+player).remove();
    const linea = document.getElementById("borrar"+jugador);
    let player = arrayStats.find(Player => Player.name.toLowerCase() == jugador.toLowerCase());
    let id = arrayStats.indexOf(player);
    linea.innerHTML =`
        <form id="mod" class="ms-2 me-auto" action="#stats">
             
                <div class="fw-bold">
                    <input id="name" type="text" class="w-20" value="${player.name}">
                    <small class="mx-4">Edad: <input id="age" type="number" min="8" max="99" class="w-5" value="${player.age}"></small>
                </div>
                Puntaje: <input id="score" type="number" min="0" max="9999" class="w-10" value="${player.score}">
            
            <button type="submit" id="ok" class="badge bg-primary rounded-pill mt-2 left">ACEPTAR</button>
        </form>    `;

        let formulario = document.forms['mod'];
        const formularioMod = document.getElementById("mod");
        formularioMod.addEventListener("submit", (e) => {
            e.preventDefault();
            //formulario.reset();
            //function modificarPlayer(name,nameNew,mailNew,ageNew,scoreNew) {
            modificarPlayer(player.name,formulario['name'].value,player.mail,formulario['age'].value,formulario['score'].value);
            Toastify( {
                text: "Modificado!",
                duration: 1000,
                gravity: "bottom",
                position: "right",
                /* destination: "https://www.google.com", */
                style: {
                    background: "green",
                }
            }).showToast();
            linea.innerHTML = `
                <div class="ms-2 me-auto">
                <div class="fw-bold"><a href="mailto:${player.mail}">${formulario['name'].value}</a><small class="mx-4">Edad: ${formulario['age'].value}</small></div>
                Puntaje: ${formulario['score'].value}
                </div>
                <button class="badge bg-primary rounded-pill mt-2" onclick="modPlayer('${formulario['name'].value}'">MODIFICAR</button>
                <button class="badge bg-primary rounded-pill mt-2" onclick="bajaPlayer('${formulario['name'].value}'">BORRAR</button>
            `;
        });









}
//Lista jugadores
const contenedorLista = document.getElementById("statsList");



//localStorage.setItem("login", JSON.stringify(login);
const loginClick = document.getElementById("loginClick");
function sesion() {
    if(localStorage.getItem("login")) {
        log = JSON.parse(localStorage.getItem("login"));
        console.log("Login existentes, cargado");
        log==true ? loginClick.innerText="Admin - Cerrar Sesion" : loginClick.innerText="Iniciar Sesion";
    }
}
loginClick.addEventListener("click", () => {
    
    if(log==false){
        logON();
    }else{
        logOFF();
    }
});

function logON(){
    Swal.fire( {
        title: "Acceso admin",
        html: `<input type = "text" id="usuario" class = "swal2-input" placeholder = "Usuario">
                <input type = "text" id = "password" class = "swal2-input" placeholder = "Password">`,
        confirmButtonText: "Enviar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if(result.isConfirmed) {
            const usuario = document.getElementById("usuario").value;
            const password = document.getElementById("password").value;
            //Si quiero enviarte a otra página:
            if(usuario == "admin" && password == 1234){
                loginClick.innerText="Admin - Cerrar Sesion";
                log=true;
                localStorage.setItem("login", JSON.stringify(log));
                listaPlayer();
                Swal.fire( {
                    title: "Sesion admin iniciada",
                    icon: "success", 
                    confirmButtonText: "Aceptar",
                })
            } else {
                Swal.fire( {
                    title: "Credenciales incorrectas, intente nuevamente",
                    icon: "warning", 
                    confirmButtonText: "Aceptar",
                })
            }
        }
    })
}
function logOFF(){
    Swal.fire( {
        title: "Cerrará la sesion",
        icon: "warning", 
        confirmButtonText: "Aceptar",
        showCancelButton: true, 
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if(result.isConfirmed) {
            loginClick.innerText="Iniciar Sesion";
            log=false;
            localStorage.setItem("login", JSON.stringify(log));
            listaPlayer();
            Swal.fire( {
                title: "Sesion cerrada",
                icon: "success",
                confirmButtonText: "Aceptar",
            })
        }
    })
}
function listaPlayer() {
    sesion();
    contenedorLista.innerHTML = "";
    if(arrayStats!=0) {
        arrayStats.forEach( player => {
        const card = document.createElement("li");
        card.classList.add("list-group-item","d-flex","justify-content-between","align-items-start");
        card.setAttribute("id",`borrar${player.name}`);
        card.innerHTML = `
        <div class="ms-2 me-auto">
        <div class="fw-bold"><a href="mailto:${player.mail}">${player.name}</a><small class="mx-4">Edad: ${player.age}</small></div>
        Puntaje: ${player.score}
        </div>
        <button class="badge bg-primary rounded-pill mt-2"${log==true? `onclick="modPlayer('${player.name}'` : `onclick="toast(`})">MODIFICAR</button>
        <button class="badge bg-primary rounded-pill mt-2" ${log==true? `onclick="bajaPlayer('${player.name}'` : `onclick="toast(`})">BORRAR</button>
        `;
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

function toast(){
    Toastify( {
        text: "Debe iniciar sesion",
        duration: 1000,
        gravity: "bottom",
        position: "right",
        /* destination: "https://www.google.com", */
        style: {
            background: "red",
        }
    }).showToast();
}
listaPlayer();
top3();
sesion();
