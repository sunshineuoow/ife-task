var inputTag = document.getElementById("tag"),
    inputText = document.getElementById("text_interest"),
    tag = document.getElementById("tag"),
    confirmBtn = document.getElementById("confirmBtn"),
    resetBtn = document.getElementById("resetBtn"),
    tag_content = document.getElementById("tag_content"),
    area_content = document.getElementById("area_content");

// 添加tag
var tag_arr=[];
function addTag(event){
    var e = event || window.event,
        lastChar = inputTag.value.charAt(inputTag.value.length-1);
    if((inputTag.value == " ") || (inputTag.value == ",") || (inputTag.value == "，")){
        alert("请输入内容!");
        inputTag.value = "";
        return false;
    }
    if((e.keyCode == 13) || (e.keyCode == 32) || (lastChar == ",") || (lastChar == "，")){
        var value = inputTag.value;
        if(value.charAt(value.length - 1).toString() == ","){
            value = value.slice(0, value.length - 1);
        }
        value = trim(value);
        tag_arr.push(value);
        var tag_li_num = tag_content.childNodes;
        tag_content.innerHTML = "";
        tag_arr = tag_arr.unique();
        for(var i = 0; i < tag_arr.length; i++){
            if(tag_arr[i] != ""){
                var newItem = document.createElement("li"),
                    textNode = document.createTextNode(tag_arr[i]);
                newItem.appendChild(textNode);
                tag_content.appendChild(newItem);
                newItem.setAttribute('title',tag_arr[i]);
                newItem.setAttribute('onmouseover','showInfo()');
                newItem.setAttribute('onmouseout','hideInfo()');
                inputTag.value = "";
                tag_content.childNodes[i].addEventListener("click",delBth,false)
            }
        }
        if( tag_li_num.length > 10){
            delete01d(tag_content);
        }
    }
}
tag.onkeyup = function(){
    addTag(event) ;
}
// li的删除函数
function delBth(e){
    var e = e || window.event,
        target = e.target || e.srcElement;
    var remove = target.parentNode.removeChild(target);
    for(var i = 0; i < tag_arr.length; i++){
        if(remove.title == tag_arr[i]){
            tag_arr.splice(i,i+1);
        }
    }
};

// 超过十个删除第一个节点的函数
function delete01d(e){
    e.removeChild(e.childNodes[0]);
    tag_arr.shift();
}

// 添加interest
function addInterest(value){
    var area_li_num = area_content.childNodes;
    for(var i = 0; i < value.length; i++){
        if(value != ""){
            var newItem = document.createElement("li"),
                textNode = document.createTextNode(value[i]);
            newItem.appendChild(textNode);
            area_content.appendChild(newItem);
            newItem.setAttribute('title',value[i]);
            newItem.setAttribute('onmouseover','showInfo()');
            newItem.setAttribute('onmouseout','hideInfo()');
            inputText.value = "";
            area_content.childNodes[i].addEventListener("click",delBth,false);
        }
    }
    if(area_li_num.length > 10){
        delete01d(area_content);
    }
}

// 正则过滤
function getRegExp(){
    function getValue(){
        var text = trim(inputText.value),
            value = text.replace(/[^\d\u4e00-\u9fa5a-zA-Z]+/g," ").split(" ").unique();
        // addInterest(value);
        //  使用tag的方法也能够将相同的内容排除
        if(value[0] !== ""){
            addInterest(value);
            var area_content_li = area_content.getElementsByTagName("li"),
                temp_arr = [];
            for(var i = 0; i < area_content_li.length; i++){
                temp_arr.push(area_content_li[i].innerHTML);
                value = temp_arr.unique();
            }
            area_content.innerHTML = "";
            addInterest(value);
        }
        else{
            alert("请先输入内容");
            return false;
        }
    }
    getValue();
}

// 显示删除
function showInfo(e){
    var e = e || window.event;
    e.target.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
    e.target.innerHTML = "点击删除" + e.target.innerHTML;
};

// 隐藏删除
function hideInfo(e){
    var e = e|| window.event;
    e.target.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    e.target.innerHTML = e.target.innerHTML.slice(4,e.target.innerHTML.length);
};

//  重置按钮
function resetInfo(){
    tag_arr = [];
    tag_content.innerHTML = "";
    area_content.innerHTML = "";

}
// 删除数组中重复项
Array.prototype.unique = function(){
    var res = [],
        json = {};
    for(var i = 0; i < this.length; i++){
        if(!json[this[i]]){
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
}

// 删除左右两边的空格
function trim(str){
    var regex1 = /^\s*/,
        regex2 = /\s*$/;
    return(str.replace(regex1,"")).replace(regex2,"");
}

// 添加事件
confirmBtn.addEventListener("click",getRegExp,false);
resetBtn.addEventListener("click",resetInfo,false);