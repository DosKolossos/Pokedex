let allLoadedPokemon = [];
let limit = 1;

async function loadAndShowContent() {
    openLoadingScreen();
    await gottaCatchEmAll();
    closeLoadingScreen();
}

async function gottaCatchEmAll() {
    for (let i = limit; i < limit + 30; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/` + i;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allLoadedPokemon.push(currentPokemon);
    }
    getInfo();
    addLoadMore();}

async function getInfo() {
    for (let i = limit - 1; i < allLoadedPokemon.length; i++) {
        let pokemon = allLoadedPokemon[i];
        let name = pokemon.name;
        let index = pokemon.id;
        let picture = pokemon.sprites.other['official-artwork'].front_default;
        let type1 = pokemon.types[0].type.name;
        let type2 = pokemon.types[1] ? pokemon.types[1].type.name : '';
        formatCardInfo(name, index, picture, type1, type2);
    }
}


function searchPokemon() {
    let search = document.getElementById('searchPokemon').value.toLowerCase();
    let list = document.getElementById('main');
    hideLoadMore();
    if (search.length >= 3) {
        list.innerHTML = '';

        allLoadedPokemon.forEach((pokemon) => {
            let name = pokemon.name.toLowerCase();
            if (name.includes(search)) {
                let nameFormatted = formatSummary(pokemon.name);
                let index = pokemon.id;
                let picture = pokemon.sprites.other['official-artwork'].front_default;
                let type1 = allCaps(pokemon.types[0].type.name);
                let type2 = allCaps(pokemon.types[1] ? pokemon.types[1].type.name : '');
                renderCard(nameFormatted, type1, type2, index, picture, type1, type2);
            }
        });
    } else {
        list.innerHTML = '';
        getInfo();
        addLoadMore()
    }
}


function formatCardInfo(n, i, pic, type1, type2) {
    let capFirstLetter = n.charAt(0).toUpperCase() + n.slice(1);
    let allCapsT1 = type1.toUpperCase();
    let allCapsT2 = type2.toUpperCase();
    renderCard(capFirstLetter, allCapsT1, allCapsT2, i, pic, type1, type2);
}

function allCaps(i) {
    let allCaps = i.toUpperCase();
    return allCaps;
}

function formatSummary(n) {
    let capFirstLetter = n.charAt(0).toUpperCase() + n.slice(1);
    return capFirstLetter;
}

function renderCard(capFirstLetter, allCapsT1, allCapsT2, index, pic, type1, type2) {
    document.getElementById('main').innerHTML += `
    <div class="card" onclick="openInfo(${index})">
    <div class="content-row">
        <h2 id="pokemonName">${capFirstLetter}</h2><h2 id="index">#${index}</h2>
    </div>
    <div class="content-row">
        <img src="${pic}" class="card-img">
        <div class="types-column">
            <div class="${type1}1" id="type1">${allCapsT1}</div>
            <div class="${type2}1" id="type2">${allCapsT2}</div>
        </div>
    </div>
</div>`;
}


// OPEN SUMMARY-CARD
async function openInfo(i) {
    let summary = getSummary(i);
    let summaryInfo = getSummaryInfo(i);
    let element = document.getElementById(`infoCard`);
    element.classList.remove("d-none");
    element.innerHTML = renderInfoCard(summary, summaryInfo);
    let infoMiddle = document.getElementById('infoMiddle');
    infoMiddle.innerHTML = loadInfoMiddle(summary);
    showInfo(i);
    checkPosition(i);
    checkSecondType(summary);
}


function checkPosition(i) {
    if (i > 1 && i < allLoadedPokemon.length) {
    } else if (i === 1) {
        document.getElementById('previousButton').classList.add("d-none");
    } else if (i === allLoadedPokemon.length) {
        document.getElementById('nextButton').classList.add("d-none");
    }
}


function showInfo(i) {
    let content = document.getElementById('bottomContent');
    content.innerHTML = ``;
    let button = document.getElementById('showStats');
    button.classList.remove('selected');
    let selected = document.getElementById('showInfo');
    selected.classList.add('selected');
    let selected1 = document.getElementById('showAbilitys');
    selected1.classList.remove('selected');
    let summary = getSummary(i);
    loadInformation(summary);
}


function showStats(i) {
    let content = document.getElementById('bottomContent');
    content.innerHTML = ``;
    let button = document.getElementById('showInfo');
    button.classList.remove('selected');
    let selected = document.getElementById('showStats');
    selected.classList.add('selected');
    let selected1 = document.getElementById('showAbilitys');
    selected1.classList.remove('selected');
    let baseStats = getBaseStats(i);
    loadStats(baseStats);
}


function getBaseStats(i) {
    let baseStat = allLoadedPokemon[i - 1].stats;
    let HP = baseStat['0'].base_stat;
    let ATK = baseStat['1'].base_stat;
    let DEF = baseStat['2'].base_stat;
    let SPA = baseStat['3'].base_stat;
    let SPD = baseStat['4'].base_stat;
    let SPE = baseStat['5'].base_stat;
    let baseSummary = {
        HP: HP,
        ATK: ATK,
        DEF: DEF,
        SPA: SPA,
        SPD: SPD,
        SPE: SPE,
    };
    return baseSummary
}


function showAbilitys(i) {
    let content = document.getElementById('bottomContent');
    content.innerHTML = ``;
    let button = document.getElementById('showAbilitys');
    button.classList.add('selected');
    let selected = document.getElementById('showStats');
    selected.classList.remove('selected');
    let selected1 = document.getElementById('showInfo');
    selected1.classList.remove('selected');
    let summaryInfo = getSummaryInfo(i);
    loadAbilities(summaryInfo);
    onlyOneAbility(i);
    hideSecondAbility(i);
}


function showShiny(i) {
    let pokemon = allLoadedPokemon[i - 1];
    let button = document.getElementById('showRegular');
    document.getElementById('pokemonSprite').src = pokemon.sprites.other['official-artwork'].front_shiny;
    button.classList.remove('selected');
    let selected = document.getElementById('showShiny');
    selected.classList.add('selected');
}


function showRegular(i) {
    let pokemon = allLoadedPokemon[i - 1];
    document.getElementById('pokemonSprite').src = pokemon.sprites.other['official-artwork'].front_default;
    let button = document.getElementById('showShiny');
    button.classList.remove('selected');
    let selected = document.getElementById('showRegular');
    selected.classList.add('selected');
}


function getSummary(i) {
    let pokemon = allLoadedPokemon[i - 1];
    let name = formatSummary(pokemon.name);
    let index = pokemon.id;
    let height = (pokemon.height / 10);
    let weight = (pokemon.weight / 10);
    let type1 = pokemon.types['0'].type.name;
    let type2 = pokemon.types[1] ? pokemon.types[1].type.name : '';
    let regSprite = pokemon.sprites.other['official-artwork'].front_default;
    let shinySprite = pokemon.sprites.other['official-artwork'].front_shiny;
    let summary = {
        name: name,
        index: index,
        regSprite: regSprite,
        shinySprite: shinySprite,
        height: height,
        weight: weight,
        type1: type1.toUpperCase(),
        type2: type2.toUpperCase(),
    };
    return summary;
}


function getSummaryInfo(i) {
    let pokemon = allLoadedPokemon[i - 1];
    let type = pokemon.types[0].type.name;
    let ability1 = formatSummary(pokemon.abilities['0'].ability.name);
    let ability2 = null;
    let hiddenAbility = null;
    if (pokemon.abilities.length === 1) {
        let ability2 = null;
        let hiddenAbility = null;
    }
    else if (pokemon.abilities.length === 3) {
        ability2 = formatSummary(pokemon.abilities[1].ability.name);
        hiddenAbility = formatSummary(pokemon.abilities[2].ability.name);
    } else {
        hiddenAbility = formatSummary(pokemon.abilities[1].ability.name);
    }

    let summaryInfo = {
        type: type,
        firstAbility: ability1,
        secondAbility: ability2,
        hiddenAbility: hiddenAbility
    };
    return summaryInfo;
}


function hideSecondAbility(i) {
    pokemon = allLoadedPokemon[i - 1];
    if (pokemon.abilities.length == 2) {
        let secondAbility = document.getElementById('secAbi');
        secondAbility.innerHTML = '';
    }
}


function onlyOneAbility(i) {
    pokemon = allLoadedPokemon[i - 1];
    if (pokemon.abilities.length === 1) {
        let secondAbility = document.getElementById('secAbi');
        secondAbility.innerHTML = '';
        let hiddenAbility = document.getElementById('hiddenAbility');
        hiddenAbility.innerHTML = 'This Pokémon does not have a hidden ability because it is useless in battles.';
    }
}


function formatSummary(n) {
    if (n) {
        return n.charAt(0).toUpperCase() + n.slice(1);
    } else {
        return null;
    }
}


async function increaseLimit() {
    hideLoadMore();
    openLoadingScreen();
    limit += 30;
    await gottaCatchEmAll();
    addLoadMore();
    closeLoadingScreen();
}


function hideLoadMore() {
    let element = document.getElementById('loadMore');
    element.classList.add("d-none");
    element.classList.remove("load-more");
}


function addLoadMore() {
    let element = document.getElementById('loadMore');
    closeLoadingScreen();
    element.classList.remove("d-none");
    element.classList.add("load-more");
}

function openLoadingScreen(){    
    document.getElementById('loadingScreen').classList.remove('d-none');
}

function closeLoadingScreen() {
    document.getElementById('loadingScreen').classList.add('d-none');
}


function closeCard() {
    let element = document.getElementById('infoCard');
    element.classList.add("d-none");
}


function showPreviousPokemon(i) {
    if (i > 0) {
        i--;
        openInfo(i);
    }
}


function showNextPokemon(i) {
    if (i < allLoadedPokemon.length) {
        i++;
        openInfo(i);
    }
}


function renderInfoCard(summary, summaryInfo) {
    return `
    <div class="info-container">
        <div class="summary ${summaryInfo.type}1 font-black no-shadow">
            <div class="summary-row">
                <div class="summ-top-left">
                    <div class="pokemon-index">#${summary.index}</div>
                    <div class="pokemon-name">${summary.name}</div>
                    <div id="infoCardFirstType" class="${summary.type1}"></div>
                    <div id="infoCardSecondType" class="second-type ${summary.type2}"></div>
                </div>
                <div class="escape" onclick="closeCard()"><img class="escape-img" src="img/cancel.png" alt=""></div>
            </div>
            <div id="infoMiddle" class="gif-position">
            </div>
            <div class="info-bottom no-shadow" id="infoBottom">
                <div class="summary-row-bottom flex-start">
                    <div id="showInfo" class="info-bottom-button selected" onclick="showInfo(${summary.index})">Info</div>
                    <div id="showAbilitys" class="info-bottom-button" onclick="showAbilitys(${summary.index})">Abilitys</div>
                    <div id="showStats" class="info-bottom-button" onclick="showStats(${summary.index})">Stats</div>
                </div>
                <div id="bottomContent"></div>
            </div>
        </div>
    </div>
    `;
}


function checkSecondType(summary) {
    if (summary.type2) {
        let secondType = document.getElementById('infoCardSecondType');
        secondType.classList.add(`${summary.type2}`);
    } else if (summary.type2 = null) {
        secondType.innerHTML = ``;
    };
}



function loadInfoMiddle(summary) {
    return `
    <img class="arrow negative-margin-right" id="previousButton" src="img/left.png" onclick="showPreviousPokemon(${summary.index})">
    <div id="infoPic" class="info-gif">
        <div class="img-top-right">
            <div id="showRegular" class="img-top-right-button selected no-shadow" onclick="showRegular(${summary.index})">regular</div>
            <div id="showShiny" class="img-top-right-button no-shadow" onclick="showShiny(${summary.index})">shiny</div>
        </div>
    <img id="pokemonSprite" class="test-png" src="${summary.regSprite}"></div>
    <img id="nextButton" class="arrow negative-margin-left" src="img/right.png" onclick="showNextPokemon(${summary.index})">
    `;
}


function loadAbilities(summaryInfo) {
    document.getElementById('bottomContent').innerHTML = `                
    <div>Abilities:</div>
    <div>${summaryInfo.firstAbility}</div>
    <div id="secAbi">${summaryInfo.secondAbility}</div>
    <br>
    <div>Hidden Ability:</div>
    <div id="hiddenAbility">${summaryInfo.hiddenAbility}</div>`;
}


function loadInformation(summary) {
    document.getElementById('bottomContent').innerHTML = `
    <div class="summary-bottom-content-info">
        <div>Name: ${summary.name}</div>
        <div>Height: ${summary.height} m</div>
        <div>Weight: ${summary.weight} kg</div>
        <div>Cry: <button onclick="playCry(${summary.index})"><img class="icon" src="img/note.png"></button></div>
    </div>
    `;
}


function loadStats(i) {
    document.getElementById('bottomContent').innerHTML = `
    <canvas id="myChart" height="180"></canvas>
    `;
    renderChart(i);
}


function playCry(i) {
    let audio = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${i}.ogg`);
    audio.volume = 0.25;
    audio.play();
}

