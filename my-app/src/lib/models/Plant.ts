import mongoose from 'mongoose';

const PlantSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
PlantSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Plant || mongoose.model('Plant', PlantSchema); 