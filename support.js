screenLength = screen.availWidth < screen.availHeight ? screen.availWidth : screen.availHeight;
gameWidth = screenLength * 0.95 < 500 ? screenLength*0.95 : 500;
cellWidth = gameWidth * 0.2;
cellSpace = gameWidth * 0.04;

function setGameBackground(){//创建大小格子及样式
    //新建大框
    document.getElementById("cellcontainer").style.width = `${gameWidth}px`;
    document.getElementById("cellcontainer").style.height = `${gameWidth}px`;
    document.getElementById("cellcontainer").style.borderRadius = `${gameWidth*0.03}px`;
    document.getElementById("cellcontainer").style.marginLeft = "auto";
    document.getElementById("cellcontainer").style.marginRight = "auto";
    document.getElementById("cellcontainer").style.zIndex = "1";
    var cellContainer = document.getElementById("cellcontainer");
    for(var i =0; i<4; i++){
        for(var j =0; j<4; j++){//加入包含数字的元素
            var backCell = document.createElement("div");
            var backId = "backcell-"+i+"-"+j;
            backCell.className = "backcell"
            backCell.id = backId;
            backCell.style.zIndex = 5;
            cellContainer.appendChild(backCell);
        }
    }
    setBackgroundStyle();
}
function setBackgroundStyle(){
    var cell = document.getElementsByClassName("backcell");
    for(var i =0; i< cell.length; i++){
        cell[i].style.position = "absolute";
        cell[i].style.fontSize = `${0.5 * cellWidth}px`;
        cell[i].style.fontWeight = "bold";
        cell[i].style.color = "black";
        cell[i].style.width = `${cellWidth}px`;
        cell[i].style.height = `${cellWidth}px`;
        cell[i].style.borderRadius = `${cellWidth*0.04}px`;
        cell[i].style.lineHeight = `${cellWidth}px`;
        cell[i].style.backgroundColor = "white";
    }
    for(var i =0; i<4; i++){
        for(var j =0; j<4; j++){
            setPosition(i,j,"backcell");
        }
    }
}
function creatNumberCell(){
    var cellContainer = document.getElementById("cellcontainer");
    for(var i =0; i<4; i++){
        for(var j =0; j<4; j++){//加入包含数字的元素
            var cellId = "numbercell-"+i+"-"+j;
            var numberCell = document.createElement("div");
            numberCell.className = "numbercell"
            numberCell.id = cellId;
            numberCell.textContent = cells[i][j][0];
            numberCell.style.zIndex = 5;
            cellContainer.appendChild(numberCell);
        }
    }
}
function setNumberCell(){//设置数字格样式
    var cell = document.getElementsByClassName("numbercell");
    for(var i =0; i< cell.length; i++){
        cell[i].style.position = "absolute";
        cell[i].style.fontSize = `${0.5 * cellWidth}px`;
        cell[i].style.fontWeight = "bold";
        cell[i].style.color = "black";
        cell[i].style.width = `${cellWidth}px`;
        cell[i].style.height = `${cellWidth}px`;
        cell[i].style.borderRadius = `${cellWidth*0.04}px`;
        cell[i].style.lineHeight = `${cellWidth}px`;
    }
    for(var i =0; i<4; i++){
        for(var j =0; j<4; j++){
            setPosition(i,j,"numbercell");
        }
    }
}
function setPosition(row,col,cellstyle){//设置定位
    var top = cellSpace + (cellSpace + cellWidth) * row;
    var left = cellSpace + (cellSpace + cellWidth) * col;
    document.getElementById(`${cellstyle}-${row}-${col}`).style.top = `${top}px`;
    document.getElementById(`${cellstyle}-${row}-${col}`).style.left = `${left}px`;
}


