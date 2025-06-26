<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Input from '@c/omponents/Input.vue';

// / Definisikan tipe data untuk respons API
interface Task {
    nama: string;
    keterangan: string;
    deadline: number; // dalam detik
}

const router = useRouter();

const route = useRoute()
const id = route.params.id

const nama = ref('')
const keterangan = ref('')
const deadline = ref('')

const saveData = async ()=>{
    const task = JSON.stringify({
        nama: nama.value,
        keterangan: keterangan.value,
        deadline: Date.parse(deadline.value)/1000
    })

    const response = await fetch('/api/taks/${id}', {
        method: 'PUT',
        body: task,
        headers: {
            'Content-Type': 'application/json' // Tambahkan header untuk JSON
        }
    });
    const data = await response.json()
    
    router.push('/')
}

onMounted(async () => {
    const response = await fetch(`/api/events/${id}`);
    const data: Task = await response.json(); 
            nama.value = data.nama
            keterangan.value = data.keterangan
           deadline.value = new Date(data.deadline * 1000).toISOString().slice(0, 16)
        });
</script>

<template>
   <div class="container px-4 py-6 mx-auto w-lg">
    <h1 class="text-lg sm:text-2x1 text-center">add taks</h1>
    <form @submit.prevent="saveData">
        <div class="w-full">
            <label>nama</label>
            <input type="text" v-model="nama"/>
        </div>
        <div>
                <label>keterangan</label>
                <Input type="text" v-model="keterangan" />
            </div>
            <div>
                <label>deadline</label>
                <Input type="datetime-local" v-model="deadline" />
            </div>
    
            <div class="mt-3">
                <Button type="submit">Update</Button>
            </div>
    </form>
   </div>
</template>