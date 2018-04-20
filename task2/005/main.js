addloadEvent(prepareInput);

function prepareInput(){
  var leftEnter = document.getElementById("left-enter");
  var rightEnter = document.getElementById("right-enter");
  var leftLeave = document.getElementById("left-leave");
  var rightLeave = document.getElementById("right-leave");
  var numInput = document.getElementById("num-input");
  var queue = document.getElementById("queue");
  var reorder = document.getElementById("reorder");
  function insert(dir){
    if(numInput.value == ""){
      alert('请输入需要输入的值');
      numInput.focus();
    }else if(isNaN(numInput.value)){
      alert("只能输入数字");
      numInput.value = "";
      numInput.focus();
    }else if(numInput.value<10 || numInput.value>100){
      alert("只能输入10-100之间的数字");
      numInput.value = "";
      numInput.focus();
    }else if(queue.getElementsByTagName("li").length>=60){
      alert("队列元素数量最多为60个");
      return false;
    } else {
      var list = document.createElement("li");
      var num = Math.round(numInput.value);
      var ptox = num*1.8+"px";
      list.innerHTML = numInput.value;
      list.style.paddingTop = ptox;
      list.setAttribute("onclick", "clickdel(this)");//在创建li时为其添加onclick事件，不用之后在进行遍历操作
      if(dir === "left"){
        queue.insertBefore(list,queue.firstChild);//当传入参数为left时，将该项添加到ul的第一个后代之前
      }
      if(dir === "right"){
        queue.appendChild(list);//当传入参数为right时，将该项添加到ul的最后一个元素
      }
    }
  }
  function del(direction){
        if(queue.childNodes.length<=0){
            alert("不存在元素可以删除");
            return false;
        } else{
            if(direction === "left"){  //点击左侧按钮删除
                alert("删除数字：" +queue.firstChild.innerText +"！");
                queue.removeChild(queue.firstChild);
            } else if(direction === "right"){  //点击右侧按钮删除
                alert("删除数字：" +queue.lastChild.innerText +"！");
                queue.removeChild(queue.lastChild);
            }
        }
    }
  function re(){
    var arr = [];
    var lists = document.getElementsByTagName("li");
    for(var i=0;i<lists.length;i++){
      arr.push(lists[i].firstChild.nodeValue);//遍历所有的li，将其值传入arr数组中
    }
   arr.sort(function(a,b){
     return a-b;//使用sort对arr从小到大排序
   })
   for(var i=0;i<lists.length;i++){
     var num = Math.round(arr[i]);
     var ptox = num*1.8+"px";
     lists[i].style.paddingTop = ptox;//按照排序好的数值重新为li设置padding-top值
   }
  }
  leftEnter.onclick = function(){
    insert("left");
  }
  rightEnter.onclick = function(){
    insert("right");
  }
  leftLeave.onclick = function(){
    del("left");
  }
  rightLeave.onclick = function(){
    del("right");
  }
  reorder.onclick = function(){
    re();
  }
}

function clickdel(divNode) {
  var pNode = divNode.parentNode;
  pNode.removeChild(divNode);
}
function addloadEvent(func){
  var oldonload = window.onload;
  if(typeof window.onload != 'function'){
    window.onload = func;
  }else {
    window.onload = function(){
      oldonload();
      func();
    }
  }
}
