let game = {

    lockMode: false,
    primeira_carta: null,
    segunda_carta: null,

    tecnologias: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],

    setCard: function(id){

        let card = this.cards.filter(card => card.id === id)[0]

        console.log(card)
        
        if(card.flipped || this.lockMode){
            return false
        }

        if(!this.primeira_carta){
            this.primeira_carta = card
            this.primeira_carta.flipped = true
            return true
        }else{
            this.segunda_carta = card
            this.segunda_carta.flipped = true
            this.lockMode = true
            return true
        }

    },
    checkMath: function(){
        if(!this.primeira_carta || !this.segunda_carta){
            return false
        }
        return this.primeira_carta.icon === this.segunda_carta.icon
    },

    clear_cards: function(){

        this.primeira_carta = null
        this.segunda_carta = null
        this.lockMode = false

    },

    cartas_nao_viradas: function(){
        this.primeira_carta.flipped = false
        this.segunda_carta.flipped = false
        this.clear_cards()
    },

    checkGameOver: function(){
       return this.cards.filter(card => !card.flipped).length == 0
    },

    cards: null,

    create_cards_tecnologia: function(){
        this.cards = []
    
        this.tecnologias.forEach((tecnologia) =>{
            this.cards.push(this.create_par_cartas(tecnologia))
        })
        this.cards = this.cards.flatMap(par => par) 
        this.embaralhar_cartas()

        return this.cards
    },   
    
    create_par_cartas: function(tecnologia){
    
        return [{
            id: this.createId_cartas(tecnologia),
            icon: tecnologia,
            flipped: false
        },{
            id: this.createId_cartas(tecnologia),
            icon: tecnologia,
            flipped: false
        }]
    },
    
    createId_cartas: function(tecnologia){
        return tecnologia + parseInt(Math.random() * 1000)
    },

    embaralhar_cartas: function(cards){
        let index_atual = this.cards.length
        let index_randomico = 0
    
        while(index_atual !== 0){
            index_randomico = Math.floor(Math.random() * index_atual)
            index_atual--
    
            [this.cards[index_randomico], this.cards[index_atual]] = [this.cards[index_atual], this.cards[index_randomico]]
        }
    }
}