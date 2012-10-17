/**
 * Обработка Новостей ФК Спартак Москва
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseNews(data) {
    window.localStorage.setItem("news", data);
}