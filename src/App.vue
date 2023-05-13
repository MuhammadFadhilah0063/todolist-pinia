<script setup>
import { useTodoStore } from "@/stores/todo";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import List from "@/components/List.vue";

const todo = ref("");

const store = useTodoStore();
const { countTodo, todos } = storeToRefs(store);
const { addTodo, deleteTodo, setTodo } = store;

const handleClickAdd = () => {
  addTodo(todo.value);
  todo.value = "";
};
</script>

<template>
  <div class="container mt-2">
    <div class="card">
      <div class="card-body">
        <div class="card-title">
          <h1>Simple Todolist</h1>
        </div>
        <div class="row">
          <div class="col-10">
            <input
              type="text"
              class="form-control"
              v-model="todo"
              @keyup.enter="handleClickAdd" />
          </div>
          <div class="col-2">
            <button class="btn btn-success" @click="handleClickAdd">ADD</button>
          </div>
        </div>
        <h5 class="mt-3">Todo: {{ countTodo }}</h5>
        <Suspense>
          <template #default>
            <List :data="todos" @deleteTodo="deleteTodo" @setTodo="setTodo" />
          </template>

          <template #fallback>
            <h1>Loading ...</h1>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-out;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
