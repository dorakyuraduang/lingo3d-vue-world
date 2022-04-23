import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './index.less'
import { settings } from "lingo3d"
import {createPinia} from 'pinia'
const pinia = createPinia()
createApp(App).use(ElementPlus).use(pinia).mount('#app')
