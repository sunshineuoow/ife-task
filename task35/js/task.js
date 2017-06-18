(function createTable(){
    var table = document.getElementById('table');
    var tr_arr = [];
    for(var i = 0; i < 11; i++){
        tr_arr[i] = document.createElement('tr');
        table.appendChild(tr_arr[i]);
        for(var j = 0; j < 11; j++){
            var td_arr = [];
            td_arr[j] = document.createElement('td');
            tr_arr[i].appendChild(td_arr[j]);
            if(i == 0){
                td_arr[j].setAttribute("class","clear-border")
                if(j > 0){
                    td_arr[j].innerHTML = j;
                }
            }
            if(j == 0){
                td_arr[0].setAttribute("class","clear-border")
                if(i > 0){
                    td_arr[0].innerHTML = i;
                }
            }
        }
        document.getElementById('command_input').value = "MOV RIG 3 \nmoV bot 3\nMOV lef 1\ntra bot 2";
        updateLineNum();
    }
})();

var robot = document.getElementById('robot-box'),
    cmdBtn = document.getElementById('command_button'),
    command_input = document.getElementById('command_input');
var deg = 0,
    face = 0, //    规定朝向,0上 1右 2下 3 左
    xPos = 50,
    yPos = 50;

//  指令执行函数
var RobotBox = {
    go: function(str, line_num){
        var li = document.getElementById('command_display_count').getElementsByTagName('li');
        li[line_num].style.borderRadius = '10px';
        face = face % 4;
        switch(str){
            case "GO":
                switch(face){
                    case 0:
                        if(yPos > 50){
                            yPos -= 50;
                            robot.style.top = yPos + "px";
                        }
                        break;
                    case 1:
                        if(xPos < 500){
                            xPos += 50;
                            robot.style.left = xPos + "px";
                        }
                        break;
                    case 2:
                        if(yPos < 500){
                            yPos += 50;
                            robot.style.top = yPos + "px";
                        }
                        break;
                    default:
                        if(xPos > 50){
                            xPos -= 50;
                            robot.style.left = xPos + "px";
                        }
                        break;
                }
                break;
            case "TUN LEF":
                RobotBox.turnLeft();
                li[line_num].style.backgroundColor = '#7fadda';
                break;
            case "TUN RIG":
                RobotBox.turnRight();
                li[line_num].style.backgroundColor = '#7fadda';
                break;
            case "TUN BAC":
                RobotBox.turnBack();
                li[line_num].style.backgroundColor = '#7fadda';
                break;
            case "TRA TOP":
                RobotBox.transTop();
                li[line_num].style.backgroundColor = '#7fadda';
                break;
            case "TRA RIG":
                RobotBox.transRight();
                li[line_num].style.backgroundColor = '#7fadda';
                break;
            case "TRA BOT":
                RobotBox.transBottom();
                li[line_num].style.backgroundColor = '#7fadda';
                break;
            case "TRA LEF":
                RobotBox.transLeft();
                li[line_num].style.backgroundColor = '#7fadda';
                break;
            case "MOV TOP":
                RobotBox.moveTop();
                li[line_num].style.backgroundColor = '#7fadda';
                break;
            case "MOV RIG":
                RobotBox.moveRight();
                li[line_num].style.backgroundColor = '#7fadda';
                break;
            case "MOV BOT":
                RobotBox.moveBottom();
                li[line_num].style.backgroundColor = '#7fadda';
                break;
            case "MOV LEF":
                RobotBox.moveLeft();
                li[line_num].style.backgroundColor = '#7fadda';
                break;
            default:
                li[line_num].style.backgroundColor = '#7fadda';
        //         alert("在输入框中允许输入如下指令,TUN LEF: 向左转,TUN RIG:向右转,TUN BAC:向后转,不填任何质量则默认向头朝方向前进一格")
                break;
        }
    },
    turnLeft: function(){
        face = face % 4;
        deg -= 90;
        robot.style.transform = "rotate(" + deg + "deg)";
        face += 3;
    },
    turnRight: function(){
        face = face % 4;
        deg += 90;
        robot.style.transform = "rotate(" + deg + "deg)";
        face ++;
    },
    turnBack: function(){
        face = face % 4;
        deg += 180;
        robot.style.transform = "rotate(" + deg + "deg)";
        face += 2;
    },
    transTop: function(){
        if(yPos > 50){
            yPos -= 50;
            robot.style.top = yPos + "px";
        }
    },
    transRight: function(){
        if(xPos < 500){
            xPos += 50;
            robot.style.left = xPos + "px";
        }
    },
    transBottom: function(){
        if(yPos < 500){
            yPos += 50;
            robot.style.top = yPos + "px";
        }
    },
    transLeft: function(){
        if(xPos > 50){
            xPos -= 50;
            robot.style.left = xPos + "px";
        }
    },
    moveTop: function(){
        if(face != 0){
            var little = setInterval(function(){
                RobotBox.turnLeft();
                face = face % 4;
                if(face == 0){
                    clearInterval(little);
                }
            },100)
            setTimeout(RobotBox.transTop,1000);
        }
        else{
            setTimeout(RobotBox.transTop,1000);
        }
    },
    moveRight: function(){
        if(face != 1){
            var little = setInterval(function(){
                RobotBox.turnLeft();
                face = face % 4;
                if(face == 1){
                    clearInterval(little);
                }
            },100)
            setTimeout(RobotBox.transRight,1000);
        }
        else{
            setTimeout(RobotBox.transRight,1000);
        }
    },
    moveBottom: function(){
        if(face != 2){
            var little = setInterval(function(){
                RobotBox.turnLeft();
                face = face % 4;
                if(face == 2){
                    clearInterval(little);
                }
            },100)
            setTimeout(RobotBox.transBottom,1000);
        }
        else{
            setTimeout(RobotBox.transBottom,1000);
        }
    },
    moveLeft: function(){
        if(face != 3){
            var little = setInterval(function(){
                RobotBox.turnLeft();
                face = face % 4;
                if(face == 3){
                    clearInterval(little);
                }
            },100)
            setTimeout(RobotBox.transLeft,1000);
        }
        else{
            setTimeout(RobotBox.transLeft,1000);
        }
    }
}

