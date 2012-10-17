/**
 * Обработка Таблицы Чемпионата России
 * @param {Object} data Объект полученный из JSON запроса
 */
function ParseTables(data) {
    window.localStorage.setItem("tables", data);
}