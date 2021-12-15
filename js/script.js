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

  toDoData.forEach(function (item) {
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

    const btnTodoRemove = li.querySelector('.todo-remove').addEventListener('click', function () {
      li.remove();
      toDoData.splice(item, 1);
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
    alert('заполните поле ввода');
  }
  addToStorage();
});

const addToStorage = function () {
  localStorage.clear();
  localStorage.setItem('todo', JSON.stringify(toDoData));
};
//
const data = JSON.parse(localStorage.getItem('todo'));
toDoData.push(data);
console.log(toDoData);

// проверка  локального хранилища и занесение данных в массив

const checkStorage = function () {
  if (data !== null) {
    toDoData.push(data);
    //toDoData = JSON.parse(localStorage.getItem('todo'));
    console.log(toDoData);
    render();
  }
};
