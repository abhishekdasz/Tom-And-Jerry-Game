score=0;
cross=true;

audio=new Audio('backgroundmusic.mp3');
audiogo=new Audio('gameover.wav');
setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown= function(e)
{
    console.log(e.key);
    if(e.key=='ArrowUp')
    {
        jerry=document.querySelector('.jerry');
        jerry.classList.add('animateJerry');

        setTimeout(() => {
            jerry.classList.remove('animateJerry')
        }, 700);
    }
    if (e.key=='ArrowRight') {
        jerry= document.querySelector('.jerry');
        jerryX=parseInt(window.getComputedStyle(jerry, null).getPropertyValue('left'));
        jerry.style.left =jerryX + 200 + "px";  

        obs= document.querySelector('.jerry');
        obs.classList.remove('flip');
    }
    if (e.key=='ArrowLeft') {
        jerry= document.querySelector('.jerry');
        jerryX=parseInt(window.getComputedStyle(jerry, null).getPropertyValue('left'));
        jerry.style.left =jerryX - 112 + "px";  

        obs= document.querySelector('.jerry');
        obs.classList.add('flip');
    }
}
setInterval(() => {
    jerry= document.querySelector('.jerry');
    gameOver= document.querySelector('.gameOver');
    obstacle= document.querySelector('.obstacle');

    jx=parseInt(window.getComputedStyle(jerry, null).getPropertyValue('left'));
    jy=parseInt(window.getComputedStyle(jerry, null).getPropertyValue('top'));

    ox=parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy=parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX= Math.abs(jx-ox);
    offsetY= Math.abs(jy-oy);

    // console.log(offsetX, offsetY);

    if(offsetX<93 && offsetY<52){
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni');
        

        audiogo.play();
        setTimeout(() => {
            audio.pause();
        }, 1000);

        //jerry's dead animation
        jerryAni = document.querySelector('.jerry');
        jerryAni.classList.add('jerryAni');
        jerryAni.style.bottom=-150+"px";
    }

    else if(offsetX<145 && cross){
        score=score+1;
        updateScore(score);
        cross=false;
        setTimeout(() => {
            cross=true;
        }, 1000);

        //speedup obstcle
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);
    }

}, 100);

function updateScore(score){
    scoreCount.innerHTML="Your Score: "+score
}