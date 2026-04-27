<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { loadData } from './stores/vfq'

const router = useRouter()
const route = useRoute()
const search = ref('')
const loaded = ref(false)

onMounted(async () => {
  await loadData()
  loaded.value = true
})

function clearSearch() {
  search.value = ''
  router.push('/')
}

function watchSearch(val) {
  if (val.trim()) {
    router.push({ path: '/recherche', query: { q: val } })
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col" style="background:#0f172a;color:#f1f5f9">

    <nav class="sticky top-0 z-50 border-b border-slate-800 py-4 shadow-2xl" style="background:rgba(15,23,42,0.95)">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

        <router-link to="/" class="flex items-center space-x-3 cursor-pointer no-underline">
          <div class="w-10 h-10 flex items-center justify-center rounded-xl shadow-lg text-2xl text-white" style="background:#003399">⚜</div>
          <h1 class="text-2xl font-black uppercase tracking-tighter italic" style="color:#f1f5f9">Doublage<span style="color:#003399">VFQ</span></h1>
        </router-link>

        <div class="flex p-1 rounded-full border border-slate-700 overflow-x-auto max-w-full" style="background:#1e293b">
          <router-link to="/" custom v-slot="{ navigate }">
            <button @click="navigate" :style="route.path === '/' ? 'background:#003399;color:white' : 'color:#94a3b8'" class="px-5 py-1.5 rounded-full text-sm font-bold transition whitespace-nowrap hover:text-white">Accueil</button>
          </router-link>
          <router-link to="/films" custom v-slot="{ navigate }">
            <button @click="navigate" :style="route.path === '/films' ? 'background:#003399;color:white' : 'color:#94a3b8'" class="px-5 py-1.5 rounded-full text-sm font-bold transition whitespace-nowrap hover:text-white">Films</button>
          </router-link>
          <router-link to="/series" custom v-slot="{ navigate }">
            <button @click="navigate" :style="route.path === '/series' ? 'background:#003399;color:white' : 'color:#94a3b8'" class="px-5 py-1.5 rounded-full text-sm font-bold transition whitespace-nowrap hover:text-white">Séries</button>
          </router-link>
          <router-link to="/animation" custom v-slot="{ navigate }">
            <button @click="navigate" :style="route.path === '/animation' ? 'background:#003399;color:white' : 'color:#94a3b8'" class="px-5 py-1.5 rounded-full text-sm font-bold transition whitespace-nowrap hover:text-white">Animation</button>
          </router-link>
          <router-link to="/comediens" custom v-slot="{ navigate }">
            <button @click="navigate" :style="route.path === '/comediens' ? 'background:#003399;color:white' : 'color:#94a3b8'" class="px-5 py-1.5 rounded-full text-sm font-bold transition whitespace-nowrap hover:text-white">Comédiens</button>
          </router-link>
        </div>

        <div class="relative w-full md:w-64">
          <input
            type="text"
            v-model="search"
            @input="watchSearch(search)"
            placeholder="Film, acteur, doubleur..."
            class="w-full rounded-xl py-2 px-4 text-sm focus:outline-none transition-colors"
            style="background:#0f172a;border:1px solid #334155;color:#f1f5f9"
          >
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-6 py-10 w-full flex-1">
      <div v-if="!loaded" class="flex items-center justify-center h-64">
        <div class="text-slate-500 text-xl font-bold animate-pulse">Chargement...</div>
      </div>
      <router-view v-else :search="search" @clear-search="clearSearch" />
    </main>

    <footer class="border-t border-slate-800 py-10 mt-20 text-center text-slate-500 font-medium tracking-wide" style="background:rgba(2,6,23,0.5)">
      ⚜ VFQ — Répertoire du doublage québécois francophone
    </footer>
  </div>
</template>
