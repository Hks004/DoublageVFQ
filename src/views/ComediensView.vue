<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { topArtists } from '../stores/vfq'

const router = useRouter()
const visibleCount = ref(100)
const sentinel = ref(null)
let observer = null

const paginated = computed(() => topArtists.value.slice(0, visibleCount.value))

onMounted(() => {
  visibleCount.value = 100
  observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && visibleCount.value < topArtists.value.length)
      visibleCount.value += 100
  }, { threshold: 0.1 })
  if (sentinel.value) observer.observe(sentinel.value)
})

onUnmounted(() => { if (observer) observer.disconnect() })
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-4xl font-black text-white mb-8 border-l-4 pl-4 uppercase tracking-tight" style="border-color:#003399">Répertoire des Comédiens</h2>
    <div class="space-y-2">
      <div v-for="artist in paginated" :key="artist.name" @click="router.push('/doubleur/' + encodeURIComponent(artist.name))" class="list-item-vfq flex justify-between items-center px-6 py-4 rounded-xl cursor-pointer shadow-lg">
        <div class="flex items-center gap-4">
          <span class="text-lg" style="color:#003399">⚜</span>
          <span class="text-white font-bold text-lg">{{ artist.name }}</span>
        </div>
        <span class="text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-slate-700" style="background:#0f172a;color:#003399">{{ artist.count }} rôles</span>
      </div>
    </div>
    <div ref="sentinel" class="h-10"></div>
  </div>
</template>
