import { defineStore } from "pinia";

export const useTodoStore = defineStore('todo', {
    state: () => ({
        todos: []
    }),
    getters: {
        countTodo: (state) => state.todos.length
    },
    actions: {
        addTodo(todo) {
            this.todos.unshift({
                activity: todo,
                status: false,
            });

            this.saveToLocalStorage();
        },
        deleteTodo(todoIndex) {
            this.todos = this.todos.filter((todo, index) => {
                if (todoIndex != index) {
                    return todo;
                }
            });

            this.saveToLocalStorage();
        },
        setTodo(todoIndex) {
            this.todos = this.todos.filter((todo, index) => {
                if (todoIndex == index) {
                    todo.status ? (todo.status = false) : (todo.status = true);
                }

                return todo;
            });

            this.saveToLocalStorage();
        },
        saveToLocalStorage() {
            localStorage.setItem("todos", JSON.stringify(this.todos));
        }
    }
})