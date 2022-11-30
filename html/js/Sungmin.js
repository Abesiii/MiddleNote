function Checked()
        { 
         var check=document.getElementById("keep_login").checked;

         if(check===true)
         {
             alert("개인 정보 보호를 위해 본인 기기에서만 이용해주세요");
         }
        }
        function MemberLogin()
        {
            var email=document.getElementById("email").value;
            var password=document.getElementById("password").value;
            if(email==="")
            {
                alert("아이디를 입력하세요");
            }
            else if(email!=="" && password==="")
            {
                alert("비밀번호를 입력하세요");
            }
            else{
                location.href="index.html";       //로그인후 메인페이지로 이동
            }
        }

//네이버 스크립트
    var naverLogin = new naver.LoginWithNaverId(
            {
                clientId: "Os27R0d_ajhOVz_4FaPK", //내 애플리케이션 정보에 cliendId를 입력해줍니다.
                callbackUrl: "http://localhost:8181/naver_Login", // 내 애플리케이션 API설정의 Callback URL 을 입력해줍니다.
                isPopup: false,
                callbackHandle: true
            }
        );	
    
    naverLogin.init();
    
    window.addEventListener('load', function () {
        naverLogin.getLoginStatus(function (status) {
            if (status) {
                var email = naverLogin.user.getEmail(); // 필수로 설정할것을 받아와 아래처럼 조건문을 줍니다.
                
                console.log(naverLogin.user); 
                
                if( email == undefined || email == null) {
                    alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
                    naverLogin.reprompt();
                    return;
                }
            } else {
                console.log("callback 처리에 실패하였습니다.");
            }
        });
    });
    
    
    var testPopUp;
    function openPopUp() {
        testPopUp= window.open("https://nid.naver.com/nidlogin.logout", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=1,height=1");
    }
    function closePopUp(){
        testPopUp.close();
    }
    function naverLogout() {
        openPopUp();
        setTimeout(function() {
            closePopUp();
            }, 1000);
        
        
    }
//네이버 스크립트