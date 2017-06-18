function FormFactory(name,type,func,rules,success,fail) {
    this.label = name;
    this.type = type;
    this.validator = func;
    this.rules = rules;
    this.success = success;
    this.fail = fail;
}

var checkFactory = {
    name: function () {
        function getLength(str) {
            var countLength = 0;
            for (var i = 0; i < str.length; i++) {
                var char_code = str.charCodeAt(i);
                if (char_code >= 0 && char_code <= 128) {
                    countLength += 1;
                }
                else {
                    countLength += 2;
                }
            }
            return countLength;
        };
        var name_info = document.getElementsByClassName("name");
        for (var i = 0; i < name_info.length; i++) {
            name_info[i].onblur = function (e) {
                if (e.target.value == "") {
                    e.target.nextElementSibling.setAttribute("class", "rules");
                    e.target.setAttribute("class", "rules");
                    e.target.nextElementSibling.innerHTML = name_input.rules;
                }
                else if (getLength(e.target.value) < 4 || getLength(e.target.value) > 16) {
                    e.target.nextElementSibling.setAttribute("class", "fail");
                    e.target.setAttribute("class", "fail");
                    e.target.nextElementSibling.innerHTML = name_input.fail;

                }
                else {
                    e.target.nextElementSibling.setAttribute("class", "success");
                    e.target.setAttribute("class", "success");
                    e.target.nextElementSibling.innerHTML = name_input.success;
                }
            }
        }
    },
    password: function () {
        var password_info = document.getElementsByClassName("password");
        for (var i = 0; i < password_info.length; i++) {
            password_info[i].onblur = function (e) {
                if (e.target.value != "") {
                    e.target.nextElementSibling.setAttribute("class", "success");
                    e.target.setAttribute("class", "success");
                    this.nextElementSibling.innerHTML = password_input.success;
                }
                else {
                    e.target.nextElementSibling.setAttribute("class", "rules");
                    e.target.setAttribute("class", "rules");
                    this.nextElementSibling.innerHTML = password_input.rules;
                }
            }
        }
    },
    password_confirm: function () {
        var password_confirm_info = document.getElementsByClassName("password_confirm");
        for (var i = 0; i < password_confirm_info.length; i++) {
            password_confirm_info[i].onblur = function () {
                if (this.value != "") {
                    if (this.parentNode.previousElementSibling.childNodes[1].value === this.value) {
                        this.nextElementSibling.setAttribute("class", "success");
                        this.setAttribute("class", "success");
                        this.nextElementSibling.innerHTML = password_confirm_input.success;
                    }
                    else {
                        this.nextElementSibling.setAttribute("class", "fail");
                        this.setAttribute("class", "fail");
                        this.nextElementSibling.innerHTML = password_confirm_input.fail;
                    }
                }
                else {
                    this.nextElementSibling.setAttribute("class", "rules");
                    this.setAttribute("class", "rules");
                    this.nextElementSibling.innerHTML = password_confirm_input.rules;
                }
            }
        }
    },
    email: function () {
        var email_info = document.getElementsByClassName("email");
        for (var i = 0; i < email_info.length; i++) {
            email_info[i].onblur = function (e) {
                if (this.value != "") {
                    var regExp = /^[a-z0-9]([a-z0-9]*[-_]?[a-z0-9}]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2}?$)/;
                    if (regExp.test(this.value)) {
                        this.nextElementSibling.setAttribute("class", "success");
                        this.setAttribute("class", "success");
                        this.nextElementSibling.innerHTML = email_input.success;
                    }
                    else {
                        this.nextElementSibling.setAttribute("class", "fail");
                        this.setAttribute("class", "fail");
                        this.nextElementSibling.innerHTML = email_input.fail;
                    }
                }
                else {
                    this.nextElementSibling.setAttribute("class", "rules");
                    this.setAttribute("class", "rules");
                    this.nextElementSibling.innerHTML = email_input.rules;
                }
            }
        }
    },
    phone: function(){
        var phone_info = document.getElementsByClassName("phone");
        for(var i = 0; i < phone_info.length; i++){
            phone_info[i].onblur = function(){
            if(this.value != ""){
                var regExp = /^1[3|4|5|8][0-9]\d{8}$/i;
                if(regExp.test(this.value)){
                    this.nextElementSibling.setAttribute("class", "success");
                    this.setAttribute("class", "success");
                    this.nextElementSibling.innerHTML = phone_input.success;
                }
                else{
                    this.nextElementSibling.setAttribute("class", "fail");
                    this.setAttribute("class", "fail");
                    this.nextElementSibling.innerHTML = phone_input.fail;
                }
            }
            else{
                this.nextElementSibling.setAttribute("class", "rules");
                this.setAttribute("class", "rules");
                this.nextElementSibling.innerHTML = phone_input.rules;
            }
        }
    }
    }
}

// 根据Label设置的类名,检测函数寻找的是类名,所以label应当书写的是类名
var name_input = new FormFactory("name","text",checkFactory.name,"必填,长度为4-16个字符","名称格式正确","长度只能为4-16个字符");
var password_input = new FormFactory("password","password",checkFactory.password,"请输入密码","密码可用","请输入密码");
var password_confirm_input = new FormFactory("password_confirm","password",checkFactory.password_confirm,"再次输入密码","密码输入一致","密码输入不一致");
var email_input = new FormFactory("email","email",checkFactory.email,"输入您的邮箱","邮箱格式正确","邮箱格式错误");
var phone_input = new FormFactory("phone","text",checkFactory.phone,"输入您的手机号码","手机格式正确","手机格式错误");

var inputArray = [name_input, password_input, password_confirm_input, email_input, phone_input];
var labelTranslate = {
    account: "名称",
    password: "密码",
    confirm_password: "确认密码",
    mail: "邮箱",
    phone: "手机号码"
}
var checkboxArray = ["account","password","confirm_password","mail","phone"];

// 如果不使用for-in循环对所有的input回调其对应的检测方法,结果每个添加的表单无法实现检测
var count = [];
function renderForm(){
    var html = "";
    for(var i = 0; i < checkboxArray.length; i++){
        if(document.getElementById(checkboxArray[i]).checked == true){
            var check_name = checkboxArray[i];
            html += "<div><label for='" + inputArray[i].label + "'>" + labelTranslate[check_name] + "</label><input type='" + inputArray[i].type + "' class='" + inputArray[i].label + "' /><p>" + inputArray[i].rules + "</p></div>"
            count.push(inputArray[i]);
        }
    }
    html = "<div class='factory'>" + html +"</div>"
    document.getElementById("form").innerHTML += html;

    for(var x in count){
        count[x].validator();
    }
}

//  添加事件
document.getElementById("create").addEventListener("click",renderForm,false);
document.getElementById("reset").addEventListener("click",function(){
    document.getElementById("form").innerHTML = "";
},false)

//  思路如下
//  1.首先将检测函数都封装到一个对象中,作为方法调用
//  2.将需要写入一个表单中各种元素(label,input,p)的属性封装到一个函数中
//  3.使用构造函数的方法将属性和方法导入到一个对象中,并且将这些对象组成一个数组
//  4.将每个复选框的id保存为一个数组,并且用于for循环判断是否被选中,如果被选中则用对应角标的对象属性和方法进行表单内容的填充
//  5.之后需要遍历每个表单中添加的各种input标签,并且对其添加失去焦点事件;