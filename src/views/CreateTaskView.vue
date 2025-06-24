<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const name = ref('')
const description = ref('')
const deadline = ref('')

const saveData = async () =>{
    const newTask = JSON.stringify({
        name: name.value,
        description: description.value,
        deadline: Date.parse(deadline.value)/1000,
    })

    const response = await fetch('/api/task',{
        method: 'POST',
        body: newTask,
    })
    const data = await response.json()

    router.push('/')
    }
</script>

<template>
   <label><h1>add Task</h1></label> 
    <form @submit.prevent="saveData">
        <div>
            <label>Nama</label>
            <input type="text" v-model="name">
        </div>
        <div>
            <label>Keterangan</label>
            <input type="text" v-model="description">
        </div>
        <div>
            <label>Deadline</label>
            <input type="datetime-local" v-model="deadline">
        </div>

        <div>
            <input type="submit">
        </div>
    </form>
</template>