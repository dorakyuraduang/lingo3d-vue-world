import { defineStore } from 'pinia'
export default defineStore({
  id: 'player',
  state: () => {
    return {
      id: '',
      name: '',
      role:'',
      isJoin:false,
      usersData:[],
      messageList:[],
      isRed:false,
      message:'',
      hp:100,
      isMobile:false
    }
  }
})