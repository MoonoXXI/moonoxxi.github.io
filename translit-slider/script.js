const content = document.querySelector('.content'),
      btnLeft = document.querySelector('.nav__btn.left'),
      btnRight = document.querySelector('.nav__btn.right');

class SimpleCard {
    constructor(title, img, text) {
        this.title = title;
        this.img = img;
        this.text = text;
    }
    render() {
        const smplCard = document.createElement('div');
        smplCard.innerHTML = `
            <div class="card__title" style='padding: 5px; text-align: center'>
                <h1 class="title--orig" style='margin: 10px 0'>${this.title}</h1>
                <h1 class="title--mod" style='margin: 10px 0' hidden></h1>
            </div>
            <div class="card__img" style='text-align: center'>
                <img src=${this.img} width='300px' alt="">
            </div>
            <div class="card__text" style='padding: 5px'>
                <p class="text--orig" style='margin: 10px 0'>${this.text}</p>
                <p class="text--mod" style='margin: 10px 0' hidden></p>
            </div>
        `;
        smplCard.classList.add('card');
        content.append(smplCard);
    }
}

let cards,
    i = 0;

function hideCards() {
    cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.display = 'none';
    });
}
function showCard(i = 0) {
    cards = document.querySelectorAll('.card');
    cards[i].style.display = 'block';
}

new SimpleCard(
    'Эссэ деген не?', 
    'img/essay.jpg', 
    'Эссе философияның, эстетиканың, әдеби сынның, публицистиканың, көркем әдебиеттің тұрақталған, қалыптасқан тұжырымдарға жаңа қырынан қарап, өзінше толғап, әрі дағдыдан, әдеттен, көне соқпақтардан бөлек, тың болжамдар мен түйіндеулерге құрылатын жанры.'
).render();
new SimpleCard(
    'Синоним деген не?', 
    'img/synonyms.jpg', 
    'Синоним айтылуы әр түрлі, бірақ мағыналары бір-біріне жақын сөздер. Синонимдер кем дегенде,екі сөзден болады. Одан да көп сөзден болуы мүмкін. Мысалы: сабырлы, байсалды, төзімді, ұстамды, салмақты.'
).render();
new SimpleCard('Название 3', 'https://placehold.it/300x150', 'Текст 3').render();

hideCards();
showCard();

btnLeft.addEventListener('click', () => {
    if (i == 0) {
        i = cards.length - 1;
        hideCards();
        showCard(i);
    } else {
        i--;
        hideCards();
        showCard(i);
    }

    if (!textOrig[i].hidden && btnLangOrig.hidden) {
        btnLangOrig.toggleAttribute('hidden');
        btnLangMod.toggleAttribute('hidden');
    }
    console.log(i);
});
btnRight.addEventListener('click', () => {
    if (i == cards.length - 1) {
        i = 0;
        hideCards();
        showCard(i);
    } else {
        i++;
        hideCards();
        showCard(i);
    }

    if (!textOrig[i].hidden && btnLangOrig.hidden) {
        btnLangOrig.toggleAttribute('hidden');
        btnLangMod.toggleAttribute('hidden');
    }
    console.log(i);
});


// Транслит текста через jquery API
const textOrig = document.querySelectorAll('.text--orig'),
      textMod = document.querySelectorAll('.text--mod'),
      titleOrig = document.querySelectorAll('.title--orig'),
      titleMod = document.querySelectorAll('.title--mod'),
      btnsLang = document.querySelectorAll('.lang__btn'),
      btnLangOrig = document.querySelector('.lang__btn--orig'),
      btnLangMod = document.querySelector('.lang__btn--mod');

function translitText() {
    $.post("https://www.qazlatyn.kz/api/convert/cyrltolatyn",{
            text: textOrig[i].textContent
        },function (data) {
            textMod[i].textContent = data;
        });
}

function translitTitle() {
    $.post("https://www.qazlatyn.kz/api/convert/cyrltolatyn",{
            text: titleOrig[i].textContent
        },function (data) {
            titleMod[i].textContent = data;
        });
}

btnsLang.forEach(btn => {
    btn.addEventListener('click', () => {
        if (textMod[i].childNodes.length == 0) {
            translitText();
            translitTitle();
        }
        
        textOrig[i].toggleAttribute('hidden');
        titleOrig[i].toggleAttribute('hidden');
    
        textMod[i].toggleAttribute('hidden');
        titleMod[i].toggleAttribute('hidden');

        btnLangOrig.toggleAttribute('hidden');
        btnLangMod.toggleAttribute('hidden');
    });
});