const form = document.querySelector<HTMLFormElement>(".form");
const list = document.querySelector<HTMLDivElement>('.list');
const input = document.querySelector<HTMLInputElement>('.type-task')

// type 
type obj = {
    id : number;
    todo : string | undefined;
}



//classes
class LcStorage {
    static addToLocalStorage (todoArray: obj[]) {
        let storage = localStorage.setItem("todo", JSON.stringify(todoArray));
        return storage;
    }
    static getFromLocalStorage () {
        let storage: string | [] | null = localStorage.getItem("todo");
        if(storage && typeof(storage) == "string") {
           return JSON.parse(storage);
        }else {
           return storage = []
        }
    }
}


class Ui {
    static DisplayData () : void {
         let data: string[] = todoArray.map((el)=> {
            return `<div class="todo">
                        <p>${el.todo}</p>
                        <span class = "remove" data-id = ${el.id}>X</span>
                    </div>`
                    
        })
        let htmlText : string = data.join(" ");
        console.log(htmlText);
        list? list.innerHTML = htmlText : false;
    }
    static clearInput (): void {
        input? input.value = "" : false;
    }
    static removeTask () :void {
        list?.childNodes?.forEach((td)=> {
            td.childNodes.forEach((el)=> {
                    el.addEventListener("click",  (e)=> {
                        if (e.target) {
                            const target = e.target as HTMLElement;
                            td.remove();
                            let id = target.dataset.id;
                            Ui.removeFromArray(id);
                        }
                    }) 
            })
            
        })
    }
    static removeFromArray(id: string |undefined): void {
        todoArray = todoArray.filter((elId) => {
            if(id) return elId.id !== +id;
        } )
        LcStorage.addToLocalStorage(todoArray)
    }
}

class Todo {
    id : number;
    todo : string | undefined;
    constructor (id: number, todo : string | undefined) {
        this.id = id;
        this.todo = todo;
    }
}



//init varibals
let fromLc = LcStorage.getFromLocalStorage();

let todoArray : obj[] = [...fromLc];



//add task on submit
form?.addEventListener ("submit", (e) => {
    e.preventDefault();
    let id : number = Math.random() * 1000000;
    
    const todo = new Todo(id, input?.value);
    console.log(todo);
    todoArray.push(todo);
    Ui.DisplayData();
    Ui.clearInput();
    Ui.removeTask();
    LcStorage.addToLocalStorage(todoArray);
})




window.addEventListener("DOMContentLoaded", (e)=> {
    Ui.DisplayData()
    Ui.removeTask();
})



