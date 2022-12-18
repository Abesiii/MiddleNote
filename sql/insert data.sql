CREATE DATABASE middlenote;

USE middlenote;


CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    userId VARCHAR(45),
    password VARCHAR(45),
    userName VARCHAR(45),
    nickname VARCHAR(45),
    city VARCHAR(45),
    gu VARCHAR(45),
    dong VARCHAR(45),
    detailAddress VARCHAR(100),
    CONSTRAINT PK_userId PRIMARY KEY (id)
    );


CREATE TABLE category (
    categoryId INT,
    categoryName VARCHAR(45),
    brandName VARCHAR(45),
    CONSTRAINT PK_categoryId PRIMARY KEY (categoryId)
   );
    
CREATE TABLE notice (
    noticeId INT,
    noticeTitle VARCHAR(45),
    noticeContent VARCHAR(300),
    noticeTime VARCHAR(20),
    userId INT NOT NULL,
    CONSTRAINT PK_noticeId PRIMARY KEY (noticeId),
    CONSTRAINT FK_noticeUserId FOREIGN KEY(userId) REFERENCES user(id)
   );
    
CREATE TABLE tradeStatus (
    statusId INT NOT NULL,
    statusName VARCHAR(45),
    CONSTRAINT PK_tradeId PRIMARY KEY (statusId)
    );
    
    
CREATE TABLE product (
    productId INT NOT NULL AUTO_INCREMENT,
    userId INT,
    productName VARCHAR(45),
    price INT NOT NULL,
    categoryId INT,
    volume VARCHAR(45),
    description TEXT,
    postTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    statusId INT NOT NULL,
    photoLink VARCHAR(45),
    view INT DEFAULT 0,
    CONSTRAINT PK_productId PRIMARY KEY (productId),
    CONSTRAINT FK_productUserId FOREIGN KEY (userId) REFERENCES User(id),
    CONSTRAINT FK_productCategoryId FOREIGN KEY (categoryId) REFERENCES Category(categoryId),
    CONSTRAINT FK_productStatusId FOREIGN KEY (statusId) REFERENCES tradeStatus(statusId)
    );
    
   CREATE TABLE interestList (
   interestId INT,
    userId INT,
    productId INT,
    CONSTRAINT PK_interestId PRIMARY KEY (interestId),
    CONSTRAINT FK_interestUserId FOREIGN KEY (userId) REFERENCES User(id),
    CONSTRAINT FK_interestProductId FOREIGN KEY (productId) REFERENCES Product(productId)
    );
    
    
CREATE TABLE promise (
    productId INT NOT NULL,
    sellerId INT NOT NULL,
    buyerId INT NOT NULL,
    CONSTRAINT PK_promiseProductId PRIMARY KEY (productId),
    CONSTRAINT FK_promiseBuyerId FOREIGN KEY (sellerId) REFERENCES user(id),
    CONSTRAINT FK_promiseSellerId FOREIGN KEY (buyerId) REFERENCES user(id),
    CONSTRAINT FK_promiseProductId FOREIGN KEY (productId) REFERENCES product(productId) ON DELETE CASCADE
    );
    
CREATE TABLE comment (
    commentId INT NOT NULL AUTO_INCREMENT,
   commentTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    userId INT,
    productId INT,
    commentContent VARCHAR(300),
    CONSTRAINT PK_commentId PRIMARY KEY (commentId),
    CONSTRAINT FK_commentUserId FOREIGN KEY (userId) REFERENCES User(id),
    CONSTRAINT FK_commentProductId FOREIGN KEY (productId) REFERENCES Product(productId) ON DELETE CASCADE
    );
    
CREATE TABLE tradeList (
   productId INT,
    userId INT,
    CONSTRAINT PK_tradeListProductId PRIMARY KEY (productId),
    CONSTRAINT FK_tradeListProductId FOREIGN KEY (productId) REFERENCES Product(productId) ON DELETE CASCADE,
    CONSTRAINT FK_tradeListUserId FOREIGN KEY (userId) REFERENCES User(id)
    );
    


-- 글에 필요한 정보를 모두 조회하는 뷰 --    
CREATE VIEW detailproduct_information
AS SELECT P.productId,P.productName, P.price, P.userId, P.photoLink, P.volume,
P.description, P.postTime, P.statusId, P.categoryId, P.view,
T.statusName, C.categoryName, C.brandName, U.nickname, U.city
FROM product AS P, tradestatus AS T, category AS C, user AS U
WHERE P.statusId=T.statusId AND P.categoryId=C.categoryId
AND P.userId=U.id
ORDER BY P.productId ASC;
    

