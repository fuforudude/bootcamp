const addInput: HTMLInputElement = document.createElement("input");
const addButton: HTMLButtonElement = document.createElement("button");
addButton.textContent = 'Ajouter';
addButton.id = 'addButton';
const addList: HTMLUListElement = document.createElement("ul");

document.body.append(addInput, addButton, addList);

// le 2 pour ne pas avoir de conflit avec le fichier js

function saveToLocalStorage2() {
    const tasks: { text: string; done: boolean }[] = [];
    addList.querySelectorAll('li').forEach(task => {
        const textNode = Array.from(task.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
        tasks.push({
            text: textNode?.textContent?.trim() || '',
            done: task.id === 'done'
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadFromLocalStorage2() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach((task: { text: string; done: boolean }) => {
        const listItem = document.createElement("li");
        listItem.textContent = task.text;
        listItem.id = task.done ? 'done' : 'notDone';
        const deleteButton = document.createElement("button");
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', () => {
            list.removeChild(listItem);
            saveToLocalStorage2();
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
            saveToLocalStorage2();
        });
        listItem.appendChild(taskDone);
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    });
    return tasks;
}

loadFromLocalStorage2();

document.addEventListener('click', (event) => {

    if (event.target && (event.target as HTMLElement).id === 'addButton') {
        if (addInput.value.trim() === '') return; 
        
        const listItem = document.createElement("li");
        listItem.textContent = addInput.value;
        addInput.value = '';
        listItem.id = 'notDone';

        const deleteButton = document.createElement("button");
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', () => {
            addList.removeChild(listItem);
            saveToLocalStorage2();
        });

        const taskDone = document.createElement("input");
        taskDone.type = 'checkbox';
        taskDone.addEventListener('change', () => {
            if (taskDone.checked) {
                listItem.id = 'done';
            } else {
                listItem.id = 'notDone';
            }
            saveToLocalStorage2();
        });

        listItem.appendChild(taskDone);
        listItem.appendChild(deleteButton);
        addList.appendChild(listItem);
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
    if (event.target && (event.target as HTMLElement).id === 'filtreDone') {
        const tasks = addList.querySelectorAll('li');
        tasks.forEach((task: HTMLLIElement) => {
            task.style.display = 'list-item';
            if (task.id === 'notDone') {
                task.style.display = 'none';
            }
        });
    } else if (event.target && (event.target as HTMLElement).id === 'filtreNotDone') {
        const tasks = addList.querySelectorAll('li');
        tasks.forEach((task: HTMLLIElement) => {
            task.style.display = 'list-item';
            if (task.id === 'done') {
                task.style.display = 'none';
            }
        });
    } else if (event.target && (event.target as HTMLElement).id === 'filtreAll') {
        const tasks = addList.querySelectorAll('li');
        tasks.forEach((task: HTMLLIElement) => {
            task.style.display = 'list-item';
        });
    }
});
