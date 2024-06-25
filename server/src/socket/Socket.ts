import { Server, Socket } from 'socket.io'
import Game, { TypeRoundPhase } from './Game.js'
import ItemClass from '../class/Item.js'
import ActionCardClass from '../class/ActionCard.js'
import { TypeAreaIds } from '../data/Areas.js'
import { ICharacter } from '../data/Characters.js'

export interface ISocketPlayer {
  id: string
  username: string
  roomId: string
  isReady: boolean
  isAdmin: boolean
  character?: ICharacter
  items: ItemClass[]
  currentRoundItems: ItemClass[]
  itemsPickupCapacity: number
  actionCards: ActionCardClass[]
  currentAreaId: TypeAreaIds
}

const GAME_PHASES: TypeRoundPhase[] = [
  'action',
  'select-area',
  'search-area',
  'debrief',
]

const socketPlayers: Map<Socket, ISocketPlayer> = new Map()
const games: Map<string, Game> = new Map()

class Connection {
  socket: Socket
  io: Server
  currentRoomId: string

  constructor(io: Server, socket: Socket) {
    this.socket = socket
    this.io = io
    this.currentRoomId = ''

    const newSocketPlayer: ISocketPlayer = {
      id: socket.id,
      username: '',
      roomId: '',
      isReady: false,
      isAdmin: false,
      character: undefined,
      items: [],
      currentRoundItems: [],
      itemsPickupCapacity: 1,
      actionCards: [],
      currentAreaId: 'livingroom',
    }

    socketPlayers.set(socket, newSocketPlayer)

    socket.on('joined-room', ({ roomId, player }) => {
      this.currentRoomId = roomId
      const isRoomFull = this.getRoomPlayers(roomId).length === 4

      if (!isRoomFull) {
        this.setPlayerData({ ...player, id: socket.id, roomId })
        this.socket.join(roomId)

        if (!games.has(roomId)) {
          games.set(roomId, new Game(io, roomId))
        }
      }
    })

    socket.on('get-players', () => {
      this.updatePlayers()
    })

    socket.on('toggle-is-ready', (isContinuePhase: boolean) => {
      const player = socketPlayers.get(this.socket)
      if (player) {
        player.isReady = !player.isReady
        socketPlayers.set(this.socket, player)
        this.setPlayerData(player)

        if (isContinuePhase) {
          const isAllReady = this.getRoomPlayers(this.currentRoomId).every(
            (player) => player.isReady
          )

          if (isAllReady) {
            const game = games.get(this.currentRoomId)
            if (game) {
              this.handleStartNextPhase(game.roundPhase)
            }
          }
        }
      }
    })

    socket.on('set-player-data', (player: ISocketPlayer) =>
      this.setPlayerData(player)
    )

    socket.on('select-area', (areaId: TypeAreaIds) => {
      const player = socketPlayers.get(this.socket)
      if (player) {
        player.currentAreaId = areaId
        socketPlayers.set(this.socket, player)
        this.setPlayerData(player)
      }
    })

    socket.on('collect-item', (itemId: ItemClass['id']) => {
      this.collectItem(itemId)
    })

    socket.on('unlock-item', (itemId: ItemClass['id']) => {
      this.unlockItem(itemId)
    })

    socket.on('add-bag', (numero: number) => {
      this.addBag(numero)
    })

    socket.on('start-game', () => {
      this.startGame()
    })

    socket.on('disconnect', () => this.disconnect())
  }

  startGame() {
    const game = games.get(this.currentRoomId)

    if (game) {
      const players = this.getRoomPlayers(this.currentRoomId)
      const newPlayers = game.setupGame(players)

      newPlayers.forEach((player) => {
        player.isReady = false
        const playerSocket = this.io.sockets.sockets.get(player.id)
        socketPlayers.set(playerSocket as Socket, player)
      })

      this.io.sockets.in(this.currentRoomId).emit('game-started', {
        areas: game.areas,
        players: newPlayers,
      })
    }
  }

  getRoomPlayers(roomId: string): ISocketPlayer[] {
    const currentRoomPlayers = this.io.sockets.adapter.rooms.get(
      roomId
    ) as Set<string>
    if (!currentRoomPlayers) return []

    const roomPlayers = Array.from(currentRoomPlayers)
      .map((playerId) => {
        const playerSocket = this.io.sockets.sockets.get(playerId)
        return socketPlayers.get(playerSocket as Socket)
      })
      .filter(Boolean) as ISocketPlayer[]

    return roomPlayers
  }

  getIsNewRoom(roomId: string) {
    const roomPlayers = this.getRoomPlayers(roomId)

    return roomPlayers.length === 0
  }

  handleStartNextPhase(currentPhase: TypeRoundPhase) {
    const currentPhaseIndex = GAME_PHASES.indexOf(currentPhase)
    const nextPhase =
      currentPhaseIndex < GAME_PHASES.length - 1
        ? GAME_PHASES[currentPhaseIndex + 1]
        : GAME_PHASES[0]

    if (nextPhase === 'action') {
      this.startActionPhase()
    } else if (nextPhase === 'select-area') {
      this.startSelectAreaPhase()
    } else if (nextPhase === 'search-area') {
      this.startSearchAreaPhase()
    } else if (nextPhase === 'debrief') {
      this.startDebriefPhase()
    } else {
      console.error('Invalid phase')
    }
  }

