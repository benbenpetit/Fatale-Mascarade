import express from 'express'
import { io } from './index.js'

const router = express.Router()

router.get('/getIsRoom/:roomId', (req, res) => {
  const { roomId } = req.params
  const isRoom = io.sockets.adapter.rooms.has(roomId)
  res.json({ isRoom })
})

export default router
