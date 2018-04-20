window.onload = function(){
  prepareButton();
}


function prepareButton(){
  var button = document.getElementById("button");
  var main = document.getElementById("main");
  button.onclick = function(){
    createLayer();
  }
}

function createLayer(){
  var shadow = document.createElement("div");
  shadow.id = "shadow";
  var height = document.documentElement.scrollHeight;//获取页面的真实高度，包括看不见的部分
  shadow.style.height = height + 'px';
  main.appendChild(shadow);
  var layer = document.createElement("div");
  layer.id = "layer";
  var header = document.createElement("div");
  header.id = "header";
  var txt = document.createTextNode("这是一个浮出层");
  header.innerHTML = '这是一个浮出层';
  var article = document.createElement("div");
  article.id = "article";
  var articleP = document.createElement("p");
  articleP.appendChild(txt);
  var button1 = document.createElement("button");
  var button2 = document.createElement("button");
  button1.id = "button1";
  button2.id = "button2";
  button1.innerHTML = "确定";
  button2.innerHTML = "取消";
  article.appendChild(articleP);
  article.appendChild(button1);
  article.appendChild(button2);
  layer.appendChild(header);
  layer.appendChild(article);
  main.appendChild(layer);
  turnoff(button1,layer,shadow,main);
  turnoff(button2,layer,shadow,main);
  turnoff(shadow,layer,shadow,main);
}

function turnoff(ele,tar1,tar2,parent){
  ele.onclick = function(){
    parent.removeChild(tar1);
    parent.removeChild(tar2);
  }
}