function update(){//更新数组及格子颜色
    var cellContainer = document.getElementById("cellcontainer");
    //删除之前数字格-由于移动动画会导致格子位置变化
    var numberCellArrray = cellContainer.getElementsByClassName("numbercell");
    if(numberCellArrray.length >2){
        for(var i =0; i<4; i++){
            for(var j=0; j<4; j++){
                cellContainer.removeChild(document.getElementById(`numbercell-${i}-${j}`));
            }
        }
    }
    var cellId;
    creatNumberCell();//新建数字格
    setNumberCell();
    for(var i =0; i<4; i++){
        for(var j=0; j<4; j++){
            cells[i][j][1] = false;
            cellId = "numbercell-"+i+"-"+j;
            document.getElementById(cellId).innerHTML = cells[i][j][0];
            if(cells[i][j][0] == 0){
                document.getElementById(cellId).style.color = "white";//0颜色与方格相同
                document.getElementById(cellId).style.backgroundColor = "white";
            }else{
                document.getElementById(cellId).style.color = "black";
                switch(cells[i][j][0]){
                    case 2:
                        document.getElementById(cellId).style.backgroundColor = "gray"; break;
                    case 4:
                        document.getElementById(cellId).style.backgroundColor = "#faebd7"; break;
                    case 8:
                        document.getElementById(cellId).style.backgroundColor = "#008b8b"; break;
                    case 16:
                        document.getElementById(cellId).style.backgroundColor = "#00008b"; break;
                    case 32:
                        document.getElementById(cellId).style.backgroundColor = "#bdb76b"; break;
                    case 64:
                        document.getElementById(cellId).style.backgroundColor = "#8b008b"; break;
                    case 128:
                        document.getElementById(cellId).style.backgroundColor = "#8b4513"; break;
                    case 256:
                        document.getElementById(cellId).style.backgroundColor = "#b8860b"; break;
                    case 512:
                        document.getElementById(cellId).style.backgroundColor = "#ff8c00"; break;
                    case 1024: 
                        document.getElementById(cellId).style.backgroundColor = "#ff6347"; break;
                    case 2048:
                        document.getElementById(cellId).style.backgroundColor = "#FF0000"; 
                        gameWin(); break;
                }
            }
        }
    }
    //更新分数
    document.getElementById("grade").innerHTML = score;
}


function moveLeft(){
    //判断能否整体左移
    if( moveLeftJudge() ){//可以移动时
        for(var i =0; i<4; i++){
            for(var j=1; j<4; j++){//左移第一列不动，从2到4列逐步移动
                if(cells[i][j][0] !=0){//不为0才可能可以移动
                    for(var t =0; t<j; t++){//格子=0或等于目标格，且中间为0可以移动
                        if(cells[i][t][0] ==0 && spaceJudge(i,t,i,j,"col")){
                            moveTo(i,j,i,t);
                            cells[i][t][0] = cells[i][j][0];
                            cells[i][j][0] =0;
                        }else if(cells[i][t][0] == cells[i][j][0] && spaceJudge(i,t,i,j,"col") && !cells[i][t][1]){
                            moveTo(i,j,i,t);
                            cells[i][t][0] += cells[i][j][0];
                            cells[i][t][1] = true;
                            score += cells[i][t][0];
                            cells[i][j][0] =0;
                        }
                    }
                }
            }
        }
        setTimeout(update,60);
        setTimeout(randomNumber, 80);
        setTimeout(update, 150);
    }
}
function moveLeftJudge(){//判断能否左移
    for(var i =0; i<4; i++){
        for(var j=0; j<3; j++){
            if(cells[i][j][0] !=0 && cells[i][j+1][0] == cells[i][j][0]){//当前=右边相邻格，可以移动
                return true;
            }
            if(cells[i][j][0] ==0){//当前格=0，可能可以移动
                var adding =0;
                for(var t =j+1; t<4; t++){
                    adding += cells[i][t][0];
                    if(adding !=0){//且右边不全为0时可以移动
                        return true;
                    }
                }
            }
        }
    }
    return false; //所有格未返回ture，不能移动
}

