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
    const response = await fetch('/api/task')
    const data = await response.json() as Task[]
    task.value = data
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
               <div>
               <RouterLink :to="'/task/$(task.id)'">Edit</RouterLink>
            </div>
                </li>
            </ul>
        </div>  
    </main>
</template>