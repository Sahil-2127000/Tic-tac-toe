const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameButton = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

function initGame(){
    currentPlayer ="X";
    gameGrid=["","","","","","","","",""];
    newGameButton.classList.remove("active");
        //UI pe saare boxes empty krne ke liye
        boxes.forEach((box,index) =>{
            box.innerText = "";
            boxes[index].style.pointerEvents="all";
            box.classList.remove('win');
    
        });

    gameInfo.innerText=`Current Player - ${currentPlayer}`;


}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else currentPlayer = "X";

    //UI update
    gameInfo.innerText=`Current Player - ${currentPlayer}`
}

function checkGameOver(){
    let answer = "";
    winningPositions.forEach((position) => {
        
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && ( gameGrid[position[0]] === gameGrid[position[1]] ) && ( gameGrid[position[1]] === gameGrid[position[2]] )) {
                
                //check if number is X or not
                if(gameGrid[position[0]]==="X"){
                    answer = "X" ;
                }
                else answer ="O";

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents="none";
                });

                //Now add winning bg

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
                
        }
    });
    
    //agar winner mila
    if(answer !== ""){
        gameInfo.innerText = `Winner player - ${answer}`;
        newGameButton.classList.add('active');
        return;
    }

    //case of tie
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== "") fillCount++;
    });

    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameButton.classList.add('active');
    }
}

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        //turn the swap
        swapTurn();

        //check koi jeet tu nhi gya
        checkGameOver();
    }
    
}

boxes.forEach((box , index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

newGameButton.addEventListener("click",initGame);