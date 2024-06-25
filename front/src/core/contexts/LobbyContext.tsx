import { AreaClass, IPlayer, ItemClass } from '@/core/types/Game'
import {
  MutableRefObject,
  ReactNode,
  createContext,
  createRef,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { Socket, io } from 'socket.io-client'
import { proxy, useSnapshot } from 'valtio'

export interface StoreProps {
  currentPlayerId: string
  currentRoomId: string
  players: IPlayer[]
  areas: AreaClass[]
  roundPhase: 'lobby' | 'action' | 'select-area' | 'search-area' | 'debrief'
  currentRound: number
  timer: number
}

interface LobbyContextProps {
  socket: MutableRefObject<Socket | undefined>
  store: StoreProps
  actions: {
    initSocket: (roomId: string, username: string) => void
    toggleIsReady: (isContinuePhase?: boolean) => void
    setPlayerData: (player: IPlayer) => void
    addOrUpdatePlayer: (player: IPlayer) => void
    selectArea: (areaId: string) => void
    collectItem: (itemId: string) => void
    unlockItem: (itemId: string) => void
    addBag: (numero: number) => void
    startGame: () => void
    removePlayer: (playerId: IPlayer['id']) => void
    leaveRoom: () => void
  }
}

export const LobbyContext = createContext<LobbyContextProps>({
  socket: createRef() as MutableRefObject<Socket | undefined>,
  store: {
    currentPlayerId: '',
    currentRoomId: '',
    players: [],
    areas: [],
    roundPhase: 'lobby',
    currentRound: 0,
    timer: 0,
  },
  actions: {
    initSocket: () => {},
    toggleIsReady: () => {},
    setPlayerData: () => {},
    addOrUpdatePlayer: () => {},
    selectArea: () => {},
    collectItem: () => {},
    unlockItem: () => {},
    addBag: () => {},
    startGame: () => {},
    removePlayer: () => {},
    leaveRoom: () => {},
  },
})

export const LobbyProvider = ({ children }: { children: ReactNode }) => {
  const socket = useRef<Socket | undefined>()
  const store = useRef<StoreProps>(
    proxy({
      currentPlayerId: '',
      currentRoomId: '',
      players: [],
      areas: [],
      roundPhase: 'lobby',
      currentRound: 0,
      timer: 0,
    })
  ).current
  let timerInterval: NodeJS.Timeout

  const initSocket = (incomingRoomId: string, username: string) => {
    socket.current = io(import.meta.env.VITE_SERVER_URL ?? '', {
      extraHeaders: {
        'ngrok-skip-browser-warning': 'true',
      },
    })

    const newPlayer: IPlayer = {
      id: '',
      username: username,
      roomId: incomingRoomId,
      isReady: false,
      isAdmin: false,
      character: undefined,
      items: [],
      currentRoundItems: [],
      itemsPickupCapacity: 1,
      actionCards: [],
      currentAreaId: 'livingroom',
    }

    socket.current.on('connect', () => {
      console.log('Connected to server')
      store.currentPlayerId = socket.current?.id!
      store.players = [
        ...store.players,
        {
          ...newPlayer,
          id: socket.current?.id!,
        },
      ]
    })

    socket.current.emit('joined-room', {
      roomId: incomingRoomId,
      player: newPlayer,
    })

    socket.current.emit('get-players')

    socket.current.on('players', (incomingPlayers: IPlayer[]) => {
      store.players = incomingPlayers
    })

    socket.current.on('player-update', (player: IPlayer) => {
      addOrUpdatePlayer(player)
    })

    socket.current.on(
      'item-collected',
      (data: { playerId: IPlayer['id']; item: ItemClass }) => {
        handleItemCollected(data.playerId, data.item)
      }
    )

    socket.current.on('game-started', (data) =>
      handleGameStarted(data.areas, data.players)
    )

    socket.current.on(
      'action-phase-started',
      (data: { players: IPlayer[]; roundNumber: number }) =>
        handleActionPhaseStarted(data.players, data.roundNumber)
    )

    socket.current.on('select-area-phase-started', handleSelectAreaPhaseStarted)

    socket.current.on('search-area-phase-started', handleSearchAreaPhaseStarted)

    socket.current.on('debrief-phase-started', handleDebriefPhaseStarted)

    socket.current.on('player-disconnect', (playerId: IPlayer['id']) =>
      removePlayer(playerId)
    )
  }

  const toggleIsReady = (isContinuePhase?: boolean) => {
    socket.current?.emit('toggle-is-ready', isContinuePhase)
  }

  const setPlayerData = (incomingPlayer: IPlayer) => {
    socket.current?.emit('set-player-data', incomingPlayer)
  }

  const addOrUpdatePlayer = (incomingPlayer: IPlayer) => {
    const playerIndex = store.players.findIndex(
      (p) => p.id === incomingPlayer.id
    )

    if (playerIndex === -1) {
      store.players.push(incomingPlayer)
    } else {
      store.players[playerIndex] = incomingPlayer
    }
  }

  const startTimer = (duration: number) => {
    clearInterval(timerInterval)
    store.timer = duration
    timerInterval = setInterval(() => {
      if (store.timer > 0) {
        store.timer -= 1
      } else {
        clearInterval(timerInterval)
      }
    }, 1000)
  }

  const selectArea = (areaId: string) => {
    socket.current?.emit('select-area', areaId)
  }

  const collectItem = (itemId: string) => {
    socket.current?.emit('collect-item', itemId)
  }

  const handleItemCollected = (playerId: IPlayer['id'], item: ItemClass) => {
    const playerIndex = store.players.findIndex((p) => p.id === playerId)

    if (playerIndex !== -1) {
      store.players[playerIndex].currentRoundItems.push(item)

      const playerAreaId = store.players[playerIndex].currentAreaId
      const areaIndex = store.areas.findIndex((a) => a.id === playerAreaId)

      if (areaIndex !== -1) {
        const itemIndex = store.areas[areaIndex].items.findIndex(
          (i) => i.id === item.id
        )
        store.areas[areaIndex].items[itemIndex].isPickedUp = true
      }
    }
  }

  const unlockItem = (itemId: string) => {
    socket.current?.emit('unlock-item', itemId)
  }

  const addBag = (numero: number) => {
    socket.current?.emit('add-bag', numero)
  }

  const startGame = () => {
    socket.current?.emit('start-game')
  }

  const handleGameStarted = (areas: AreaClass[], players: IPlayer[]) => {
    store.roundPhase = 'action'
    store.currentRound = 1
    store.areas = areas
    store.players = players
  }

  const handleActionPhaseStarted = (
    players: IPlayer[],
    roundNumber: number
  ) => {
    store.players = players
    store.currentRound = roundNumber
    store.roundPhase = 'action'
  }

  const handleSelectAreaPhaseStarted = () => {
    store.players = store.players.map((player) => ({
      ...player,
      isReady: false,
      currentAreaId: 'livingroom',
    }))
    store.roundPhase = 'select-area'
  }
  const handleSearchAreaPhaseStarted = () => {
    store.players = store.players.map((player) => ({
      ...player,
      isReady: false,
    }))
    store.roundPhase = 'search-area'
    startTimer(20)
  }

  const handleDebriefPhaseStarted = () => {
    store.players = store.players.map((player) => ({
      ...player,
      isReady: false,
    }))
    store.roundPhase = 'debrief'
    // startTimer(90)
  }

  const removePlayer = (incomingPlayerId: IPlayer['id']) => {
    store.players = store.players.filter(
      (player) => player.id !== incomingPlayerId
    )
  }

  const resetStore = () => {
    store.players = []
    store.areas = []
    store.roundPhase = 'lobby'
    store.currentRound = 0
    store.currentRoomId = ''
  }

  const leaveRoom = () => {
    socket.current?.disconnect()
    resetStore()
  }

  const actions = {
    initSocket,
    toggleIsReady,
    setPlayerData,
    addOrUpdatePlayer,
    selectArea,
    collectItem,
    unlockItem,
    addBag,
    startGame,
    removePlayer,
    leaveRoom,
  }

  return (
    <LobbyContext.Provider
      value={{
        socket,
        store,
        actions,
      }}
    >
      {children}
    </LobbyContext.Provider>
  )
}
