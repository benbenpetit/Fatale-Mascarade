import { RouteObject } from 'react-router-dom'
import Home from '@/pages/Home'
import Game from '@/pages/Game'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/game',
    element: <Game />,
  },
]

export default routes

export const routesMap = {
  HOME: '/',
  GAME: '/game',
}
