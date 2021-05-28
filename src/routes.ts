import { lazy } from 'react'
const Main = lazy(() => import('./pages/Main'))
const Training = lazy(() => import('./pages/Training'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Flower = lazy(() => import('./pages/Flower'))
const Chat = lazy(() => import('./pages/Chat'))
import { MAIN_ROUTE, TRAINING_ROUTE, PRICING_ROUTE, FLOWER_ROUTE, CHAT_ROUTE } from './utils/consts';

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: TRAINING_ROUTE,
        Component: Training
    },
    {
        path: PRICING_ROUTE,
        Component: Pricing
    },
]

export const privatRoutes = [
    {
        path: FLOWER_ROUTE,
        Component: Flower
    },
    {
        path: CHAT_ROUTE,
        Component: Chat
    }
]