  startActionPhase() {
    const game = games.get(this.currentRoomId)

    if (game) {
      game.startActionPhase()

      const players = this.getRoomPlayers(this.currentRoomId)
      players.forEach((player) => {
        player.items = [...player.items, ...player.currentRoundItems]
        player.currentRoundItems = []
        player.isReady = false
        player.itemsPickupCapacity = 1
        const playerSocket = this.io.sockets.sockets.get(player.id)
        socketPlayers.set(playerSocket as Socket, player)
      })

      this.io.sockets.in(this.currentRoomId).emit('action-phase-started', {
        players,
        roundNumber: game.currentRound,
      })
    }
  }

  startSelectAreaPhase() {
    const game = games.get(this.currentRoomId)

    if (game) {
      game.startSelectAreaPhase()

      const players = this.getRoomPlayers(this.currentRoomId)
      players.forEach((player) => {
        player.isReady = false
        player.currentAreaId = 'livingroom'
        const playerSocket = this.io.sockets.sockets.get(player.id)
        socketPlayers.set(playerSocket as Socket, player)
      })

      this.io.sockets.in(this.currentRoomId).emit('select-area-phase-started')
    }
  }

  startSearchAreaPhase() {
    const game = games.get(this.currentRoomId)

    if (game) {
      game.stopTimer()

      const players = this.getRoomPlayers(this.currentRoomId)
      players.forEach((player) => {
        player.isReady = false
        const playerSocket = this.io.sockets.sockets.get(player.id)
        socketPlayers.set(playerSocket as Socket, player)
      })

      game?.startSearchAreaPhase().then((res) => {
        if (res) {
          this.startDebriefPhase()
        }
      })

      this.io.sockets.in(this.currentRoomId).emit('search-area-phase-started')
    }
  }

  startDebriefPhase() {
    const game = games.get(this.currentRoomId)
    if (game) {
      game.startDebriefPhase()

      const players = this.getRoomPlayers(this.currentRoomId)
      players.forEach((player) => {
        player.isReady = false
        const playerSocket = this.io.sockets.sockets.get(player.id)
        socketPlayers.set(playerSocket as Socket, player)
      })

      this.io.sockets.in(this.currentRoomId).emit('debrief-phase-started')
    }
  }

  collectItem(incomingItemId: ItemClass['id']) {
    const game = games.get(this.currentRoomId)
    const player = socketPlayers.get(this.socket)

    if (game && player) {
      const item = game.collectItem(
        player,
        incomingItemId,
        player.currentAreaId
      )

      if (item) {
        player.currentRoundItems.push(item)
        socketPlayers.set(this.socket, player)
        this.io.sockets.in(player.roomId).emit('item-collected', {
          playerId: player.id,
          item: item,
        })
      }
    }
  }

  unlockItem(incomingItemId: ItemClass['id']) {
    const game = games.get(this.currentRoomId)
    const player = socketPlayers.get(this.socket)

    if (game && player) {
      let item = player.items.find((item) => item.id === incomingItemId)
      if (!item) {
        item = player.currentRoundItems.find(
          (item) => item.id === incomingItemId
        )
      }

      if (item) {
        item.isLocked = false
        socketPlayers.set(this.socket, player)
        this.setPlayerData(player)
      }
    }
  }

  addBag(numero: number) {
    const player = socketPlayers.get(this.socket)

    if (player) {
      player.itemsPickupCapacity = numero
      socketPlayers.set(this.socket, player)
      this.setPlayerData(player)
    }
  }

  updatePlayers() {
    let roomPlayers = this.getRoomPlayers(this.currentRoomId)
    if (roomPlayers.length === 0) return

    const adminPlayer = roomPlayers.find((player) => player.isAdmin)
    if (!adminPlayer) {
      roomPlayers[0].isAdmin = true
      roomPlayers[0].isReady = true
      socketPlayers.set(this.socket, roomPlayers[0])
    }

    this.io.sockets.in(this.currentRoomId).emit('players', roomPlayers)
  }

  setPlayerData(incomingPlayer: ISocketPlayer) {
    const player = socketPlayers.get(this.socket)
    if (!player) return

    const isNewRoom = this.getIsNewRoom(incomingPlayer.roomId || player.roomId)
    const newPlayer = {
      ...player,
      id: incomingPlayer?.id || player.id,
      username: incomingPlayer?.username || player.username,
      roomId: incomingPlayer?.roomId || player.roomId,
      isReady: isNewRoom || (incomingPlayer.isReady ?? player.isReady),
      isAdmin: isNewRoom || (incomingPlayer.isAdmin ?? player.isAdmin),
      character: incomingPlayer?.character || player.character,
      items: incomingPlayer?.items || player.items,
      currentRoundItems:
        incomingPlayer?.currentRoundItems || player.currentRoundItems,
      itemsPickupCapacity:
        incomingPlayer?.itemsPickupCapacity || player.itemsPickupCapacity,
      actionCards: incomingPlayer?.actionCards || player.actionCards,
      currentAreaId: incomingPlayer?.currentAreaId || player.currentAreaId,
    } as ISocketPlayer

    socketPlayers.set(this.socket, newPlayer)

    this.io.sockets.in(this.currentRoomId).emit('player-update', newPlayer)
  }

  disconnect() {
    const player = socketPlayers.get(this.socket)

    if (player) {
      socketPlayers.delete(this.socket)
      if (player?.isAdmin) {
        this.updatePlayers()
      }

      this.io.sockets
        .in(this.currentRoomId)
        .emit('player-disconnect', player.id)
    }
  }
}

const socket = (io: Server) => {
  io.on('connection', (socket) => {
    new Connection(io, socket)
  })
}

export default socket
