/**
 * UTF-8 Decoder
 * @param {String} utftext
 * @returns {String}
 */
function utf8 (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

        c = utftext.charCodeAt(i);

        if (c < 128) {
        string += String.fromCharCode(c);
        i++;
        }
        else if((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i+1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
        }
        else {
        c2 = utftext.charCodeAt(i+1);
        c3 = utftext.charCodeAt(i+2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
        }

        }

        return string;
}


/**
 * Base64 декодер
 * @param {String} data
 * @returns {String} Utf-8 string
 */
function base64_decode( data ) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';

    do {
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));

        bits = h1<<18 | h2<<12 | h3<<6 | h4;

        o1 = bits>>16 & 0xff;
        o2 = bits>>8 & 0xff;
        o3 = bits & 0xff;

        if (h3 == 64)      enc += String.fromCharCode(o1);
        else if (h4 == 64) enc += String.fromCharCode(o1, o2);
        else               enc += String.fromCharCode(o1, o2, o3);
    } while (i < data.length);

    return utf8(unescape(enc));
}



/**
 * Обработка Новостей ФК Спартак Москва
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseNews(data) {
    window.localStorage.setItem("news", JSON.stringify(data));
}

/**
 * Обработка Twitter ФК Спартак Москва
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseTwitter(data) {
    window.localStorage.setItem("twitter", JSON.stringify(data));
}

/**
 * Обработка Таблицы Чемпионата России
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseTables(data) {
    window.localStorage.setItem("tables", JSON.stringify(data));
}

/**
 * Обработка Youtube ленты ФК Спартак Москва
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseYoutube(data) {
    window.localStorage.setItem("youtube", JSON.stringify(data));
}

/**
 * Обработка Онлайн Теле Трансляций
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseOnlineTV(data) {
    window.localStorage.setItem("onlinetv", JSON.stringify(data));
}

/**
 * Обработка Онлайн Текстовых Трансляций
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseOnlineTEXT(data) {
    window.localStorage.setItem("onlinetext", JSON.stringify(data));
}

/**
 * Обработка Календаря ФК Спартак Москва
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseCalendar(data) {
    window.localStorage.setItem("calendar", JSON.stringify(data));
}



/**
 * Функция выполняет загрузку контента и занесение в локал сторадж
 */
function load_content() {
    // ГРУЗИМ РЕКЛАМУ
	 $.ajaxSetup({
	     timeout: 10000 //10 sec
	  });

	$.get('http://ergoz.ru/rwreader/ads.php', function(data){
		window.localStorage.setItem("ads", "");
    });

    $.getJSON("http://ergoz.ru/rwreader/json.php?jsoncallback=?",
	    {
		format: "json",
		news: "true",
		twitter: "true",
		tables: "true",
		youtube: "true",
		online_tv: "true",
		online_text: "true",
		calendar: "true",
		nocache: Math.round(new Date().getTime())
	    },
	   function(data, textStatus) {
	    	if(textStatus == "success") {
	    		window.localStorage.setItem('news',"");
	    		window.localStorage.setItem('twitter',"");
	    		window.localStorage.setItem('tables',"");
	    		window.localStorage.setItem('youtube',"");
	    		window.localStorage.setItem('onlinetv',"");
	    		window.localStorage.setItem('onlinetext',"");
	    		window.localStorage.setItem('calendar',"");

	    		ParseNews(data.news);
	    		ParseTwitter(data.twitter);
	    		ParseTables(data.tables);
	    		ParseYoutube(data.youtube);
	    		ParseOnlineTEXT(data.online_text);
	    		ParseOnlineTV(data.online_tv);
	    		ParseCalendar(data.calendar);
	    		$('.progress-console').html("Контент загружен!");
	    		$.mobile.changePage( "#pnews", {transition: "fade", reverse: false, changeHash: true} );
	    	} else {
	    		alert("Ошибка: "+textStatus+"\n"+"Обновление контента небыло загружено. \nДля его обновления закройте приложение и откройте заново или используйте устаревшую версию.");
	    		$.mobile.changePage( "#pnews", {transition: "fade", reverse: false, changeHash: true} );
	    	}
	    });
}


/**
 * Функция начинает инициализацию всех систем и обработок
 */
function start_all_systems() {
	load_content();
	var ads = window.localStorage.getItem("ads");
	$('ads').html(ads);
}


