window.onload = slideNav;

function slideNav(){
  var lists = document.getElementsByClassName("li-item");
  lists[0].onmouseover = function(){
    moveElement("list-bottom",0,52,10);  
}
    lists[1].onmouseover = function(){
      moveElement("list-bottom",110,52,10);
  }
   lists[2].onmouseover = function(){
    moveElement("list-bottom",220,52,10);
}
lists[3].onmouseover = function(){
  moveElement("list-bottom",330,52,10);
}
lists[4].onmouseover = function(){
  moveElement("list-bottom",440,52,10);
}
}

function moveElement(elementID,final_x,final_y,interval){
  if(!document.getElementById(elementID))return false;
  var elem = document.getElementById(elementID);
  if(elem.movement){
    clearTimeout(elem.movement);
  }//如果元素具有movement属性，则清楚队列中的事件
  if(!elem.style.left){
    elem.style.left = "0px";
  }//如果不存在left值，则将其初始化为0px;
  if(!elem.style.top){
    elem.style.top = "0px";
  }//如果不存在top值，则将其初始化为0px;
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  var dist = 0;
  //获取当前位置并将其变成整数
  if(xpos==final_x && ypos==final_y)return true;
 //第十章194页
  if(xpos < final_x){
    dist = Math.ceil((final_x - xpos)/10);
    xpos = xpos + dist;
  }
  if(xpos > final_x){
    dist = Math.ceil((xpos - final_x)/10);
    xpos = xpos - dist;
  }
  if(ypos < final_y){
    dist = Math.ceil((final_y - ypos)/10);
    ypos = ypos + dist;
  }
  if(ypos > final_y){
    dist = Math.ceil((ypos - final_y)/10);
    ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  //逐步变化并将其最终值赋给元素
  var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")"//将再次调用函数储存在变量中
  elem.movement = setTimeout(repeat,interval);
}
