import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', () => {  
    const data = ref([]);

    const updateData = (req) => {
        data.value = req;
    };

    return { data, updateData }
})
