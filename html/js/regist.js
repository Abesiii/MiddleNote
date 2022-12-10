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


function setThumbnail(event) {
  var reader = new FileReader();

  reader.onload = function(event) {
    var img = document.createElement("img");
    var postimage=document.getElementById("post-image");
    var message=document.getElementById("message");
    img.setAttribute("src", event.target.result);
    img.setAttribute('width', 345);
    img.setAttribute('height', 384);
    postimage.style.display='none';
    message.style.display='none';
    document.getElementById("drop-file").appendChild(img);
  };

  reader.readAsDataURL(event.target.files[0]);
}

function setPrevThumbnail(event) {
  var reader = new FileReader();

  reader.onload = function(event) {
    var img = document.createElement("img");
    var postimage=document.getElementById("post-image");
    var message=document.getElementById("message");
    img.setAttribute("src", event.target.result);
    img.setAttribute('width', 345);
    img.setAttribute('height', 384);
    postimage.style.display='none';
    message.style.display='none';
    document.getElementById("drop-file").appendChild(img);
  };

  reader.readAsDataURL(event.target.files[0]);
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
  console.log("check");
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

  let selectFile = document.querySelector("#imagefile").files[0];

      const file = URL.createObjectURL(selectFile);

     // document.querySelector(".uploadImage").src = file;

  //var imagefile = document.querySelector("#imagefile").files[0];
 // console.log(imagefile);


  
      var sendData = {'userId' : userId, 'productName' : productName, 'price' : price, 
      'categoryId' : 1, 'volume' : volume, 'description' : description, 'postTime' : postTime, 
      'statusId' : statusId, 'photoLink' : 'sadf', 'categoryName' : categoryName, 'brandName' : brandName};

      sendData = JSON.stringify(sendData, file);    //ajax로 서버에 보내기 위해 문자열을 json으로 저장. 
      var xhr = new XMLHttpRequest();     //ajax로 브라우저와 서버가 상호작용하기 위한 객체 
      xhr.open('POST', 'http://localhost:3000/regist/create');     //post 형식으로 join.js 호출
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


function categorySelect(categoryName){   
    if(categoryName=="For Homme"){
      $("#cate1").$prop("selected", true);
    } 
    else if(categoryName=="For Femme"){
      $("#cate2").$prop("selected", true);
    } 
    else if(categoryName=="Eau de Toilete"){
      $("#cate3").$prop("selected", true);
    }  
    else if(categoryName=="Eau de Cologne"){
      $("#cate4").$prop("selected", true);
    }        
  }



 function brandSelect(brandName){   
  console.log(brandName)
    if(brandName=="Bvlgari"){
      console.log(check)
      console.log("hey");
    } 
    else if(brandName=="Jo Malone"){
      $("#cate1-2").prop("selected",true);
    }
    else if(brandName=="Calvin Klein"){
      $("#cate1-3").prop("selected",true);
    } 
    else if(brandName=="Chanel"){
      console.log($("#cate2-1").prop);
      $("#cate2-1").prop("selected",true);
    } 
    else if(brandName=="Christian Dior"){
      $("#cate2-2").prop("selected",true);
    }  
    else if(brandName=="Burberry"){
      $("#cate2-3").prop("selected",true);
    } 
    else if(brandName=="Versace"){
      $("#cate2-4").prop("selected",true);
    } 
    else if(brandName=="Cartier"){
      $("#cate3-1").prop("selected",true);
    } 
    else if(brandName=="Montblanc"){
      $("#cate3-2").prop("selected",true);
    } 
    else if(brandName=="YvesSaintLaur"){
      $("#cate3-3").prop("selected",true);
    } 
    else if(brandName=="Ralph Lauren"){
      $("#cate3-4").prop("selected",true);
    } 
    else if(brandName=="Bottega Veneta"){
      $("#cate4-1").prop("selected",true);
    } 
    else if(brandName=="Louis Vuitton"){
      $("#cate4-2").prop("selected",true);
    } 
    else if(brandName=="Hermes"){
      $("#cate4-3").prop("selected",true);
    } 
    else if(brandName=="Salvatore Ferragamo"){
      $("#cate4-4").prop("selected",true);
    } 
  }
