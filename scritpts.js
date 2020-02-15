const cards = document.querySelectorAll(".memory-card")

let blockBoard=false;
let firstCardClicked=false;
let firstCard, secondCard;


function flipCard(){
    if(blockBoard) return;
    if(this===firstCard) return;

    this.classList.add("flip");

    if(!firstCardClicked){
        firstCard=this;
        firstCardClicked=true;
        return;
    }

    secondCard=this;

    checkForMatch();
}

function checkForMatch(){
    let isMatch = firstCard.dataset.logo === secondCard.dataset.logo;
    isMatch? freezeCards() : unflipCards();
}

function resetBoard(){
    [blockBoard, firstCardClicked]=[false,false];
    [firstCard,secondCard]=[null,null];
}

function freezeCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards(){
    blockBoard=true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1500);
}

(function shuffle(){
    cards.forEach(card => {
        let randomNum=Math.floor(Math.random()*cards.length);
        card.style.order=randomNum});
})();


cards.forEach(card => card.addEventListener("click", flipCard));