-- 제품에 대한 간단한 정보를 조회하는 뷰 -- 

CREATE VIEW mypageproduct_information
AS SELECT PD.productName, PD.price,PD.photoLink,Pd.statusId,
PM.productId, PM.sellerId, PM.buyerId
FROM promise as PM 
INNER JOIN product AS PD
ON PM.productId=PD.productId;


-- 약속에 대한 자세한 정보 조회하는 뷰 --
CREATE VIEW detailpromise_information
AS SELECT P.productId, P.sellerId, P.buyerId, S.nickname AS sellernickname, B.nickname AS buyernickname
FROM promise AS P 
INNER JOIN user AS S
ON P.sellerId=S.id
INNER JOIN user AS B
ON P.buyerId=B.id;




INSERT INTO category 
VALUES(1, 'For Homme', 'Bvlgari' ),
(2, 'For Homme', 'Jo Malone' ),
(3, 'For Homme', 'Calvin Klein' ),
(4, 'For Femme', 'Chanel'),
(5, 'For Femme', 'Christian Dior'),
(6, 'For Femme', 'Burberry'),
(7, 'For Femme', 'Versace'),
(8, 'Eau de Toilete', 'Cartier'),
(9, 'Eau de Toilete', 'Montblanc'),
(10, 'Eau de Toilete', 'YvesSaintLaur'),
(11, 'Eau de Toilete', 'Ralph Lauren'),
(12, 'Eau de Cologne', 'Bottega Veneta'),
(13, 'Eau de Cologne', 'Louis Vuitton'),
(14, 'Eau de Cologne', 'Hermes'),
(15, 'Eau de Cologne', 'Salvatore Ferragamo');


INSERT INTO tradestatus
VALUES(1, 'PROGRESS'),
(2, 'COMPLETE');
 

 
INSERT INTO user(userId, password, userName, nickname, city, gu, dong, detailAddress)
VALUES('kksshh0612', '123', '김성호', '휴학예정자', '청주시', '서원구', '1순환로 694번길 15', '7층'),
('youngjaeee', '123', '손영재', '알코올중독자', '청주시', '서원구', '내수동로 114번길 60', '302호'),
('sangwoo0795', '123', '임상우', '예술가', '청주시', '흥덕구', '신율로118번길 1', '202호'),
('leeseunghyun', '123', '이승현', '동방귀신', '청주시', '서원구', '내수동로 111번길 70', '504호'),
('gyub99', '123', '김규빈', '캥거루족', '청주시', '서원구', '외통수로 15번길 1', '102호'),
('jannabi', '123', '최정훈', '잔나비', '청주시', '서원구', '장군로 118번길 60', '210호'),
('kimminju910', '123', '김민주', '와무새', '서울시', '서원구', '장군로 121번길 60', '302호'),
('kwonja', '123', '권성민', '권자몬', '서울시', '서원구', '장군로 118번길 60', '210호'),
('singwisdom', '123', '신지혜', '인턴장인', '서울시', '서원구', '장군로 118번길 60', '210호'),
('windhyerim', '123', '풍혜림', 'notorius혜림', '부산시', '서원구', '장군로 118번길 60', '210호'),
('joshua456', '123', '조수현', '농구거인', '부산시', '서원구', '장군로 118번길 60', '210호'),
('jonghoon142', '123', '임종훈', '밤토리', '부산시', '서원구', '장군로 118번길 60', '210호'),
('wjdgus6843', '123', '김정현', '제주소년', '부산시', '서원구', '장군로 118번길 60', '210호'),
('sangsoo', '123', '김상수', '상누', '수원시', '서원구', '장군로 118번길 60', '210호'),
('doyoungpark', '123', '박도영', '동탄불주먹', '수원시', '서원구', '장군로 118번길 60', '210호');


INSERT INTO user(id, userId, password, userName, nickname, city, gu, dong, detailAddress)
VALUES(999,'admin', 'admin', '관리자', '관리자', '', '', '', '');



INSERT INTO product (userId, productName, 
price, categoryId, volume, description, statusId, photoLink)
VALUES(1, '불가리 뿌르 옴므 오 드 뚜왈렛',  95000,
1, '50ml', '개봉한지 일주일됐고 한두번밖에 안뿌려 봤어요', 2, '1.png'),

(2, '뿌르 옴므 오 드 뚜왈렛 스프레이',  127820,
 1, '100ml', '시원한 향이고 남성적인 향이에요 선물받은거팔아요', 2, '2.png'),

