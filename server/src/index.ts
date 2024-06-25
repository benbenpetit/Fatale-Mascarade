import express from 'express'
import http from 'node:http'
import { Server } from 'socket.io'
import cors from 'cors'
import socket from './socket/Socket.js'
import routes from './routes.js'

const PORT = 4000

const app = express()
const server = http.createServer(app)

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', routes)

export const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

socket(io)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
