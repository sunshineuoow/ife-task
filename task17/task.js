/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
// 随机rgb颜色
function randomColor(){
    //数组中间元素使用逗号隔开,而不是分号
    var color = {
        r: Math.floor(Math.random() * 255),
        g: Math.floor(Math.random() * 255),
        b: Math.floor(Math.random() * 255)
    }
    return color.r + ',' + color.g + ',' + color.b;
}

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var chart_wrap = document.getElementById('aqi-chart-wrap');
    var now_select_city = pageState["nowSelectCity"];
    var now_gra_time = pageState["nowGraTime"];
    var graData = chartData[now_gra_time][now_select_city];
    var style = "style = 'width:{width}; height:{height}; background-color:rgba({color},0.6)'";
    var title = "title = {title}的空气质量指数为:{data}";
    var module = "<div " + style +title + "><span>{date}</span></div>"
    var html = "";
    for (var x in graData){
        html += module.replace('{width}' , graData[x]['width']).replace('{height}',graData[x]['height']).replace('{color}',graData[x]['color']).replace('{title}' , graData[x]['title']).replace('{data}', graData[x]['data']).replace('{date}', graData[x]['date']);
    }
    console.log(chart_wrap);
    chart_wrap.innerHTML = html;
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
    // 确定是否选项发生了变化
    if(pageState["nowGraTime"] == e.target.value){
        return false;
    }
    // 设置对应数据
    pageState["nowGraTime"] = e.target.value;
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(e) {
    // 确定是否选项发生了变化
    if(pageState["nowSelectCity"] == e.target.value){
        return false;
    }
    // 设置对应数据
    pageState["nowSelectCity"] = e.target.value;
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var form_gra_time = document.getElementById("form-gra-time");
    form_gra_time.addEventListener("change",graTimeChange,false);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var result = "";
    for (var city in aqiSourceData){
        result += "<option>" + city + "</option>"
    }
    var city_select = document.getElementById('city-select');
    city_select.innerHTML = result;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    city_select.addEventListener("change",citySelectChange,false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var day = {};
    var week = {};
    var weekNum = 1;
    var weekDays = 0;
    var weekTotal = 0;
    var month = {};
    var monthNum = 1;
    var monthTotal = 0;

    for(var city in aqiSourceData) {
        day[city] = {};
        week[city] = {};
        month[city] = {};
        for (var date in aqiSourceData[city]) {
            var sourceData = aqiSourceData[city][date];
            //存储每天的数据,并将其赋值给
            var dayGet = {};
            dayGet['data'] = sourceData;
            dayGet['height'] = sourceData * 0.75 + 'px';
            dayGet['width'] = '14px';
            dayGet['color'] = randomColor();
            dayGet['title'] = city + date;
            var dayAbbr = date.slice(8, 10);
            dayGet['date'] = dayAbbr;
            day[city][date] = dayGet;
            weekTotal += sourceData;
            // 将一周数据存到week中,并且判断每7天统计一次;
            if (weekDays == 7 || date == '2016-03-31') {
                var weekData = (weekTotal / 7).toFixed(2);
                var key = "第" + weekNum + "周";
                var weekGet = {};
                weekGet['data'] = weekData;
                weekGet['height'] = weekData * 0.75 + "px";
                weekGet['width'] = '50px';
                weekGet['color'] = randomColor();
                weekGet['title'] = city + key;
                weekGet['date'] = key;
                week[city][key] = weekGet;
                weekTotal = 0;
                weekDays = 0;
                weekNum++;
            }
            weekDays++;
        monthTotal += sourceData;
        if (date == '2016-01-31' || date == '2016-03-31' || date == '2016-02-29') {
            if (date == '2016-02-29') {
                var monthData = (monthTotal / 29).toFixed(2);
            }
            else {
                var monthData = (monthTotal / 31).toFixed(2);
            }
            var key = "第" + monthNum + "月";
            var monthGet = {};
            monthGet['data'] = monthData;
            monthGet['height'] = monthData * 0.75 + "px";
            monthGet['width'] = '50px';
            monthGet['color'] = randomColor();
            monthGet['title'] = city + key;
            monthGet['date'] = key;
            month[city][key] = monthGet;
            monthTotal = 0;
            monthNum++;
            }
        }
        monthNum = 1;
        weekNum = 1;
    }
    chartData.day = day;
    chartData.week = week;
    chartData.month = month;
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
    if( pageState["nowSelectCity"] == -1){
        pageState["nowSelectCity"] = "北京";
        renderChart();
    }
}

init();