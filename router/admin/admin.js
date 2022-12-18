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
  database : 'middlenote',        //데이터베이스 이름
  multipleStatements: true
});
connection.connect();       //mysql 연동

router.get('/', function(req, res){
  console.log('admin.js 실행');

  var sql1 = `select city, count(*) as tradecount from detailproduct_information
  where statusId=2
  group by city
  order by tradecount desc; `;      //도시별 거래 횟수 조회 sql

  var sql2 = `select userId, nickname, count(*) as productcount from detailproduct_information
  group by userId; `;      //회원별 작성 글 갯수 sql

  var sql3= `select d.userId, d.nickname, count(*) as commentcount
  from detailproduct_information as d,
  comment as c
  where d.userId=c.userId
  group by d.userId; `; //회원별 작성 댓글 수 sql


  var sql4= `select m.sellerId, u.nickname, count(*) as number 
  from mypageproduct_information as m,
  user as u
  where m.sellerId=u.Id AND m.statusId=2
  group by m.sellerId
  order by number desc
  limit 10;`;  //최고 판매 고객 TOP 10

  var sql5= `select m.buyerId, u.nickname, count(*) as number 
  from mypageproduct_information as m,
  user as u
  where m.buyerId=u.Id AND m.statusId=2
  group by m.buyerId
  order by number desc
  limit 10;`;  //최고 구매 고객 TOP 10



  connection.query(sql1+sql2+sql3+sql4+sql5, function(err, rows){
    if(err) throw err;
    if(rows.length){
      var sql_data1 = rows[0];      //도시별 거래 횟수 조회 
      var sql_data2 = rows[1];      //회원별 작성 글 갯수
      var sql_data3 = rows[2];      //회원별 작성 댓글 수
      var sql_data4 = rows[3];      //최고 판매 고객 TOP10
      var sql_data5 = rows[4];      //최고 구매 고객 TOP10
      console.log(sql_data1);
      console.log(sql_data2);
      console.log(sql_data3);
      console.log(sql_data4);
      console.log(sql_data5);
      res.render('admin.ejs', {cityTrade : sql_data1, userProductNum : sql_data2, userCommentNum : sql_data3, recentSellTop : sql_data4, recentPurchaseTop : sql_data5});
    }
  })

  // res.render('admin.ejs');

})

module.exports = router;