//  输入框区域函数

//  正则分隔内容框内容,添加数字
function enchanceCommand(str){
    var filter = /\n/g;
    var inputArr = str.split(filter);
    return inputArr;
}

// 渲染左边表格行数
function renderLineNum(count){
    var command_display_count = document.getElementById('command_display_count');
    command_display_count.innerHTML = "";
    for(var i = 1; i <= count; i++){
        var li = document.createElement("li");
        var txt = document.createTextNode(i);
        li.appendChild(txt);
        command_display_count.appendChild(li);
    }
}

//  更新现在的行数
function updateLineNum(){
    (function activeEnter(){
      var command_input = document.getElementById('command_input');
      var line_num = command_input.value;
      line_num.match(/\n/g) ? renderLineNum(line_num.match(/\n/g).length + 1): renderLineNum(1);
    })()
}

//  执行函数
function render(){
    var inputArr = enchanceCommand(command_input.value);
    var x = 0;
    var conmmand_input = '';
    (function bigLoop(){
       if(x < inputArr.length){
           var times = "";
           if(inputArr[x].slice(0,2).toUpperCase() == "GO"){
               conmmand_input = "GO";
               times = inputArr[x].slice(3) ? parseInt(inputArr[x].slice(8)) : 1;
           }
           else if(inputArr[x] == ""){
               conmmand_input = "blank";
               times = 1;
           }
           else {
               conmmand_input = inputArr[x].slice(0,7);
               times = inputArr[x].slice(8) ? parseInt(inputArr[x].slice(8)) : 1;
           }
           if(isNaN(times)){
               alert('输入次数有误,请规范书写!');
           }
           var i = 0;
           console.log(times);
           function finaLoop(){
               if(i < times){
                   RobotBox.go(conmmand_input.toUpperCase(),x);
                   setTimeout(finaLoop,1000);
                   i++
               }
               else{
                   x++;
                   setTimeout(bigLoop,1000);
               }
           }
           finaLoop();
       }
    })()
}

//  添加事件
command_input.addEventListener("keyup",updateLineNum,false);
cmdBtn.addEventListener("click",render,false);
document.getElementById("clean_button").addEventListener("click",function(){
    command_input.value = "";
    updateLineNum();
},false);
document.getElementById("refresh_button").addEventListener("click",function(){
    // command_input.value = "MOV RIG 3 \nmoV bot 3\nMOV lef 1\ntra bot 2";
    // updateLineNum();
    location.reload();
    },false);

function keyEvent(e){
    var oEvt = e || window.event;
    var oObj = oEvt.target || oEvt.srcElement;
    var currKey = e.keyCode || e.which || e.charCode;
    switch(currKey){
        case 37:
            RobotBox.transLeft();
            break;
        case 38:
            RobotBox.transTop();
            break;
        case 39:
            RobotBox.transRight();
            break;
        case 40:
            RobotBox.transBottom();
            break;
        default:
            break;
    }
}
window.onkeydown = keyEvent;