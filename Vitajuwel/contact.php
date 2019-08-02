<?php
include_once(dirname(__FILE__)."/func/mailModule.php");//include_once("func/contact_func.php");

$send_mail_btn = $_POST["send_mail_btn"];
if(!empty($send_mail_btn)){
    $contact_name = $_POST["name"];
    $contact_tel = $_POST["phone"];
    $contact_email = $_POST["email"];
    $contact_content = $_POST["content"];

    $mailContent_para = array(
        "contact_name"=>$contact_name,
        "contact_tel"=>$contact_tel,
        "contact_email"=>$contact_email,
        "contact_content"=>$contact_content
    );

    $mailContent = mailContent($mailContent_para);
    $subject = "vitajuwel-線上諮詢";
    $body = $mailContent;

    //---------------------------------
    //正式上線在啟用
    $to = "service@vitajuwelys.com";
    $phpMail = phpMail($subject,$body,$to);
    
    //---------------------------------
    if(empty($phpMail)){//回傳空直，代表成功，有錯誤就會回傳錯誤
        echo "<script>alert('我們已經收到您填寫的訊息，將會盡快派專人與您聯繫。');</script>";
        header("refresh:1");
    }else{
        echo $phpMail;
    }
}
?>
<!DOCTYPE html>
<head>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-145095080-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-145095080-1');
</script>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Vitajuwel</title>
<link rel="stylesheet" href="css/style.css" type="text/css" media="screen"/>
<link href="images/favicon.ico" rel="shortcut icon" />
</head>

<body>
<div class="wrapper">
    <!--HEADER Start-->
    <div class="header">
        <a href="index.html" id="logo"><img src="images/logo.jpg" width="150" height="150" ></a>
        <a href="http://vitajuwel.com/de" class="deutsch"><img src="images/germany.jpg" width="20" height="12">Deutsch</a>
        <!--NAV-->
        <ul class="nav">
        <li><a href="about.html">關於VitaJuwel®</a>
            <ul>
            <li><a href="masaru.html">VitaJuwel®與江本勝博士</a></li>
            <li><a href="fascination_water.html">魅力之水</a></li>
            <li><a href="fascination_gemwater.html">魅力寶石</a></li>
            </ul>
        </li>
        <li><a href="fascination_gemstones.html">寶石的秘密</a>
            <ul>
            <li><a href="product.html">VitaJuwel®寶石能量棒</a></li>
            </ul>
        </li>
        <li><a href="accessories.html">寶石能量瓶</a>
            <ul>
            <li><a href="guide.html">使用說明</a></li>
            </ul>
        </li>
        <li><a href="advantage.html">VitaJuwel®的優勢</a>
            <ul>
            <li><a href="it_works.html">鑑定與保證</a></li>
            </ul>
        </li>
        <li><a href="contact.html">聯繫我們</a></li>
        </ul>
    </div>
    <!--HEADER End-->

    <div class="container">
        <!--crumb-->
        <div class="crumb"><h3>首頁>聯繫我們</h3></div>
        <!--title-->
        <div class="title"><h1>聯繫我們</h1></div>
        <!--內文-->
        <form name="form" enctype="application/x-www-form-urlencoded" action="" method="post">
            <div class="content">
                <div class="left"><img src="images/contact_img.jpg" width="305" height="435"></div>
                <div class="right">
                    <p>姓名<br>
                        <input name="name" type="text">
                    </p>
                    <p>電話<br>
                        <input name="phone" type="text">
                    </p>
                    <p>E-mail<br>
                        <input name="email" type="text" class="mail_input">
                    </p>
                    <p>留言內容<br>
                        <textarea name="content"></textarea>
                    </p>
                    <!-- <a class="button">送出</a> -->
                    <!-- <a class="button">清除重填</a> -->
                    <button name="send_mail_btn" id="send_mail_btn" class="button" type="submit" value="send_mail">送出</button>
                    <button class="button" type="reset">清除重填</button>
                </div>
                <div id="clear"></div>
            </div>
        </div>
    </form>

    <!--Footer-->
    <div class="footer">Copyright © 2015 VitaJuwel. All rights reserved.</div>
</div>
</body>
<script src="js/jquery-1.11.2.min.js"></script>
<script>
$(function(){
    var contact_name = $("input[name$='name']");
    var contact_phone = $("input[name='phone']");
    var contact_email = $("input[name='email']");
    var contact_content = $("input[name='content']");
    var contact_form = $("#form");
    var send_mail_btn = $("#send_mail_btn");
    var reEmail =/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/

    send_mail_btn.bind("click", function(event){
        if(contact_name.val() == ""){
            alert("請輸入姓名");
            contact_name.focus();
            return false;
        }else if(contact_phone.val() == ""){
            alert("請輸入電話");
            contact_phone.focus();
            return false;
        }else if(contact_email.val() == ""){
            alert("請輸入e-mail");
            contact_email.focus();
            return false;
        }else if(reEmail.test(contact_email.val()) == false){
            alert("e-mail格式不正確");
            contact_email.focus();
            return false;
        }else if(contact_content.val() == ""){
            alert("請輸入詢問內容");
            contact_content.focus();
            return false;
        }else{
            if(confirm("若內容正確，請按確定鍵送出")){
                contact_form.submit();
                return;
            }else{
                return false;
            }
        }

    });
});
</script>
</html>
