/**
 * Обработка Календаря ФК Спартак Москва
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseCalendar(data) {
    window.localStorage.setItem("news", data);
}