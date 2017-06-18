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
    }
})();

var robot = document.getElementById('robot-box'),
    cmdBtn = document.getElementById('command_button'),
    tLeft = document.getElementById('command_left'),
    tRight = document.getElementById('command_right'),
    tBack = document.getElementById('command_back');
var deg = 0,
    face = 0, //    规定朝向,0上 1右 2下 3 左
    xPos = 50,
    yPos = 50;

var RobotBox = {
    go: function(){
        var commandInput = document.getElementById('command');
        face = face % 4;
        switch(commandInput.value){
            case "":
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
                break;
            case "TUN RIG":
                RobotBox.turnRight();
                break;
            case "TUN BAC":
                RobotBox.turnBack();
                break;
            default:
                alert("在输入框中允许输入如下指令,TUN LEF: 向左转,TUN RIG:向右转,TUN BAC:向后转,不填任何质量则默认向头朝方向前进一格")
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
    }
}

cmdBtn.addEventListener("click",RobotBox.go,false);
tLeft.addEventListener("click",RobotBox.turnLeft,false);
tRight.addEventListener("click",RobotBox.turnRight,false);
tBack.addEventListener("click",RobotBox.turnBack,false);