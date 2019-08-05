import Vue from 'vue'
import App from './App'
import Loading from './components/loading.vue'
import songDetail from './components/songDetail.vue'
import imtAudio from './components/imt-audio/imt-audio.vue'
import Search from './components/search.vue'
Vue.component('loading',Loading)
Vue.component('song-detail',songDetail)
Vue.component('imt-audio',imtAudio)
Vue.component('search',Search)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
