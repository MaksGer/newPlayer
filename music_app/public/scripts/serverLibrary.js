// ********* ФУНКЦИИ для работы с "серваком" ********

// функция получения данных по ключу
// если инфы по такому ключу нет, то вернет null
function getFromServer(key) {
	return localStorage.getItem(key);
}

// функция записи данных для НОВОГО ключа
// в случае успешной записи вернет true, иначе false
// а запись будет успешной если на "серваке" НЕ БЫЛО данных по передаваемому ключу
function newToServer(key, value) {
	if (!localStorage.getItem(key)) {
		localStorage.setItem(key, value);
		return true;
	}
	else {return false;}
}

// функция перезаписи данных по существующему ключу
// вернет true в случае успешной записи, иначе false
// а запись будет успешной если на "серваке" есть данные по передаваемому ключу,
// которые можно перезаписать
function overwriteToServer(key, value) {
	if (localStorage.getItem(key)) {
		localStorage.setItem(key, value);
		return true;
	}
	else {return false;}
}

// для очистки всего localStorage. (техническая, для тестов)
function clearLocal() {
	localStorage.clear();
}