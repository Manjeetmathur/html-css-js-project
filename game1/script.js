score = 0 ;
cross = true;

let audio= new Audio("music.mp3");
let audioGo = new Audio("gameover.mp3");

setTimeout(() => {
    audio.play();
},1000)


document.onkeydown = function(e){
    console.log("key code : " ,e.keyCode)
    if(e.keyCode == 38)
    {
        diono =  document.querySelector('.dino');
        diono.classList.add('animateDino');

        setTimeout(() => {
            diono.classList.remove('animateDino');
        },700);
    }
    if(e.keyCode == 39)
    {
        diono =  document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left  = dinoX + 112 + "px";
    }
    if(e.keyCode == 37)
        {
            diono =  document.querySelector('.dino');
            dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
            dino.style.left  = (dinoX - 112) + "px";
        }
        
}


setInterval(() =>{
    dino= document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

                      
    dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    // console.log(dx);
    dy = parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));
   
    ox =parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    // console.log(ox);
    oy =parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));


    offsetX = Math.abs(dx-ox);
    // console.log(offsetX);
    offsetY = Math.abs(dy-oy);

    if(offsetX < 200 && offsetY < 52)
    {
        gameOver.style.visibility= 'visible';
        obstacle.classList.remove('obstacleAni');
        audioGo.play();
        setTimeout(()=> {
            audio.pause();
            audioGo.pause();
        },1000);

    }
    else if (offsetX < 200 && cross){
        score += 1;
        updateScore(score);
        cross = false;

        setTimeout(() => {
            cross=true;
        },1000);
        setTimeout(() => {
            let aniDur=parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'))
            newDur = aniDur-0.3;
            obstacle.style.animationDuration = newDur + 's';
        },1000)
        

    }

},10);

function updateScore(score)
{
    scoreCount.innerHTML = "Your Score : " + score;
}