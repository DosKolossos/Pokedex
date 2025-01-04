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

function loadAbilities(summaryInfo) {
    document.getElementById('bottomContent').innerHTML = `                
    <div>Abilities:</div>
    <div>${summaryInfo.firstAbility}</div>
    <div id="secAbi">${summaryInfo.secondAbility}</div>
    <br>
    <div>Hidden Ability:</div>
    <div id="hiddenAbility">${summaryInfo.hiddenAbility}</div>`;
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