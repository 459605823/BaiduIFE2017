window.onload = function(){
  prepareTable();
}

var table = document.getElementById("table");
var data = [];//初始化二维数组
var row = 3;//只算数据行的个数
//isFirst确定第几次点击,每次点击触发不同排序方式
var isFirst = true;

function prepareTable(){
  var thead = table.tHead.rows[0];
  var sortBtn = thead.cells;
  var add = document.getElementById("add");
  var del = document.getElementById("del");
  setData();
  setWrite();//为当前表格中的td设置为可编辑
  add.onclick = addTr;//为添加一行按钮绑定添加一行事件
  del.onclick = delTr;//为减少一行按钮绑定减少一行事件
  //除第一列外每列添加排序功能
  for(var i=1;i<sortBtn.length;i++){//i代表列
    //匿名立即调用函数确保传递给sortTable的i值为当前的i值
      (function(i){
        sortBtn[i].onclick = function(){//为每个排序按钮添加排序事件
          //先将数据传入data数组中再进行排序
          setWrite();
          sortTable(i,isFirst);
          //按照排序后的顺序更新表格
          updateTable();
          //第二次点击改变排序方式
          isFirst = !isFirst;
        }
    })(i);
  }
}

function setData(){
  //二维数组的行数比数据行数多一行，没有数据的第一行为空
  for (var i = 0; i < row + 1; i++) {//i为行
          data[i] = [];
      }
}

function setWrite(){
  var trs = document.getElementsByTagName("tr");
  for(var i=1;i<trs.length;i++){//i为行，j为列
    var tds = trs[i].getElementsByTagName("td");
    for(var j=0;j<tds.length;j++){
      //contentEditable = true设置当前单元格为可编辑
      tds[j].contentEditable = true;
      //将当前单元格数据存入data中
      data[i][j] = tds[j].innerText;
    }
  }
}

function updateTable(){
  var trs = document.getElementsByTagName("tr");
  for(var i=1;i<trs.length;i++){
    var tds = trs[i].getElementsByTagName("td");
    for(var j=0;j<tds.length;j++){
      //将当前单元格设置为排序后data数组中相应位置的值
      tds[j].innerText = data[i][j];
    }
  }
}

function sortTable(i,isFirst){//i代表列
  var temp;
  if(isFirst){
      for(var j=1;j<row;j++){
          for(var k=j+1;k<row+1;k++){
              if(data[k][i]>data[j][i]){
                  temp = data[k];
                  data[k] = data[j];
                  data[j] = temp;
              }
          }
      }
  }else{
      for(var j=1;j<row;j++){
          for(var k=j+1;k<row+1;k++){
              if(data[k][i]<data[j][i]){
                  temp = data[k];
                  data[k] = data[j];
                  data[j] = temp;
              }
          }
      }
  }
}

function addTr(){
  var tr = document.createElement('tr');
  tr.insertCell(0);
  tr.insertCell(1);
  tr.insertCell(2);
  tr.insertCell(3);
  tr.insertCell(4);
  table.appendChild(tr);
  row++;
  setData();
  setWrite();
}
function delTr(){
  var trs = document.getElementsByTagName("tr");
  table.deleteRow(trs.length-1);
  row--;
  setData();
  setWrite();
}
