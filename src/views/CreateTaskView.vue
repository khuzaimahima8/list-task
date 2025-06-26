<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const Nama = ref('')
const keterangan= ref('')
const deadline = ref('')

const saveData = async () =>{
    try{
    const newTask = JSON.stringify({
        nama: Nama.value,
       keterangan: keterangan.value,
        deadline: Date.parse(deadline.value)/1000,
    })

    const response = await fetch('/api/tasks',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: newTask,
        
    })
    if(!response.ok){
        const errorText = await response.text()
        console.error('Server error:', errorText)
        throw new Error('Response is not OK')
    }
    
    const data = await response.json()
    router.push('/')
} catch (err){
    console.error('Failed to parse JSON. Likely HTML or plain text:', err)
    alert('Gagal menyimpan task. cek console')
}
    } 

</script>

<template>
   <label><h1>add Task</h1></label> 
    <form @submit.prevent="saveData">
        <div>
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

        <div>
            <input type="submit">
        </div>
    </form>
</template>