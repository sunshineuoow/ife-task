var text = document.getElementById("inputText");
var content = document.getElementById("content");
var speed = document.getElementById("sortSpeed");
var allNumber = 0;
var numberNum = 0;
//  左入
function inputLeftIn(){
    if(allNumber == 1){
        alert("已经随机选择60个数字,无法添加数字");
        return false;
    }
    else if(!text.value.match(/^[0-9]*$/)){
            alert("请输入数字");
            return false;
        }
    else if(parseInt(text.value) < 10 || parseInt(text.value) > 100){
            alert("请输入10-100内的数字");
            return false;
        }
    else if(numberNum == 60){
        alert("已经凑够60个数字,不能再添加");
        return false;
    }
    var x = parseInt(text.value);
    var newItem = document.createElement("li");
    newItem.innerHTML = x;
    newItem.style.height = x + "px";
    newItem.title = x;
    content.insertBefore(newItem,content.childNodes[0]);
    numberNum += 1;
}

//  右入
function inputRightIn(){
    if(allNumber == 1){
        alert("已经随机选择60个数字,无法添加数字");
        return false;
    }
    else if(!text.value.match(/^[0-9]*$/)){
        alert("请输入数字");
        return false;
    }
    else if(parseInt(text.value) < 10 || parseInt(text.value) > 100){
        alert("请输入10-100内的数字");
        return false;
    }
    else if(numberNum == 60){
        alert("已经凑够60个数字,不能再添加");
        return false;
    }
    var x = parseInt(text.value);
    var newItem = document.createElement("li");
    newItem.innerHTML = x;
    newItem.style.height = x + "px";
    newItem.title = x;
    content.appendChild(newItem);
    numberNum += 1;
}

//  左出
function inputLeftOut(){
    if(numberNum == 0){
        alert("未添加数字,无法删除");
        return false;
    }
    content.removeChild(content.firstChild);
}
//  右出
function inputRightOut(){
    if(numberNum == 0){
        alert("未添加数字,无法删除");
        return false;
    }
    content.removeChild(content.lastChild);
}
//  随机60个
function randomNum(){
    var html = "";
    for(var i = 1; i < 61; i++){
        var x = Math.floor(Math.random() * 90 + 10);
        html += "<li style='height:" + x + "px;transition:all .5s;' title=" + x +">" + x + "</li>";
    }
    content.innerHTML = html;
    allNumber = 1;
}

//  排序
function sort() {
    var Li = content.childNodes;
    var j = Li.length - 1;
    var i = 0;
    // var temp;
    var speed = 10;
    var sortSpeed = document.getElementById("sortSpeed").value;
    if (sortSpeed.match(/^[1-9]\d/)) {
        speed = sortSpeed;
    }
//     NodeList无法通过数组方式通过角标互换来实现指针的互换
//    实现了排序方法,但是无法实现可视化
//     (function () {
//         while(j > 0){
//             for(var i = 0; i < j; i++ ){
//                 console.log(Li[i]);
//                 if(parseInt(Li[i].innerHTML) > parseInt(Li[i+1].innerHTML) ){
//                     // 使用下三行语句并不能实现地址互换，只能通过insertBefore()方法将两者位置互换
//                     // temp = Li[i];
//                     // Li[i] = Li[i + 1];
//                     // Li[i + 1] = Li[i];
//                     content.insertBefore(Li[i + 1],Li[i]);
//                 }
//             }
//             j--;
//         }
//         return Li;
//     })();
// }

    function timer() {
        if (i < Li.length) {
            // 若没有else语句,i变量变为Li.length之后就不会进行判断了,因此需要重新对i进行赋值
            // 如果需要从右到左遍历,并且先固定最小值位置,需要将j设置为变量
            // 如果需要从左到右遍历,并且先固定最大值位置,需要将i设置为变量
            // 通过计时器调用自身来实现规定速度排序,其思想参考匀速动画
            if (j > i) {
                Li[j].style.backgroundColor = "red";
                if (parseInt(Li[j].innerHTML) < parseInt(Li[j - 1].innerHTML)) {
                    Li[j].style.backgroundColor = "#00FF00";
                    content.insertBefore(Li[j], Li[j - 1]);
                    setTimeout(timer, speed);
                    j--;
                }
                else {
                    j--;
                    Li[j].style.backgroundColor = "#00FF00";
                    setTimeout(timer, speed);
                }
            }
            else {
                i++;
                Li[j].style.backgroundColor = "#000";
                j = Li.length - 1;
                setTimeout(timer, speed);
            }
        }
    }
    setTimeout(timer, speed);
}

//  刷新页面
function refresh(){
    //即重新加载页面
    // location.reload();
    content.innerHTML = "";
    allNumber = 0;
}

//      点击事件
    document.getElementById("inputLeftIn").addEventListener("click",inputLeftIn,false);
    document.getElementById("inputRightIn").addEventListener("click",inputRightIn,false);
    document.getElementById("inputLeftOut").addEventListener("click",inputLeftOut,false);
    document.getElementById("inputRightOut").addEventListener("click",inputRightOut,false);
    document.getElementById("randomNum").addEventListener("click",randomNum,false);
    document.getElementById("sort").addEventListener("click",sort,false);
    document.getElementById("refresh").addEventListener("click",refresh,false);

//      思路
//      1.一共60个数字,如果点随机生成60个则无法再输入,即随机生成后将变量allName = 1;
//      2.如果从未满60个,则先判定是否输入的是数字,之后进行插入(左/右)