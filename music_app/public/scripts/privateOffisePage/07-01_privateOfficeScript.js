// прием имени активного пользователя
// getFromServer() находится в "scripts/serverLibrary.js"
;const ACTIVE_USER = JSON.parse(getFromServer('activeUser'));
// если нет активного пользователя - вернуться на velcomPage
// goTo() находится в "scripts/systemLibrary.js"
if (!ACTIVE_USER){goTo('index.html');}

// Обнуляем playlist на "серваке"
overwriteToServer('playlist', JSON.stringify(null));

// Прием данных
// getFromServer() находится в "scripts/serverLibrary.js"
let musicDataBase = JSON.parse(getFromServer('musicDataBase'));
let users = JSON.parse(getFromServer('users'));

// Определение объекта целей основной страницы
let targetsGlobal = {
	usName : document.getElementById('userName'),
	reLog : document.getElementById('reLogIn'),
	transRating : document.getElementById('transferRating'),
	creListWindow : document.getElementById('creatureList'),
	defList : document.getElementById('defLists'),
	usList : document.getElementById('usLists'),
	listsTemplate: document.getElementById('listsTemplate')
};

// Построение DOM
targetsGlobal.usName.innerText = ACTIVE_USER;
targetsGlobal.defList.innerHTML = getLists();
targetsGlobal.usList.innerHTML = getLists(ACTIVE_USER);


// Расстановка слушателей событий
targetsGlobal.reLog.addEventListener('click', () => {
	// goTo() находится в "scripts/systemLibrary.js"
//	goTo('index.html');
	reLogIn(); // ДЛЯ ТЕСТИРОВАНИЯ!!! УБРАТЬ!!! раскоментить goTo()
});
targetsGlobal.transRating.addEventListener('click', () => {
	// goTo() находится в "scripts/systemLibrary.js"
	goTo('ratingPage.html', true);
});
// startCreateModal() находится в "scripts/privateOffisePage/createModalLibrary.js"
// 3 нижних события вызывают построение модального окна
// окно строится исходя из типа события:
// create - окно для построения плейлиста с нуля,
// default - окно для управления дефолтным плей-литом
// user - окно для управления плей-литом пользователя
// вызываем startCreateModal с двумя аргументами: 1-й - событие, 2-й - название плейлиста
targetsGlobal.creListWindow.addEventListener('click', () => {
	startCreateModal('create', '');
});
targetsGlobal.defList.addEventListener('click', ev => {
	// если кликнули именно по элементу списка
	if (ev.target.className === 'content__defaultListsItem' || ev.target.className === 'content__textItem') {
		startCreateModal('default', ev.target.innerText);
	}
});
targetsGlobal.usList.addEventListener('click', ev => {
	// если кликнули именно по элементу списка
	if (ev.target.classList[0] === 'content__userListsItem' || ev.target.className === 'content__textItem') {
		startCreateModal('user', ev.target.innerText);
	}
});


// функция формирования шаблона для списка плей-листов
function getLists() {
	let dataListsTemplate = {listClass:null, listArray:[]};
	let playLists;
	// формируем объект данных для шаблона
	// если есть входные параметры, то функция запущена для построения списка плей-листов пользователя
	if (arguments.length) {
		dataListsTemplate.listClass = 'user';
		playLists = users[ACTIVE_USER].playLists;
	// иначе строим дефолтный список
	} else {
		dataListsTemplate.listClass = 'default';
		playLists = JSON.parse(getFromServer('defaultLists'));
	}
	let index = 0;
	// формируем массив названий плей-листов
	for (let key in playLists) {
		dataListsTemplate.listArray[index] = key;
		index++;
	}

	let template = _.template(targetsGlobal.listsTemplate.innerHTML);
	return template(dataListsTemplate);
}