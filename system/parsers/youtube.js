/**
 * Обработка Youtube ленты ФК Спартак Москва
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseYoutube(data) {
    window.localStorage.setItem("youtube", data);
}