import { reactive, computed } from 'vue'

const state = reactive({
  movies: [],
  _topArtistsCache: null,
  _recentMoviesCache: null,
  _peopleIndexCache: null,
  loaded: false
})

export async function loadData() {
  if (state.loaded) return
  const r = await fetch('data.json?v=1.0')
  state.movies = await r.json()
  buildCaches()
  state.loaded = true
}

function buildCaches() {
  state._recentMoviesCache = [...state.movies].reverse().slice(0, 5)

  const counts = {}
  state.movies.forEach(m => {
    m.cast.forEach(c => {
      if (c.doubleVFQ && c.doubleVFQ.toLowerCase() !== 'à confirmer')
        counts[c.doubleVFQ] = (counts[c.doubleVFQ] || 0) + 1
    })
  })
  state._topArtistsCache = Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)

  state._peopleIndexCache = new Map()
  state.movies.forEach(m => {
    m.cast.forEach(c => {
      if (c.doubleVFQ && !state._peopleIndexCache.has(c.doubleVFQ))
        state._peopleIndexCache.set(c.doubleVFQ, 'doubleur')
      if (c.actor && !state._peopleIndexCache.has(c.actor))
        state._peopleIndexCache.set(c.actor, 'acteur-original')
    })
  })
}

export const movies = computed(() => state.movies)
export const castData = computed(() => state.movies) // alias pour compatibilité
export const recentMovies = computed(() => state._recentMoviesCache || [])
export const topArtists = computed(() => state._topArtistsCache || [])
export const peopleIndex = computed(() => state._peopleIndexCache || new Map())
