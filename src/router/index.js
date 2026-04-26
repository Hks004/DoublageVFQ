import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FilmsView from '../views/FilmsView.vue'
import ComediensView from '../views/ComediensView.vue'
import FilmDetailView from '../views/FilmDetailView.vue'
import DoubleurView from '../views/DoubleurView.vue'
import ActeurOriginalView from '../views/ActeurOriginalView.vue'
import SearchView from '../views/SearchView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior() { return { top: 0 } },
  routes: [
    { path: '/', component: HomeView },
    { path: '/films', component: FilmsView },
    { path: '/series', component: FilmsView, props: { type: 'Série' } },
    { path: '/comediens', component: ComediensView },
    { path: '/film/:id', component: FilmDetailView },
    { path: '/doubleur/:name', component: DoubleurView },
    { path: '/acteur/:name', component: ActeurOriginalView },
    { path: '/recherche', component: SearchView },
  ]
})

export default router
