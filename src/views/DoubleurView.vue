<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { castData } from '../stores/vfq'

const route = useRoute()
const router = useRouter()
const activeGroup = ref('')

const name = computed(() => decodeURIComponent(route.params.name))

const groups = computed(() => {
  const raw = {}
  castData.value.forEach(m => {
    const entries = m.cast.filter(c => c.doubleVFQ === name.value)
    entries.forEach(e => {
      const key = e.actor
      if (!raw[key]) raw[key] = []
      if (!raw[key].find(x => x.movieId === m.movieId)) raw[key].push(m)
    })
  })
  return Object.entries(raw)
    .map(([personName, movies]) => ({ personName, movies }))
    .sort((a, b) => b.movies.length - a.movies.length)
})
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <button @click="router.back()" class="mb-8 text-slate-500 hover:text-white transition font-bold uppercase text-xs tracking-widest">← Retour</button>
    <div class="mb-12">
      <h2 class="text-6xl font-black text-white">{{ name }}</h2>
      <div class="h-1 w-24 mt-4 rounded-full" style="background:#003399"></div>
    </div>
    <div class="space-y-4">
      <div v-for="group in groups" :key="group.personName" class="rounded-2xl border border-slate-800 overflow-hidden" style="background:rgba(15,23,42,0.4)">
        <button @click="activeGroup = activeGroup === group.personName ? '' : group.personName" class="w-full flex justify-between items-center p-6 hover:bg-slate-800 transition text-left">
          <h3 class="text-blue-400 font-black text-xl uppercase italic">
            Voix de <span class="ml-2 text-white">{{ group.personName }}</span>
          </h3>
          <div class="flex items-center gap-4">
            <span class="text-blue-500 text-[10px] font-bold px-3 py-1 rounded-full" style="background:rgba(59,130,246,0.1)">{{ group.movies.length }} {{ group.movies.length > 1 ? 'rôles' : 'rôle' }}</span>
            <span class="text-slate-600">{{ activeGroup === group.personName ? '▲' : '▼' }}</span>
          </div>
        </button>
        <div v-show="activeGroup === group.personName" class="px-6 pb-6 pt-2 space-y-2 border-t border-slate-800/50">
          <div v-for="movie in group.movies" :key="movie.movieId" @click="router.push('/film/' + movie.movieId)" class="flex justify-between items-center p-4 rounded-xl cursor-pointer transition hover:bg-blue-900/20" style="background:rgba(30,41,59,0.5)">
            <div>
              <span class="text-white font-bold">{{ movie.translatedName }}</span>
              <span class="text-slate-500 text-xs ml-2">({{ movie.extra.theatricalRelease?.split(' ').pop() || '' }})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
