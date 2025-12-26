const cells = document.querySelectorAll(".cell")

let currentPlayer = "X";
let board = ['','','','','','','','',''];
const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let xWins = 0;
let oWins = 0;


function playSound(id){
    document.getElementById(id).play();
}

function fireConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
}
function showPopup(message) {
  document.getElementById("popupMessage").textContent = message;
  document.getElementById("popup").style.display = "flex";
}

function hidePopup() {
  document.getElementById("popup").style.display = "none";
}

document.getElementById("closePopup").addEventListener("click", () => {
    hidePopup();  
    document.getElementById("resetBtn").click();  // auto reset
});




const handelcellClick = (index)=>{
    if(board[index] !== "" )
        return
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    playSound("click")
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("status").textContent = `Player ${currentPlayer} turn`;

    const result = checkWinner();

    if(result){
        const {winner,pattern} = result
        document.getElementById("status").textContent = `Player ${winner} wins`;
        playSound("win");
        fireConfetti();
        showPopup(`Player ${winner} Wins!`);

        if(winner === "X"){
            xWins++;
            document.getElementById("xScore").textContent = xWins;
        }
        else{
            oWins++;
            document.getElementById("oScore").textContent = oWins;
        }


        pattern.forEach(i => {
            cells[i].classList.add("highlight")
        })

        cells.forEach( cell=>cell.style.pointerEvents = 'none');

        
        
        return
    }

    if(!board.includes("")){
        playSound("draw");
         showPopup("Match Draw!");

        document.getElementById("status").textContent = "Match draws";
        

    }
}
cells.forEach((cell,index)=>{
    cell.addEventListener("click",()=>{
        handelcellClick(index)
    })
}) 
function checkWinner(){
    for (let pattern of winningPatterns){
        const [a,b,c] = pattern;

        if(board[a] !== "" && board[a] === board[b] && board[b] === board[c]){
            return {
                winner : board[a],
                pattern : pattern
            }
        }
        

    }
    return null;
}


document.getElementById("resetBtn").addEventListener("click", ()=>{
    board = ['','','','','','','','',''];

    cells.forEach((cell)=>{
        cell.textContent = "";
        cell.style.pointerEvents = "auto";
        currentPlayer = "X";
        document.getElementById("status").textContent= `Player ${currentPlayer} turn`;
        cell.classList.remove("highlight");
        hidePopup();
    })
})