$(document).bind( "pagebeforechange", function( e, data ) {
    	// We only want to handle changePage() calls where the caller is
    	// asking us to load a page by URL.
    	if ( typeof data.toPage === "string" ) {

    		// We are being asked to load a page by URL, but we only
    		// want to handle URLs that request the data for a specific
    		// category.
    		var u = $.mobile.path.parseUrl( data.toPage );
    		var newspagepreg = /^#pnewsdetail\?nid\=/;
			var youtubepagepreg = /^#pyoutubedetail\?nid\=/;

    		if ( u.hash.search(newspagepreg) !== -1 ) {
				var nID = u.hash.replace( newspagepreg, "" );
	        	var mnews = window.localStorage.getItem("news");
	        	var objnews = new Object;
	        	objnews = JSON.parse(mnews);
	       		$('#pnewsdetail #news-detail-content').html('<h2>'+objnews[nID].title+'</h2><p>'+objnews[nID].content+'</p>');
    		}
			if ( u.hash.search(youtubepagepreg) !== -1 ) {
				var nID = u.hash.replace( youtubepagepreg , "" );
	        	var mnews = window.localStorage.getItem("youtube");
	        	var objnews = new Object;
	        	objnews = JSON.parse(mnews);
	       		$('#pyoutubedetail #youtube-detail-content').html('<h2>'+objnews[nID].title+'</h2><p>'+objnews[nID].content+'</p>');
    		}

    	}
    });



$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
	$.mobile.phonegapNavigationEnabled = false;
    $.mobile.allowCrossDomainPages = true;
//  $.mobile.fixedToolbars.show = true;
	$.mobile.pageLoadErrorMessage = 'Раздел в разработке!';
//	$.mobile.touchOverflowEnabled = true;
});


/**
 * ЗАПУСК ВСЕХ СИСТЕМ
 */
$(document).ready(function(){
    start_all_systems();




/**
	Новостная страница. Начало.
	После загрузки контента мы уходим с неё удалив за собой историю.
*/
    $( document ).delegate("#pnews", "pageinit", function() {

    	var ads = window.localStorage.getItem("ads");
		$('ads').html(ads);

		var mnews = window.localStorage.getItem("news");
        var objnews = new Object;
        objnews = JSON.parse(mnews);

        var ctnews = '';
        var counter = 0;
        objnews.forEach(function(item){
            ctnews = ctnews + '<li><a href="#pnewsdetail?nid='+ counter + '" ><h1>' + item.title + '</h1><p>' + item.published + '</p></a></li>';
            counter = counter + 1;
        });

        $('#pnews #rss-news').html(ctnews);
        $("#pnews #rss-news").listview('refresh');

  	});





	/**
    	Twitter страница. Начало.
    	После загрузки контента мы уходим с неё удалив за собой историю.
	*/
        $( document ).delegate("#ptwitter", "pageinit", function() {
        	var ads = window.localStorage.getItem("ads");
    		$('ads').html(ads);

    	    var mtwitter = window.localStorage.getItem("twitter");
    	    var objtwitter = new Object;
    	    objtwitter = JSON.parse(mtwitter);

    	    var cttwitter = '';
    	    objtwitter.forEach(function(item){
    	      cttwitter = cttwitter + '<li><a href="'+ item.link + '" data-ajax="false" target="_blank" rel="external"><h1>' + item.title + '</h1><p>' + item.published + '</p></a></li>';
    	    });

    	    $('#ptwitter #tw-news').html(cttwitter);
    	    $("#ptwitter #tw-news").listview('refresh');
      	});






        /**
      	Таблицы чемпионата страница. Начало.
      	После загрузки контента мы уходим с неё удалив за собой историю.
  */
   $( document ).delegate("#ptables", "pageinit", function() {
         var mtables = window.localStorage.getItem("tables");
         var objtables = new Object;
         objtables = JSON.parse(mtables);

         $('#ptables #tables-content').html("<center><h2>Таблица Чемпионата России 2012/2013</h2></center>"+base64_decode(objtables[0].content));
   });





   /**
 	Таблицы чемпионата страница. Начало.
 	После загрузки контента мы уходим с неё удалив за собой историю.
*/
$( document ).delegate("#pcalendar", "pageinit", function() {
    var mcals = window.localStorage.getItem("calendar");
    var objcals = new Object;
    objcals = JSON.parse(mcals);

    $('#pcalendar #pcalendarlist').html(base64_decode(objcals[0].content));
});







        /**
      	Youtube страница. Начало.
      	После загрузки контента мы уходим с неё удалив за собой историю.
    */
    $( document ).delegate("#pyoutube", "pageinit", function() {
    	var myyoutube = window.localStorage.getItem("youtube");
        var objyoutube = new Object;
        objyoutube = JSON.parse(myyoutube);

        var ctyoutube = '';
        var counter = 0;
        objyoutube.forEach(function(item){
        	ctyoutube = ctyoutube + '<li><a href="#pyoutubedetail?nid='+ counter + '"><h1>' + item.title + '</h1><p>' + item.published + '</p></a></li>';
        	counter = counter + 1;
        });

        $('#pyoutube #yt-news').html(ctyoutube);
        $("#pyoutube #yt-news").listview('refresh');
   });


});