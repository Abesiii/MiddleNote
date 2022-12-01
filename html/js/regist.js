/*1000단위 숫자 입력*/

var totalitem = 6;
var addeditem;
var titles = [];
var prices = [];
var mainCategory;
var subCategory;

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
  mainCategory=cate.innerHTML;
  content.innerHTML = "<b>" +cate.innerHTML+"</b>";
}

function showCate1(cate){

  cate1 = document.getElementById("Cate1");
  subCategory=cate.innerHTML;
  content.innerHTML = "<b>" + cate1.innerHTML+"<b>" +" > " + "<b>" +cate.innerHTML+"</b>";

}

function showCate2(cate){

  cate1 = document.getElementById("Cate2");
  subCategory=cate.innerHTML;
  content.innerHTML = "<b>" + cate1.innerHTML+"<b>" +" > " + "<b>" +cate.innerHTML+"</b>";

}

function showCate3(cate){

  cate1 = document.getElementById("Cate3");
  subCategory=cate.innerHTML;
  content = document.getElementById("selectedCate");
  content.innerHTML = "<b>" + cate1.innerHTML+"<b>" +" > " + "<b>" +cate.innerHTML+"</b>";

}

function showCate4(cate){

  cate1 = document.getElementById("Cate4");
  subCategory=cate.innerHTML;
  content = document.getElementById("selectedCate");
  content.innerHTML = "<b>" + cate1.innerHTML+"<b>" +" > " + "<b>" +cate.innerHTML+"</b>";

}
/*
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
*/
function regist(){
  var content = document.getElementById("selectedCate");
  var cate1 = document.getElementById("Cate1");
  var userId=1;
  var productName=document.getElementById("regist-productname").value;
  var price = document.getElementById("regist-price").value;
	var categoryName=mainCategory;
  var brandName=subCategory;
  var volume=document.getElementById("regist-volume").value;
	var description = document.getElementById('regist-description').value;
  var postTime = getPostTime();
  var statusId=1;


  
      var sendData = {'userId' : userId, 'productName' : productName, 'price' : price, 
      'categoryId' : 1, 'volume' : volume, 'description' : description, 'postTime' : postTime, 
      'statusId' : statusId, 'photoLink' : 'sadf', 'categoryName' : categoryName, 'brandName' : brandName};

      sendData = JSON.stringify(sendData);    //ajax로 서버에 보내기 위해 문자열을 json으로 저장. 
      var xhr = new XMLHttpRequest();     //ajax로 브라우저와 서버가 상호작용하기 위한 객체 
      xhr.open('POST', 'http://localhost:3000/product/create');     //post 형식으로 join.js 호출
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(sendData);
  
}



function getPostTime(){
  var date_ob = new Date();
  var day = ("0" + date_ob.getDate()).slice(-2);
  var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  var year = date_ob.getFullYear();
     
  var date = year + "-" + month + "-" + day;
      
  var hours = date_ob.getHours();
  var minutes = date_ob.getMinutes();
  var seconds = date_ob.getSeconds();
    
  var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  return dateTime;
  
  }
