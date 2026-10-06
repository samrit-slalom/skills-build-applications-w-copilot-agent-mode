import { Router } from 'express'
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js'
import { createResourceRouter } from './resourceRoutes.js'

export const router = Router()

router.use('/api/users/', createResourceRouter(User))
router.use('/api/teams/', createResourceRouter(Team))
router.use('/api/activities/', createResourceRouter(Activity))
router.use('/api/leaderboard/', createResourceRouter(Leaderboard))
router.use('/api/workouts/', createResourceRouter(Workout))