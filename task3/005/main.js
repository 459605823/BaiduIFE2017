/*
GO：向蓝色边所面向的方向前进一格（一格等同于正方形的边长）
TUN LEF：向左转（逆时针旋转90度）
TUN RIG：向右转（顺时针旋转90度）
TUN BAC：向后转（旋转180度）
移动不能超出格子空间
确定方向:值=旋转的角度%90
0：方向向上
1：方向向右
2：方向向下
3：方向向左
*/
window.onload = function(){
  preparemovement();
}

function preparemovement(){
  var action = document.getElementById("do");
  var dir = 0;
  var square = document.getElementById("square");
  action.onclick = function(){
  var controlText = document.getElementById("control-text").value;
  var top = parseInt(square.style.top);
  var left = parseInt(square.style.left);
  if(!controlText){
    alert('请输入指令');
  }
  switch(controlText){
    case 'GO':
    movesquare(square,dir);
    break;
    case 'TUN LEF':
    dir = changeRotate(square,270);//向左转为顺时针旋转270度
    break;
    case 'TUN RIG':
    dir = changeRotate(square,90);//向右转为顺时针旋转90度
    break;
    case 'TUN BAC':
    dir = changeRotate(square,180);//向后转为顺时针旋转180度
    break;
    case 'TRA LEF':
    if(left==50){
      left = 50;
    }else{
      left = left-50;
    }
    square.style.left = left+"px";
    break;
    case 'TRA TOP':
    if(top==50){
      top = 50;
    }else{
      top = top-50;
    }
    square.style.top = top+"px";
    break;
    case 'TRA RIG':
    if(left==500){
      left = 500;
    }else{
      left = left+50;
    }
    square.style.left = left+"px";
    break;
    case 'TRA BOT':
    if(top==500){
      top = 500;
    }else{
      top = top+50;
    }
    square.style.top = top+"px";
    break;
    case 'MOV LEF':
    square.style.transform = 'rotate(-90deg)';
    setTimeout(function() {
      if (left > 50) {
          left -= 50;
          square.style.left = left + 'px';
          }
        }, 1000);
    break;
    case 'MOV TOP':
    square.style.transform = 'rotate(0deg)';
    setTimeout(function() {
      if (top > 50) {
          top -= 50;
          square.style.top = top + 'px';
          }
        }, 1000);
    break;
    case 'MOV RIG':
    square.style.transform = 'rotate(90deg)';
    setTimeout(function() {
      if (left < 500) {
          left += 50;
          square.style.left = left + 'px';
          }
        }, 1000);
    break;
    case 'MOV BOT':
    square.style.transform = 'rotate(180deg)';
    setTimeout(function() {
      if (top < 500) {
          top += 50;
          square.style.top = top + 'px';
          }
        }, 1000);
    break;
  }
  }
}
function movesquare(ele,dir){
  /* 直接通过ele.style.top只能获取内部样式，并返回为字符串
  使用ele.offsetLeft可以获取所有样式，并且直接返回数值
  */
  var top = parseInt(ele.style.top);
  var left = parseInt(ele.style.left);
	switch(dir){
		case 0 : //向上
			if(top>50)
      top = top-50;
			break;
		case 1 : //向右
			if (left<500)
				left = left+50;
			break;
		case 2 ://向下
			if (top<500)
				top += 50;
			break;
		case 3://向左
			if (left > 50)
				left -= 50;
			break;
	}
	ele.style.top = top +"px";
	ele.style.left = left + "px";
}
function changeRotate(ele,deg){
  if(!ele.style.transform){//如果第一次旋转，则可以直接旋转
    ele.style.transform = "rotate("+deg+"deg)";
    return (deg%360)/90;
  }else{
    var trans = ele.style.transform;
    var olddeg = trans.match(/\d/g).join("")/1;//join("")将匹配出来的单个数字拼接为整个数字，除以1将拼接出来的字符串变为数字
    var newdeg = olddeg+deg;
    if(newdeg>360){//当旋转度数大于360时，将其控制在360以内
      newdeg -= 360;
    }
      ele.style.transform = "rotate("+newdeg+"deg)";
      return (newdeg%360)/90;
    }
}
