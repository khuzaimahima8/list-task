<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { RouterLink } from 'vue-router'

interface Task {
    id: number
    name: string
    description: string
    deadline: string
}
const task = ref<Task[]>([])

const fetchTasks = async () =>{
    console.log('FETCHING:', '/api/task');
    const response = await fetch('/api/tasks')
    const data = await response.json() as Task[]
    const text = await response.text();
    task.value = data

    console.log('RESPONSE BODY:', text );
}

onMounted(() => {
    fetchTasks()
}
)

</script>

<template>
    <main>
        <div>Daftar Task</div>
<div>
    <RouterLink to="/task">add Task</RouterLink>
</div>
        <div>
            <ul>
                <li v-for="task in task" :key="task.id">
                <div>{{ task.name }}</div>
                <div>{{ task.description }}</div>
               <div>{{ new Date(Number(task.deadline) * 1000).toLocaleString() }}
               </div>
                </li>
            </ul>
        </div>
    </main>
</template>