window.onload = function(){
  prepareButton();
  chooseDiv();//为什么将其放在prepareButton函数中不行
}

var root =document.getElementById('wrapper');//根节点
var treenodes = [];//用来存放遍历出来的节点
var timer = null;
var arr = [];

//为不同按钮绑定事件
function prepareButton(){
  document.getElementById('preorder').onclick = function() {//前序遍历按钮
  reset();
  preOrder(root);
  changeColor();
  }

document.getElementById('postorder').onclick = function() {//后序遍历按钮
  reset();
  postOrder(root);
  changeColor();
  }
document.getElementById("preorder-search").onclick = function(){//前序查询按钮
  //为什么将searchText声明在prepareButton函数内部外部都不行
  var searchText = document.getElementById("search-text").value;
  reset();
  preOrder(root);
  if(searchText != ""){//如果存在查询项，则执行查询函数
    changeColor(searchText);
  }else{
    alert("请输入查询项");
  }
 }
document.getElementById("postorder-search").onclick = function(){//后序查询按钮
  var searchText = document.getElementById("search-text").value;
  reset();
  postOrder(root);
  if(searchText != ""){//如果存在查询项，则执行查询函数
    changeColor(searchText);
  }else{
    alert("请输入查询项");
  }
 }
 document.getElementById("stop").onclick = function(){
   reset();
 }
 document.getElementById("delete").onclick = function(){//删除按钮
   var choosedDiv = document.getElementsByClassName('choosed')[0];//获取类名为choosed的元素
   if(choosedDiv){//如果该元素存在则删除该节点
     var pNode = choosedDiv.parentNode;
     pNode.removeChild(choosedDiv);
   }
   chooseDiv();//删除节点后，为新节点树的所有节点重新绑定点击事件
 }
 document.getElementById("insert").onclick = function(){//添加按钮
  var choosedDiv = document.getElementsByClassName('choosed')[0];//获取类名为choosed的元素
   if(choosedDiv){//如果该元素存在则向该节点中添加子节点
     var inputTxt = document.getElementById("input-node").value;
     var insertTxt = document.createTextNode(inputTxt);
     var insertDiv = document.createElement("div");
     insertDiv.appendChild(insertTxt);
     choosedDiv.appendChild(insertDiv);
   }
   chooseDiv();//添加节点后，为新节点树的所有节点重新绑定点击事件
 }
}

//间隔改变背景颜色和改变符合查询项节点背景颜色函数
function changeColor(txt){
  var i = 0;
    //如果当前元素与查询项匹配，则改变其背景颜色
  if(treenodes[i].firstChild.nodeValue.indexOf(txt) > -1){
    treenodes[i].style.backgroundColor = "#f00";
  }else{//否则进行正常遍历动画
    treenodes[i].style.backgroundColor = "blue";//改变按照当前遍历方法的第一个节点的背景颜色
      timer = setInterval(function(){
      i++;//每间隔一次使i递增
      if(i<treenodes.length){
        treenodes[i-1].style.backgroundColor = "white";//恢复父节点背景颜色
        if(treenodes[i].firstChild.nodeValue.indexOf(txt) > -1){//再次判断:如果当前元素与查询项匹配，则改变其背景颜色
          treenodes[i].style.backgroundColor = "#f00";
           clearInterval(timer);//如果匹配则取消遍历动画
        }else{
          treenodes[i].style.backgroundColor = "blue";//否则进行正常遍历动画
        }
      }else{//当遍历完所有节点后，取消遍历动画，回复最后一个节点的背景颜色
        clearInterval(timer);
        treenodes[treenodes.length - 1].style.backgroundColor = "white";
        if(txt != null){//没有找到时提示信息
          alert("未找到该字符");
          return;
        }
      }
    },200)
  }
}
//重置函数
function reset(){
  treenodes = [];//每次遍历结束后清空数组
  clearInterval(timer);
  var divs = document.getElementsByTagName("div");
  for(var i=0;i<divs.length;i++){
    divs[i].style.backgroundColor = 'white';
  }
}
function preOrder(node){//前序遍历
  if(node !== null){
  treenodes.push(node);
  for(var i=0;i<node.childElementCount;i++){
        preOrder(node.children[i]);
  }
 }
}

function postOrder(node){//后序遍历
  if(node !== null){
    for(var i=0;i<node.childElementCount;i++){
          postOrder(node.children[i]);
    }
    treenodes.push(node);
  }
}
//为所有节点绑定点击事件
function chooseDiv(){
  preOrder(root);//将所有节点按前序遍历顺序储存到treenodes中
  arr = treenodes.slice();//将类数组treenodes实例为arr
  arr.forEach(function(e){
    e.onclick = function(e){
      stopBubble();//阻止事件冒泡，防止触发父元素事件
      clearClass('choosed');//再次点击时取消所有其他节点的choosed类
      addClass(this,'choosed');//为当前节点添加choosed类
    }
  })
}

function stopBubble(e){//阻止事件冒泡，防止触发父元素事件
　if(e&&e.stopPropagation){//非IE
　e.stopPropagation();
 }
　else{//IE
　window.event.cancelBubble = true;
}
}
function addClass(element,value){//封装的addClass函数
  if(!element.className){
    element.className = value;
  }else{
    var newClassName = element.className;
    newClassName += ' ';
    newClassName += value;
    element.className = newClassName;
  }
}
function removeClass(element,value){//封装的removeClass函数
  if(element.className.indexOf(value) != -1){//当当前节点存在value类时
    var newClassName = element.className;
    newClassName = newClassName.replace(value,'');//去除当前节点的value类名
    element.className = newClassName;
  }
}
function clearClass(value) {
    arr.forEach(function (e) {
        removeClass(e, value);
    })
}
