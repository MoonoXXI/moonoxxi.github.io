// Отправка информации в database.json
const form = document.querySelector('.wall__form');

const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
}

function collectData() {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('https://my-json-server.typicode.com/moonoxxi/dbjson/posts', json)
        .then(data => {
            console.log(data);
        }).catch(() => {
            console.log('Что-то пошло не так...');
        }).finally(() => {
            form.reset();
        });
    });
}

collectData();

// Получение информации из database.json
const posts = document.querySelector('.wall__posts');

class WallPost {
    constructor(name, text) {
        this.name = name;
        this.text = text;
    }
    render() {
        const post = document.createElement('div');
        post.innerHTML = `<span class="post__author">${this.name}</span> написал: <span class="post__text">${this.text}</span>`;
        post.classList.add('wall__post');
        posts.append(post);
    }
}

fetch('https://my-json-server.typicode.com/moonoxxi/dbjson/posts')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data.forEach(({name, text}) => {
            new WallPost(name, text).render();
        })
    });


// Опубликовать сообщение без оглядки на базу данных
function rightNow() {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        new WallPost(data.name, data.text).render();
    });
}

rightNow();