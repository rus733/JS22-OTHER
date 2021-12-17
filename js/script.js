'use strict';
// дз 13

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const todoRemove = document.querySelector('.todo-remove');

let toDoData = [];

const render = function () {
  todoList.innerHTML = '';
  todoCompleted.innerHTML = '';
  toDoData.forEach(function (item, index) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector('.todo-complete').addEventListener('click', function () {
      item.completed = !item.completed;
      render();
      addToStorage();
    });
    // кнопка удаления  задач
    li.querySelector('.todo-remove').addEventListener('click', function () {
      //li.remove();
      console.log(item);
      toDoData.splice(index, 1);
      render();
      addToStorage();
    });
  });
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  if (headerInput.value.trim() !== '') {
    const newToDo = {
      text: headerInput.value,
      completed: false,
    };
    toDoData.push(newToDo);
    headerInput.value = '';
    render();
  } else {
    alert('заполните поле ввода задачи');
    headerInput.value = '';
  }
  addToStorage();
});

//функция добавления данных в локальное хранилище
const addToStorage = function () {
  localStorage.clear();
  localStorage.setItem('todo', JSON.stringify(toDoData));
};

// проверка  локального хранилища и занесение данных в массив

if (JSON.parse(localStorage.getItem('todo')) !== null) {
  toDoData = JSON.parse(localStorage.getItem('todo'));
  render();
}
