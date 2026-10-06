import { model, models, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  },
  { timestamps: true },
)

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
)

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    calories: { type: Number, min: 0 },
    occurredAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, default: 0, min: 0 },
    period: { type: String, required: true },
  },
  { timestamps: true },
)

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    durationMinutes: { type: Number, required: true, min: 1 },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  },
  { timestamps: true },
)

export const User = models.User ?? model('User', userSchema)
export const Team = models.Team ?? model('Team', teamSchema)
export const Activity = models.Activity ?? model('Activity', activitySchema)
export const LeaderboardEntry = models.LeaderboardEntry ?? model('LeaderboardEntry', leaderboardSchema)
export const Workout = models.Workout ?? model('Workout', workoutSchema)