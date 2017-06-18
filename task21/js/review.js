var tagText = document.getElementById('tag_text'),
    hobbyText = document.getElementById('inputHobby'),
    tagContent = document.getElementById('tag_content'),
    hobbyContent = document.getElementById('hobby_content');

//  添加tag
(function(){
    var tagArr = [];
    function addTag(e) {
        e = e || window.event;
        var lastChar = tagText.value.charAt(tagText.value.length - 1);
        if((tagText.value == ' ') || (tagText.value == ',')){
            alert('请输入内容');
            tagText.value = '';
            return false;
        }
        if ((e.keyCode == 13) || (e.keyCode == 32) || (lastChar == ',') || (lastChar == ', ')) {
            var value = tagText.value;
            if (value.charAt(value.length - 1).toString() == ',') {
                value = value.slice(0, value.length - 1);
            }
            value = trim(value);
            tagArr.push(value);
            tagArr = unique(tagArr);
            tagText.value = '';
            tagContent.innerHTML = '';
            for(var i = 0, len = tagArr.length; i < len; i++){
                var item = document.createElement('li');
                item.innerHTML = tagArr[i];
                item.addEventListener('mouseover', showInfo, false);
                item.addEventListener('mouseout', hideInfo, false);
                item.addEventListener('click', delBth, false);
                tagContent.appendChild(item);
            }
            if(tagContent.childNodes.length > 10){
                tagArr.shift();
                delFirst(tagContent);
            }
        }
    }
    window.addTag = addTag;
})()

tagText.onkeyup = function(){
    addTag(event);
}

//  添加hobby
function addHobby(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        var item = document.createElement('li');
        item.innerHTML = arr[i];
        item.addEventListener('mouseover', showInfo, false);
        item.addEventListener('mouseout', hideInfo, false);
        item.addEventListener('click', delBth, false);
        hobbyContent.appendChild(item);
    }
    hobbyText.value = '';
    if (hobbyContent.childNodes.length > 10) {
        delFirst(hobbyContent);
    }
}
//  显示信息
function showInfo(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    target.innerHTML = '点击删除' + target.innerHTML;
    target.style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
}
//  隐藏信息
function hideInfo(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    target.innerHTML = target.innerHTML.slice(4);
    target.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
}

//  删除li
function delBth(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    hobbyContent.removeChild(target);
}

//  个数超过十个删除第一个
function delFirst(arr) {
    arr.removeChild(arr.childNodes[0]);
    if (arr.length > 10) {
        delFirst(arr);
    }
}
//  正则过滤
function getRegExp() {
    // \W = [^0-9a-zA-Z_]
    var str = trim(hobbyText.value);
    var value = str.replace(/[^a-zA-z0-9\u4e00-\u9fa5]+/g, ' ').split(' ');
    if (value[0] !== '') {
        var hobbyList = [];
        for (var i = 0, len = hobbyContent.childNodes.length; i < len; i++) {
            var txt = hobbyContent.childNodes[i].innerHTML;
            hobbyList.push(txt);
        }
        hobbyList = hobbyList.concat(value);
        hobbyList = unique(hobbyList);
        hobbyContent.innerHTML = '';
        addHobby(hobbyList);
    }
}

//  trim处理
function trim(str) {
    var regexp1 = /^\s*/;
    var regexp2 = /\s*$/;
    return (str.replace(regexp1, '')).replace(regexp2, '');
}

//  去重
function unique(arr) {
    var result = [],
        json = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        if (!json[arr[i]]) {
            result.push(arr[i]);
            json[arr[i]] = 1;
        }
    }
    return result;
}

//  添加点击事件
document.getElementById('submit').addEventListener('click', getRegExp, false);
document.getElementById('reset').addEventListener('click', function () {
    tagContent.innerHTML = '';
    hobbyContent.innerHTML = '';
}, false)
