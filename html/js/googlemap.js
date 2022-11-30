/*1000단위 숫자 입력*/

var totalitem = 6;
var addeditem;
var titles = [];
var prices = [];

function inputNumberFormat(obj) {
    obj.value = comma(uncomma(obj.value));
}
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

/*******************************************/

function showCategory(cate){
  content = document.getElementById("selectedCate");
  content.innerHTML = "<b>" +cate.innerHTML+"</b>";
}

function showCate1(cate){

  cate1 = document.getElementById("Cate1");

  content = document.getElementById("selectedCate");
  content.innerHTML = "<b>" + cate1.innerHTML+"<b>" +" > " + "<b>" +cate.innerHTML+"</b>";

}

function showCate2(cate){

  cate1 = document.getElementById("Cate2");

  content = document.getElementById("selectedCate");
  content.innerHTML = "<b>" + cate1.innerHTML+"<b>" +" > " + "<b>" +cate.innerHTML+"</b>";

}

function showCate3(cate){

  cate1 = document.getElementById("Cate3");

  content = document.getElementById("selectedCate");
  content.innerHTML = "<b>" + cate1.innerHTML+"<b>" +" > " + "<b>" +cate.innerHTML+"</b>";

}

function showCate4(cate){

  cate1 = document.getElementById("Cate4");

  content = document.getElementById("selectedCate");
  content.innerHTML = "<b>" + cate1.innerHTML+"<b>" +" > " + "<b>" +cate.innerHTML+"</b>";

}

function regist(){

	totalitem = totalitem + 1;
	addeditem = addeditem+1;

	var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if(existingEntries == null) { console.log("isNull"); existingEntries = []; }

    var title = document.getElementById("regist-title").value;
	var cate = document.getElementById("selectedCate").innerHTML;
    var price = document.getElementById("regist-price").value;
	var description = document.getElementById('regist-description').value;
  	var location = document.getElementById('regist-location').value;

    var entry = {
        "title": title,
		"cate" : cate,
        "price": price,
		"description" : description,
    "location"  : location
    };

    localStorage.setItem("entry", JSON.stringify(entry));

    existingEntries.push(entry);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));



   alert("등록이 완료되었습니다.\n메인페이지로 이동합니다")
}

//정보 받아올 땐 해당 html 에서 이렇게 하면 됨.
// <script>
// var lastData;
// if(localStorage.getItem('title')){
//   lastData = localStorage.getItem('title');
//
//   document.getElementById("dataaaa").innerHTML = lastData;
// }
// </script>
