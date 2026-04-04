let score = JSON.parse(localStorage.getItem('score')) || {
        wins:0,
        losses:0,
        ties:0
    };
    
updateScore();
console.log(score);

function playgame(playerMove){
    let computerMove = pickComputerMove();
    let result = '';
    if(playerMove === 'Scissors'){
        if(computerMove === 'Rock'){
        result = 'You lose';
        }else if(computerMove === 'Paper'){
            result = 'You win';
        }else{
            result = 'Tie';
        }
    }
    else if(playerMove === 'Rock'){
        if(computerMove === 'Rock'){
            result = 'Tie';
        }else if(computerMove === 'Paper'){
            result = 'You lose';
        }else{
            result = 'You win';
        }
    }
    else if(playerMove === 'Paper'){
        if(computerMove === 'Rock'){
        result = 'You win';
        }else if(computerMove === 'Paper'){
            result = 'Tie';
        }else{
            result = 'You lose';
        }    
    }

    if(result === 'You win') score.wins+=1;
    else if(result === 'You lose') score.losses+=1;
    else if(result === 'Tie') score.ties+=1;
    
    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.win-or-lose').innerHTML = `${result}!`;
    document.querySelector('.js-moves').innerHTML = `You chose:
                                                    <img src="imagesfor10/${playerMove}-emoji.png" class="buttonsforplay">
                                                    Computer Chose:
                                                    <img src="imagesfor10/${computerMove}-emoji.png" class="buttonsforplay">`;
    updateScore();
}

function updateScore(){
    document.querySelector('.js-score').innerHTML = `wins: ${score.wins},
                                                    losses: ${score.losses},
                                                    ties: ${score.ties}`;
}

function pickComputerMove(){
    let computerMove = '';
    const randomNumber = Math.random();
    if(randomNumber >= 0 && randomNumber <= 1/3){
        computerMove = 'Rock';
    }
    else if(randomNumber >= 1/3 && randomNumber <= 2/3){
        computerMove = 'Paper';
    }
    else{
        computerMove = 'Scissors';
    }
    return computerMove;
}


let intervalID;//set interval returns a number
let isAutoPlaying = false;

function autoPlay(){
    if(!isAutoPlaying){
        isAutoPlaying = true;
        intervalID = setInterval(function (){
            let playerMove = pickComputerMove();
            playgame(playerMove);
    },1000);
    }
    else{
        clearInterval(intervalID);//setInterval's returned number is stored as id and passed here to stop
        isAutoPlaying = false;
    }
}
