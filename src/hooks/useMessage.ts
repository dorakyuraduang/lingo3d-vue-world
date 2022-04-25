import {ElMessage,ElAvatar} from 'element-plus'
import { h } from 'vue'
const useMessage=(message:string,role?:string)=>{
  if (document.getElementsByClassName('el-message').length >0) {
    ElMessage.closeAll()
  }
    ElMessage({
      message:h('div',null,[
        role ? h(ElAvatar,{src:`${role}/avatar.jpg`,size:20}) : null,
        h('p',null,message)
      ]),
      center:true,
      duration:3000
    })
}
export default useMessage
