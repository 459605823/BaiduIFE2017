addloadEvent(prepareTextarea);

function prepareTextarea(){
  var textArea = document.getElementById("text");
  var insert = document.getElementById("insert");
  var search = document.getElementById("search");
  var searchText = document.getElementById("search-text");
  var queue = document.getElementById("queue");
  insert.onclick = function(){
    var value = textArea.value;
    words = value.replace(/[^0-9a-zA-Z]/g, ' ');//
    var arr = words.split(' ');//
    for(var i=0;i<arr.length;i++){
      var list = document.createElement("li");
      list.innerHTML = arr[i];
      queue.appendChild(list);
    }
  }
  search.onclick = function(){
    var lists = document.getElementsByTagName("li");
    var searchValue = searchText.value;
    for(var i=0;i<lists.length;i++){
      if(lists[i].firstChild.nodeValue.search(searchValue) != -1){//实现模糊匹配（当search()方法返回值不为-1时说明匹配
        lists[i].className = "choosed";
      }
    }
  }
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
