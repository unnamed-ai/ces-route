import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', () => {  
    const data = ref([{
            id: 1,
            lat: -38.736803566366234, 
            lng: -72.60118747552335,
            name: 'Universidad Catolica de Temuco',
            slug: 'uct'
        }, {
            id: 2,
            lat: -38.7485217376164,
            lng: -72.61811498657174,
            name: 'Universidad de la Frontera',
            slug: 'ufro'     
        },{
            id: 3,
            lat: -38.7357128584098,
            lng: -72.60551386114382,
            name: 'Universidad Mayor de Temuco',
            slug: 'umayor'
        } , {
            id: 4,
            lat: -38.7326797,
            lng: -72.6199512,
            name: 'Universidad Autonoma de Temuco',
            slug: 'uatemuco'
        },
        {
            id: 5,
            lat: -38.72384304240695,
            lng: -72.63215971299188,
            name: 'Instituto Profesional de Temuco',
            slug: 'inacap'
        }
    ]);
    return { data }
})
