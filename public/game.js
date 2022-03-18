document.addEventListener('DOMContentLoaded', function () {

    const DOT_FOCUS_CLASS = 'dot-focus';
    const DOT_CLASS = 'color-dot';
    const BOX_CLASS = 'box';
    const COLOURS = ['red','blue','green','yellow','orange','pink'];
    const DISPLAY_NONE_CLASS = 'd-none';

    const deleteButton = document.getElementById('deleteButton');
    const enterButton = document.getElementById('enterButton');
    const restartButton = document.getElementById('restartButton');
    
    const endOfGameDisplay = document.getElementById('gameOver');
    const colourPanel = document.getElementsByClassName('colour-panel')[0];
    
    const gameRowsDomCollection = document.getElementsByClassName('game-row');
    const gameRows = Array.from(gameRowsDomCollection);
    
    const allBoxesDomCollection = document.getElementsByClassName(BOX_CLASS);
    const allBoxes = Array.from(allBoxesDomCollection);
    
    const allDotsDomCollection = document.getElementsByClassName(DOT_CLASS);
    const allDots = Array.from(allDotsDomCollection);

    const pickers = document.getElementsByClassName('color-pick');

    let dotIndex = 0;
    let currentDot = allDots[dotIndex];
    let gameRowIndex = 0;
    let currentGameRow = gameRows[gameRowIndex];
    let answer = setResult();

    for(let picker of pickers) {
        picker.addEventListener('click',function(event){
            const color = event.target.dataset.color;
            const colourClassName = event.target.dataset.colour;
            setDotSelection(colourClassName);
        });
    }

    function setResult(){
        let gameResult = [];
        for(let i=0; i<5; i++){
            let nextColourIndex = Math.floor((Math.random() * COLOURS.length));
            gameResult.push(COLOURS[nextColourIndex]);
        }
        return gameResult;   
    }

    function setDotSelection(colour){
        currentDot.dataset.colour = colour;
        if(!isEndOfRow()){
            focusOnNextDot();
        }  
    }

    function focusOnNextDot(){
        currentDot.classList.remove(DOT_FOCUS_CLASS);
        dotIndex++;
        currentDot = allDots[dotIndex];
        currentDot.classList.add(DOT_FOCUS_CLASS);
    }

    enterButton.addEventListener('click',function(event){
        if(isEndOfRow()){  
            checkAnswer();
        }
    });

    function openNextRow(){
        gameRowIndex++;
        currentGameRow = gameRows[gameRowIndex];
        currentGameRow.classList.remove(DISPLAY_NONE_CLASS);
        focusOnNextDot();
    }
    function checkAnswer(){
        let numCorrect = 0;
        let correctAnswers = new Set();
        for(let i=4; i>-1; i--){
            let colour = allDots[dotIndex - i].dataset.colour;
            if(colour === answer[4-i]){
                allBoxes[dotIndex-i].classList.add("correct");
                numCorrect++;
                correctAnswers.add(colour);
            }
        }
        for(let i=4; i>-1; i--){
            let colour = allDots[dotIndex - i].dataset.colour;
            if(answer.includes(colour) && !correctAnswers.has(colour)){
                allBoxes[dotIndex-i].classList.add("nearly"); 
            }
        }
        if(numCorrect === 5){
            setGameOver();
        }
        else{
            openNextRow();
        }
     
    }
    function setGameOver(){
        currentDot.classList.remove(DOT_FOCUS_CLASS);
        endOfGameDisplay.classList.remove(DISPLAY_NONE_CLASS);
        colourPanel.classList.add(DISPLAY_NONE_CLASS);
        enterButton.classList.add(DISPLAY_NONE_CLASS);
        deleteButton.classList.add(DISPLAY_NONE_CLASS);
        restartButton.classList.remove(DISPLAY_NONE_CLASS);
    }
    function isEndOfRow(){
        return ((dotIndex+1) %5 === 0) && currentDot.dataset.colour;
    }

    restartButton.addEventListener('click', function(){
        dotIndex = 0;
        gameRowIndex = 0;
        currentDot = allDots[dotIndex];
        currentGameRow = gameRows[gameRowIndex];
        for(let dot of allDots){
            dot.dataset.colour='';
        }
        for(let box of allBoxes){
            box.classList.remove('correct');
            box.classList.remove('nearly')
        }
        currentDot.classList.add(DOT_FOCUS_CLASS);

        for(let i=0;i<gameRows.length; i++){
            if(i>0){
                gameRows[i].classList.add(DISPLAY_NONE_CLASS);
            }
        }
        enterButton.classList.remove(DISPLAY_NONE_CLASS);
        deleteButton.classList.remove(DISPLAY_NONE_CLASS);
        restartButton.classList.add(DISPLAY_NONE_CLASS);
        endOfGameDisplay.classList.add(DISPLAY_NONE_CLASS);
        colourPanel.classList.remove(DISPLAY_NONE_CLASS);
        answer = setResult();
    })

    deleteButton.addEventListener('click',function(){
        
        if((!currentDot.dataset.colour || currentDot.dataset.colour === '') && ((dotIndex+1) %5 !== 1)) {
            currentDot.classList.remove(DOT_FOCUS_CLASS);
            dotIndex--;
            currentDot = allDots[dotIndex];
            currentDot.classList.add(DOT_FOCUS_CLASS);
            currentDot.dataset.colour = '';
        } else {
            currentDot.dataset.colour = '';
        } 
    });

});