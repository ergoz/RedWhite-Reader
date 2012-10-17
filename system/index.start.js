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
 * Обработка Новостей ФК Спартак Москва
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseNews(data) {
    window.localStorage.setItem("news", data);
}

/**
 * Обработка Twitter ФК Спартак Москва
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseTwitter(data) {
    window.localStorage.setItem("twitter", data);
}

/**
 * Обработка Таблицы Чемпионата России
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseTables(data) {
    window.localStorage.setItem("tables", data);
}

/**
 * Обработка Youtube ленты ФК Спартак Москва
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseYoutube(data) {
    window.localStorage.setItem("youtube", data);
}

/**
 * Обработка Онлайн Теле Трансляций
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseOnlineTV(data) {
    window.localStorage.setItem("onlinetv", data);
}

/**
 * Обработка Онлайн Текстовых Трансляций
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseOnlineTEXT(data) {
    window.localStorage.setItem("onlinetext", data);
}

/**
 * Обработка Календаря ФК Спартак Москва
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseCalendar(data) {
    window.localStorage.setItem("news", data);
}



/**
 * Функция выполняет загрузку контента
 */
function load_content() {

    // ГРУЗИМ РЕКЛАМУ
    $.get('http://ergoz.ru/rwreader/ads.php', function(data){
	window.localStorage.setItem("ads", data);
    });

    //window.localStorage.setItem('news',"");
    //window.localStorage.setItem('twitter',"");
    //window.localStorage.setItem('tables',"");
    //window.localStorage.setItem('youtube',"");
    //window.localStorage.setItem('onlinetv',"");
    //window.localStorage.setItem('onlinetext',"");
    //window.localStorage.setItem('calendar',"");
    var reqdate = new Date();

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
		date: reqdate.toLocaleString()
	    },
	   function(data, textStatus) {
		if(textStatus == "success") {
		    alert("all good - parsing started");
		    ParseNews(data.news);

		    var omg_news = window.localStorage.getItem("news");
		    alert($(omg_news).text());

		    ParseTwitter(data.twitter);
		    ParseTables(data.tables);
		    ParseYoutube(data.youtube);
		    ParseOnlineTEXT(data.online_text);
		    ParseOnlineTV(data.online_tv);
		    ParseCalendar(data.calendar);
		    alert("all good - parsing finished");
		} else {
		    alert("Ошибка: "+textStatus);
		}
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