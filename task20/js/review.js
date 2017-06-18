var info = document.getElementById('info'),
    searchInfo = document.getElementById('searchInfo'),
    content = document.getElementById('content');

//  正则过滤
function getRegExp(){
    var value = info.value.replace(/\W+/g, " ").split(" ");
    if(value[0] !== ""){
        return value;
    }
    else{
        alert('请先输入内容!');
        return false;
    }
}

//  左进
function leftIn(){
    var list = getRegExp();
    for(var i = 0, len = list.length; i < len; i++){
        if(list[i] != false){
            var newItem = document.createElement('li');
            newItem.innerHTML = list[i];
            content.insertBefore(newItem,content.childNodes[0]);
        }
    }
}

//  右进
function rightIn(){
    var list = getRegExp();
    for(var i = 0, len = list.length; i < len; i++){
        if(list[i] != false){
            var newItem = document.createElement('li');
            newItem.innerHTML = list[i];
            content.appendChild(newItem);
        }
    }
}

//  左出
function leftOut(){
    var li = content.childNodes[0];
    if(content.childNodes.length == 0){
        alert('已经没有内容了,无法删除!');
    }
    else{
        alert('删除节点' + li.innerHTML);
        content.removeChild(li);
    }
}

//  右出
function rightOut(){
    var li = content.lastChild;
    if(content.childNodes.length == 0){
        alert('已经没有内容了,无法删除!');
    }
    else{
        alert('删除节点' + li.innerHTML);
        content.removeChild(li);
    }
}

//  查询,并实现模糊查询效果
function search(){
    var str = searchInfo.value;
    var reg = new RegExp(str);
    var list = content.childNodes;
    for(var i = 0, len = list.length; i < len; i++){
        list[i].style.backgroundColor = '';
        list[i].style.color = '';
        if(reg.test(list[i].innerHTML)){
            list[i].style.backgroundColor = '#FFFF00';
            list[i].style.color = '#000';
        }
    }
}

//  添加点击事件
document.getElementById('leftIn').addEventListener('click',leftIn,false);
document.getElementById('rightIn').addEventListener('click',rightIn,false);
document.getElementById('leftOut').addEventListener('click',leftOut,false);
document.getElementById('rightOut').addEventListener('click',rightOut,false);
document.getElementById('search').addEventListener('click',search,false);
document.getElementById('reset').addEventListener('click',function(){
    info.value = '';
    searchInfo.value = '';
    content.innerHTML = '';
},false)