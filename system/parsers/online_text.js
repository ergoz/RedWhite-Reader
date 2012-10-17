/**
 * Обработка Онлайн Текстовых Трансляций
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseOnlineTEXT(data) {
    window.localStorage.setItem("onlinetext", data);
}