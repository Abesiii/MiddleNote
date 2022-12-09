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
    noticeTime DATETIME,
    CONSTRAINT PK_noticeId PRIMARY KEY (noticeId)
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
P.description, P.postTime, P.statusId, P.categoryId, 
T.statusName, C.categoryName, C.brandName, U.nickname
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
 

 
INSERT INTO user(id, userId, password, userName, nickname, city, gu, dong, detailAddress)
VALUES(1, 'kksshh0612', '51332', '김성호', '휴학예정자', '청주시', '서원구', '1순환로 694번길 15', '7층'),
(2, 'youngjaeee', '6sadth2', '손영재', '알코올중독자', '청주시', '서원구', '내수동로 114번길 60', '302호'),
(3, 'sangwoo0795', '5qew2', '임상우', '예술가', '청주시', '흥덕구', '신율로118번길 1', '202호'),
(4, 'leeseunghyun', 'asfdk1', '이승현', '동방귀신', '청주시', '서원구', '내수동로 111번길 70', '504호'),
(5, 'gyub99', 'a142k', '김규빈', '캥거루족', '청주시', '서원구', '외통수로 15번길 1', '102호'),
(6, 'kimminju910', '235azd', '김민주', '와무새', '청주시', '서원구', '장군로 121번길 60', '302호'),
(7, 'kwonja', 'agsgdfd', '권성민', '권자몬', '청주시', '서원구', '장군로 118번길 60', '210호');



INSERT INTO product (userId, productName, 
price, categoryId, volume, description, statusId, photoLink)
VALUES(1, '불가리 뿌르 옴므 오 드 뚜왈렛',  95000,
1, '50ml', '개봉한지 일주일됐고 한두번밖에 안뿌려 봤어요', 1, NULL),

(2, '뿌르 옴므 오 드 뚜왈렛 스프레이',  127820,
 1, '100ml', '시원한 향이고 남성적인 향이에요 선물받은거팔아요', 1, NULL),

(3, '불가리 맨 테라 에센스 오 드 퍼퓸',  107800,
 1, '100ml', '개봉 안했습니다 받은지 2주 됐어요', 1, NULL),

(4, '블랙베리 앤 베이 코롱',  30000,
 2, '25ml', '절반정도 썼습니다', 1, NULL),

(5, '우드 세이지 앤 씨솔트 코롱',  42000,
 2, '30ml', '돈이 필요해서 급하게 싸게 팔아요 네고 안됩니다', 1, NULL),

(6, '블랙베리 앤 베이 코롱',  58000,
 2, '50ml', '미개봉이에요 싸게 팔아요', 1, NULL),

(3, 'CK BE',  25000,
 3, '50ml', '무난한 향이에요 입문자에게 좋은 것 같습니다', 1, NULL),

(1, 'CK ONE EDT',  20000,
 3, '200ml', '사용감 조금 있습니다 싸게 팔게요', 1, NULL),

 (4, 'ALL EDT',  15000,
 3, '200ml', '급처합니다', 1, NULL);
 


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