(3, '불가리 맨 테라 에센스 오 드 퍼퓸',  107800,
 1, '100ml', '개봉 안했습니다 받은지 2주 됐어요', 2, '3.png'),

(4, '블랙베리 앤 베이 코롱',  30000,
 2, '25ml', '절반정도 썼습니다', 2, '4.png'),

(5, '우드 세이지 앤 씨솔트 코롱',  42000,
 2, '30ml', '돈이 필요해서 급하게 싸게 팔아요 네고 안됩니다', 2, '5.png'),

(6, '블랙베리 앤 베이 코롱',  58000,
 2, '50ml', '미개봉이에요 싸게 팔아요', 2, '6.png'),

(7, 'CK BE',  25000,
 3, '50ml', '무난한 향이에요 입문자에게 좋은 것 같습니다', 2, '7.png'),

(8, 'CK ONE EDT',  20000,
 3, '200ml', '사용감 조금 있습니다 싸게 팔게요', 2, '8.png'),

 (9, 'ALL EDT',  15000,
 3, '200ml', '급처합니다', 2, '9.png'),
 
 (10, '블루 에센스',  20000,
 3, '200ml', '사용감 조금 있습니다 싸게 팔게요', 2, '10.png'),

 (11, '딥디크 도손 EDP',  30000,
 3, '200ml', '사용감 조금 있습니다 싸게 팔게요', 2, '11.png'),

 (12, '존바바토스',  40000,
 3, '200ml', '사용감 조금 있습니다 싸게 팔게요', 2, '12.png'),

 (13, '팔로시코스',  12000,
 3, '50ml', '사용감 조금 있습니다 싸게 팔게요', 2, '13.png'),

 (14, '오리엔탈 스파이스',  20000,
 3, '200ml', '사용감 조금 있습니다 싸게 팔게요', 2, '14.png'),
 
  (7, '아메리카노 향수',  12300,
 5, '200ml', '일단 팔겠습니다', 2, '15.png'),

  (7, '언 자르딘',  22300,
 6, '200ml', '사용감 있어유', 2, '16.png');
 


INSERT INTO comment(commentTime, userId, productId, commentContent)
VALUES("2022-12-01 12:21:34",1,2, "저 사고 싶어요"),
("2022-12-01 12:21:35",1,3, "직거래 가능합니다"),
("2022-12-01 12:21:36",2,4, "언제 만나실래요?"),
("2022-12-01 12:21:37",2,5, "나 너를 만나러 가"),
("2022-12-01 12:21:38",3,1, "오 너무 좋아보여요"),
("2022-12-01 12:21:39",3,5, "갖고싶습니다"),
("2022-12-01 12:21:40",4,1, "탐나네요"),
("2022-12-01 11:19:36",4,6, "너무 비싼데..네고 가능?"),
("2022-12-01 11:21:37",5,4, "향은 어떤가요"),
("2022-12-01 11:22:38",5,2, "저 살래요!"),
("2022-12-01 11:23:39",6,1, "어디서 만나면 되나요?"),
("2022-12-01 11:25:40",6,2, "오늘 거래 가능하신가요?"),
("2022-12-01 11:23:39",7,3, "살래요"),
("2022-12-01 11:25:40",7,4, "데이터베이스시스템 짱!"),
("2022-12-01 11:25:40",3,7, "그 향수를 내게 넘겨");


INSERT INTO notice
VALUES(1, '노쇼현상이 많이 발생하고 있습니다. 주의하세요','','2022.12.06',999),
(2, 'UI 업데이트가 적용되었습니다.','','2022.12.06',999),
(3, '관리자 모집하고 있습니다.','','2022.12.07',999);




INSERT INTO promise
VALUES(1, 1, 2),
(2, 2, 4),
(3, 3, 1),
(4, 4, 6),
(5, 5, 3),
(6, 6, 2),
(7, 7, 9),
(8, 8, 7),
(9, 9, 8),
(10, 10, 11),
(11, 11, 13),
(12, 12, 13),
(13, 13, 10),
(14, 14, 15);


-- select city, count(*) as tradecount from detailproduct_information
-- where statusId=2
-- group by city
-- order by tradecount desc ;   //도시 별 거래횟수 조회

-- select nickname, count(*) as productcount
-- from detailproduct_information
-- group by userId;     //회원별 작성 글 갯수

-- select u.nickname, count(*) 
-- from user as u, comment as c
-- where u.id=c.userId
-- group by c.userId;   //회원별 댓글 수 갯글 max도 만들어야지