/**
 * Обработка Twitter ФК Спартак Москва
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseTwitter(data) {
    window.localStorage.setItem("twitter", data);
}