window.onload = function(){
  chooseType();
  chooseShoole();
}

function chooseType(){
  var student = document.getElementById("student");
  var nstudent = document.getElementById("nstudent");
  var school = document.getElementById("school");
  var company = document.getElementById("company");
  student.onclick = function(){
    school.style.display = "block";
    company.style.display = "none";
  }
  nstudent.onclick = function(){
    school.style.display = "none";
    company.style.display = "block";
  }
}
function chooseShoole(){
  var chooseCity = document.getElementById("city");
  var bjCollage = document.getElementById("bj-collage");
  var shCollage = document.getElementById("sh-collage");
  var njCollage = document.getElementById("nj-collage");
  city.onchange = function(){
    if(city.value == "bj"){
      bjCollage.style.display = "inline-block";
      shCollage.style.display = "none";
      njCollage.style.display = "none";
    }
    if(city.value == "sh"){
      bjCollage.style.display = "none";
      shCollage.style.display = "inline-block";
      njCollage.style.display = "none";
    }
    if(city.value == "nj"){
      bjCollage.style.display = "none";
      shCollage.style.display = "none";
      njCollage.style.display = "inline-block";
    }
  }
  /*使用JS选择框自带方法
  chooseCity.onchange=function(){
		school(chooseCity.value);
	}
	function school(a){
		bjCollage.options.length = 0;
		switch(a){
			case "北京":
				bjCollage.add(new Option("北京大学"));
				bjCollage.add(new Option("清华大学"));
				bjCollage.add(new Option("中国人民大学"));
				bjCollage.add(new Option("北京师范大学"));
				break;
			case "上海":
				bjCollage.add(new Option("复旦大学"));
				bjCollage.add(new Option("上海交通大学"));
				bjCollage.add(new Option("同济大学"));
				bjCollage.add(new Option("华东师范大学"));
				break;
			case "南京":
				bjCollage.add(new Option("南京大学"));
				bjCollage.add(new Option("东南大学"));
				bjCollage.add(new Option("中国药科大学"));
				bjCollage.add(new Option("河海大学"));
				break;
		}
	}*/
}
