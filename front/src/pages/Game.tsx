import { useContext, useEffect, useMemo, useState } from 'react'
import { LobbyContext, StoreProps } from '@/core/contexts/LobbyContext'
import Lobby from '@/components/Lobby/Lobby'
import { useSnapshot } from 'valtio'
import RoleReveal from '@/components/RoleReveal/RoleReveal'
import AreasMap from '@/components/AreasMap/AreasMap'
import AreaSearching from '@/components/AreaSearching/AreaSearching'
import Frame from '@/components/UI/Frame/Frame'
import BackgroundWrapper from '@/components/UI/BackgroundWrapper/BackgroundWrapper'
import ActionPhase from '@/components/ActionPhase/ActionPhase'
import Debrief from '@/components/Debrief/Debrief'

const Game = () => {
  const { store, actions } = useContext(LobbyContext)
  const snapshot = useSnapshot(store) as StoreProps
  const [isShowRoleReveal, setIsShowRoleReveal] = useState(true)
  const currentPlayer = useMemo(
    () => snapshot.players.find((p) => p.id === snapshot.currentPlayerId),
    [snapshot.players, snapshot.currentPlayerId]
  )
  const currentArea = useMemo(
    () =>
      snapshot.areas.find((area) => area.id === currentPlayer?.currentAreaId),
    [snapshot.areas, currentPlayer?.currentAreaId]
  )

  const handleGameStart = () => {
    actions.startGame()
  }

  const handleAreaClick = (id: string) => {
    if (!currentPlayer?.isReady) {
      actions.selectArea(id)
    }
  }

  const handleReadyClick = () => {
    actions.toggleIsReady(true)
  }

  const handleCollectItem = (id: string) => {
    actions.collectItem(id)
  }

  const handleQRCHaracterScan = (id: string) => {}

  const handleQRActionScan = (id: string) => {}

  useEffect(() => {
    navigator?.mediaDevices
      ?.getUserMedia({ video: { facingMode: 'environment' } })
      .then(() => {
        console.log('success')
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <BackgroundWrapper>
      <Frame isFade />
      {snapshot.roundPhase === 'lobby' && (
        <Lobby
          players={snapshot.players}
          currentPlayer={currentPlayer}
          onGameStart={handleGameStart}
          toggleIsReady={actions.toggleIsReady}
          leaveRoom={actions.leaveRoom}
        />
      )}
      {snapshot.roundPhase !== 'lobby' && (
        <>
          {isShowRoleReveal ? (
            <RoleReveal
              currentPlayer={currentPlayer}
              onQRCharacterScan={(characterId) =>
                handleQRCHaracterScan(characterId)
              }
              isBad={currentPlayer?.character?.isBad}
              onDismiss={() => setIsShowRoleReveal(false)}
            />
          ) : (
            <>
              {snapshot.roundPhase === 'action' && (
                <ActionPhase
                  currentPlayer={currentPlayer}
                  players={snapshot.players}
                  currentRound={snapshot.currentRound}
                  onReadyClick={() => handleReadyClick()}
                  addBag={(numero) => actions.addBag(numero)}
                />
              )}
              {snapshot.roundPhase === 'select-area' && (
                <AreasMap
                  areas={snapshot.areas}
                  players={snapshot.players}
                  currentPlayer={currentPlayer}
                  onAreaClick={(id) => handleAreaClick(id)}
                  isReady={currentPlayer?.isReady}
                  onReadyClick={() => handleReadyClick()}
                />
              )}
              {snapshot.roundPhase === 'search-area' && currentArea && (
                <AreaSearching
                  area={currentArea}
                  currentPlayer={currentPlayer}
                  onCollectItem={(id) => handleCollectItem(id)}
                  isHandFree={
                    (currentPlayer?.currentRoundItems.length ?? 0) <
                    (currentPlayer?.itemsPickupCapacity ?? 0)
                  }
                />
              )}
              {snapshot.roundPhase === 'debrief' && (
                <Debrief
                  currentPlayer={currentPlayer}
                  players={snapshot.players}
                  currentRound={snapshot.currentRound}
                  onReadyClick={() => handleReadyClick()}
                  onUnlockItem={(id) => actions.unlockItem(id)}
                />
              )}
            </>
          )}
        </>
      )}
    </BackgroundWrapper>
  )
}

export default Game
