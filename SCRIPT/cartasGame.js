let game = {
    lockMode: false,
    firsCard: null,
    secondCard: null,
    apps: [
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
    cards: null,

    setCard: function (id){

        let card =  this.cards.filter(card => card.id === id)[0];
        console.log(card)
        if (card.flipped || this.lockMode) {
            return false
        }

        if(!this.firsCard){
            this.firsCard = card;
            this.firsCard.flipped = true
            return true
        }else{
            this.secondCard = card
            this.secondCard.flipped = true
            this.lockMode = true
            return true
        }
    },
    checkMath: function (){
        if(!this.firsCard || !this.secondCard){
            return false
        }
        return this.firsCard.icon === this.secondCard.icon
    },
    clearCards: function (){
        this.firsCard = null;
        this.secondCard = null;
        this.lockMode = false
    },
    unflipCards(){
        this.firsCard.flipped = false
        this. secondCard.flipped = false
        this.clearCards()
    },

    checkGameOver(){
        return this.cards.filter(card => !card.flipped).length == 0;
    },

     createCardsFromApps: function (){
        this.cards = [];
    
       this.apps.forEach((app) => {
            this.cards.push(this.createPairFromApps(app))
        })
        this.cards = this.cards.flatMap(pair=> pair)
        this.shuffleCards()
        return this.cards
    },
    
     createPairFromApps: function(app){
    
        return [{
            id: this.createIdWidthApp(app),
            icon: app,
            flipped: false,
        },{
            id: this.createIdWidthApp(app),
            icon: app,
            flipped: false,
        }]
    },
    
     createIdWidthApp: function(app){
        return app + parseInt( Math.random() * 1000);
    },

     shuffleCards: function(cards){
        let currentIndex = this.cards.length;
        let randomIndex = 0;
    
        while(currentIndex !== 0){
    
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--;
    
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    },




}