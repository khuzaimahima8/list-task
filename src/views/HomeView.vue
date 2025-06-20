<script setup lang="ts">
import {ref, onMounted} from 'vue'

interface Task {
    id: number
    name: string
    description: string
    deadline: string
}
const task = ref<Task[]>([])

const fetchTasks = async () =>{
    const response = await fetch('/api/tasks')
    const data = await response.json()
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
            <ul>
                <li v-for="task in task" :key="task.id">
                <div>{{ task.name }}</div>
                <div>{{ task.description }}</div>
                <div>{{ task.deadline }}</div>

                </li>
            </ul>
        </div>
    </main>
</template>