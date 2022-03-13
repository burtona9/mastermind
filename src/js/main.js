document.addEventListener('DOMContentLoaded', function () {

const DOT_FOCUS_CLASS = 'dot-focus';
const DOT_CLASS = 'color-dot';
const BOX_CLASS = 'box';

const colours = ['red','blue','green','yellow','orange','pink'];

const deleteButton = document.getElementById('deleteButton');
const enterButton = document.getElementById('enterButton');
const restartButton = document.getElementById('restartButton');

const endOfGameBox = document.getElementById('gameOver');
const colourPanel = document.getElementsByClassName('colour-panel')[0];


const pickers = document.getElementsByClassName('color-pick');

const gameRowsDomCollection = document.getElementsByClassName('game-round');
const gameRows = Array.from(gameRowsDomCollection);

const allBoxesDomCollection = document.getElementsByClassName(BOX_CLASS);
const allBoxes = Array.from(allBoxesDomCollection);

const allDotsDomCollection = document.getElementsByClassName(DOT_CLASS);
const allDots = Array.from(allDotsDomCollection);

for(let picker of pickers) {
    picker.addEventListener('click',function(event){
        const color = event.target.dataset.color;
        const colorClass = 'color-' + event.target.dataset.color;
        setDotSelection(colorClass,dot);
    });
}
startGame();

function startGame(){
    endOfGameBox.classList.remove('game-over');
    colourPanel.classList.remove('d-none');
    enterButton.classList.remove('d-none');
    deleteButton.classList.remove('d-none');
    restartButton.classList.add('d-none');


    


    for(let gameRow of gmaeRows){
        let boxes = gameRow.getElementsByClassName('box');
        let boxesArray = Array.from(boxes);
        resetBoxesCheckState(boxesArray);
        for(let box of boxesArray) {  
            let dot = box.getElementsByClassName(DOT_CLASS)[0];
            removePreviousSelections(dot);
        };
        if(!gameRow.classList.contains('first-game-round'))
            gameRow.classList.add('game-row-hidden');
    }

    let currentDot = 0;
    let currentRound = 1;
    let solved = false;
    let guessSubmitted = false;
    let currentGuess = [];
    let result = setResult();
    
    let boxes = gameRows[currentRound-1].getElementsByClassName('box');
    let boxesArray = Array.from(boxes); 

    enterButton.addEventListener('click',function(){
        if(currentDot === 4){
            solved = checkGuess(currentGuess,result,boxesArray);
            if(solved){
                setGameOver();
            }
            else{
                let lastdot = boxesArray[4].getElementsByClassName(DOT_CLASS)[0];
                removePreviousFocus(lastdot);
                currentRound++;
                console.log(currentRound);
                gameRowsDomCollection[currentRound-1].classList.add('game-row');
                gameRowsDomCollection[currentRound-1].classList.remove('game-row-hidden');
                let nextBoxes = gameRowsArray[currentRound-1].getElementsByClassName('box');
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
            dot = boxesArray[currentDot].getElementsByClassName(DOT_CLASS)[0];
            setDotFocus(dot);
        })
    }
}

restartButton.addEventListener('click',function(){
    startGame();
})

function setGameOver(){
    endOfGameBox.classList.add('game-over');
    colourPanel.classList.add('d-none');
    enterButton.classList.add('d-none');
    deleteButton.classList.add('d-none');
    restartButton.classList.remove('d-none');
}
function setDotFocus(dot){
    dot.classList.add(DOT_FOCUS_CLASS);
}
function removePreviousFocus(dot){
    dot.classList.remove(DOT_FOCUS_CLASS);
}
function setDotSelection(selection,dot){
    removePreviousFocus(dot);
    currentDot++;
    if(currentDot == 5) currentDot = 4
    dot = boxesArray[currentDot].getElementsByClassName(DOT_CLASS)[0];
    setDotFocus(dot);
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