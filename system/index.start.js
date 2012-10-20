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
 * Функция выполняет загрузку контента
 */
function load_content() {

    // ГРУЗИМ РЕКЛАМУ
    $.get('http://ergoz.ru/rwreader/ads.php', function(data){
		window.localStorage.setItem("ads", data);
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
		calendar: "true"
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

		    //alert("Статус: "+textStatus+" -> Начали парсить");
		    ParseNews(data.news);
		    ParseTwitter(data.twitter);
		    ParseTables(data.tables);
		    ParseYoutube(data.youtube);
		    ParseOnlineTEXT(data.online_text);
		    ParseOnlineTV(data.online_tv);
		    ParseCalendar(data.calendar);
		    //alert("Статус: "+textStatus+" -> Закончили парсить");
		    $('.progress-console').html("Контент загружен!");
			GetSystem();
		} else {
		    alert("Ошибка: "+textStatus+"\n"+"Обновление контента небыло загружено. \nДля его обновления закройте приложение и откройте заново или используйте устаревшую версию.");
			GetSystem();
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
    } else {
	$(".first-run").css("display","block");
	load_content();
	var ads = window.localStorage.getItem("ads");
	$('ads').html(ads);
     }
}


/**
 * ЗАПУСК ВСЕХ СИСТЕМ
 */
$(document).ready(function(){
    start_all_systems();
});