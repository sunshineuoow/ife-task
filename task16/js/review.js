var data = {}

function addAqiData(){
    var city = document.getElementById('aqi-city-input').value;
    var air = document.getElementById('aqi-value-input').value;
    if(!city.match(/^[a-zA-z\u4e00-\u9fa5]+$/)){
        alert('城市名称必须是中英文字符!');
        return false;
    }
    if(!air.match(/^[0-9]+$/)){
        alert('空气质量指数必须是数字!');
        return false;
    }
    data[city] = air;
}

function renderAqiList(){
    var newLine = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
    for(var x in data){
        newLine += '<tr><td>' + x + '</td><td>' + data[x] +'</td><td><button>删除</button></td></tr>'
    }
    document.getElementById('aqi-table').innerHTML = newLine;
}

function addHandle(){
    addAqiData();
    renderAqiList();
}

function delBtnHandle(e){
    var city = e.parentNode.parentNode.childNodes[0].innerHTML;
    delete data[city];
    renderAqiList();
}

(function(){
   document.getElementById('add-btn').addEventListener('click',addHandle,false);
   document.getElementById('aqi-table').addEventListener('click',function(e){
       e = e || window.event;
       var target = e.target || e.srcElement;
       if(target.nodeName.toLowerCase() == 'button'){
           delBtnHandle(target);
       }
   },false)
})()