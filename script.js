let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let countForDraw = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    let turnO = true;
    countForDraw = 0;
    enableBoxesForNewTurn();
    msgContainer.classList.add("hide");
};

boxes.forEach((individualbox) => {
    individualbox.addEventListener("click", () => {
        // console.log("clicked");
        if(turnO){
            individualbox.innerText = "O";
            turnO = false;
        }else{
            individualbox.innerText = "X";
            turnO = true;
        }
        individualbox.disabled = true; //avoid repeat

        countForDraw ++;
        let isWinner = checkWinner();
        if(countForDraw === 9 && !isWinner){
            gameDraw();
        }
    })
});

const gameDraw = () => {
    msg.innerText = "Egalité ";
    msgContainer.classList.remove("hide");
    disableBoxesAfterWin();
}

const disableBoxesAfterWin = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxesForNewTurn = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Gagnat est ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxesAfterWin();
};

const checkWinner = () => {
    for(let pattern of winPatterns){
            let pos1Value = boxes[pattern[0]].innerText;
            let pos2Value = boxes[pattern[1]].innerText;
            let pos3Value = boxes[pattern[2]].innerText;
            
            if(pos1Value != "" && pos2Value != "" && pos3Value !=""){
                if(pos1Value === pos2Value && pos2Value === pos3Value){
                    // console.log("winner", pos1Value);
                    showWinner(pos1Value);
                }
            }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);