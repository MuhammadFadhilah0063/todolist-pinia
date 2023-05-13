<script setup>
import { onMounted } from "vue";
import { useTodoStore } from "@/stores/todo";

const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits(["deleteTodo", "setTodo"]);

const store = useTodoStore();

const load = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

await load();

onMounted(async () => {
  const items = localStorage.getItem("todos");
  store.$patch({
    todos: items ? JSON.parse(items) : [],
  });
});

const deleteTodo = (index) => {
  emit("deleteTodo", index);
};

const changeStatus = (index) => {
  emit("setTodo", index);
};
</script>

<template>
  <ul class="list-group mt-3">
    <transition-group name="bounce">
      <li
        class="list-group-item"
        :class="todo.status ? ['bg-success'] : []"
        v-for="(todo, index) in data"
        :key="todo">
        <div class="row">
          <div class="col">
            <span v-if="todo.status">
              <del>{{ todo.activity }}</del>
            </span>
            <span v-else>{{ todo.activity }}</span>
          </div>
          <div class="col-auto">
            <button
              class="btn btn-sm mx-2"
              :class="todo.status ? ['btn-warning'] : ['btn-info']"
              @click="changeStatus(index)">
              <span v-if="todo.status"> Undone </span>
              <span v-else> Done </span>
            </button>
            <button class="btn btn-sm btn-danger" @click="deleteTodo(index)">
              X
            </button>
          </div>
        </div>
      </li>
    </transition-group>
  </ul>
</template>
