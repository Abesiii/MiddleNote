var express = require('express');   //node_modules에 있는 express에 관련된 함수 모듈을 가져옴(객체는 아님. 반환값 함수)
var app = express();    
var router = express.Router();      //라우터
var path = require('path');         //상대경로로 편리하게 이동할 수 있는 객체
var mysql = require('mysql');
const multer = require('multer')
const upload = multer({dest: 'images/'}) //dest : 저장 위치

/* 데이터베이스 세팅 */
var connection = mysql.createConnection({     //mysql connection 생성 
  host : 'localhost',
  port : 3306,
  user : 'root',
  password : 'root',
  database : 'middlenote'        //데이터베이스 이름
});
connection.connect();       //mysql 연동



router.get('/', function(req, res){ //글 작성 페이지 조회
    res.render('registtest');
})
/*
app.post(['/upload2', '/upload3'], upload.any(), (req, res) => {
  console.log(req.body);
  console.log(req.files);
  res.send("hello world");
});*/

router.post('/upload2', upload.single('file3'), function(req, res){
  console.log(req.file);
  res.send('Uploaded : '+req.file);
});

router.post('/create', upload.single('imagefile'), function(req, res){ //글 작성 
    console.log(req.file);
    console.log(req.body);
    var productData = req.body;    

    var userId = "'" + productData.userId + "'";
    var productName = "'" + productData.productName + "'";
    var price = "'" + productData.price + "'";
    var volume = "'" + productData.volume + "'";
    var description = "'" + productData.description + "'";
    var postTime = "'" + productData.postTime + "'";
    var statusId = "'" + productData.statusId + "'";
    var photoLink = "'" + productData.photoLink + "'"; 
    var categoryName =productData.categoryName;
    var brandName =productData.brandName;

    
    var sql1 = 'SELECT categoryId FROM category where categoryName=? AND brandName=?';  //글의 categoryId찾는 쿼리
    

    connection.query(sql1, [categoryName, brandName], function(err, rows, field){
      if(err) throw err;
      else{
        if(rows.length){      //일치하는 카테고리 id가 있을때

          var categoryId="'"+rows[0].categoryId+"'";
     
          var sql2 = `insert into product(userId, productName, price,  
            categoryId, volume, description, postTime, statusId, photoLink) 
            values(${userId}, ${productName}, ${price}, ${categoryId},
             ${volume}, ${description}, ${postTime}, ${statusId}, ${photoLink});` //글 작성하는 쿼리

          connection.query(sql2, function(err,rows){
            if(err) throw err;
            else{
              res.json({message: "200"});
            }
          })

      
        }
        else{
          res.json({message: "400"});
        }
      }

    })
  })


module.exports = router;