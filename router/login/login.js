var express = require('express');   //node_modules에 있는 express에 관련된 함수 모듈을 가져옴(객체는 아님. 반환값 함수)
var app = express();    
var router = express.Router();      //라우터
var path = require('path');         //상대경로로 편리하게 이동할 수 있는 객체
var mysql = require('mysql');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

/* 데이터베이스 세팅 */
var connection = mysql.createConnection({     //mysql connection 생성 
  host : 'localhost',
  port : 3306,
  user : 'root',
  password : 'root',
  database : 'middlenote'        //데이터베이스 이름
});
connection.connect();       //mysql 연동

//serializeUser
passport.serializeUser(function(user, done){
  done(null, user.id);
})

//deserializeUser
passport.deserializeUser(function(id, done){
  done(null, id);
})

//로그인에 대한 strategy
passport.use('local-login', new localStrategy({
  usernameField : 'userId',
  passwordField : 'password',
  passReqToCallback : true
}, function(req, username, password, done){
  console.log('로그인 스트러터지 실행');
  var query = connection.query("select * from user where userId='" + username + "' and password='" + password + "';", function(err, rows){
    if(err) return err;
    else{
      if(rows.length){      //회원 아이디, 비밀번호 일치하는 회원을 찾으면 
        console.log('일치하는 회원 찾음');
        return done(null, {'id' : rows[0].id});
      }
      else{
        return done(null, false, {'message' : '아이디나 비밀번호가 일치하지 않습니다.'});
      }
    }
  })
}))


//커스텀 콜백
router.post('/', function(req, res, next){
  passport.authenticate('local-login', function(err, user, info){
    if(err) res.status(500).json(err);
    else{
      if(!user){
        return res.status(401).json(info.message);
      }
      req.logIn(user, function(err){
        if(err) return next(err);
        else{
          return res.json(user);
        }
      })
    }
  })(req, res, next);
})


/**
 * @path {GET} http://localhost:3000/
 * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
 */

router.get('/', function(req, res){
  console.log('login.js 실행');
  res.sendFile(path.join(__dirname, '../../html/Member-login.html'));
})



module.exports = router;