<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { movies } from '../stores/vfq'

const route = useRoute()
const router = useRouter()

const movie = computed(() => 
  movies.value.find(m => m.movieId.toString() === route.params.id)
)
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <button @click="router.back()" class="mb-8 text-slate-400 hover:text-white transition group flex items-center font-bold uppercase text-xs tracking-widest">
      <span class="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Retour
    </button>

    <div v-if="!movie" class="flex items-center justify-center h-64">
      <div class="text-slate-500 text-xl font-bold animate-pulse">Chargement...</div>
    </div>

    <div v-else class="grid lg:grid-cols-4 gap-12">
      <div class="lg:col-span-1">
        <div class="rounded-xl border border-slate-700 overflow-hidden shadow-2xl sticky top-28" style="aspect-ratio:2/3;background:#1e293b">
          <img v-if="movie.posterPath" :src="'https://image.tmdb.org/t/p/w500' + movie.posterPath" :alt="movie.translatedName" loading="eager" class="w-full h-full object-cover">
          <div v-else class="w-full h-full flex items-center justify-center border-dashed border border-slate-700">
            <span class="text-5xl text-white" style="opacity:0.05">⚜</span>
          </div>
        </div>
      </div>

      <div class="lg:col-span-3 space-y-10">
        <div>
          <h2 class="text-5xl lg:text-7xl font-black text-white leading-tight">{{ movie.translatedName }}</h2>
          <div class="flex items-center gap-3 mt-4 text-slate-400 border-b border-slate-800 pb-6">
            <p class="text-2xl italic font-light">{{ movie.originalName }}</p>
            <span class="text-slate-700 text-2xl">|</span>
            <p class="text-sm uppercase tracking-[0.2em] font-black">{{ movie.extra.theatricalRelease }}</p>
          </div>
        </div>

        <div v-if="movie.description" class="space-y-3">
          <h3 class="text-xs font-black uppercase tracking-[0.3em] text-slate-500 flex items-center">
            <span class="w-8 h-px bg-slate-700 mr-4"></span> Synopsis
          </h3>
          <p class="text-slate-300 leading-relaxed text-lg italic">{{ movie.description }}</p>
        </div>

        <!-- Cast -->
        <div class="rounded-2xl border border-slate-800 overflow-hidden shadow-2xl" style="background:rgba(15,23,42,0.5)">
          <div class="grid grid-cols-3 px-8 py-4 border-b border-slate-800 text-[10px] font-black uppercase text-slate-500 tracking-widest" style="background:rgba(30,41,59,0.5)">
            <div>Acteur Original</div><div class="text-center">Rôle</div><div class="text-right">Doubleur Québécois</div>
          </div>
          <div v-for="(cast, index) in movie.cast" :key="index" :style="index % 2 === 0 ? '' : 'background:rgba(30,41,59,0.1)'" class="grid grid-cols-3 px-8 py-5 items-center text-sm" style="border-bottom:1px solid rgba(51,65,85,0.5)">
            <div><span @click="router.push('/acteur/' + encodeURIComponent(cast.actor))" class="text-blue-400 font-medium hover:underline cursor-pointer">{{ cast.actor }}</span></div>
            <div class="text-slate-500 text-center italic">({{ cast.role }})</div>
            <div class="text-right"><span @click="router.push('/doubleur/' + encodeURIComponent(cast.doubleVFQ))" class="text-blue-400 font-medium hover:underline cursor-pointer">{{ cast.doubleVFQ }}</span></div>
          </div>
        </div>

        <!-- Fiche technique -->
        <div v-if="movie.extra" class="rounded-2xl border border-slate-800 p-8 space-y-6" style="background:rgba(15,23,42,0.3)">
          <h3 class="text-xs font-black uppercase tracking-[0.3em] text-slate-500 flex items-center">
            <span class="w-8 h-px bg-slate-700 mr-4"></span> Fiche Technique VFQ
          </h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-if="movie.extra.studio"><p class="text-[10px] font-black uppercase text-blue-500 tracking-widest mb-1">Studio</p><p class="text-white font-bold">{{ movie.extra.studio }}</p></div>
            <div v-if="movie.extra.director"><p class="text-[10px] font-black uppercase text-blue-500 tracking-widest mb-1">Direction</p><p class="text-white font-bold">{{ movie.extra.director }}</p></div>
            <div v-if="movie.extra.adapter"><p class="text-[10px] font-black uppercase text-blue-500 tracking-widest mb-1">Adaptation</p><p class="text-white font-bold">{{ movie.extra.adapter }}</p></div>
            <div v-if="movie.extra.producer"><p class="text-[10px] font-black uppercase text-blue-500 tracking-widest mb-1">Producteur</p><p class="text-white font-bold">{{ movie.extra.producer }}</p></div>
            <div v-if="movie.extra.distributor"><p class="text-[10px] font-black uppercase text-blue-500 tracking-widest mb-1">Distributeur</p><p class="text-white font-bold">{{ movie.extra.distributor }}</p></div>
            <div v-if="movie.extra.theatricalRelease"><p class="text-[10px] font-black uppercase text-blue-500 tracking-widest mb-1">Sortie Cinéma</p><p class="text-white font-bold">{{ movie.extra.theatricalRelease }}</p></div>
            <div v-if="movie.extra.dvdRelease"><p class="text-[10px] font-black uppercase text-blue-500 tracking-widest mb-1">Sortie DVD/VOD</p><p class="text-white font-bold">{{ movie.extra.dvdRelease }}</p></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
