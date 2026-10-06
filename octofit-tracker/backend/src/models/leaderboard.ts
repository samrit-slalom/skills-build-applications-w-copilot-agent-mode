import mongoose, { Schema } from 'mongoose'

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, default: 0, min: 0 },
    period: { type: String, required: true },
  },
  { timestamps: true },
)

export const Leaderboard = mongoose.models.Leaderboard ?? mongoose.model('Leaderboard', leaderboardSchema)