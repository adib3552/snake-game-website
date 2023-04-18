let gameBoard=document.getElementById("game_board");
let context=gameBoard.getContext("2d");
let gameScore=document.getElementById("gameScore");
let upBtn=document.getElementById("upBtn");
let downBtn=document.getElementById("downBtn");
let rightBtn=document.getElementById("rightBtn");
let leftBtn=document.getElementById("leftBtn");
let unitSize=25;
let snakeX;
let xVelocity=unitSize;
let yVelocity=0;
let snakeY;
let score=0;
let foodX;
let foodY;
let running = false;
let left=false,right=true,up=false,down=false;
let pressU=false,pressD=false,pressR=true,pressL=false;
let boardWidth=gameBoard.width;
let boardHeight=gameBoard.height;
let snake=[
    {x:unitSize*4 , y:0},
    {x:unitSize*3 , y:0},
    {x:unitSize*2 , y:0},
    {x:unitSize*1 , y:0},
    {x:0 , y:0}
]

window.addEventListener("keydown",controlSnake);
upBtn.addEventListener("click",pressUp);
downBtn.addEventListener("click",pressDown);
rightBtn.addEventListener("click",pressRight);
leftBtn.addEventListener("click",pressLeft);


function pressUp(){
    if(!pressD && !pressU){
        xVelocity=0;
        yVelocity-=unitSize;
        pressU=true;
        pressD=false;
        pressR=false;
        pressL=false;
    }
}
function pressDown(){
    if(!pressU && !pressD){
        xVelocity=0;
        yVelocity+=unitSize;
        pressU=false;
        pressD=true;
        pressR=false;
        pressL=false;
    }
}
function pressLeft(){
    if(!pressR && !pressL){
        xVelocity-=unitSize;
        yVelocity=0
        pressU=false;
        pressD=false;
        pressR=false;
        pressL=true;
    }
}
function pressRight(){
    if(!pressL &&!pressR){
        xVelocity+=unitSize;
        yVelocity=0;
        pressU=false;
        pressD=false;
        pressR=true;
        pressL=false;
    }
}

gameStart();

function gameStart(){
    running=true;
    spawnFood();
    drawFood();
    drawSnake();
    nextTick();
}
function nextTick(){
    if(running){
        setTimeout(()=>{
            checkGameOver();
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            nextTick();
            console.log(pressD);
        },100)
    }
    else{
        displayGameOver();
    }
}
function clearBoard(){
    context.fillStyle="white";
    context.fillRect(0,0,boardWidth,boardHeight);
}
function moveSnake(){
    let head={x:snake[0].x+xVelocity, y:snake[0].y+yVelocity};
    snake.unshift(head);

    if(snake[0].x==foodX && snake[0].y==foodY){
        score++;
        gameScore.innerHTML="Score: "+score;
        spawnFood();
    }
    else{
        snake.pop();
    }
    for(let i=0; i<snake.length; i++){
        if(snake[i].x==foodX && snake[i].y==foodY){
            spawnFood();
        }
    }
}
function controlSnake(event){
    let keyPress=event.keyCode;
    console.log(keyPress);
    if(keyPress==38 && !down && !up){
        yVelocity-=unitSize;
        xVelocity=0;
        up=true;
        left=false;
        right=false;
        down=false;
    }
    else if(keyPress==40 && !up && !down){
        yVelocity+=unitSize;
        xVelocity=0;
        up=false;
        left=false;
        right=false;
        down=true;
    }
    else if(keyPress==39 && !left && !right){
        xVelocity+=unitSize;
        yVelocity=0;
        up=false;
        left=false;
        right=true;
        down=false;
    }
    else if(keyPress==37 && !right && !left){
        xVelocity-=unitSize;
        yVelocity=0;
        up=false;
        left=true;
        right=false;
        down=false;
    }
}
function drawSnake(){
    context.fillStyle="black";
    context.strokeStyle="white";
    for(let i=0; i<snake.length; i++){
        context.fillRect(snake[i].x,snake[i].y,unitSize,unitSize);
        context.strokeRect(snake[i].x,snake[i].y,unitSize,unitSize);
    }
}
function checkGameOver(){
    if(snake[0].x<=0){
        running=false;
    }
    else if(snake[0].x>=boardWidth){
        running=false;
    }
    else if(snake[0].y<0){
        running=false;
    }
    else if(snake[0].y>=boardHeight){
        running=false;
    }
    for(let i=1; i<snake.length; i++){
        if(snake[0].x==snake[i].x && snake[0].y==snake[i].y){
            running=false;
            break;
        }
    }
}
function displayGameOver(){
    
}
function drawFood(){
    context.fillStyle="green";
    context.fillRect(foodX,foodY,unitSize,unitSize);
}
function spawnFood(){
    let rand=Math.round((Math.random()*((boardWidth-unitSize)-0)+0)/unitSize)*unitSize;
    console.log(rand);
    foodX=rand;
    foodY=rand;
}

