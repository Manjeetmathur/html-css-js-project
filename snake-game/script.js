let inputDir = {x :0  , y : 0};

const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');

let score=0;
let speed =5;
let lastPaintTime =0;

let snakeArr =[
    { x : 13 , y : 15 }
]

let food = {x:10 , y : 8};


function main(cTime){
    window.requestAnimationFrame(main);

    if((cTime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = cTime;

    gameEngine();
}


function isCollide(sArr)
{
    // for(let i=1; i< snakeArr.length ;i++){
    //     if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y  )
    //         {
    //             return true;
    //         }
       
    // }
    // if(snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 ||snakeArr[0].y <= 0 ){
    //     return true;
    // }
    return false;
}

function gameEngine()
{


    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x :0  , y : 0};
        snakeArr =[
            { x : 13 , y : 15 }
        ]
        // musicSound.play();
        score=0;
    }


    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > highScoreVal){
            highScoreVal= score;
            localStorage.setItem("highScore" , JSON.stringify(highScoreVal));
            highscr.innerHTML = "High Score : " + highScoreVal;
        }
        scr.innerHTML = "Score : " + score; 
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x , y: snakeArr[0].y  + inputDir.y})
        let a= 2 ;
        let b= 16 ;
        food = {x : Math.round(a+(b-a)*Math.random()), y : Math.round(a+(b-a)*Math.random())}
    }


    for(let i = snakeArr.length-2;i >= 0 ; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
 

    board.innerHTML = "";
    snakeArr.forEach((e,index) => {
        snakeElement= document.createElement('div')
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0)
            {
                snakeElement.classList.add('head');
            }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

        foodElement= document.createElement('div')
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}


let highScore = localStorage.getItem("higScore");

if(highScore == null){
    highScoreVal=0;
    localStorage.setItem("highScore" , JSON.stringify(highScoreVal))
}
else{
    highScoreVal = JSON.parse(highScore);
    highscr.innerHTML = "High Score : " + highScore;
}

window.requestAnimationFrame(main);

window.addEventListener('keydown' , e => {
    inputDir = {x: 0, y :1};
    moveSound.play();

    switch(e.key)
    {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            console.log("ArrowUp");
            inputDir.x= 1;
            inputDir.y = 0;
            break;
        case "ArrowLeft":
            console.log("ArrowUp");
            inputDir.x= -1;
            inputDir.y = 0;
            break;
        default :
            break;
    }
})