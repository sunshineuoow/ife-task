var inputNum = document.getElementById('inputNum'),
    sortSpeed = document.getElementById('sortSpeed'),
    content = document.getElementById('content');

//  左入
function leftIn() {
    if (inputNum.value <= 100 && inputNum.value >= 10) {
        if (content.childNodes.length < 60) {
            var newItem = document.createElement('li');
            newItem.setAttribute('title', inputNum.value);
            newItem.style.height = inputNum.value + 'px';
            newItem.innerHTML = inputNum.value;
            content.insertBefore(newItem, content.childNodes[0]);
            inputNum.value = '';
        }
        else {
            alert('已经满60个数字啦,无法添加!');
        }
    }
    else {
        alert('请输入10-100之内的数字!');
        return false;
    }
}

//  右入
function rightIn() {
    if (inputNum.value <= 100 && inputNum.value >= 10) {
        if (content.childNodes.length < 60) {
            var newItem = document.createElement('li');
            newItem.setAttribute('title', inputNum.value);
            newItem.style.height = inputNum.value + 'px';
            newItem.innerHTML = inputNum.value;
            content.appendChild(newItem);
            inputNum.value = '';
        }
        else {
            alert('已经满60个数字啦,无法添加!');
        }
    }
    else {
        alert('请输入10-100之内的数字!');
        return false;
    }
}

//  左出
function leftOut() {
    if(content.childNodes.length == 0){
        alert('已经没有数字啦,无法删除!');
    }
    else{
        var li = content.childNodes[0];
        alert('删除节点' + li.innerHTML);
        content.removeChild(li);
    }
}

//  右出
function rightOut() {
    if(content.childNodes.length == 0){
        alert('已经没有数字啦,无法删除!');
    }
    else{
        var li = content.lastChild;
        alert('删除节点' + li.innerHTML);
        content.removeChild(li);
    }
}

//  随机60个数字
function random(){
    var html = '';
    for(var i = 0; i < 60; i++){
        // var newItem = document.createElement('li');
        // var textNode = Math.random() * 90 + 10;
        // console.log(textNode);
        // newItem.innerHTML = textNode;
        // newItem.setAttribute('title',textNode);
        // content.appendChild(newItem);
        var x = Math.floor(Math.random() * 90 + 10);
        html += "<li style='height:" + x + "px;transition:all .5s;' title=' + x + '>" + x + "</li>";
    }
    content.innerHTML = html;
}

//  排序
function sort(){
    var list = content.childNodes,
        len = list.length,
        i = 0,
        j = len - 1,
        speed = 10,
        inputSpeed = sortSpeed.value;
    if(inputSpeed.match(/^[1-9]\d/)){
        sortSpeed = inputSpeed;
    }
    //  先挑出最大的数

    // function sortNum(){
    //     if(i < j){
    //         list[i].style.backgroundColor = 'red';
    //         if(parseInt(list[i].innerHTML) > parseInt(list[i+1].innerHTML)){
    //             var temp = list[i];
    //             list[i] = list[i+1];
    //             list[i+1] = temp;
    //             list[i].style.backgroundColor = '#0F0';
    //             content.insertBefore(list[i+1],list[i]);
    //             i++;
    //             setTimeout(sortNum,speed);
    //         }
    //         else{
    //             i++;
    //             list[i].style.backgroundColor = '#0F0';
    //             setTimeout(sortNum,speed);
    //         }
    //     }
    //     else{
    //         list[j].style.backgroundColor = '#000';
    //         j--;
    //         i = 0;
    //         setTimeout(sortNum,speed);
    //     }
    // }

    function sortNum(){
        if(i < len){
            if(i < j){
                list[j].style.backgroundColor = '#F00';
                if(parseInt(list[j].innerHTML) < parseInt(list[j - 1].innerHTML)){
                    var temp = list[j];
                    list[j] = list[j - 1];
                    list[j - 1] = temp;
                    list[j].style.backgroundColor = '#0F0';
                    content.insertBefore(list[j],list[j - 1]);
                    j--;
                }
                else{
                    j--;
                    list[j].style.backgroundColor = '#0F0';
                }
                setTimeout(sortNum,speed);
            }
            else{
                i++;
                list[j].style.backgroundColor = '#000';
                j = len - 1;
                setTimeout(sortNum,speed);
            }
        }
    }
    setTimeout(sortNum,speed);
}

//  添加点击事件
document.getElementById('leftIn').addEventListener('click', leftIn, false);
document.getElementById('rightIn').addEventListener('click', rightIn, false);
document.getElementById('leftOut').addEventListener('click',leftOut,false);
document.getElementById('rightOut').addEventListener('click',rightOut,false);
document.getElementById('random').addEventListener('click',random,false);
document.getElementById('sort').addEventListener('click',sort,false)
document.getElementById('refresh').addEventListener('click',function(){
    content.innerHTML = '';
    sortSpeed.value = '';
    inputNum.value = '';
},false)