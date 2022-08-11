import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ShipSchema = new Schema(
  {
    name: { type: String, required: true },
    captain: { type: String, required: true },
    img: { type: String, default: 'https://thiscatdoesnotexist.com' },

    // defines the relationship
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }

  },
  { timestamps: true, toJSON: { virtuals: true } }
)

// TODO Profile
// virtuals are opt-in everytime you make the query???
ShipSchema.virtual('creatorInfo', {
  justOne: true,
  foreignField: '_id',
  localField: 'creatorId',
  ref: 'Account'
})
