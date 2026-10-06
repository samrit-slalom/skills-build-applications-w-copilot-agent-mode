import mongoose, { Schema } from 'mongoose'

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

export const Activity = mongoose.models.Activity ?? mongoose.model('Activity', activitySchema)