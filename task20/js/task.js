var text = document.getElementById("inputText");
var content = document.getElementById("content");
var num = 0;
//  正则过滤
function getRegExp(){
    var value = text.value.replace(/[^\d\u4e00-\u9fa5a-zA-Z]+/g, " ").split(" ");
    if(value[0] !== ""){
        return value;
    }
    else{
        alert("请输入点文字");
        return false;
    }
}

//  左入
function inputLeftIn(){
    getRegExp();
    if(num == 60){
        alert("已经满60个,无法再添加啦!");
        return false;
    }
    var newItem = document.createElement("li");
    newItem.innerHTML = text.value;
    console.log(newItem);
    content.insertBefore(newItem,content.childNodes[0]);
    num++;
}
//  右入
function inputRightIn(){
    getRegExp();
    if(num == 60){
        alert("已经满60个,无法再添加啦!");
        return false;
    }
    var newItem = document.createElement("li");
    newItem.innerHTML = text.value;
    content.appendChild(newItem);
    num++;
}
//  左出
function inputLeftOut(){
    alert("删除最左边节点:" + content.childNodes[0].innerHTML);
    content.removeChild(content.firstChild);
    num--;
}
//  右出
function inputRightOut(){
    alert("删除最右边节点:" + content.childNodes[content.childNodes.length - 1].innerHTML);
    content.removeChild(content.childNodes[content.childNodes.length - 1]);
    num--;
}
//  给所有的li添加点击删除事件
content.addEventListener("click",function(e){
    content.removeChild(e.target);
},false);
// 查询按钮
function searchItem() {
    var Li = content.childNodes;
    var inputText = document.getElementById("inputSearch").value;
    for (var i = 0; i < Li.length; i++) {
        Li[i].style.backgroundColor = "";
        Li[i].style.color = "";
        if (Li[i].innerHTML == inputText) {
            Li[i].style.backgroundColor = "#FFFF00";
            Li[i].style.color = "#000";
        }
    }
}
//  重置按钮
function reset(){
    text.value = "";
    content.innerHTML = "";
}
//  点击事件
document.getElementById("inputLeftIn").addEventListener("click",inputLeftIn,false);
document.getElementById("inputRightIn").addEventListener("click",inputRightIn,false);
document.getElementById("inputLeftOut").addEventListener("click",inputLeftOut,false);
document.getElementById("inputRightOut").addEventListener("click",inputRightOut,false);
document.getElementById("search").addEventListener("click",searchItem,false);
document.getElementById("reset").addEventListener("click",reset,false);
