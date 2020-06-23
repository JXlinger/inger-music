import Vue from 'vue'
import App from './App'
import Loading from './components/loading.vue'
import songDetail from './components/songDetail.vue'
import Search from './components/search.vue'
import miniPlayer from './components/miniPlayer.vue'
Vue.component('loading',Loading)
Vue.component('song-detail',songDetail)
Vue.component('search',Search)
Vue.component('mini-player', miniPlayer)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
