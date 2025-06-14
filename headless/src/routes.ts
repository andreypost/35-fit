import { lazy } from 'react'
const Main = lazy(() => import('views/Main'))
const Training = lazy(() => import('views/Training'))
const Pricing = lazy(() => import('views/Pricing'))
const Schedule = lazy(() => import('views/Schedule'))
const Team = lazy(() => import('views/Team'))
const Club = lazy(() => import('views/Club'))
const Faq = lazy(() => import('views/Faq'))
const Reserve = lazy(() => import('views/Reserve'))
const Coach = lazy(() => import('views/Coach'))
const Chat = lazy(() => import('views/Chat'))
const Test = lazy(() => import('views/Test'))

import {
  MAIN_ROUTE,
  TRAIN_ROUTE,
  PRICE_ROUTE,
  SCHEDULE_ROUTE,
  TEAM_ROUTE,
  CLUB_ROUTE,
  FAQ_ROUTE,
  RESERVE_ROUTE,
  COACH_ROUTE,
  CHAT_ROUTE,
  TEST_ROUTE,
} from 'constants/routes'

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
  {
    path: TRAIN_ROUTE,
    Component: Training,
  },
  {
    path: PRICE_ROUTE,
    Component: Pricing,
  },
  {
    path: SCHEDULE_ROUTE,
    Component: Schedule,
  },
  {
    path: TEAM_ROUTE,
    Component: Team,
  },
  {
    path: CLUB_ROUTE,
    Component: Club,
  },
  {
    path: FAQ_ROUTE,
    Component: Faq,
  },
  {
    path: RESERVE_ROUTE,
    Component: Reserve,
  },
  {
    path: COACH_ROUTE,
    Component: Coach,
  },
]

export const privatRoutes = [
  {
    path: CHAT_ROUTE,
    Component: Chat,
  },
  {
    path: TEST_ROUTE,
    Component: Test,
  },
]
