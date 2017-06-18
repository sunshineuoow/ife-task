/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById('aqi-city-input').value;
    var air = document.getElementById('aqi-value-input').value;
    if (!city.match(/^[a-zA-Z\u4e00-\u9fa5]+$/)) {
        alert("城市名称必须是中英文字符!");
        return false;
    }
    if (!air.match(/^[0-9]+$/)) {
        alert("空气质量指数必须是数字!");
        return false;
    }
    aqiData[city] = air;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var newLine = "<tr><td>城市</td><td>空气质量</td><td>操作</td>";
    for( var city in aqiData) {
        newLine += "<tr><td>" + city + "</td><td>" + aqiData[city] + "</td><td><button>删除</button></td></tr>";
    }
    document.getElementById('aqi-table').innerHTML = newLine;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(a) {
    // do sth.
    var cityName = a.parentNode.parentNode.childNodes[0].innerHTML;
    delete aqiData[cityName];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById('add-btn').addEventListener("click",addBtnHandle,false);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementById('aqi-table').addEventListener("click",function(e){
        //在del函数中是找不到function(e)中的target参数的
        // 所以需要将这个参数设置为全局变量即target = e.target;
        //或者给del函数定义一个参数,然后在function(e)中调用del函数时直接将e.target作为参数导入del函数
        // target = e.target;
        if(e.target.nodeName.toLowerCase() == "button"){
            delBtnHandle(e.target);
        }
    },false);
}

init();