function moveUp(){
    //判断能否整体上移动
    if( moveUpJudge() ){//可以移动时
        for(var j=0; j<4; j++){
            for(var i =1; i<4; i++){//上移第一行不动，从2到4行逐步移动
                if(cells[i][j][0] !=0){//不为0才可能需要移动
                    for(var t =0; t<i; t++){//格子=0或等于目标格，且中间为0可以移动
                        if(cells[t][j][0] ==0 && spaceJudge(t,j,i,j,"row")){
                            moveTo(i,j,t,j);
                            cells[t][j][0] =cells[i][j][0];
                            cells[i][j][0] =0;
                        }else if(cells[t][j][0] == cells[i][j][0] && spaceJudge(t,j,i,j,"row") && !cells[t][j][1]){
                            moveTo(i,j,t,j);
                            cells[t][j][1] =true;
                            cells[t][j][0] += cells[i][j][0];
                            score += cells[t][j][0];
                            cells[i][j][0] =0;
                        }
                    }
                }
            }
        }
        setTimeout(update,60);
        setTimeout(randomNumber,80);
        setTimeout(update,150);
    }
}
function moveUpJudge(){
    for(var j=0; j<4; j++){
        for(var i =0; i<3; i++){
            if(cells[i][j][0] !=0 && cells[i+1][j][0] == cells[i][j][0]){//当前=下边相邻格，可以移动
                return true;
            }
            if(cells[i][j][0] ==0){//当前格=0，可能可以移动
                var adding =0;
                for(var t =i+1; t<4; t++){
                    adding += cells[t][j][0];
                    if(adding !=0){//且右边不全为0时可以移动
                        return true;
                    }
                }
            }
        }
    }
    return false; //所有格未返回ture，不能移动
}

function moveRight(){
    //判断能否整体右移
    if( moveRightJudge() ){//可以移动时
        for(var i =0; i<4; i++){
            for(var j=2; j>=0; j--){//右移最后一列不动，从3到1列逐步移动
                if(cells[i][j][0] !=0){//不为0才可能可以移动
                    for(var t =3; t>j; t--){//格子=0或等于目标格，且中间为0可以移动
                        if(cells[i][t][0] ==0 && spaceJudge(i,j,i,t,"col")){
                            moveTo(i,j,i,t);
                            cells[i][t][0] =cells[i][j][0];
                            cells[i][j][0] =0;
                        }else if(cells[i][t][0] == cells[i][j][0] && spaceJudge(i,j,i,t,"col") && !cells[i][t][1]){
                            moveTo(i,j,i,t);
                            cells[i][t][1] = true;
                            cells[i][t][0] += cells[i][j][0];
                            score += cells[i][t][0];
                            cells[i][j][0] =0;
                        }
                    }
                }
            }
        }
        setTimeout(update,60);
        setTimeout(randomNumber,80);
        setTimeout(update,150);
    }
}
function moveRightJudge(){
    for(var i =0; i<4; i++){
        for(var j=3; j>0; j--){
            if(cells[i][j][0] !=0 && cells[i][j-1][0] == cells[i][j][0]){//当前=左边相邻格，可以移动
                return true;
            }
            if(cells[i][j][0] ==0){//当前格=0，可能可以移动
                var adding =0;
                for(var t =0; t<j; t++){
                    adding += cells[i][t][0];
                    if(adding !=0){//且右边不全为0时可以移动
                        return true;
                    }
                }
            }
        }
    }
    return false; //所有格未返回ture，不能移动
}

