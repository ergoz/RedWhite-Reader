/**
 * Функция проверяет установлен ли какой либо тип экрана
 * @returns Установлена ли система
 */
function is_system(){
    var System = window.localStorage.getItem("systype");
    var status = false;
    if(System == "phone"){
	status = true;
    }
    if(System == "tablet"){
	status = true;
    }
    return status;
}

/**
 * Функция проверяет какой тип экрана установлен пользователем и делает редирект на нужный раздел
 */
function GetSystem(){
    Systype = window.localStorage.getItem("systype");
    if(Systype == "phone"){
	location.replace("./phone/index.html");
    }
    if(Systype == "tablet"){
	location.replace("./tablet/index.html");
    }
}

/**
 * Функция выполняет загрузку контента
 */
function load_content() {

    window.localStorage.setItem('litenews',"");
    window.localStorage.setItem('fullnews',"");
    window.localStorage.setItem('twcontent',"");
    window.localStorage.setItem('main-table',"");
    window.localStorage.setItem('ytcontent',"");
    window.localStorage.setItem('ytfullcontent',"");


    // ГРУЗИМ РЕКЛАМУ
    $.get('http://ergoz.ru/rwreader/ads.php', function(data){
	window.localStorage.setItem("ads", data);
    });


    // ГРУЗИМ НОВОСТИ
    $.ajax({
	type: "GET",
	url: "http://ergoz.ru/rwreader/rw-rss.xml",
	dataType: "xml",
	timeout: 60000,
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
	    fullnews = fullnews + '<div id="nid'+counter+'">' + $(this).find("yadetail").text() + '</div-last>';
	    counter=counter+1;
	});
	window.localStorage.setItem('litenews', litenews);
	window.localStorage.setItem('fullnews', fullnews);
    }

    function xmlError(xml, textStatus, jqXHR) {
	alert("Error Loading News: "+textStatus+" "+jqXHR);
    }


    // ГРУЗИМ ТВИТТЕР
    $.ajax({
	type: "GET",
	url: "http://ergoz.ru/rwreader/tw-rss.xml",
	dataType: "xml",
	timeout: 60000,
	crossDomain: true,
	async: true,
	success: TWxmlParser,
	error: TWxmlError
    });

    function TWxmlParser(xml) {
	var twcontent = "";
	$(xml).find("item").each(function () {twcontent = twcontent + '<li><a href="' + $(this).find("link").text() + '"><h1>' + $(this).find("title").text() + '</h1><p>' + $(this).find("pubDate").text() + '</p></a></li>';});
	window.localStorage.setItem('twcontent', twcontent);
    }

    function TWxmlError(xml, textStatus, jqXHR) {
	alert("Error Loading Twitter: "+textStatus+" "+jqXHR);
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
	timeout: 60000,
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
	alert("Error Loading Youtube: "+textStatus+" "+jqXHR);
    }
}


/**
 * Функция устанавливает значение типа экрана в режим для Планшета
 */
function SetPadSystem() {
    window.localStorage.setItem("systype", "tablet");
    GetSystem();
}



/**
 * Функция устанавливает значение типа экрана в режим для Смартфона
 */
function SetPhoneSystem() {
    window.localStorage.setItem("systype", "phone");
    GetSystem();
}


/**
 * Функция начинает инициализацию всех систем и обработок
 */
function start_all_systems() {
    if(is_system()) {
	load_content();
	GetSystem();
	var ads = window.localStorage.getItem("ads");
	$('ads').html(ads);
    } else {
	$(".first-run").css("display","block");
	load_content();
	//SetPhoneSystem();
	var ads = window.localStorage.getItem("ads");
	$('ads').html(ads);
     }
}

/**
 * Callback вызываемый при нажатии кнопки назад на главном экране
 */
function onBackKeyDown() {
	alert('back pressed');
}


$(document).ready(function(){
    	start_all_systems();
	document.addEventListener("backbutton", onBackKeyDown, false);
});