import io from 'socket.io-client'
//@ts-ignore
const socket =io(import.meta.env.VITE_APP_SOCKET_URL)
export default socket