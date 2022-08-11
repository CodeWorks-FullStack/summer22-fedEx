import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PackageSchema = new Schema(
  {
    // TODO write the Schema
    message: { type: String, minlength: 1, maxlength: 10000, required: true },

    // RELATIONSHIPS are hard....
    shipId: { type: Schema.Types.ObjectId, required: true, ref: 'Ship' },
    senderId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    recipientId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },

  },
  { timestamps: true, toJSON: { virtuals: true } }
)


PackageSchema.virtual('transportShip', {
  justOne: true,
  foreignField: '_id',
  localField: 'shipId',
  ref: 'Ship'
})

PackageSchema.virtual('sender', {
  justOne: true,
  foreignField: '_id',
  localField: 'senderId',
  ref: 'Account'
})

PackageSchema.virtual('recipient', {
  justOne: true,
  foreignField: '_id',
  localField: 'recipientId',
  ref: 'Account'
})
