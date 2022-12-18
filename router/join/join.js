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



router.post('/', function(req, res){
  var userData = req.body;      //회원가입한 user의 데이터(Object type)   
  if(userData.check == '0'){    //중복확인을 위한 post 요청이면
    var query = connection.query("select * from user where userId='" + userData.userId + "';", function(err, rows){
      if(err) throw err;
      else{
        if(rows.length){      //일치하는 아이디가 있으면 중복
          res.json(['yes']);  //josn 데이터 전송
        }
        else{                 //일치하는 아이디 없으면 중복 아님.
          res.json(['no']);   //json 데이터 전송
        }
      }
    })
  }else if(userData.check == '1'){    //회원가입을 위한 post 요청이면
    var userId = "'" + userData.userId + "'";
    var password = "'" + userData.password + "'";
    var userName = "'" + userData.userName + "'";
    var nickname = "'" + userData.nickname + "'";
    var city = "'" + userData.city + "'";
    var gu = "'" + userData.gu + "'";
    var dong = "'" + userData.dong + "'";
    var detailAddress = "'" + userData.detailAddress + "'";

    var query = connection.query(`insert into user(userId, password, userName, nickname, city, gu, dong, detailAddress) values(${userId}, ${password}, ${userName}, ${nickname}, ${city}, ${gu}, ${dong}, ${detailAddress});`, function(err, rows){
      if(err) throw err;
      else{
        console.log(`${rows} inserted`);    
        res.redirect('/login');
      }
    })
  }
})



router.get('/', function(req, res){
  console.log('join.js 실행');
  res.sendFile(path.join(__dirname, '../../html/join.html'));
})


module.exports = router;