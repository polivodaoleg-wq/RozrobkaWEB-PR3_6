export function random(max, min = 0) {
    return Math.ceil(Math.random() * (max - min)) + min;
}

export function countClicks(maxLimit = 6, $btn) {
    let count = 0;
    const btnName = $btn.innerText;

    $btn.innerText = `${btnName} (${maxLimit})`;

    return function () {
        count++;
        const leftClicks = maxLimit - count;
        $btn.innerText = `${btnName} (${leftClicks})`;
        console.log(`Кнопка "${btnName}" натиснута. Загалом кліків: ${count}`);

        if (leftClicks > 0) {
            console.log(`Залишилось натискань: ${leftClicks}`);
        } else {
            console.log(`Ліміт натискань "${btnName}" вичерпано!`);
            $btn.disabled = true;
        }
        return leftClicks;
    };
}
