import mongoose, { Schema } from 'mongoose'

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    durationMinutes: { type: Number, required: true, min: 1 },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  },
  { timestamps: true },
)

export const Workout = mongoose.models.Workout ?? mongoose.model('Workout', workoutSchema)