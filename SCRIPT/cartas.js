const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"

startGame()

function startGame(){
     
     inicializa_cards(game.create_cards_tecnologia())
}

function inicializa_cards(cards){
    let game_tela = document.getElementById("game_tela")

    game_tela.innerHTML = ""

    game.cards.forEach((card)=>{

        let card_element = document.createElement('div')
        card_element.id = card.id
        card_element.classList.add(CARD)
        card_element.dataset.icon = card.icon

        criar_conteudo_carta(card, card_element)

        card_element.addEventListener("click", virar_card)
        game_tela.appendChild(card_element)

    })
}

function criar_conteudo_carta(card, card_element){

    criar_face_carta(FRONT, card, card_element)
    criar_face_carta(BACK, card, card_element)

}

function criar_face_carta(face, card, element){

    let card_face_element = document.createElement('div')
    card_face_element.classList.add(face)
    if(face === FRONT){
        let icone_element = document.createElement('img')
        icone_element.classList.add(ICON)
        icone_element.src = "../img/" + card.icon + ".png"
        card_face_element.appendChild(icone_element)
    }else{
        card_face_element.innerHTML = "&lt/&gt"
    }

    element.appendChild(card_face_element)
}

function virar_card(){
    if(game.setCard(this.id)){

        this.classList.add('flip')
        if(game.segunda_carta){
            if(game.checkMath()){
                game.clear_cards()
                if(game.checkGameOver()){
                    let chamar_gameOver = document.getElementById("gameOver")
                    chamar_gameOver.style.display="flex"
                }
            }else{
                setTimeout(()=>{
                    let primeira_carta_view = document.getElementById(game.primeira_carta.id)
                    let segunda_carta_view = document.getElementById(game.segunda_carta.id)
        
                    primeira_carta_view.classList.remove('flip')
                    segunda_carta_view.classList.remove('flip')
                    game.cartas_nao_viradas()
                },1000)
            }
        }
    }
}

function restart(){
    game.clear_cards()
    startGame()
    
    let chamar_gameOver = document.getElementById("gameOver")
    chamar_gameOver.style.display="none"
}