<?php
//把罐頭信件的部分內容取代掉
function mailContent($para){
    //$url="mail_content.html";
    $url = dirname(__FILE__)."/contactUsContent.html";
    $fp = file_get_contents($url);   
    $_b = str_replace("{contact_name}","".$para["contact_name"]."",$fp);
    $_c = str_replace("{contact_tel}","".$para["contact_tel"]."",$_b);
    $_d = str_replace("{contact_email}","".$para["contact_email"]."",$_c);
    $_e = str_replace("{contact_content}","".$para["contact_content"]."",$_d);    
    return $_e;
}

//寄信功能
function phpMail($subject,$body,$to){    
    include_once(dirname(__FILE__)."/../PHPMailer/PHPMailerAutoload.php");    
    
    $mail = new PHPMailer();
    //$mail->SMTPDebug = 1; 
    $mail->IsSMTP(); 
    $mail->SMTPAuth = true; //設定SMTP需要驗證 
    $mail->SMTPSecure = "ssl"; // Gmail的SMTP主機需要使用SSL連線 
    //$mail->Host = "smtp.gmail.com"; //Gamil的SMTP主機 
    $mail->Host = "smtp.zoho.com"; //zoho的SMTP主機 
    $mail->Port = 465; //Gamil的SMTP主機的SMTP埠位為465埠。 
    
    //$mail->Username = "system-service@piece2ec.com.tw"; //設定驗證帳號 
    //$mail->Password = "piece2"; //設定驗證密碼 
    //$mail->From = "system-service@piece2ec.com.tw"; //設定寄件者信箱 
    //$mail->FromName = "PIECE2巨群-客服服務部"; //設定寄件者姓名
    
    //$mail->Username = "vitajuwel.service@gmail.com"; //設定驗證帳號 
    $mail->Username = "service@vitajuwelys.com"; //設定驗證帳號 
    //$mail->Password = "peiluxugfdhrleuo"; //設定驗證密碼 網站登入的密碼 p@s5w0rd
    $mail->Password = "juwelysvitatw"; //設定驗證密碼 網站登入的密碼 p@s5w0rd
    //$mail->From = "vitajuwel.service@gmail.com"; //設定寄件者信箱 
    $mail->From = "service@vitajuwelys.com"; //設定寄件者信箱 
    //$mail->FromName = "vitajuwel-線上諮詢"; //設定寄件者姓名
    $mail->FromName = "vitajuwel-線上諮詢"; //設定寄件者姓名

    //設定收件者 
    $mail->AddAddress($to);
    //設定密件副本 
    //$mail->AddBCC("[信箱]"); 
    
    //設定信件字元編碼 
    $mail->CharSet="utf-8"; 
    //設定信件編碼，大部分郵件工具都支援此編碼方式 
    $mail->Encoding = "base64"; 
    //設置郵件格式為HTML 
    $mail->IsHTML(true); 
    //每1000自斷行 
    $mail->WordWrap = 1000; 
    
    //傳送附檔 
    //$mail->AddAttachment("upload/temp/filename.zip"); 
    //傳送附檔的另一種格式，可替附檔重新命名 
    //$mail->AddAttachment("upload/temp/filename.zip", "newname.zip"); 
    
    //郵件主題 
    $mail->Subject=$subject; 
    //郵件內容
    $siteLink = "<br /><br />";
    $mail->Body = $body.$siteLink; //附加內容 
    // $mail->AltBody = '這是附加的信件內容'; 
    
    //寄送郵件 
    if(!$mail->Send()){
        return "郵件無法順利寄出! Mailer Error: ".$mail->ErrorInfo;
    }
}