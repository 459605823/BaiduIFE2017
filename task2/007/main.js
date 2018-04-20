window.onload = prepareButton();


var root =document.getElementById('wrapper');//根节点
var treenodes = [];//用来存放遍历出来的节点
var timer = null;

//为不同按钮绑定事件
function prepareButton(){
  document.getElementById('preorder').onclick = function() {//前序查询按钮
  reset();
  preOrder(root);
  changeColor();
}

document.getElementById('inorder').onclick = function() {//中序查询按钮
  reset();
  inOrder(root);
  changeColor();
}

document.getElementById('postorder').onclick = function() {//后序查询按钮
  reset();
  postOrder(root);
  changeColor();
}
document.getElementById("stop").onclick = function(){
  reset();
}
}
//间隔改变背景颜色函数
function changeColor(){
  var i = 0;
  treenodes[i].style.backgroundColor = "blue";//改变按照当前遍历方法的第一个节点的背景颜色
    timer = setInterval(function(){
    i++;//每间隔一次使i递增
    if(i<treenodes.length){//当i小于所有元素总数时，改变当前元素背景颜色，回复其父节点的背景颜色
      treenodes[i].style.backgroundColor = "blue";
      treenodes[i-1].style.backgroundColor = "white";
    }else{//当遍历完所有节点后，取消遍历动画，回复最后一个节点的背景颜色
      clearInterval(timer);
      treenodes[treenodes.length - 1].style.backgroundColor = "white";
      return;
    }
  },500)
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
  preOrder(node.firstElementChild);
  preOrder(node.lastElementChild);
}
}
function inOrder(node){//中序遍历
  if(node !== null){
    inOrder(node.firstElementChild);
    treenodes.push(node);
    inOrder(node.lastElementChild);
  }
}
function postOrder(node){//后序遍历
  if(node !== null){
    postOrder(node.firstElementChild);
    postOrder(node.lastElementChild);
    treenodes.push(node);
  }
}
