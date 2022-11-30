CREATE DATABASE middlenote;

USE middlenote;


CREATE TABLE user (
   id INT,
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
    title VARCHAR(45),
    price INT NOT NULL,
    categoryId INT,
    volume VARCHAR(45),
    description TEXT,
    postTime DATETIME,
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
   interestId INT,
    userId INT,
    productId INT,
    CONSTRAINT PK_promise PRIMARY KEY (interestId, productId, userId),
    CONSTRAINT FK_promiseUserId FOREIGN KEY (userId) REFERENCES User(id),
    CONSTRAINT FK_promiseProductId FOREIGN KEY (productId) REFERENCES Product(productId)
    );
    
CREATE TABLE comment (
   commentTime DATETIME,
    userId INT,
    productId INT,
    commentContent VARCHAR(300),
    CONSTRAINT PK_commentTime PRIMARY KEY (commentTime, userId, productId),
    CONSTRAINT FK_commentUserId FOREIGN KEY (userId) REFERENCES User(id),
    CONSTRAINT FK_commentProductId FOREIGN KEY (productId) REFERENCES Product(productId)
    );
    
CREATE TABLE tradeList (
   productId INT,
    userId INT,
    CONSTRAINT PK_tradeListProductId PRIMARY KEY (productId),
    CONSTRAINT FK_tradeListProductId FOREIGN KEY (productId) REFERENCES Product(productId),
    CONSTRAINT FK_tradeListUserId FOREIGN KEY (userId) REFERENCES User(id)
    );
    

    
    




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
(12, 'Eau de Cologne', 'Bottega');


INSERT INTO tradestatus
VALUES(1, 'PROGRESS'),
(2, 'COMPLETE');
 

 
INSERT INTO user(id, userId, password, userName, nickname, city, gu, dong, detailAddress)
VALUES(1, 'kksshh0612', '51332', '김성호', '휴학예정자', '청주시', '서원구', '1순환로 694번길 15', '7층'),
(2, 'youngjaeee', '6sadth2', '손영재', '알코올중독자', '청주시', '서원구', '내수동로 114번길 60', '302호'),
(3, 'sangwoo0795', '5qew2', '임상우', '예술가', '청주시', '흥덕구', '신율로118번길 1', '202호'),
(4, 'leeseunghyun', 'asfdk1', '이승현', '동방귀신', '청주시', '서원구', '내수동로 111번길 70', '504호'),
(5, 'gyub99', 'a142k', '김규빈', '캥거루족', '청주시', '서원구', '외통수로 15번길 1', '102호'),
(6, 'kimminju910', '235azd', '김민주', '와무새', '청주시', '서원구', '장군로 121번길 60', '302호');



INSERT INTO product (userId, productName, title,
price, categoryId, volume, description, postTime, statusId, photoLink)
VALUES(1, '불가리 뿌르 옴므 오 드 뚜왈렛', '쓰던거 팔아요',  95000,
1, '50ml', '개봉한지 일주일됐고 한두번밖에 안뿌려 봤어요','2022-11-27 23:07:10', 1, NULL),
(2, '불가리 뿌르 옴므 오 드 뚜왈렛 스프레이', '남성용 향수 팝니다',  127820,
 1, '100ml', '시원한 향이고 남성적인 향이에요 선물받은거팔아요','2022-11-25 12:15:55', 1, NULL),
(3, '불가리 맨 테라 에센스 오 드 퍼퓸', '싸게 팔아요',  107800,
 1, '100ml', '개봉 안했습니다 받은지 2주 됐어요','2022-11-29 09:02:10', 1, NULL),
(4, '맨 우드 에센스 오 드 퍼퓸', '향수 팔아요~',  98260,
 1, '50ml', '절반정도 썼습니다','2022-11-15 14:54:00', 1, NULL),
(5, '아쿠아 뿌르 옴므 오 드 뚜왈렛', '사주실 분 있나요?',  84600,
 1, '100ml', '미개봉 상품입니다 시원한 향 좋아하시는분께 좋을듯 해요','2022-10-21 23:07:10', 1, NULL),
(6, '레젬메 팔카 오 드 퍼퓸', '쓰던거 팔아요',  210000,
 1, '10ml', '특별한 매력이 깃든 우드를 휘감은 짙고 화려한 우디 블랙 머스크 팝니다','2022-11-24 21:17:10', 1, NULL);
