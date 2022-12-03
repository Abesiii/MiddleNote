var express = require('express');   //node_modules에 있는 express에 관련된 함수 모듈을 가져옴(객체는 아님. 반환값 함수)
var app = express();    
var router = express.Router();      //라우터
var path = require('path');         //상대경로로 편리하게 이동할 수 있는 객체
var mysql = require('mysql');


/* 데이터베이스 세팅 */
var connection = mysql.createConnection({     //mysql connection 생성 
  host : 'localhost',
  port : 3306,
  user : 'root',
  password : 'root',
  database : 'middlenote'        //데이터베이스 이름
});
connection.connect();       //mysql 연동


/*
router.get('/', function(req, res){
  console.log('product.js 실행');
  var query = connection.query("select * from product", function(err, rows){
    if(err) throw err;
    else{
        console.log(rows);
    }
  })
  res.sendFile(path.join(__dirname, '../../html/eshop.html'));
})*/



router.get('/', function(req, res){ //전체 product조회


  
 /* var sql1 = `SELECT P.productId, P.userId, P.productName, P.price, C.categoryName, 
   C.brandName,P.volume, P.description, P.postTime, T.statusName, P.photoLink, U.nickname  
  FROM product as P, category as C, tradestatus as T, user as U
  WHERE P.categoryId=C.categoryId AND P.statusId=T.statusId
  AND P.userId=U.id
  ORDER BY P.postTime ASC`;   //글에 필요한 정보를 조회하는 쿼리*/

  var sql1= `SELECT P.productId, P.productName, P.price, T.statusName, P.photoLink,
  C.categoryName, C.brandName  
 FROM product as P, tradestatus as T, category as C
 WHERE P.statusId=T.statusId  AND P.categoryId=C.categoryId
 ORDER BY P.productId ASC`;
  

  connection.query(sql1, function(err, rows){
    if(err) throw err;
    else{
      if(rows.length){      
          res.render('product', {title : 'main', data : rows});
          //res.sendFile(path.join(__dirname, '../../html/eshop.html'));
          
      }
      else{
        res.json({message: "400"});
      }
    }

  })
})

router.get('/:brandName', function(req, res){ //브랜드 별 product조회


  var brandName=req.params.brandName;

  
  
 
  var sql1 = `SELECT P.productId, P.userId, P.productName, P.price, C.categoryName, 
  C.brandName, T.statusName, P.photoLink
 FROM product as P, category as C, tradestatus as T
 WHERE P.categoryId=C.categoryId AND P.statusId=T.statusId
 AND C.brandName=?`;
   
 
   connection.query(sql1,[brandName], function(err, rows){
     if(err) throw err;
     else{
       if(rows.length){      
           res.render('product', {title: 'sub', data : rows});
       }
       else{
        res.render('product', { data : rows});
       }
     }
 
   })
 })


router.get('/detail/:productId', function(req, res){ //상세 product 조회 

  var productId=req.params.productId;
  
   var sql1 = `SELECT P.productId, P.userId, P.productName, P.price, C.categoryName, 
  C.brandName,P.volume, P.description, P.postTime, T.statusName, P.photoLink, U.nickname  
  FROM product as P, category as C, tradestatus as T, user as U
  WHERE P.categoryId=C.categoryId AND P.statusId=T.statusId
  AND P.userId=U.id AND P.productId=${productId}`;   //글에 필요한 정보를 조회하는 쿼리


  var sql2 = `SELECT  P.productId, C.commentTime, C.commentContent, C.userId, U.nickname
  FROM product as P, comment as C, user as U
  where P.productId=C.ProductId AND C.userId=U.id
  AND P.productId=${productId}`;   //해당 글에 달린 댓글 정보 조회 
  
  

  connection.query(sql1, function(err, data1){
    if(err) throw err;
    else{
      if(data1.length){      
        var dateString=getDate(data1[0].postTime);     //datetime 파싱
        var timeString=getTime(data1[0].postTime);
        data1[0].dateString = dateString;
        data1[0].timeString=  timeString;

        connection.query(sql2, function(err2,data2){
          if(err2) throw err2;
          else{
            if(data2.length){
              for(var i=0; i<data2.length; i++){
                var dateString=getDate(data2[i].commentTime);     //datetime 파싱
                var timeString=getTime(data2[i].commentTime);
                data2[i].dateString = dateString;
                data2[i].timeString=timeString;
              }

         
              res.render('product_detail', {data : data1, comment: data2});
            }
            else{
              res.render('product_detail', {data : data1, comment : data2});
            }
          }
        })
      }
      else{
        res.json({message: "400"});
      }
    }

  })
})


function getDate(today){

var year = today.getFullYear();
var month = ('0' + (today.getMonth() + 1)).slice(-2);
var day = ('0' + today.getDate()).slice(-2);

var dateString = year + '-' + month  + '-' + day;
return dateString;
}


function getTime(today){

var hours = ('0' + today.getHours()).slice(-2); 
var minutes = ('0' + today.getMinutes()).slice(-2);
var seconds = ('0' + today.getSeconds()).slice(-2); 

var timeString = hours + ':' + minutes  + ':' + seconds;
return timeString;
}


module.exports = router;