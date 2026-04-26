<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { movies, peopleIndex } from '../stores/vfq'

const route = useRoute()
const router = useRouter()

const search = computed(() => route.query.q || '')

const filteredMovies = computed(() => {
  if (!search.value) return []
  const s = search.value.toLowerCase()
  return movies.value.filter(m =>
    m.translatedName.toLowerCase().includes(s) ||
    m.originalName.toLowerCase().includes(s)
  )
})

const filteredPeople = computed(() => {
  if (!search.value || !peopleIndex.value) return []
  const s = search.value.toLowerCase()
  const results = []
  for (const [name, type] of peopleIndex.value) {
    if (name.toLowerCase().includes(s)) results.push({ name, type })
    if (results.length >= 8) break
  }
  return results
})
</script>

<template>
  <div>
    <div class="mb-10 border-l-4 pl-4 flex justify-between items-end" style="border-color:#003399">
      <div>
        <h2 class="text-4xl font-black uppercase tracking-tight">Résultats</h2>
        <p class="text-slate-500 text-sm mt-1">{{ filteredMovies.length + filteredPeople.length }} correspondances trouvées</p>
      </div>
      <button @click="router.push('/')" class="text-xs text-blue-400 font-bold uppercase tracking-widest hover:text-white transition">✕ Effacer</button>
    </div>

    <!-- Personnes -->
    <div v-if="filteredPeople.length > 0" class="mb-12">
      <h3 class="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center">
        <span class="w-8 h-px bg-slate-800 mr-3"></span> Comédiens & Acteurs
      </h3>
      <div class="flex flex-wrap gap-3">
        <button v-for="person in filteredPeople" :key="person.name" @click="router.push((person.type === 'doubleur' ? '/doubleur/' : '/acteur/') + encodeURIComponent(person.name))" class="flex items-center gap-3 border border-slate-700 px-5 py-3 rounded-xl transition group hover:bg-blue-900" style="background:#1e293b">
          <span style="color:#003399" class="group-hover:text-white">⚜</span>
          <div class="text-left">
            <p class="text-white font-bold text-sm">{{ person.name }}</p>
            <p class="text-[10px] text-slate-500 group-hover:text-blue-200 uppercase font-bold">{{ person.type === 'doubleur' ? 'Doublage VFQ' : 'Acteur Original' }}</p>
          </div>
        </button>
      </div>
    </div>

    <!-- Films -->
    <div v-if="filteredMovies.length > 0">
      <h3 class="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center">
        <span class="w-8 h-px bg-slate-800 mr-3"></span> Films & Séries
      </h3>
      <div class="space-y-3">
        <div v-for="movie in filteredMovies" :key="movie.movieId" @click="router.push('/film/' + movie.movieId)" class="list-item-vfq flex items-center justify-between px-6 py-5 rounded-2xl cursor-pointer shadow-xl">
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
    </div>
  </div>
</template>
