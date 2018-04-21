//==============================
// bug
// 再为音量条和进度条绑定函数时若不将this值作为参数传入函数，
// 函数中的this将被绑定到window上
//==============================
//学习到的代码
//使用鼠标事件的pageX属性获得点击位置，并结合进度条元素本身的offsetLeft属性获得点击的进度的百分比：
// var volumePercent=(e.pageX-getSummaryOffsetLeft(target))/target.offsetWidth;
// var pastProgressPercent= (e.pageX-getSummaryOffsetLeft(target))/target.offsetWidth;
//================================
$(document).ready(function(){
prepareBtns();
prepareMyAudio();
})
//===================================
//全局变量
var myAudio = $('#myAudio')[0];
var playListObj={
    currentSongId:0,
    songName:['Time','Holiday','Feelings'],
    singerName:['MKJ','Green Day','Maroon 5'],
    songSrc:['http://link.hhtjim.com/163/33035611.mp3',
             'http://link.hhtjim.com/163/18127593.mp3',
             'http://link.hhtjim.com/163/29019232.mp3'],
    albumCoverSrc:['time.jpg','holiday.jpg','feelings.jpg']
}
//===================================
//事件绑定函数
function prepareMyAudio(){
  myAudio.src=playListObj.songSrc[playListObj.currentSongId];
  myAudio.oncanplay = function(){//只有监听canplay事件后才能显示总时长
    changeInfo();
  }
  myAudio.onended = function(){
    nextSongFunc();
  }
  myAudio.ontimeupdate = function(){
    updateCurrentTime();
    changeProgressWidth((myAudio.currentTime/myAudio.duration).toFixed(4));//保留4位小数
  }
}
function prepareBtns(){
  var $play = $('#play');
  var $next = $('#next');
  var $pre = $('#pre');
  var $lbicon = $(".icon-liebiaoxunhuan");
  var $syicon = $("#volume");
  var $volumeSpan = $(".volume");
  var $volumeBarWrapper = $("#volume-bar-wrapper");
  var volumeBarWrapper = $volumeBarWrapper[0];
  var $volumeBar = $('#volume-bar');
  var progressBar = document.querySelector(".progress-bar");
  $play.click(function(){
    var $logo = $('#logo');
      pauseBtnFunc(myAudio);
      switchClass($(this),"icon-zanting","icon-bofang");
      logoControlFunc($logo);
  })
  $next.click(function(){
    nextSongFunc();
  })
  $pre.click(function(){
    preSongFunc();
  })
  $lbicon.click(function(){
    switchClass($(this),"icon-liebiaoxunhuan","icon-danquxunhuan");
    toggleAttr($(myAudio),"loop","loop");
  })
  $syicon.click(function(){
   switchClass($(this),"icon-shengyin","icon-jingyin");
   toggleMute(myAudio,$volumeBar);
   })
  $volumeSpan.mouseover(function(){
    $volumeBarWrapper.width("150px");
  }).mouseout(function(){
    $volumeBarWrapper.width("0px");
  })
   progressBar.onclick = function(){
     progressBarControlFunc(this);
   }
   volumeBarWrapper.onclick = function(){
     volumeBarControlFunc(this);
   }
}
//==================================
//功能函数
function changeInfo(){//改变歌曲信息函数
  var currentSongId = playListObj.currentSongId;
  var $songName = $('.song-name');
  var $singerName = $('.singer-name');
  var $logo = $("#logo");
  $songName.html(playListObj.songName[currentSongId]);
  $singerName.html(playListObj.singerName[currentSongId]);
  $logo.attr("src",playListObj.albumCoverSrc[currentSongId]);
  updateCurrentTime();
  var $tTime = $(".total-time")[0];
  $tTime.innerHTML=parseTimeStr(myAudio.duration);
}
function updateCurrentTime() {//改变当前播放时间函数
  var currentTime=document.querySelector('.current-time');
  currentTime.innerHTML=parseTimeStr(myAudio.currentTime);
}
function parseTimeStr(time) {//转换时间格式函数
    if (typeof time!='number') return;
    var min=parseInt(time/60);
    var sec=parseInt(time%60);
    min=min<10?'0'+min:min;
    sec=sec<10?'0'+sec:sec;
    return min+':'+sec;
}
function preSongFunc(){//切换至前一首歌函数
  playListObj.currentSongId--;
  playListObj.currentSongId=playListObj.currentSongId<1?0:playListObj.currentSongId--;
  myAudio.src=playListObj.songSrc[playListObj.currentSongId];
}
function nextSongFunc() {//切换至后一首歌函数
    playListObj.currentSongId++;
    playListObj.currentSongId=playListObj.currentSongId>2?0:playListObj.currentSongId++;
    myAudio.src=playListObj.songSrc[playListObj.currentSongId];
}
function toggleMute(target,target2){//控制静音函数
  if(target.volume === 0){
    target.volume = 1;
    target2.width("100%");
  }else{
    target.volume = 0;
    target2.width("0%");
  }
}
function logoControlFunc(target){//控制logo函数
  if (target.css("animation-play-state") === "paused"){
    target.css("animation-play-state","running");
  }else{
    target.css("animation-play-state","paused");
  }
}
function toggleAttr(target,attr,value){
  if(target.attr(attr)){
    target.removeAttr(attr);
  }else{
    target.attr(attr,value);
  }
}
function switchClass(target,oldClass,newClass){
  target.toggleClass(oldClass);
  target.toggleClass(newClass);
}
function pauseBtnFunc(target){//控制播放函数
  if(target.paused === true){
    target.play();
  }else{
    target.pause();
  }
}
function volumeBarControlFunc(target,event){//控制音量函数
  var e=window.event||event;
  //console.log(target);
  //console.log(e.pageX+'\n'+target.offsetLeft+'\n'+target.offsetWidth);
  var volumePercent=(e.pageX-getSummaryOffsetLeft(target))/target.offsetWidth;
  //console.log(volumePercent);
  myAudio.volume=volumePercent;
  changeVolumeBarWidth(volumePercent);
}
function changeVolumeBarWidth(targetWidthPercent){
  var volumeBar=document.querySelector('.volume-bar');
  volumeBar.style.width=targetWidthPercent*100+'%';
}
function getSummaryOffsetLeft(el){
  var offsetLeft=el.offsetLeft;
  while (el.offsetParent) {
      el=el.offsetParent;
      offsetLeft+=el.offsetLeft;
  }
  return offsetLeft;
}
function progressBarControlFunc(target,event){//控制进度函数
 var e=window.event||event;
 //console.log(target.offsetLeft);
 //console.log(e.pageX+'\n'+target.offsetLeft+'\n'+target.offsetWidth);
 var pastProgressPercent= (e.pageX-getSummaryOffsetLeft(target))/target.offsetWidth;
 //console.log(pastProgressPercent);
 changeProgressWidth(pastProgressPercent);
 changSongProgress(pastProgressPercent);
}
function changeProgressWidth(pastProgressPercent){
  pastProgressPercent=parseFloat(pastProgressPercent);
  var pastProgressBar = document.querySelector("#past-progress-bar");
  pastProgressBar.style.width=pastProgressPercent*100+'%';
}
function changSongProgress(songProgreess){
  myAudio.currentTime  = songProgreess*myAudio.duration;
  myAudio.play();
}
