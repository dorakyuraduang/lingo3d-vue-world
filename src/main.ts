import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './index.less'
import {createPinia} from 'pinia'
import Vconsole from 'vconsole';
// const vConsole = new Vconsole()
const pinia = createPinia()
createApp(App).use(ElementPlus).use(pinia).mount('#app')
