<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { RouterLink } from 'vue-router'

interface Task {
    id: string
    Nama: string
    keterangan: string
    deadline: string
}
const tasks = ref<Task[]>([])

const fetchtasks = async () =>{
    const response = await fetch('/api/tasks')
    const data = await response.json() as Task[]
    tasks.value = data
}

onMounted(() => {
    fetchtasks()
})
const removeTask = async (id: string) =>{
    const response = await fetch(`/api/tasks/${id}`,{
        method: 'DELETE',
    })
    if (response.ok){
        fetchtasks()
    }
}

</script>

<template>
    <main>
        <div>Daftar Tugas</div>
<div>
    <RouterLink to="/task">add Task</RouterLink>
</div>
        <div>
            <ul>
                <li v-for="task in tasks" :key="task.id">
                <div>{{ task.Nama }}</div>
                <div>{{ task.keterangan }}</div>
               <div>{{ new Date(Number(task.deadline) * 1000).toLocaleString() }}
               </div>
               <div>
               <RouterLink :to="'/task/$(task.id)'">Edit</RouterLink>
            </div>
            <div>
                <button @click="removeTask(task.id)">Hapus Data</button>
            </div>
                </li>
            </ul>
        </div>  
    </main>
</template>