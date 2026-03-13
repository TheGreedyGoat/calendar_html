let currentPokemon;
/**
 * to check how we write numbers, wich wallpaper to choose etc.
 */
function checkForSpecialFormatting() {
    let dateContainers = dataSheet.htmlSheet.querySelectorAll(DATE_CONTAINER_CLASS_NAME);
    let holidaysArr = Holidays.getHolidays(activeDayDate).split(',');

    let format = function (n) { return n };
    let wallpaper = 'UglyWallpaper.png'
    let windowScene = 'road_background.png';
    let car = 'car.png';
    if (holidaysArr != null) {
        for (let i = 0; i < holidaysArr.length; i++) {
            let holiday = holidaysArr[i];


            switch (holiday) {
                case 'e-day':
                    format = eFormat;
                    break;
                case 'PI-Day':
                    format = piFormat;
                    break;
                case 'Star Wars Day':
                    wallpaper = 'R2C3.png';
                    windowScene = 'SW_backGround.png';
                    car = 'falcon.png'
                    break;
                case 'Pokemon Day':
                    fetchRandomPokemon();
                    break;
                default:
                    break;
            }
        }
    }
    for (let i = 0; i < dateContainers.length; i++) {
        let container = dateContainers[i]
        let num = dataSheet.dataStorage[i].date.getDate();
        container.innerHTML = format(num);

    }

    heading = document.getElementById(CALENDAR_HEAD_ID);
    heading.innerHTML = CalendarTools.monthYearStringByNums(currentSheetDate.getMonth(), format(currentSheetDate.getFullYear(), 4));
    document.querySelector('main').style.backgroundImage = 'url(assets/images/wallpapers/' + wallpaper + ')';
    SCENE_WINDOW.style.backgroundImage = 'url(assets/images/window/' + windowScene + ')';
    CAR.setAttribute('src', '/assets/images/window/' + car);
}

/**
 * 
 * @param {number} num 
 * @param {number} digits 
 * @returns {string} 
 */
function eFormat(num, digits = 2) {
    let pow = Math.pow(10, digits)
    let ln = Math.round(pow * (Math.log(num))) / pow;
    return 'e' + '<sup>' + ln + '</sup>';
}

function piFormat(num, digits = 1) {

    let pow = Math.pow(10, digits)
    let piMult = Math.round(pow * num / Math.PI) / pow;
    return piMult + '&#960';
}

function fetchRandomPokemon() {
    let pokeID = Math.ceil(Math.random() * 493); //<= there are no real Pokemon after Gen 4!
    Fetcher.tryFetch('https://pokeapi.co/api/v2/pokemon/' + pokeID + '/', onPokemonRecieved);
    // window.setInterval(fetchRandomPokemon, 5000);
}

function onPokemonRecieved(pokeData) {
    console.log(pokeData)
    currentPokemon = pokeData;
    let spriteURL = Math.random() > 0.1 ? currentPokemon.sprites.front_default : currentPokemon.sprites.front_shiny;
    document.querySelector('main').style.backgroundImage = 'url(' + spriteURL + ')';

    let cryURL = currentPokemon.cries.legacy;
    let cry = new Audio(cryURL);
    cry.volume = 0.01;
    cry.play();

}