function moveDown(){
    //判断能否整体下移
    if( moveDownJudge() ){//可以移动时
        for(var j=0; j<4; j++){
            for(var i =2; i>=0; i--){//下移最后一行不动，从3到1行逐步移动
                if(cells[i][j][0] !=0){//不为0才可能需要移动
                    for(var t =3; t>i; t--){//格子=0或等于目标格，且中间为0可以移动
                        if(cells[t][j][0] ==0 && spaceJudge(i,j,t,j,"row")){
                            moveTo(i,j,t,j);
                            cells[t][j][0] =cells[i][j][0];
                            cells[i][j][0] =0;
                        }else if(cells[t][j][0] == cells[i][j][0] && spaceJudge(i,j,t,j,"row") && !cells[t][j][1]){
                            moveTo(i,j,t,j);
                            cells[t][j][1] = true;
                            cells[t][j][0] += cells[i][j][0];
                            score += cells[t][j][0];
                            cells[i][j][0] =0;
                        }
                    }
                }
            }
        }
        setTimeout(update,60);
        setTimeout(randomNumber,80);
        setTimeout(update,150);
    }
}
function moveDownJudge(){
    for(var j=0; j<4; j++){
        for(var i =3; i>0; i--){
            if(cells[i][j][0] !=0 && cells[i-1][j][0] == cells[i][j][0]){//当前=上边相邻格，可以移动
                return true;
            }
            if(cells[i][j][0] ==0){//当前格=0，可能可以移动
                var adding =0;
                for(var t =0; t<i; t++){
                    adding += cells[t][j][0];
                    if(adding !=0){//且右边不全为0时可以移动
                        return true;
                    }
                }
            }
        }
    }
    return false; //所有格未返回ture，不能移动
}


function spaceJudge(row1,col1,row2,col2,judge){//判断中间格是否为空
    if(judge == "row"){
        for( var i =row1+1; i<row2; i++){//判断行间是否为空
            if(cells[i][col1][0] !=0){
                return false;
            }
        }
        return true;
    }else{
        for( var j =col1+1; j<col2; j++){//判断列间是否为空
            if(cells[row1][j][0] !=0){
                return false;
            }
        }
        return true;
    }
}
function gameover(){//判断是否结束
    if(noCell()){
        if (!moveLeftJudge() && !moveUpJudge()&& !moveRightJudge()&& !moveDownJudge()){
            window.alert(`Game Over !\n your score: ${score}`);
            initiation();
        }
    }
}
function noCell(){//判断是否有空格
    for(var i =0; i<4; i++){
        for(var j=0; j<4; j++){
           if(cells[i][j][0] == 0){
               return false;
           }
        }
    }
    return true;
}

function gameWin(){//判断是否赢得游戏
    setTimeout(window.alert(`you win ! \n score: ${score}`),300);
    initiation();
}

function moveTo(row1,col1,row2,col2){//动画，实现数字格移动
    var cellNeedMove = document.getElementById(`numbercell-${row1}-${col1}`);
    var oldTop = cellSpace + (cellSpace + cellWidth) * row1;
    var oldLeft = cellSpace + (cellSpace + cellWidth) * col1;
    var newTop = cellSpace + (cellSpace + cellWidth) * row2;
    var newLeft = cellSpace + (cellSpace + cellWidth) * col2;
    var disTop = newTop - oldTop;
    var disLeft = newLeft - oldLeft;
    var tempCell = document.createElement("div");
    tempCell.style.left = oldLeft;
    tempCell.style.top = oldTop;
    tempCell.style.backgroundColor = "white";
    clearInterval(timer1);
    var timer1 = setInterval(function(){
        var currentTop = cellNeedMove.offsetLeft;
        var currentLeft = cellNeedMove.offsetLeft;
        if(disTop ==0){
            if(disLeft >0){
                currentLeft += 5;
            }else{
                currentLeft -= 5;
            }
            if(Math.abs(newLeft - currentLeft) > 5){
                cellNeedMove.style.left = newLeft+"px";
            }else{
                clearInterval(timer1);
                cellNeedMove.style.left = newLeft+"px";
            }
        }else{
            if(disTop >0){
                currentTop += 5;
            }else{
                currentTop -= 5;
            }
            if(Math.abs(newTop - currentTop) > 5){
                cellNeedMove.style.top = newTop+"px";
            }else{
                clearInterval(timer1);
                cellNeedMove.style.top = newTop+"px";
            }
        }
    }, 20);
}
