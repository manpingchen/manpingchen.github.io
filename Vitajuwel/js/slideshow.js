$(function(){
	
	var N=0; 
	var TT=0; //宣告一個變數，等一下要給計時器用
	
	
	$("#slide_nav li").eq(0).addClass("CC"); //預設：讓第一個 li 變藍色
	$("#slideshow li").eq(0).css("opacity",1);

//==設定圖片輪播和計時器================================================

	function GOGO(){
		$("#slideshow li").stop(true,false).css("opacity",0).eq(N).animate({opacity:1},2000); //圖片做動畫
		$("#slide_nav li").removeClass("CC").eq(N).addClass("CC"); 
				
		if(N<3){
			N+=1; 
			
		}else{
			N=0;
			
		}
		
		
		TT = setTimeout(GOGO,5000); //設定 TT 變數計時器
		
	}
	
	GOGO(); //自動啟動上面的圖片輪播 GOGO() 裡面的程式
	

//==滑鼠摸到的時候就清除計時器===========================================
	
	$("#slideshow, #slide_nav").hover(function(){ 
		clearTimeout(TT); //清除 TT 計時器
	},function(){
		TT = setTimeout(GOGO,5000); //重新啟動 TT 計時器
	});
	
	
//==滑鼠點選下面的數字就跳到指定的圖片====================================
	
	$("#slide_nav li").click( function(){
		clearTimeout(TT); //清除 TT 計時器
		if (N != $(this).index()) {
			N = $(this).index();
			$("#slideshow li").stop(true,false).css("opacity",0).eq(N).animate({opacity:1},2000); //圖片做動畫
			$(this).addClass("CC").siblings().removeClass("CC");
		}
		
		
		
	});
	
});


