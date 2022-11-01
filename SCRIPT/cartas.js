/*
var alunos = ["Niiiiiiiiceeeee verrryy", "Yohran kallahari", "Putiane sentadora", "Aliceana de andrade graciosa", "Nicolly de souza", "Jade caroline borges", "leo aparecido de cornes" ]
var nota1 = [9, 6, 5, 8, 8, 1, 6];
var nota2 = [1, 10, 6, 8, 3, 9, 1];
var conceito = "";

function media (nota1, nota2) {
    return (nota1 + nota2) /2;
}

function passou (media) {
    if (media > 8) {
        conceito = "Ótimo";
    }
    else if (media > 7) {
        conceito = "Bom";
    }
    else {
        conceito = "Ruim"
    }

    switch (conceito) {
        case "Ótimo": 
            console.log("Parabéns, vc é um ótimo aluno");
            break;

        case "Bom": 
            console.log("Continue assim, vc está quase perfeito");
            break;

        case "Ruim":
            console.log("Estude mais seu tanso!!");
            break;

        default: console.log("Houve algum error 404!!")
        break;
    }
}

for (index in alunos) {
    n1 = nota1[index];
    n2 = nota2[index];
    var m = media (n1, n2)

    console.log(alunos[index] + " | " +
                n1 + " | " +
                n2 + " | " +
                m + " | " +
                passou (m))
}
*/
//--------------------------------------------------
/*
function calcMedia () {
    return (this.notas[0] + this.notas[1]) /2;
}

var aluno1 = {
    nome: 'Yohran',
    notas: [8, 9],
    media: calcMedia
    
}

var aluno2 = {
    nome: 'Nicolly',
    notas: [6, 6],
    media: calcMedia
}


console.log(aluno1.nome);
console.log(aluno1.media());

console.log(aluno2.nome);
console.log(aluno2.media());
*/
// --------------------------------------------------------------
/*
function criarAluno ( nome, n1, n2 ) {
    return {
        nome: nome,
        nota1: n1,
        nota2: n2,
        media: function() {
            return (this.nota1 + this.nota2) /2;
        }
    }
}

turma = [
    criarAluno('Yohran Kallahari', 8, 4),
    criarAluno('Nicolly de Souza', 7, 9),
    criarAluno('Jade Carolina Borges', 5, 7),
    criarAluno('Bruno Vitório de Souza Rangel', 5 , 5),
    criarAluno('Aliceana de Andrade Graciosa', 4, 9)
]
turma.forEach( function (elemento) {
console.log(elemento)
console.log(elemento.media())})
*/
/*
let tela = document.getElementById("tela")
let ctx = tela.getContext("2d")


ctx.rect(10, 10, 100, 200)
ctx.fillStyle = "red"
ctx.strokeStyle = "blue";
ctx.fill()
ctx.stroke()

ctx.clearRect(20,20,30,30)
ctx.clearRect(70,20,30,30)
ctx.clearRect(20, 60, 30,30)
ctx.clearRect(70,60, 30, 30)
*/
/*
let usuarios = ["Adriano", "Marcia", "José"]

function inserirUsuario(nome){
    let promise = new Promise(function(resolve, reject){

        setTimeout(() => {

            usuarios.push(nome)

            let error = false;

            if (!error) {
                resolve()
            }else{
                reject("Error 404!!!!!!!!!")
            }  

        }, 200);

    })

    return promise

}

function listarUsuario() {
    console.log(usuarios)
}

async function executar () {
    await inserirUsuario("Yohran kallahari")
    await inserirUsuario("Nando")

    listarUsuario()
}
executar()
*/
/*

function novoAluno(nome, idade){
    return {nome, idade}
}

let alunos = [
    novoAluno("Yohran", 22),
    novoAluno("Bruno", 39),
    novoAluno("Alice", 36)
]
function temMenosD30(aluno){
    return aluno.idade < 30;
}

function filtro(callback){
    let alunosFiltrados = [];

    for(let aluno of alunos){
        if(callback(aluno)){
            alunosFiltrados.push(aluno)
        }
    }
    return alunosFiltrados
}
console.log(filtro(temMaisD30))
*/
const FRONT = "card_front"
const BACK = "card_back"
const CARD = 'card'
const ICON = 'icon'



startGame()

function startGame(){
   initiaLizeCards(game.createCardsFromApps())

}

function initiaLizeCards(cards){
    let gameBoard = document.getElementById('gameBoard')
    gameBoard.innerHTML = ''
    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement)

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement);
    })
    
    
}
function createCardContent(card, cardElement){
    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, element){
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)
    if(face == FRONT){
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = "../img/" + card.icon + ".png"
        cardElementFace.appendChild(iconElement)
    }else{
        cardElementFace.innerHTML = '&lt/&gt'
    }
    element.appendChild(cardElementFace)
}
function flipCard(){

    if(game.setCard(this.id)){

        this.classList.add("flip")
        if(game.secondCard){
            if (game.checkMath()){
                game.clearCards();
               if (game.checkGameOver()){
                let gameOverLayer = document.getElementById('gameOver')
                gameOverLayer.style.display = 'flex';
               }
            }else{
                setTimeout(()=>{
                let firsCardView = document.getElementById(game.firsCard.id);
                let secondCardView = document.getElementById(game.secondCard.id)

                firsCardView.classList.remove('flip')
                secondCardView.classList.remove('flip')
                game.unflipCards()
                }, 1000)
        
            }
        }
    }
}
function restart(){
    game.clearCards()
    startGame()
    let gameOverLayer = document.getElementById('gameOver')
    gameOverLayer.style.display = 'none';
}

