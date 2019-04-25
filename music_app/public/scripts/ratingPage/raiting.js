let raitingButton = document.getElementById('wrapper-button-list'),
    list = document.getElementById('trackList'),
    showMore = document.getElementById('trackList_btn'),
    text = document.getElementById('wrapper__text');

function creatTracklistArray() {
    let inputJSON = getFromServer('musicDataBase');
    let dataBase = JSON.parse(inputJSON);
    let trackList = [];
    let index = 0;
    for (let personName in dataBase) {
        for (let song in dataBase[personName].audio) {
            trackList[index] = new GetSong(personName, song);
            ++index;
        }
    }
    function GetSong(personName,song) {
        this.personName = personName;
        this.song = song;
        this.count = dataBase[personName].audio[song].counter;
    }
    return trackList;
}

let sortArray = creatTracklistArray();
sortArray.sort(compareNumeric);

function compareNumeric(a, b) {
    return b.count - a.count;
}

function sortTracklist(tracklist) {
    let templateRes = [];
    let sortArray = tracklist.sort(compareNumeric);
    for (let i=0; i<=sortArray.length-1; i++) {
        let template = `<li class="trackList-elements">${sortArray[i].personName} - ${sortArray[i].song}<div class="stars-outer"><div class="stars-inner"></div></div></li>`;
        templateRes.push(template);
    }
    return templateRes;
}
let listArray = sortTracklist(creatTracklistArray());

function getRatings() {
    let starsInner = document.querySelectorAll(".stars-inner");
    for (let i=0; i<= starsInner.length-1; i++) {
        const starPercentageRounded = `${Math.round(sortArray[i].count)}%`;
        document.querySelectorAll(".stars-inner")[i].style.width = starPercentageRounded;
    }
}

raitingButton.addEventListener('click', (e) => {
    let click = e.target;
    const interval = 10,
          top10 = 10,
          top25 = 25,
          top50 = 50,
          top100 = 100;
    let result = "",
        topArray,
        counter = top50;
    showMore.style.display = "none";
    text.style.display = "none";
    switch (click.dataset.index) {
        case '10':
            topArray = listArray.slice(0, top10);
            break;
        case '25':
            topArray = listArray.slice(0, top25);
            break;
        case '50':
            topArray = listArray.slice(0, top50);
            break;
        case '100':
            topArray = listArray.slice(0, top50);
                showMore.style.display = "block";
    }
    for (let i=0; i<=topArray.length-1; i++) {
        result += topArray[i];
    }
    list.innerHTML = result;

    function touchShowMore() {
        topArray = listArray.slice(0,counter);
        for (let i=0; i<=topArray.length-1; i++) {
            result += topArray[i];
        }
        list.innerHTML = result;
    }

    showMore.addEventListener('click', function(){
        showMore.style.display = "block";
        counter += interval;
        result = "";
        if (counter < top100) {
            touchShowMore();
        }
        else if (counter == top100){
            showMore.style.display = "none";
            touchShowMore();
        }
        getRatings();
    });
    getRatings();
});








