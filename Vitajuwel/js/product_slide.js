$(function () {
	
	var timer = 0; // 輪播計時器
	var n = -1; // 圖片順序
	var position = 0; // 圖片位置
	var timerSec = 6000; // 自動輪播時間
	var animateSec = 600; // 動畫時間
	var distance = -1010; // 動畫距離
	var slideImg = $("#product_slide li"); // 輪播圖片	
	// 產品對應圖片與文字
	var json = {
		"p1" : { "pic1" : "j_bg1", "pic2" : "j1_b", 
		"title" : "保健基礎", 
		"subTitle" : "玫瑰石英、紫水晶、水晶石", 
		"content" : "這三種寶石的組合專家稱之為基礎組合，已相當廣泛地運用在水的能量提升上。<br>長久以來，這個組合的功效卓著，但過去往往是以將寶石裸置在水中的方式。<br>此種寶石能量水喝起來口感輕柔舒適，將喝水的感官體驗推至高峰。" },

		"p2" : { "pic1" : "j_bg2", "pic2" : "j2_b", 
		"title" : "健美纖體", 
		"subTitle" : "紅碧玉、菱鎂礦、水晶石", 
		"content" : "您想減重，或是擁有一個更窈窕健美的身材嗎？<br>您希望提升體內的新陳代謝能力嗎？<br>除了運動與健康飲食之外，沒有任何物質能像高品質、純淨又活化的水能帶給您更多的幫助了。<br>將VitaJuwel®窈窕纖體組合納入您的健美計畫中吧，它將為您帶來驚喜！" },

		"p3" : { "pic1" : "j_bg3", "pic2" : "j3_b", 
		"title" : "內在的純淨", 
		"subTitle" : "海藍寶石、水晶石", 
		"content" : "水是生命的靈藥！為了維持健康，您的身體需要一個運作良好的代謝過程。<br>沒有任何一種飲料能像純淨、無有害物質和活化過的水一樣，更適合長久持續的帶給身體幫助了。<br>喝好水您將見證一個好的副作用：體內的純淨從您的外在就能看見。" },

		"p4" : { "pic1" : "j_bg4", "pic2" : "j4_b", 
		"title" : "再生修復", 
		"subTitle" : "綠寶石、水晶石", 
		"content" : "有許多方法可以加強身體的免疫功能，並在身體受到感染和發炎的時候，增強身體自癒的能力。<br>人體有70%是由水組成的；最簡單的方式就是，每天飲用純淨健康的好水。" },

		"p5" : { "pic1" : "j_bg5", "pic2" : "j5_b", 
		"title" : "五行元素", 
		"subTitle" : "海紫水晶、玉髓、木化石、玫瑰石英、海洋玉髓", 
		"content" : "中國傳統哲學將生命描述為一個不斷變化的過程。<br>生命中的每一個面向，都和五行元素（金、木、水、火、土）相呼應。<br>此款五行元素組合為每個生命的特定面向（如新生、發展、平衡、衰退和生命力）配置的一種合適的寶石，而每種代表的寶石皆與該元素相匹配。" },

		"p6" : { "pic1" : "j_bg6", "pic2" : "j6_b", 
		"title" : "充沛活力", 
		"subTitle" : "玉髓、苔紋瑪瑙、奶蛋白石", 
		"content" : "對許多人來說，從內在和外在獲取力量通常是指－他們與自己和周遭的環境達到最和諧狀態的時候。<br>協助我們的內在獲取能量，意味著要增加對身體細胞氧氣和養分的供給，以及促進體內廢物的排出。<br>當身體的代謝情況良好的時候，老化就會減緩，而細胞的活性也會提高。<br>純淨充滿活力的水能完美的支持身體的代謝過程。" },

		"p7" : { "pic1" : "j_bg7", "pic2" : "j7_b", 
		"title" : "愛上喝水", 
		"subTitle" : "方鈉石、水晶石", 
		"content" : "「您不是生病，您是渴了！」全世界知名的醫生F. 巴特曼（Fereydoon Batmanghelidj） 在他的書中如此寫道。<br>很多人覺得要喝夠足量的水很困難，那是因為他們已經失去感覺口渴的本能。<br>請您再次找回口渴的感覺吧！<br>您的身體將以意想不到的好副作用來感謝您。" },

		"p8" : { "pic1" : "j_bg8", "pic2" : "j8_b", 
		"title" : "養顏護膚", 
		"subTitle" : "紫水晶、東菱石英、玫瑰石英", 
		"content" : "從體內來呵護您的美麗吧！每個人都會變老，那是一定的，但是我們不必要看起來蒼老。<br>細緻平滑的肌膚是年輕健康的表徵，每個人都想要長長久久的擁有。<br>對肌膚來說，充足的睡眠、營養的飲食，以及喝足夠純淨的水都很重要；同等重要的還有，盡可能的提供我們的皮膚細胞和組織好的清潔，與合緩洗淨後爽膚的水。<br>現在許多美容沙龍都將VitaJuwel®的精心護膚組合，納入他們的提供給客戶的美容計畫中，一個固定的成員了。" },

		"p9" : { "pic1" : "j_bg9", "pic2" : "j9_b", 
		"title" : "身心和諧", 
		"subTitle" : "玫瑰石英", 
		"content" : "保持身心平衡是健康和活力的基礎。營養學家建議，不同體重的人每天需要喝2～3公升的水才足夠。<br>喝進足量、純淨、具活性的水能夠促進身心和諧的狀態，這即是當今所倡行的「保健」觀念。" },

		"p10" : { "pic1" : "j_bg10", "pic2" : "j10_b", 
		"title" : "獻給孩子", 
		"subTitle" : "紅碧玉、方鈉石、橙色方解石、瑪瑙 (褐)、東菱石英", 
		"content" : "水在兒童體內所佔的比例是最高的。<br>因此對孩童來說，喝純淨清新的好水是至關重要的。特別是成長階段，喝足量純淨的水更是不可或缺。再者，喝水能夠提高孩童的專注力和學習能力。VitaJuwel®－獻給孩子的特別寶石組合，會讓孩子發現寶石的驚奇和力量。多彩的寶石在盛水壺中閃耀著光芒，讓水一下子就變身成小孩子最愛的飲料了。<br>VitaJuwel 和兒童圓夢協會幫助重症兒童完成他們的夢想。<br>「如果你可以許一個願，你最想要的是什麼？」<br>對於罹患重症的孩子來說，這個問題的答案只有一個：「我想要變健康！」儘管這個願望難以圓滿，今天的我們知道對於一個重症的孩子來說，幫助他達成排序第二重要的願望能夠帶給他許多新生的勇氣和生命力。" },

		"p11" : { "pic1" : "j_bg11", "pic2" : "j11_b", 
		"title" : "覺與受之火", 
		"subTitle" : "石榴石、水晶石", 
		"content" : "您是否正在尋找一個美好又特別的禮物，做為結婚禮物或是情人節禮物來送給您所愛的人？<br>需要 為您的生活增添一些熱情嗎？<br>在許多文獻中，石榴石都被認為是欲望和熱情的象徵，它是情人們 完美的選擇！請開啟您的感官，來感受這個獨特的寶石組合所發散出來的振動吧。" },

		"p12" : { "pic1" : "j_bg12", "pic2" : "j12_b", 
		"title" : "靈光乍現", 
		"subTitle" : "青金石、金紅石", 
		"content" : "用您的創造力和獨特見解來改變世界！<br>請您享受一杯，由迷人的金紅石與絕美深藍色的青金石所 活化的水來汲取靈感。在大約六千年前的古埃及，青金石被視為是靈性的象徵。<br>用這個獨特的組 合來增進您的大腦活力吧!" },

		"p13" : { "pic1" : "j_bg13", "pic2" : "j13_b", 
		"title" : "燦陽之晨", 
		"subTitle" : "橙色方解石、水晶石", 
		"content" : "您是否還記得，上一回您在海平面上或是在山中看見日出時的喜悅？<br>那霎時，是什麼樣的原因提 升了您的內在精神，使您回歸生命的核心？<br>閃耀光芒的橙色方解石，它所活化過的寶石能量水將陪伴您再次經歷初見日出時的珍貴情感，無論晴雨，開展每一天！" },

		"p14" : { "pic1" : "j_bg14", "pic2" : "j14_b", 
		"title" : "Halit 王者之鹽", 
		"subTitle" : "Halit 鹽晶體", 
		"content" : "和水晶一樣澄澈，和鑽石一樣充滿力量，halite 鹽是大自然的傑作。<br>獨特的晶體結構使它成為所 有鹽當中最珍貴的一種。<br>遠古時代，這珍貴的鹽磚已被視為力量及具有療癒效果的礦石來運用。 <br>過去，只有王公貴族才能擁有 halite 鹽，它於是得到「王者之鹽」的稱號。<br>水和鹽是細胞新陳代 謝機制中兩個重要的基石。<br>如果您運用此款能量棒，開始喝進愈來愈多的水，而且發現了渴的感 覺，請您不要太驚訝！" },

		"p15" : { "pic1" : "j_bg15", "pic2" : "j15_b", 
		"title" : "體驗鑽石", 
		"subTitle" : "碎鑽、水晶石", 
		"content" : "鑽石是寶石能量水愛好者最好的朋友！<br>過去，人們相信這地球上最珍貴的寶石能傳遞神聖的能 量，並只能為國王和皇后所運用。<br>我們的客戶反應，沒有任何一種寶石能量水喝起來像這個組合 一樣強烈。<br>只要您喝過一次，您就不會想要再喝一般的自來水了。<br>它更是您送給您所珍愛的人的，完美禮物，就如同鑽石戒指或鑽石項鍊一樣獨一無二。" },

		"p16" : { "pic1" : "j_bg16", "pic2" : "j16_b", 
		"title" : "萊茵黃金", 
		"subTitle" : "萊茵黃金、石榴石、水晶石", 
		"content" : "凝視黃金時刻寶石能量棒的時候，時間暫停了。<br>在那片刻我們看見生命中真正重要的事，而日常 中的壓力也被放下。這樣的時刻價值無法估量。<br>江本勝博士和我們都被這樣的美所震懾感動；能量棒反射出其內獨特的寶石組合－從萊茵河人工開採得的萊茵黃金、halite「王者之鹽」，及石榴 石。" }
	}

	// 上一組圖片按鈕
	$("#pre").click(function(event) {
		event.preventDefault();
		resetTimer();

		if (n > 0) {
			n -= 1;
			position = n * distance;
		} else {
			n = 3;
			position = 3 * distance;
		}
		slideImg.stop(true, false).animate({left:position}, animateSec);

	});
	
	// 下一張圖片按鈕
	$("#next").click(function(event){
		event.preventDefault();
		resetTimer();
		
		if (n < 3) {
			n += 1;	
			position = n * distance;

		} else {
			n = 0;
			position = 0;
		}
		slideImg.stop(true, false).animate({left: position}, animateSec);

	});

	// 點擊圖片觸發
	$('#product_slide_list ul li').each(function() {
		$(this).click(function(event) {
			event.preventDefault();

			var index = $(this).index();
			$('#product_slide_list ul li').removeClass("on").eq(index).addClass("on");

			resetTimer();

			changeImageText(index + 1);
			n = parseInt($(this).index() / 5);
		});
	});


	$('#j_pic_3_1').click(function(event){
		event.preventDefault();
		resetTimer();

		$('#j_pic_2').attr('src', $(this).attr('src'));
	});

	$('#j_pic_3_2').click(function(event){
		event.preventDefault();
		resetTimer();

		$('#j_pic_2').attr('src', $(this).attr('src'));
	});


	/*
	*
	* Added by Rick on 2015.03.29
	* When mouse is over the sliding area, sliding effect will be stop, if mouse is out then sliding effect will resume.
	* mouseover -> sliding effect stop
	* mouseout -> sliding effect resume
	* 
	*/
	$("#product_slide_list").bind('mouseover', function(event) {
		/* Act on the event */
		event.preventDefault();
		freezeTimer();		
	}).bind('mouseout', function(event) {
		/* Act on the event */
		event.preventDefault();
		resetTimer();
	});

	
	// 啟動輪播計時器
	setTimer();

	// 設定輪播計時器
	function setTimer() {		
		if(n < 3) {
			n += 1;	
			position = n * distance ;
			slideImg.stop(true, false).animate({left: position}, animateSec);
		} else {
			n = 0;
			position = 0;
			slideImg.stop(true, false).animate({left: position}, animateSec);
		}

		timer = setTimeout(setTimer, timerSec);
	}	
	
	function resetTimer() {
		clearTimeout(timer);
		timer = setTimeout(setTimer, timerSec);
	}

	// Added by Rick on 2015.03.29
	function freezeTimer() {
		clearTimeout(timer);		
	}
	

	// 依產品變更圖片與文字
	function changeImageText(n) {
		var imgPath1 = 'images/' + json['p' + n].pic1 + '.jpg';
		var imgPath2 = 'images/' + json['p' + n].pic2 + '.jpg';

		$('#j_pic_1 img').attr('src', imgPath1);
		$('#j_pic_2').attr('src', imgPath2);
		$('#j_pic_3_1').attr('src', imgPath2);
		$('#j_pic_3_2').attr('src', imgPath1);
		$('.product_detail h1').html(json['p' + n].title);
		$('.product_detail h5').html(json['p' + n].subTitle);
		$('.product_detail p').html(json['p' + n].content);
	}
	
});