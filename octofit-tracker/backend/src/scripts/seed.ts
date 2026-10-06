import mongoose from 'mongoose'
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js'

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    console.log('Seed the octofit_db database with test data')
    await mongoose.connect(connectionString)

    console.log('Connected to octofit_db')

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const [alex, priya, jordan, maya] = await User.create([
      { name: 'Alex Rivera', email: 'alex.rivera@octofit.test' },
      { name: 'Priya Shah', email: 'priya.shah@octofit.test' },
      { name: 'Jordan Lee', email: 'jordan.lee@octofit.test' },
      { name: 'Maya Thompson', email: 'maya.thompson@octofit.test' },
    ])

    await Team.create([
      { name: 'Morning Metcons', members: [alex._id, priya._id] },
      { name: 'Trail Blazers', members: [jordan._id, maya._id] },
      { name: 'Recovery Crew', members: [alex._id, maya._id] },
    ])

    await Activity.create([
      {
        user: alex._id,
        type: 'Rowing intervals',
        durationMinutes: 32,
        calories: 360,
        occurredAt: new Date('2026-10-01T13:30:00.000Z'),
      },
      {
        user: priya._id,
        type: 'Strength circuit',
        durationMinutes: 45,
        calories: 430,
        occurredAt: new Date('2026-10-02T12:00:00.000Z'),
      },
      {
        user: jordan._id,
        type: 'Trail run',
        durationMinutes: 58,
        calories: 690,
        occurredAt: new Date('2026-10-03T15:15:00.000Z'),
      },
      {
        user: maya._id,
        type: 'Mobility flow',
        durationMinutes: 25,
        calories: 140,
        occurredAt: new Date('2026-10-04T22:00:00.000Z'),
      },
    ])

    await Leaderboard.create([
      { user: jordan._id, points: 1480, period: '2026-W40' },
      { user: priya._id, points: 1325, period: '2026-W40' },
      { user: alex._id, points: 1190, period: '2026-W40' },
      { user: maya._id, points: 1035, period: '2026-W40' },
    ])

    await Workout.create([
      {
        name: 'Foundation Strength',
        description: 'Full-body dumbbell workout focused on controlled reps and form.',
        durationMinutes: 40,
        difficulty: 'beginner',
      },
      {
        name: 'Cardio Climb',
        description: 'Incline intervals with steady-state recovery blocks.',
        durationMinutes: 35,
        difficulty: 'intermediate',
      },
      {
        name: 'OctoFit Challenge',
        description: 'High-intensity circuit combining rowing, kettlebells, and burpees.',
        durationMinutes: 50,
        difficulty: 'advanced',
      },
    ])

    const [users, teams, activities, leaderboard, workouts] = await Promise.all([
      User.countDocuments(),
      Team.countDocuments(),
      Activity.countDocuments(),
      Leaderboard.countDocuments(),
      Workout.countDocuments(),
    ])

    console.log(`Seeded ${users} users`)
    console.log(`Seeded ${teams} teams`)
    console.log(`Seeded ${activities} activities`)
    console.log(`Seeded ${leaderboard} leaderboard entries`)
    console.log(`Seeded ${workouts} workouts`)
    console.log('Database seeding complete')
    await mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
