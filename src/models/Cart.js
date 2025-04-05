import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  }
});

const cartSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  items: [cartItemSchema]
});

export default mongoose.model('Cart', cartSchema);