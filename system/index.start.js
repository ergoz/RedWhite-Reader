/**
 * Функция проверяет установлен ли какой либо тип экрана
 * @returns {Boolean} Установлена ли система
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

    //window.localStorage.setItem('news',"");
    //window.localStorage.setItem('twitter',"");
    //window.localStorage.setItem('tables',"");
    //window.localStorage.setItem('youtube',"");
    //window.localStorage.setItem('onlinetv',"");
    //window.localStorage.setItem('onlinetext',"");
    //window.localStorage.setItem('calendar',"");

    $.getJSON("http://ergoz.ru/rwreader/json.php?jsoncallback=?",
	    {
		format: "json",
		news: "true",
		twitter: "true",
		tables: "true",
		youtube: "true",
		online_tv: "true",
		online_text: "true",
		calendar: "true"
	    },
	   function(data, textStatus) {
		if(textStatus == "success") {
		    $.include('./parsers/news.js');
		    //$.include('./parsers/twitter.js');
		    //$.include('./parsers/tables.js');
		    //$.include('./parsers/youtube.js');
		    //$.include('./parsers/online_text.js');
		    //$.include('./parsers/online_tv.js');
		    //$.include('./parsers/calendar.js');

		    ParseNews(data.news);
		    alert($(data.news).text());
		    alert(window.localStorage.getItem("news"));

		    //ParseTwitter(data.twitter);
		    //ParseTables(data.tables);
		    //ParseYoutube(data.youtube);
		    //ParseOnlineTEXT(data.online_text);
		    //ParseOnlineTV(data.online_tv);
		    //ParseCalendar(data.calendar);
		} else {
		    alert("Ошибка: "+textStatus);
		}
	    });

    // ГРУЗИМ РЕКЛАМУ
    $.get('http://ergoz.ru/rwreader/ads.php', function(data){
	window.localStorage.setItem("ads", data);
    });
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
	//GetSystem();
	var ads = window.localStorage.getItem("ads");
	$('ads').html(ads);
    } else {
	$(".first-run").css("display","block");
	load_content();
	var ads = window.localStorage.getItem("ads");
	$('ads').html(ads);
     }
}


/**
 * ЗАПУСК ВСЕХ СИСТЕМ С ТАЙМАУТОМ!
 */
$(document).ready(function(){
    setTimeout("start_all_systems()", 1000);
});