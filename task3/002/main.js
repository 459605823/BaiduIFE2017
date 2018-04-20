window.onload = function(){
  showRules();
  blurTest();
  formValidate();
}

function showRules(){
  var form = document.getElementsByTagName("form")[0];
  for(var i=0;i<form.elements.length;i++){
    var element = form.elements[i];
    if(element.type == "submit")continue;
    element.onfocus = function(){
      if(this.name == "username"){
        document.getElementById("info-username").innerHTML = "必填，长度为4-16个字符";
      }
      if(this.name == "password"){
        document.getElementById("info-password").innerHTML = "必填，长度为4-16个字符，只能输入字母和数字";
      }
      if(this.name == "password-confirm"){
        document.getElementById("info-passwordConfirm").innerHTML = "再次输入密码";
      }
      if(this.name == "email"){
        document.getElementById("info-email").innerHTML = "请输入正确的邮箱";
      }
      if(this.name == "number"){
        document.getElementById("info-number").innerHTML = "请输入手机号码";
      }
    }
  }
}

function blurTest(){
  var form = document.getElementsByTagName("form")[0];
  for(var i=0;i<form.elements.length;i++){
    var element = form.elements[i];
    element.onblur = function(){
      if(this.name == "username"){
        var usernameValue = this.value;
        var codeVal;//储存字符编码
        var sum = 0;
        var len = usernameValue.length;
        var infoUsername = document.getElementById("info-username");
          for(var i=0;i<len;i++){
            codeVal = usernameValue.charCodeAt(i);//将每个字符转化为字符编码
            if(codeVal>=0x00 && 0xFF>=codeVal){//当字符编码值在0x00-0xFF之间为英文，其余为中文
              sum++;//英文算一个字符
            }else{
              sum+=2;//中文两个字符
            }
          }
          if(sum>3 && sum<17){
           infoUsername.innerHTML = "用户名正确";
           infoUsername.style.color = "#0c66dc";
           if(infoUsername.className="error"){//多次验证时，正确后去除这时的error类
             infoUsername.className = '';
           }
           this.style.borderColor = "green";
         }else{
           infoUsername.innerHTML = "用户名错误";
           infoUsername.style.color = "red";
           infoUsername.className = "error";
           this.style.borderColor = "red";
         }
      }
      //将passswordValue设置在函数外部,防止先触发password-confirm事件时passwordValue为undefined
      var passwordValue = form["password"].value;
      if(this.name == "password"){
        var errorValue = passwordValue.match(/[^0-9a-zA-Z]/gi);//不是数字字母的其它字符
        var infoPassword = document.getElementById("info-password");
        passwordValue = passwordValue.replace(/[^0-9a-zA-Z]/gi,'');//去除所有其他字符
        if(errorValue){
          infoPassword.innerHTML = "只能输入字母和数字";
          infoPassword.style.color = 'red';
          infoPassword.className = "error";
          this.style.borderColor = "red";
        }else if(passwordValue.length>3 && passwordValue.length<17){
          infoPassword.innerHTML = "密码可用";
          infoPassword.style.color = "#0c66dc";
          if(infoPassword.className="error"){//多次验证时，正确后去除这时的error类
            infoPassword.className = '';
          }
          this.style.borderColor = "green";
        }else{
          infoPassword.innerHTML = "密码格式错误";
          infoPassword.style.color = 'red';
          infoPassword.className = "error";
          this.style.borderColor = "red";
        }
      }
      if(this.name == "password-confirm"){
        var infoPasswordConfirm = document.getElementById("info-passwordConfirm");
        if(this.value === passwordValue){
          infoPasswordConfirm.innerHTML = "密码输入一致";
          infoPasswordConfirm.style.color = "#0c66dc";
          if(infoPasswordConfirm.className="error"){//多次验证时，正确后去除这时的error类
            infoPasswordConfirm.className = '';
          }
          this.style.borderColor = "green";
        }else{
          infoPasswordConfirm.innerHTML = "请输入正确的密码";
          infoPasswordConfirm.style.color = 'red';
          infoPasswordConfirm.className = "error";
          this.style.borderColor = "red";
        }
      }
      if(this.name == "email"){
        var infoEmail = document.getElementById("info-email");
        if(this.value.indexOf("@") != -1 && this.value.indexOf(".") != -1){
          infoEmail.innerHTML = "邮箱格式正确";
          infoEmail.style.color = "#0c66dc";
          if(infoEmail.className="error"){//多次验证时，正确后去除这时的error类
            infoEmail.className = '';
          }
          this.style.borderColor = "green";
        }else{
          infoEmail.innerHTML = "邮箱格式错误";
          infoEmail.style.color = 'red';
          infoEmail.className = "error";
          this.style.borderColor = "red";
        }
      }
      if(this.name == "number"){
        var infoNumber = document.getElementById("info-number");
        var phone = this.value;
        if(phone && /^1[3|4|5|8]\d{9}$/.test(phone)){//验证手机格式
          infoNumber.innerHTML = '手机格式正确';
          infoNumber.style.color = "#0c66dc";
          if(infoNumber.className="error"){//多次验证时，正确后去除这时的error类
            infoNumber.className = '';
          }
          this.style.borderColor = "green";
        }else{
          infoNumber.innerHTML = "请输入正确的手机号码";
          infoNumber.style.color = 'red';
          infoNumber.className = "error";
          this.style.borderColor = "red";
        }
      }
    }//onblur
  }//for
}//blurTest
function formValidate(){
  var submit = document.getElementById("submit");
  submit.onclick = function(e){
   var form = document.getElementsByTagName("form")[0];
   for(var i=0;i<form.elements.length;i++){
     form.elements[i].focus();//先focus才能blur
     form.elements[i].blur();//触发所有元素的验证事件
   }
   var errors = document.querySelectorAll(".error");//获取所有含有error类的元素
   if(errors.length>0){
     alert("提交失败");
     return false;
   }else{
     alert("提交成功");
   }
   e.preventDefault();//取消元素默认行为
  }
}
