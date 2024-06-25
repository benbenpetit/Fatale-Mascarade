import styles from '@/styles/Home.module.scss'
import { useContext, useEffect, useState } from 'react'
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { LobbyContext } from '@/core/contexts/LobbyContext'
import { routesMap } from '@/core/routes'
import { getIsRoom, getRandomCode } from '@/core/utils/room'
import Frame from '@/components/UI/Frame/Frame'
import BackgroundWrapper from '@/components/UI/BackgroundWrapper/BackgroundWrapper'
import GameTitleScreen from '@/components/GameTitleScreen/GameTitleScreen'
import InputText from '@/components/UI/InputText/InputText'
import Separator from '@/components/UI/Separator/Separator'
import CTA from '@/components/UI/CTA/CTA'

const Home = () => {
  const { store, actions } = useContext(LobbyContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const [roomIdSearchParam, setRoomIdSearchParam] = useState(
    searchParams.get('q')
  )
  const [isValidRoomIdSearchParam, setIsValidRoomIdSearchParam] =
    useState(false)
  const [codeInput, setCodeInput] = useState('')
  const [usernameInput, setUsernameInput] = useState('')
  const navigate = useNavigate()
  const [isGameTitleScreen, setIsGameTitleScreen] = useState(true)

  const navigateToGame = (roomId: string) => {
    navigate({
      pathname: routesMap.GAME,
      search: createSearchParams({
        q: roomId.toUpperCase(),
      }).toString(),
    })
  }

  const createRoom = () => {
    if (!!usernameInput.trim()) {
      const newRoomId = getRandomCode()
      joinRoom(newRoomId)
    }
  }

  const joinRoom = async (newRoomId?: string) => {
    if (
      !newRoomId &&
      ((codeInput && codeInput.trim()?.length === 4) ||
        isValidRoomIdSearchParam)
    ) {
      const roomId = (codeInput || roomIdSearchParam)?.toLowerCase()
      if (roomId) {
        const isRoom = await getIsRoom(roomId)
        if (isRoom) {
          newRoomId = roomId
        } else {
          console.log('Room not found')
          return
        }
      }
    }

    if (newRoomId) {
      store.roundPhase = 'lobby'
      actions.initSocket(newRoomId, usernameInput)
      navigateToGame(newRoomId)
    }
  }

  useEffect(() => {
    setRoomIdSearchParam(searchParams.get('q'))
  }, [searchParams])

  useEffect(() => {
    if (roomIdSearchParam) {
      getIsRoom(roomIdSearchParam).then((isRoom) => {
        setIsValidRoomIdSearchParam(isRoom)
      })
    }
  }, [roomIdSearchParam])

  const dismissGameTitleScreen = () => {
    actions.leaveRoom()
    setIsGameTitleScreen(false)
  }

  return (
    <BackgroundWrapper>
      <Frame isFade={!isGameTitleScreen} />
      {isGameTitleScreen ? (
        <GameTitleScreen onClick={dismissGameTitleScreen} />
      ) : (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {isValidRoomIdSearchParam && (
              <h1>
                <span>Room&nbsp;{roomIdSearchParam || 'XXXX'}</span>
              </h1>
            )}
            <InputText
              value={usernameInput}
              onValueChange={(value) => setUsernameInput(value)}
              placeholder="pseudo"
            />
            {!isValidRoomIdSearchParam && (
              <InputText
                value={codeInput}
                onValueChange={(value) => setCodeInput(value.toUpperCase())}
                placeholder="WXYZ"
              />
            )}
            <Separator style={{ width: '75%' }} />
            {!isValidRoomIdSearchParam && (
              <CTA
                onClick={createRoom}
                text="Commencer une partie"
                withSideStars
                isHighlight
              />
            )}
            <CTA
              onClick={() => joinRoom()}
              text={`Rejoindre ${
                isValidRoomIdSearchParam ? 'la' : 'une'
              } partie`}
              withSideStars
            />
          </div>
        </div>
      )}
    </BackgroundWrapper>
  )
}

export default Home
