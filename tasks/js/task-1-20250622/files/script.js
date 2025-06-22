let header = document.getElementsByTagName('header');
let section = document.getElementsByTagName('section');

async function populate() {
    try {
        let response = await fetch('https://andriisheptun.github.io/tasks/js/task-1-20250622/files/superheroes.json');
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        let obj = await response.json();
        populateHeader(obj);
        populateHeroes(obj);
    }
    catch (error) {
        console.error('Помилка:', error);
    }
};

function populateHeader(obj) {
    let h1 = document.createElement('h1');
    h1.textContent = obj.squadName;

    let p = document.createElement('p');
    p.textContent = 'Hometown: ' + obj.homeTown + ' // Formed: ' + obj.formed;

    header[0].appendChild(h1);
    header[0].appendChild(p);
}

function populateHeroes(obj) {


    obj.members.forEach(member => {
        let article = document.createElement('article');
        section[0].appendChild(article);

        let h2 = document.createElement('h2');
        h2.textContent = member.name;
        article.appendChild(h2);

        let p1 = document.createElement('p');
        p1.textContent = 'Secret Identity: ' + member.secretIdentity;
        article.appendChild(p1);

        let p2 = document.createElement('p')
        p2.textContent = 'Age: ' + member.age;
        article.appendChild(p2);

        let p3 = document.createElement('p')
        p3.textContent = 'Super Powers:';
        article.appendChild(p3);

        let ul = document.createElement('ul');
        article.appendChild(ul);

        member.powers.forEach(power => {
            let li = document.createElement('li')
            li.textContent = power;
            ul.appendChild(li);
        })


    });
}


populate();

