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






router.post('/create', function(req, res){ //약속 생성

var promiseData=req.body;
var productId="'"+promiseData.productId +"'";
var sellerId="'"+promiseData.sellerId +"'";
var buyerId="'"+promiseData.buyerId +"'";

 var sql1=`SELECT * from promise WHERE productId=${productId}`;    //약속 존재하는지 조회하는 쿼리
 var sql2=`INSERT INTO promise(productId, sellerId, buyerId) VALUES(${productId}, ${sellerId}, ${buyerId})`;    //약속 생성하는 쿼리

 connection.query(sql1, function(err, data){
    if(err) throw err;
    else{
        if(data.length){    //이미 약속이 존재할때
            console.log("jey");
            res.write("<script>alert('You already have a promise')</script>");
            res.write("<script>window.location=\"../product\"</script>");
        }

        else{
            console.log("hey");
            connection.query(sql2, function(err2, data2){
                if(err2) throw err2;
                else{
                    return res.redirect(`/product/detail/${promiseData.productId}`);
                }
            });
        }
    }
 });

})





module.exports = router;