document.addEventListener('DOMContentLoaded', function () {

const DOT_FOCUS_CLASS = 'dot-focus';
const DOT_CLASS = 'color-dot';

const colours = ['red','blue','green','yellow','orange','pink'];

const deleteButton = document.getElementById('deleteButton');
const enterButton = document.getElementById('enterButton');

const pickers = document.getElementsByClassName('color-pick');
const gameRows = document.getElementsByClassName('game-round');
const gmaeRowsArray = Array.from(gameRows);

startGame();

function startGame(){


    let currentDot = 0;
    let currentRound = 1;
    let solved = false;
    let guessSubmitted = false;
    let currentGuess = [];
    const result = setResult();
    

    let boxes = gmaeRowsArray[currentRound-1].getElementsByClassName('box');
    let boxesArray = Array.from(boxes); 
        
        
    
        
  
    enterButton.addEventListener('click',function(){
        if(currentDot === 4){
            solved = checkGuess(currentGuess,result,boxesArray);
            if(solved){
                setGameOver();
            }
            else{
                currentRound++;
                gameRows[currentRound-1].classList.add('game-row');
                gameRows[currentRound-1].classList.remove('game-row-hidden');
                let nextBoxes = gmaeRowsArray[currentRound-1].getElementsByClassName('box');
                boxesArray = Array.from(nextBoxes); 
                currentDot = 0;
            }
            currentGuess = [];
        }
        
    })

    deleteButton.addEventListener('click',function(){
        currentGuess.pop();
        let dot = boxesArray[currentDot].getElementsByClassName(DOT_CLASS)[0];
        removePreviousSelections(dot) 
        removePreviousFocus(dot);
        currentDot--;
        if(currentDot == -1) currentDot = 0;
 
        dot = boxes[currentDot].getElementsByClassName(DOT_CLASS)[0]; 
        setDotFocus(dot);
    });

    
    
    for(let picker of pickers) {
        picker.addEventListener('click',function(event){
            const color = event.target.dataset.color;
            const colorClass = 'color-' + event.target.dataset.color;
            currentGuess[currentDot] = color;

            let dot = boxesArray[currentDot].getElementsByClassName(DOT_CLASS)[0];     
            setDotSelection(colorClass,dot);
            removePreviousFocus(dot);
            currentDot++;
            if(currentDot == 5) currentDot = 4
            dot = boxes[currentDot].getElementsByClassName(DOT_CLASS)[0];
            setDotFocus(dot);
        })
    }
}
function setGameOver(){
    console.log('Game over');
}
function setDotFocus(dot){
    dot.classList.add(DOT_FOCUS_CLASS);
}
function removePreviousFocus(dot){
    dot.classList.remove(DOT_FOCUS_CLASS);
}
function setDotSelection(selection,dot){
    removePreviousSelections(dot);
    dot.classList.add(selection);
}

function removePreviousSelections(dot){
    dot.classList.remove('color-red');
    dot.classList.remove('color-blue');
    dot.classList.remove('color-yellow');
    dot.classList.remove('color-green');
    dot.classList.remove('color-orange');
    dot.classList.remove('color-pink');
    dot.classList.remove('color-yellow');
}

function setResult(){
    // random between 1-10
    // Math.floor((Math.random() * 10) + 1);
    let gameResult = [];
    for(let i=0; i<5; i++){
        let nextColourIndex = Math.floor((Math.random() * colours.length));
        gameResult.push(colours[nextColourIndex]);
    }
    return gameResult;   
}

function checkGuess(guess,result,boxes){
    let results = new Set();
    let numCorrect = 0;
    for(let i=0; i<5; i++){
        if(guess[i] === result[i]) {
            results.add(guess[i])
            boxes[i].classList.add('correct');
            numCorrect++;
        }
    }

    for(let i=0; i<5; i++){  
        if(guess[i] !== result[i]) {
            if (!results.has(guess[i]) && result.includes(guess[i])){ 
                boxes[i].classList.add('nearly');   
                results.add(guess[i])
            }
        }
    }
    return numCorrect === 5
}

function resetBoxesCheckState(boxes){
    for(let box of boxes){
        box.classList.remove('correct');
        box.classList.remove('nearly');
    }
}

    // do something here ...
}, false);