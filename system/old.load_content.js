function load_content() {

    //window.localStorage.setItem('litenews',"");
    //window.localStorage.setItem('fullnews',"");
    //window.localStorage.setItem('twcontent',"");
    //window.localStorage.setItem('main-table',"");
    //window.localStorage.setItem('ytcontent',"");
    //window.localStorage.setItem('ytfullcontent',"");


    // ГРУЗИМ НОВОСТИ
    $.ajax({
	type: "GET",
	url: "http://ergoz.ru/rwreader/rw-rss.xml",
	dataType: "xml",
	timeout: 30000,
	crossDomain: true,
	async: true,
	success: xmlParser,
	error:xmlError
    });

    function xmlParser(xml) {
	var counter = 0;
	var litenews = "";
	var fullnews = "";
	$(xml).find("item").each(function () {
	    litenews = litenews + '<li><a href="./detail.html?nid='+ counter + '" data-ajax="false">' + $(this).find("title").text() + '</a></li>';
	    fullnews = fullnews + '<div id="nid'+counter+'"><h1>' + $(this).find("title").text() + '</h1>' + $(this).find("yadetail").text() + '</div-last>';
	    counter=counter+1;
	});
	window.localStorage.setItem('litenews', litenews);
	window.localStorage.setItem('fullnews', fullnews);
    }

    function xmlError(xml, textStatus, jqXHR) {
	alert("Error Loading News: "+textStatus+" "+jqXHR+" "+xml);
    }


    // ГРУЗИМ ТВИТТЕР
    $.ajax({
	type: "GET",
	url: "http://ergoz.ru/rwreader/tw-rss.xml",
	dataType: "xml",
	timeout: 30000,
	crossDomain: true,
	async: true,
	success: TWxmlParser,
	error: TWxmlError
    });

    function TWxmlParser(xml) {
	var twcontent = "";
	$(xml).find("item").each(function () {twcontent = twcontent + '<li><a href="' + $(this).find("link").text() + '" target="_blank"><h1>' + $(this).find("title").text() + '</h1><p>' + $(this).find("pubDate").text() + '</p></a></li>';});
	window.localStorage.setItem('twcontent', twcontent);
    }

    function TWxmlError(xml, textStatus, jqXHR) {
	alert("Error Loading Twitter: "+textStatus+" "+jqXHR+" "+xml);
    }


    // ГРУЗИМ ТАБЛИЦЫ
    $.get('http://ergoz.ru/rwreader/content.php?ask=table-tour', function(data){
	window.localStorage.setItem("main-table", data);
    });


    // ГРУЗИМ YOUTUBE
    $.ajax({
	type: "GET",
	url: "http://ergoz.ru/rwreader/yt-rss.xml",
	dataType: "xml",
	timeout: 30000,
	crossDomain: true,
	async: true,
	success: YTxmlParser,
	error: YTxmlError
    });

    function YTxmlParser(xml) {
	var counter = 0;
	var ytcontent = "";
	var ytfullcontent = "";
	$(xml).find("item").each(function () {
	    ytcontent = ytcontent + '<li><a href="./detail-yt.html?nid='+ counter + '" data-ajax="false"><h1>' + $(this).find("title").text() + '</h1><p>' + $(this).find("description").text() + '</p><p>' + $(this).find("pubDate").text() + '</p></a></li>';
	    ytfullcontent = ytfullcontent + '<div  id="nid'+counter+'">' + $(this).find("content").text() + '</div-last>';
	    counter = counter+1;
	});
	window.localStorage.setItem('ytcontent', ytcontent);
	window.localStorage.setItem('ytfullcontent', ytfullcontent);
    }

    function YTxmlError(xml, textStatus, jqXHR) {
	alert("Error Loading Youtube:  "+textStatus+" "+jqXHR+" "+xml);
    }



    // ГРУЗИМ РЕКЛАМУ
    $.get('http://ergoz.ru/rwreader/ads.php', function(data){
	window.localStorage.setItem("ads", data);
    });

}