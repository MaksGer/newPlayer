;creatDefaultLists();
creatUsers('aza-za', 'Ivanko', 'barmaley');

console.log('Текущее состояние объектов');
console.log('playlist');
console.log(JSON.parse(getFromServer('playlist')));
console.log('activeUser');
console.log(JSON.parse(getFromServer('activeUser')));
console.log('users');
console.log(JSON.parse(getFromServer('users')));


function creatDefaultLists() {
	if (newToServer('defaultLists', 'Временно пуст')) {
		let defaultLists = {"Подъем!": null, "Для бега": null, "За рулем": null, "Релакс": null, "Чтоб заснуть": null};
		for (let key in defaultLists) {
			defaultLists[key] = creatPlayList();
		}
		overwriteToServer('defaultLists', JSON.stringify(defaultLists));
	}

	function creatPlayList() {
		let playlist = [];
		for (let i = 0; i < newSongs.length; i++) {
			playlist[i] = new CreatNewSong(i);
		}
		return playlist;

		function CreatNewSong(index) {
			this.performer = newSongs[index].performerName;
			this.soundName = newSongs[index].songName;
		}
	}
}

function creatUsers() {
	if (newToServer('users', 'Временно пуст')) {
		let users = {};
		for (let i = 0; i < arguments.length; i++) {
			users[arguments[i]] = new getUser();
		}
		let usersJSON = JSON.stringify(users);
		overwriteToServer('users', usersJSON);
	}

	function getUser() {
		this.password = '11111';
		this.playLists = JSON.parse(getFromServer('defaultLists'));
	}
}
