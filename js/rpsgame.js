let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function getComputerChoice() {
    const choices = ["r","p","s"];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function convertToWord(letter){
    if (letter === "r") return "Rock";
    if (letter === "r") return "Paper";
    return "Scissors";
}


function win(user, comp){
    
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(user);
    const compChoice_div = document.getElementById(comp);
    userScore++;
    
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;    
    result_p.innerHTML = `${convertToWord(user)}${smallUserWord}  beats   ${convertToWord(comp)}${smallCompWord}. You win!`;
    
    // Computer choice
    document.getElementById(comp).classList.add('red-glow');
    setTimeout(function(){ document.getElementById(comp).classList.remove('red-glow');  }, 1000);
    
    // User choice
    document.getElementById(user).classList.add('green-glow');
    setTimeout(function(){ document.getElementById(user).classList.remove('green-glow');  }, 1000);
}

function lose(user, comp){
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(user);
    const compChoice_div = document.getElementById(comp);
    computerScore++;
 
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;    
    result_p.innerHTML = `${convertToWord(user)}${smallUserWord}  loses to   ${convertToWord(comp)}${smallCompWord}. You lose..!`;
    
    // Computer choice
    document.getElementById(comp).classList.add('green-glow');
    setTimeout(function(){ document.getElementById(comp).classList.remove('green-glow');  }, 1000);

    // User choice
    document.getElementById(user).classList.add('red-glow');
    setTimeout(function(){ document.getElementById(user).classList.remove('red-glow');  }, 1000);
}

function draw(user, comp){
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(user);

   
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(user)}${smallUserWord}  equals   ${convertToWord(comp)}${smallCompWord}. DRAW!`;
    
    document.getElementById(user).classList.add('gray-glow');
    setTimeout(function(){ document.getElementById(user).classList.remove('gray-glow');  }, 1000);
}


function game(userChoice) {
    const computerChoice = getComputerChoice();

    switch (userChoice + computerChoice){
        case "rs":
        case "pr":
        case "sp":    
            win(userChoice, computerChoice)
            break;
        case "rp":
        case "ps":
        case "sr":   
            lose(userChoice, computerChoice)
            break; 
        case "rr":
        case "pp":
        case "ss":   
            draw(userChoice, computerChoice);
            break;        
    }
       
}

function main(){

    rock_div.addEventListener('click', function() {
        game("r"); 
    })
    
    paper_div.addEventListener('click', function() {
        game("p"); 
    })
    
    scissors_div.addEventListener('click', function() {
        game("s"); 
    })

}

main();