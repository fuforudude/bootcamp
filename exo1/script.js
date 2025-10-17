
const input = document.createElement("input");
const addButton = document.createElement("button");
addButton.textContent = 'Ajouter';
addButton.id = 'addButton';
const list = document.createElement("ul");

document.body.append(input, addButton, list);

function saveToLocalStorage() {
    const tasks = [];
    list.querySelectorAll('li').forEach(task => {
        const textNode = Array.from(task.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
        tasks.push({
            text: textNode ? textNode.textContent.trim() : '',
            done: task.id === 'done'
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function loadFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach((task) => {
        const listItem = document.createElement("li");
        listItem.textContent = task.text;
        listItem.id = task.done ? 'done' : 'notDone';
        const deleteButton = document.createElement("button");
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', () => {
            list.removeChild(listItem);
            saveToLocalStorage();
        });
        const taskDone = document.createElement("input");
        taskDone.type = 'checkbox';
        taskDone.checked = task.done;
        taskDone.addEventListener('change', () => {
            if (taskDone.checked) {
                listItem.id = 'done';
            } else {
                listItem.id = 'notDone';
            }
            saveToLocalStorage();
        });
        listItem.appendChild(taskDone);
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    });
    return tasks;
}

loadFromLocalStorage();

document.addEventListener('click', (event) => {

    if (event.target.id === 'addButton') {
        if (input.value.trim() === '') return;

        const listItem = document.createElement("li");
        listItem.textContent = input.value;
        input.value = '';
        listItem.id = 'notDone';

        const deleteButton = document.createElement("button");
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', () => {
            list.removeChild(listItem);
            saveToLocalStorage();
        });

        const taskDone = document.createElement("input");
        taskDone.type = 'checkbox';
        taskDone.addEventListener('change', () => {
            if (taskDone.checked) {
                listItem.id = 'done';
            } else {
                listItem.id = 'notDone';
            }
            saveToLocalStorage();
        });

        listItem.appendChild(taskDone);
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    };
});

const filtreLabel = document.createElement("label");
filtreLabel.textContent = 'Filtrer par :';
document.body.appendChild(filtreLabel);

const done = document.createElement("button");
done.textContent = 'Faites';
done.id = 'filtreDone';

const notDone = document.createElement("button");
notDone.textContent = 'À faire';
notDone.id = 'filtreNotDone';

const All = document.createElement("button");
All.textContent = 'Toutes';
All.id = 'filtreAll';

document.body.append(done, notDone, All);

document.addEventListener('click', (event) => {
    if (event.target.id === 'filtreDone') {
        const tasks = list.querySelectorAll('li');
        tasks.forEach(task => {
            task.style.display = 'list-item';
            if (task.id === 'notDone') {
                task.style.display = 'none';
            }
        });
    } else if (event.target.id === 'filtreNotDone') {
        const tasks = list.querySelectorAll('li');
        tasks.forEach(task => {
            task.style.display = 'list-item';
            if (task.id === 'done') {
                task.style.display = 'none';
            }
        });
    } else if (event.target.id === 'filtreAll') {
        const tasks = list.querySelectorAll('li');
        tasks.forEach(task => {
            task.style.display = 'list-item';
        });
    }
});
