import { Router } from 'express'
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js'
import { createResourceRouter } from './resourceRoutes.js'

export const apiRouter = Router()

apiRouter.use('/users', createResourceRouter(User))
apiRouter.use('/teams', createResourceRouter(Team))
apiRouter.use('/activities', createResourceRouter(Activity))
apiRouter.use('/leaderboard', createResourceRouter(LeaderboardEntry))
apiRouter.use('/workouts', createResourceRouter(Workout))