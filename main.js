import Pokemon from './pokemon.js';
import { random, countClicks } from './utils.js';
import { pokemons } from './pokemons.js';

const $control = document.querySelector('.control');
const $logs = document.getElementById('logs');
const $logo = document.querySelector('.logo');

let player1;
let player2;
function createPlayer(selectors, otherName) {
    const list = pokemons.filter(item => item.name !== otherName);
    const randomPokemon = list[random(list.length) - 1];
    return new Pokemon({
        ...randomPokemon,
        selectors: selectors,
    });
}

function generateLog(firstPerson, secondPerson, count) {
    const { name: firstName, damageHP, defaultHP } = firstPerson;
    const { name: secondName } = secondPerson;

    const logs = [
        `${firstName} вспомнил что-то важное, но неожиданно ${secondName}, не помня себя от испуга, ударил в предплечье врага. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} поперхнулся, и за это ${secondName} с испугу приложил прямой удар коленом в лоб врага. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} забылся, но в это время наглый ${secondName}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} пришел в себя, но неожиданно ${secondName} случайно нанес мощнейший удар. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} поперхнулся, но в то время ${secondName} нехотя раздробил кулаком <вырезанно цензурой> противника. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} удивился, а ${secondName} пошатнувшись влепил подлый удар. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} высморкался, но неожиданно ${secondName} провел дробящий удар. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} пошатнулся, и внезапно наглый ${secondName} беспричинно ударил в ногу противника. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} расстроился, как вдруг, неожиданно ${secondName} случайно влепил стопой в живот соперника. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} пытался что-то сказать, но вдруг, неожиданно ${secondName} со скуки, разбил бровь сопернику. -${count}, [${damageHP}/${defaultHP}]`
    ];
    return logs[random(logs.length) - 1];
}

function addLog(text) {
    const $p = document.createElement('p');
    $p.innerText = text;
    $logs.insertBefore($p, $logs.children[0]);
}

function disableButtons() {
    const allButtons = document.querySelectorAll('.control .button');
    allButtons.forEach($item => $item.disabled = true);
}
function attack(item) {
    const countPlayer = random(item.maxDamage, item.minDamage);
    player2.changeHP(countPlayer);
    addLog(generateLog(player2, player1, countPlayer));

    if (player2.damageHP === 0) {
        player2 = createPlayer('player2', player1.name);
        addLog(`Виходить новий ворог: ${player2.name}!`);
        return;
    }

    const enemyAttack = player2.attacks[0];
    const countEnemy = random(enemyAttack.maxDamage, enemyAttack.minDamage);
    player1.changeHP(countEnemy);
    addLog(generateLog(player1, player2, countEnemy));
    if (player1.damageHP === 0) {
        disableButtons();
        return;
    }

    let canAttack = false;
    const allButtons = document.querySelectorAll('.control .button');
    allButtons.forEach($item => {
        if (!$item.disabled) {
            canAttack = true;
        }
    });
    if (!canAttack) {
        addLog(`У ${player1.name} закінчились удари!`);
    }
}

function createButtons() {
    player1.attacks.forEach(item => {
        console.log(item);
        const $btn = document.createElement('button');
        $btn.classList.add('button');
        $btn.innerText = item.name;

        const btnCount = countClicks(item.maxCount, $btn);
        $btn.addEventListener('click', () => {
            console.log('Click button ', item.name);
            btnCount();
            attack(item);
        });
        $control.appendChild($btn);
    });
}

function init() {
    console.log('Start Game!');
    const allButtons = document.querySelectorAll('.control .button');
    allButtons.forEach($item => $item.remove());
    $logs.innerHTML = '';

    player1 = createPlayer('player1');
    player2 = createPlayer('player2', player1.name);
    createButtons();
}

$logo.addEventListener('click', init);
init();
