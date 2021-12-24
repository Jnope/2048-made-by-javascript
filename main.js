var cells = []; //存储格内数值
var score =0;//储存分数值
var startx =0, starty =0;

window.onload = function(){
    //创建背景大小格子及样式
    setGameBackground();
    initiation();
}

function initiation(){//初始化
    //重置数组
    cells = [];
    for(var i =0; i<4; i++){
        cells[i] = [];
        for(var j=0; j<4; j++){
            cells[i][j] = [0, false];
        }
    }
    //分数变为0
    score = 0;
    //随机两个随机格子产生数
    randomNumber();
    randomNumber();
    //更新数组及格子颜色
    update();
}

function randomNumber(){//产生随机数
    //接收空格
    var blankCells = [];
    var k = 0;
    for(var i =0; i<4; i++){
        for(var j =0; j<4; j++){
            if (cells[i][j][0] == 0){
                blankCells[k] = [i, j];
                k +=1;
            }
        }
    }
    var blankCellsLength = blankCells.length;
    if(blankCellsLength != 0){
        var randomLocation = Math.floor(Math.random()*blankCellsLength);
        var randomNum = Math.random() < 0.5 ? 2:4;
        cells[blankCells[ randomLocation][0] ][ blankCells[randomLocation][1] ][0] = randomNum;
    }
}

window.onkeydown = function(event){//判断键盘移动
    var keyboardMove = event || window.event || arguments.callee.caller.arguments[0];
    keyboardMove.preventDefault();
    switch(keyboardMove.keyCode){
        case 37:
            moveLeft(); 
            setTimeout(gameover,200); 
            break;
        case 38:
            moveUp();
            setTimeout(gameover,200); 
            break;
        case 39:
            moveRight(); 
            setTimeout(gameover,200);
            break;
        case 40:
            moveDown(); 
            setTimeout(gameover,200);
            break;
        default:
            break;
    }
}
document.addEventListener("touchstart", function(e){
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;
});
document.addEventListener("touchmove", function(event){//防止触屏时页面滑动
    event.preventDefault();
}, {passive: false}
);
document.addEventListener("touchend", function(e){
    var moveX = e.changedTouches[0].pageX - startx;
    var moveY = e.changedTouches[0].pageY - starty;
    if(Math.abs(moveX)> cellWidth || Math.abs(moveY)> cellWidth){
        if(Math.abs(moveX) >= Math.abs(moveY)){
            if(moveX > 0){
                moveRight();
                setTimeout(gameover,200);
            }else if(moveX <0){
                moveLeft();
                setTimeout(gameover,200);
            }
        }else{
            if(moveY > 0){
                moveDown();
                setTimeout(gameover,200);
            }else if(moveY < 0){
                moveUp();
                setTimeout(gameover,200);
            }
        }
    }else{
        return;
    }

});
