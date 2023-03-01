"use strict";
const form = document.querySelector(".form");
const list = document.querySelector('.list');
const input = document.querySelector('.type-task');
//classes
class LcStorage {
    static addToLocalStorage(todoArray) {
        let storage = localStorage.setItem("todo", JSON.stringify(todoArray));
        return storage;
    }
    static getFromLocalStorage() {
        let storage = localStorage.getItem("todo");
        if (storage && typeof (storage) == "string") {
            return JSON.parse(storage);
        }
        else {
            return storage = [];
        }
    }
}
class Ui {
    static DisplayData() {
        let data = todoArray.map((el) => {
            return `<div class="todo">
                        <p>${el.todo}</p>
                        <span class = "remove" data-id = ${el.id}>X</span>
                    </div>`;
        });
        let htmlText = data.join(" ");
        console.log(htmlText);
        list ? list.innerHTML = htmlText : false;
    }
    static clearInput() {
        input ? input.value = "" : false;
    }
    static removeTask() {
        var _a;
        (_a = list === null || list === void 0 ? void 0 : list.childNodes) === null || _a === void 0 ? void 0 : _a.forEach((td) => {
            td.childNodes.forEach((el) => {
                el.addEventListener("click", (e) => {
                    if (e.target) {
                        const target = e.target;
                        td.remove();
                        let id = target.dataset.id;
                        Ui.removeFromArray(id);
                    }
                });
            });
        });
    }
    static removeFromArray(id) {
        todoArray = todoArray.filter((elId) => {
            if (id)
                return elId.id !== +id;
        });
        LcStorage.addToLocalStorage(todoArray);
    }
}
class Todo {
    constructor(id, todo) {
        this.id = id;
        this.todo = todo;
    }
}
//init varibals
let fromLc = LcStorage.getFromLocalStorage();
let todoArray = [...fromLc];
//add task on submit
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (e) => {
    e.preventDefault();
    let id = Math.random() * 1000000;
    const todo = new Todo(id, input === null || input === void 0 ? void 0 : input.value);
    console.log(todo);
    todoArray.push(todo);
    Ui.DisplayData();
    Ui.clearInput();
    Ui.removeTask();
    LcStorage.addToLocalStorage(todoArray);
});
window.addEventListener("DOMContentLoaded", (e) => {
    Ui.DisplayData();
    Ui.removeTask();
});
