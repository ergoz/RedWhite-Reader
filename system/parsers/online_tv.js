/**
 * Обработка Онлайн Теле Трансляций
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseOnlineTV(data) {
    window.localStorage.setItem("onlinetv", data);
}