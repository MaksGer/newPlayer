// объект целей для построения модального окна
;targetsCreateModal = {
	title: document.getElementById('listTitle'),
	selection: document.getElementById('trackSelection'),
	playlist: document.getElementById('playlist'),
	control: document.getElementById('control')
};

// функция построения модального окна
function startCreateModal(type, namePlaylist) {
	// старт модального окна
	$(function () {
		$('#exampleModal_1').arcticmodal();
	});
	// получаем массив выбранного плейлиста
	let playlist = getPlaylist(type, namePlaylist);
	// в модальном окне предусмотрены 4 секции:
	// 1-я секция - заголовок
	// 2-я секция - панель добавления треков в плей лист
	// 3-я секция - содержимое плейлиста
	// 4-я секция - кнопки управления
	targetsCreateModal.title.innerHTML = createTemplate('listTitle1Template', type, namePlaylist);
	targetsCreateModal.selection.innerHTML = createTemplate('listSelectionTemplate', type);
	targetsCreateModal.playlist.innerHTML = createTemplate('playlistTemplate', type, namePlaylist, playlist);
	targetsCreateModal.control.innerHTML = createTemplate('listControlTemplate', type);
	// manageList() находится в "scripts/privateOffisePage/manageListLibrary.js"
	manageList(type);

	// функция возвращает массив треков плей-листа в зависимости от type
	function getPlaylist(type, namePlaylist){
		if (type === 'create') {
			return null;
		} else if (type === 'default') {
				return JSON.parse(getFromServer('defaultLists'))[namePlaylist];
		} else {
				return users[ACTIVE_USER].playLists[namePlaylist];
		}
	}
}


// функция создания innerHTML из заданного шаблона
function createTemplate(idTemplate, type, namePlaylist) {
	// формируем data-объект для шаблона
	let dataTemplate = {};
	dataTemplate.type = type;
	if (type !== 'create') {
		dataTemplate.name = namePlaylist;
		dataTemplate.playlist = arguments[3];
	}
	// дополнительное событие 'select' для построения выпадающих списков модального окна
	// см. manageListLibrary.js
	if (type === 'select') {
		dataTemplate.base = arguments[3];
	}

	let template = _.template(document.getElementById(idTemplate).innerHTML);
	return template(dataTemplate);
}