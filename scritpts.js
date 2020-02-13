const cards = document.querySelectorAll(".memory-card");

let firstClicked=false;
let lockBoard=false;
let firstCard, secondCard;

function flipCard() {
    if(lockBoard) return;
    if(this===firstCard) return;

    this.classList.add("flip");

    if(!firstClicked){
    // first card
        firstClicked=true;
        firstCard=this;
        return 
    }
    // second card    
        secondCard=this;
    
        checkForMatch();
}

function resetBoard(){
    [firstClicked,lockBoard]=[false,false];
    [firstCard,secondCard]=[null,null];
}

function checkForMatch() {
    let isMatch=firstCard.dataset.framework === secondCard.dataset.framework;
    
    isMatch? disableCards():unflipCards();
}

function disableCards(){
    // match
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards() {
    // not a match se get them back to their face
    lockBoard =true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1500);
}

(function sheffle(){
    cards.forEach(card =>{
        let randomPos=Math.floor(Math.random()*12);
        card.style.order=randomPos;
    })
})();

cards.forEach(card => card.addEventListener("click", flipCard));

