<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { movies } from '../stores/vfq'

const props = defineProps({ type: { type: String, default: 'Film' } })
const router = useRouter()
const route = useRoute()
const sortBy = ref('default')
const yearFilter = ref('')
const visibleCount = ref(100)
const sentinel = ref(null)
let observer = null

const title = computed(() => props.type === 'Film' ? 'Répertoire des Films' : 'Répertoire des Séries')

const filtered = computed(() => {
  let f = movies.value.filter(m => m.extra.projectType?.toLowerCase().includes(props.type.toLowerCase()))
  if (yearFilter.value) f = f.filter(m => m.extra.theatricalRelease?.split(' ').pop().includes(yearFilter.value))
  if (sortBy.value !== 'default') {
    f = [...f].sort((a, b) => {
      if (sortBy.value === 'vfq-asc') return a.translatedName.localeCompare(b.translatedName)
      if (sortBy.value === 'vfq-desc') return b.translatedName.localeCompare(a.translatedName)
      if (sortBy.value === 'orig-asc') return a.originalName.localeCompare(b.originalName)
      if (sortBy.value === 'year-desc') return (parseInt(b.extra.theatricalRelease?.split(' ').pop()) || 0) - (parseInt(a.extra.theatricalRelease?.split(' ').pop()) || 0)
      if (sortBy.value === 'year-asc') return (parseInt(a.extra.theatricalRelease?.split(' ').pop()) || 0) - (parseInt(b.extra.theatricalRelease?.split(' ').pop()) || 0)
      return 0
    })
  }
  return f
})

const paginated = computed(() => filtered.value.slice(0, visibleCount.value))

onMounted(() => {
  visibleCount.value = 100
  observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && visibleCount.value < filtered.value.length) {
      visibleCount.value += 100
    }
  }, { threshold: 0.1 })
  if (sentinel.value) observer.observe(sentinel.value)
})

onUnmounted(() => { if (observer) observer.disconnect() })
</script>

<template>
  <div>
    <div class="mb-10 border-l-4 pl-4" style="border-color:#003399">
      <h2 class="text-4xl font-black uppercase tracking-tight">{{ title }}</h2>
      <p class="text-slate-500 text-sm mt-1">{{ filtered.length }} fiches trouvées</p>
    </div>

    <div class="mb-8 flex flex-wrap gap-4 p-4 rounded-2xl border border-slate-800" style="background:rgba(15,23,42,0.5)">
      <div class="flex-1 min-w-[200px]">
        <label class="text-[10px] font-black uppercase text-slate-500 ml-2 mb-1 block tracking-widest">Trier par</label>
        <select v-model="sortBy" class="w-full rounded-xl px-4 py-2 text-sm focus:outline-none text-white" style="background:#1e293b;border:1px solid #334155">
          <option value="default">Par défaut (Ordre d'ajout)</option>
          <option value="vfq-asc">Titre VFQ (A-Z)</option>
          <option value="vfq-desc">Titre VFQ (Z-A)</option>
          <option value="orig-asc">Titre Original (A-Z)</option>
          <option value="year-desc">Plus récent</option>
          <option value="year-asc">Plus ancien</option>
        </select>
      </div>
      <div class="w-full md:w-48">
        <label class="text-[10px] font-black uppercase text-slate-500 ml-2 mb-1 block tracking-widest">Filtrer par année</label>
        <input type="text" v-model="yearFilter" placeholder="Ex: 2024" class="w-full rounded-xl px-4 py-2 text-sm focus:outline-none text-white" style="background:#1e293b;border:1px solid #334155">
      </div>
    </div>

    <div class="space-y-3">
      <div v-for="movie in paginated" :key="movie.movieId" @click="router.push('/film/' + movie.movieId)" class="list-item-vfq flex items-center justify-between px-6 py-5 rounded-2xl cursor-pointer shadow-xl">
        <div class="flex items-center gap-4">
          <div class="w-10 h-14 rounded-lg overflow-hidden flex-shrink-0" style="background:#334155">
            <img v-if="movie.posterPath" :src="'https://image.tmdb.org/t/p/w92' + movie.posterPath" :alt="movie.translatedName" loading="lazy" class="w-full h-full object-cover">
          </div>
          <div>
            <h3 class="text-xl font-bold text-white">{{ movie.translatedName }}</h3>
            <p class="text-sm text-slate-500 italic">{{ movie.originalName }}</p>
          </div>
        </div>
        <div class="text-right flex flex-col items-end gap-2">
          <span class="text-[10px] font-black uppercase tracking-widest text-blue-500 px-3 py-1 rounded-full" style="background:rgba(59,130,246,0.1)">{{ movie.extra.projectType }}</span>
          <span class="text-slate-500 text-xs font-bold">{{ movie.extra.theatricalRelease?.split(' ').pop() || '' }}</span>
        </div>
      </div>
    </div>
    <div ref="sentinel" class="h-10"></div>
  </div>
</template>
