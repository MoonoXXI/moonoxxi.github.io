const first = document.querySelector('.first'),
      second = document.querySelectorAll('.second'),
      third = document.querySelectorAll('.third');

function hideMessages() {
    third.forEach(item => {
        item.classList.add('hide');
    });
}

hideMessages();

// Собираем каждый запущенный таймер в массив
let timeTrial,
    timers = [];

function timer(i) {
    timeTrial = setTimeout(function() {
        third[i].classList.add('hide');
    }, 4000);

    timers.push(timeTrial);
}

// Отключаем каждый таймер в массиве
function clearTimers() {
    timers.forEach(item => {
        clearTimeout(item);
    });
}

function showMessage(i) {
    third[i].classList.remove('hide');

    timer(i);
}

// Преобразуем псевдомассив в массив
let thirdNew = [];

for (let i = 0; i < third.length; i++) {
    thirdNew.push(third[i]);
}

// Проверяем если все эелементы массива НЕ содержат класс
function checkScore(element, index, array) {
    return !element.classList.contains('hide');
}

function congrats() {
    if (thirdNew.every(checkScore)) {
        clearTimers();

        const fourth = document.createElement('span');
        fourth.classList.add('fourth');
        fourth.textContent = 'congrats';
        first.append(fourth);

        console.log('congratulation!');
        third.forEach(item => {
            item.classList.remove('hide');
        });
    }
}

first.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('second')) {
        second.forEach((item, i) => {
            if (e.target == item) {
                showMessage(i);
                congrats();
            }
        });
    }
});