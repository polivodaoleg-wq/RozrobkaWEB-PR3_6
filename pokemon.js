class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
        this.elName = document.getElementById(`name-${name}`);
        this.elImg = document.getElementById(`img-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({ name, hp, type, img, selectors, attacks = [] }) {
        super(selectors);

        this.name = name;
        this.defaultHP = hp;
        this.damageHP = hp;
        this.type = type;
        this.img = img;
        this.attacks = attacks;

        this.renderInfo();
        this.renderHP();
    }

    renderInfo = function () {
        const { name, img, elName, elImg } = this;
        elName.innerText = name;
        elImg.src = img;
    }

    renderHP = function () {
        this.renderHPText();
        this.renderProgressbarHP();
    }

    renderHPText = function () {
        const { damageHP, defaultHP, elHP } = this;
        elHP.innerText = `${damageHP} / ${defaultHP}`;
    }

    renderProgressbarHP = function () {
        const { damageHP, defaultHP, elProgressbar } = this;
        const percent = damageHP / defaultHP * 100;
        elProgressbar.style.width = `${percent}%`;
        elProgressbar.classList.remove('low');
        elProgressbar.classList.remove('critical');

        if (percent < 20) {
            elProgressbar.classList.add('critical');
        } else if (percent < 60) {
            elProgressbar.classList.add('low');
        }
    }

    changeHP = function (count, cb) {
        if (this.damageHP <= count) {
            this.damageHP = 0;
            alert(`Бідний ${this.name} програв бій!`);
        } else {
            this.damageHP -= count;
        }
        this.renderHP();

        if (typeof cb === 'function') {
            cb();
        }
    }
}

export default Pokemon;
