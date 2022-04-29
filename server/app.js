
 const NodeMediaServer=require('node-media-server')
const socketList={}
const config = {
  rtmp: {
    port: 7725,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    mediaroot: './media',
    allow_origin: '*'
  }
};
var nms = new NodeMediaServer(config)
nms.run();

const io = require("socket.io")(4399, {
  cors: true,
});
let users = {};
io.on('connection', (socket) => {
  socket.on('join', ({ name, role }) => {
    socketList[socket.id]=socket
    users[socket.id] = {
      x: 400,
      y: 0,
      z: 0,
      role,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      name,
      motion: "idle",
      id: socket.id,
      message:""
    }
    socket.emit('join', {
      id:socket.id,
      name:name,
      role:role,
      code:200
    })
    socket.on('message', (msg) => {
      io.emit("message", {
        id: socket.id,
        name,
        msg,
        role,
        type: 1
      })
    })
    socket.on('update', (data) => {
      users[socket.id] = {
        ...data,
        name,
        role,
        id: socket.id,
      }
    })
    io.emit("message", {
      id: 'system',
      msg: `${name}加入世界`,
      type: 0
    })
    socket.on('audio',({blob,id})=>{
      io.emit("audio", {
        id,
        blob
      })
    })
    socket.on('send',(time)=>{
      const serverSend=Date.now()
       socket.emit('packet',{
         serverPacke:Date.now(),
         serverSend,
         clientSend:time
       })
     })
     socket.on('disconnect', () => {
       io.emit("message", {
         id: 'system',
         msg: `${name}退出世界`,
         type: 0
       })
       delete users[socket.id]
       delete  socketList[socket.id]
     })
     socket.on('shoot',(id)=>{
      socketList[id].emit('shoot')
     })
   })
 })
 setInterval(() => {
   io.emit("update", users)
 }, 16)