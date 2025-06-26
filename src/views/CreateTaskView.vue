<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const Nama = ref('')
const keterangan= ref('')
const deadline = ref('')

const saveData = async () =>{
    const newTask = JSON.stringify({
        nama: Nama.value,
       keterangan: keterangan.value,
        deadline: Date.parse(deadline.value)/1000,
    })

    const response = await fetch('/api/tasks',{
        method: `POST`,
        headers: {'Content-Type': 'application/json'},
        body: newTask,
        
    })
    
    const data = await response.json()
    router.push('/')
}


</script>

<template>
   <div class="container px-4 py-6 mx-auto w-lg">
    <h1 class="text-lg sm:text-2x1 text-center">add taks</h1>
    <form @submit.prevent="saveData">
        <div class="w-full">
            <label>Nama</label>
            <input type="text" v-model="Nama">
        </div>
        <div>
            <label>Keterangan</label>
            <input type="text" v-model="keterangan">
        </div>
        <div>
            <label>Deadline</label>
            <input type="datetime-local" v-model="deadline">
        </div>

        <div class="mt-3">
            <button type="submit">simpan</button>
        </div>
    </form>
    </div>
</template>