<script setup>
import { useRouter } from 'vue-router'
import { recentMovies, topArtists } from '../stores/vfq'

const router = useRouter()
</script>

<template>
  <div>
    <div class="mb-12 border-b border-slate-800 pb-10">
      <h2 class="text-4xl font-black mb-3 text-white">Le répertoire du doublage VFQ</h2>
      <p class="text-slate-400 text-lg max-w-3xl leading-relaxed">Explorez les fiches de doublage québécois — films, séries et animations.</p>
    </div>

    <!-- Derniers ajouts -->
    <div class="mb-16">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-black uppercase tracking-[0.2em] flex items-center text-slate-500">
          <span class="w-10 h-0.5 mr-4" style="background:#003399"></span> Derniers Ajouts
        </h2>
        <button @click="router.push('/films')" class="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 hover:text-white transition px-4 py-2 rounded-full border border-slate-700" style="background:rgba(30,41,59,0.5)">Voir tout</button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div v-for="movie in recentMovies" :key="movie.movieId" @click="router.push('/film/' + movie.movieId)" class="cursor-pointer group">
          <div class="rounded-xl border border-slate-700 overflow-hidden relative shadow-xl transition-all group-hover:border-blue-500 group-hover:-translate-y-1" style="aspect-ratio:2/3;background:#1e293b">
            <img v-if="movie.posterPath" :src="'https://image.tmdb.org/t/p/w500' + movie.posterPath" :alt="movie.translatedName" loading="eager" class="absolute inset-0 w-full h-full object-cover">
            <div class="absolute bottom-0 inset-x-0 p-4 text-white" style="background:linear-gradient(to top, #020617, rgba(2,6,23,0.8), transparent)">
              <p class="text-sm font-bold line-clamp-2">{{ movie.translatedName }}</p>
              <p class="text-[10px] text-blue-400 font-bold uppercase mt-1">{{ movie.extra.theatricalRelease?.split(' ').pop() || 'N/A' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Comédiens les plus actifs -->
    <div class="mb-16">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-black uppercase tracking-[0.2em] flex items-center text-slate-500">
          <span class="w-10 h-0.5 mr-4" style="background:#003399"></span> Comédiens les plus actifs
        </h2>
        <button @click="router.push('/comediens')" class="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 hover:text-white transition px-4 py-2 rounded-full border border-slate-700" style="background:rgba(30,41,59,0.5)">Voir tout</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="(artist, index) in topArtists.slice(0, 6)" :key="artist.name" @click="router.push('/doubleur/' + encodeURIComponent(artist.name))" class="border border-slate-700/50 p-5 rounded-2xl flex items-center justify-between hover:border-blue-800 cursor-pointer transition group" style="background:rgba(30,41,59,0.3)">
          <div class="flex items-center text-sm">
            <div class="w-8 font-black text-xl italic opacity-50 group-hover:opacity-100 transition" style="color:#003399">{{ index + 1 }}</div>
            <div>
              <p class="font-bold text-white group-hover:text-blue-400 transition">{{ artist.name }}</p>
              <p class="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{{ artist.count }} fiches</p>
            </div>
          </div>
          <span class="text-slate-700 group-hover:text-white">→</span>
        </div>
      </div>
    </div>
  </div>
</template>
